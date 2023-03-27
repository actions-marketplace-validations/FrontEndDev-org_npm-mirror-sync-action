import { nsLogger, wait } from '@/utils';
import axios from 'axios';
import { SyncOptions } from './types';

export async function sync(options: SyncOptions) {
  const logger = nsLogger('sync');
  const syncURL = `https://registry-direct.npmmirror.com/${options.name}/sync?sync_upstream=true`;

  try {
    logger.debug(`PUT ${syncURL}`);
    const res = await axios.put(syncURL);
    logger.debug(`status = ${res.status}`);
    logger.debug(`headers = ${res.headers}`);
    logger.debug(`data = ${res.data}`);

    if (
      res.data &&
      typeof res.data === 'object' &&
      res.data.ok &&
      res.data.logId &&
      typeof res.data.logId === 'string'
    ) {
      return res.data.logId as string;
    } else {
      logger.debug(`响应结果不匹配`);
    }

    return '';
  } catch (err) {
    logger.debug(`请求或响应错误`);
    logger.debug(String(err));
    return '';
  }
}

export async function check(options: SyncOptions, logId: string) {
  const logger = nsLogger('check');

  try {
    const checkURL = `https://registry-direct.npmmirror.com/${options.name}/sync/log/${logId}`;
    logger.debug(`GET ${checkURL}`);
    const res = await axios.get(checkURL);
    logger.debug(`status = ${res.status}`);
    logger.debug(`headers = ${res.headers}`);
    logger.debug(`data = ${JSON.stringify(res.data)}`);

    if (res.data && typeof res.data === 'object' && res.data.syncDone) return true;

    logger.debug(`响应结果不匹配`);
    return false;
  } catch (err) {
    // 忽略错误
    logger.debug(`请求或响应错误`);
    logger.debug(String(err));
    return false;
  }
}

export async function syncToNpmMirror(options: SyncOptions) {
  const logId = await sync(options);
  const logger = nsLogger('syncToNpmMirror');

  // 忽略错误
  if (!logId) {
    logger.error('检查失败：未查询到同步日志 ID');
    return true;
  }

  const startCheckTime = Date.now();
  let checked = false;
  let times = 0;

  while (!checked && Date.now() - startCheckTime < options.timeout) {
    times++;
    logger.info(`第 ${times} 次同步结果检查`);
    checked = await check(options, logId);
    await wait(1000);
  }
}
