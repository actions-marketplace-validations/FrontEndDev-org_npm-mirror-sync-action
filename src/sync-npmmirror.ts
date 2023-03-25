import { nsLogger, wait } from '@/utils';
import axios from 'axios';
import { SyncOptions } from './types';

export async function sync(options: SyncOptions) {
  const logger = nsLogger('sync');
  const syncURL = `https://registry-direct.npmmirror.com/${options.name}/sync?sync_upstream=true`;

  try {
    logger.info(`PUT ${syncURL}`);
    const res = await axios.put(syncURL);
    logger.info(`status = ${res.status}`);
    logger.info(`headers = ${res.headers}`);
    logger.info(`data = ${res.data}`);

    if (
      res.data &&
      typeof res.data === 'object' &&
      res.data.ok &&
      res.data.logId &&
      typeof res.data.logId === 'string'
    ) {
      return res.data.logId as string;
    } else {
      logger.error(`响应结果不匹配`);
    }

    return '';
  } catch (err) {
    logger.error(`请求或响应错误`);
    logger.error(String(err));
    return '';
  }
}

export async function check(options: SyncOptions, logId: string) {
  const logger = nsLogger('check');

  try {
    const checkURL = `https://registry-direct.npmmirror.com/${options.name}/sync/log/${logId}`;
    logger.info(`GET ${checkURL}`);
    const res = await axios.get(checkURL);
    logger.info(`status = ${res.status}`);
    logger.info(`headers = ${res.headers}`);
    logger.info(`data = ${res.data}`);

    if (res.data && typeof res.data === 'object' && res.data.syncDone) return true;

    logger.error(`响应结果不匹配`);
    return false;
  } catch (err) {
    logger.error(`请求或响应错误`);
    logger.error(String(err));
    return false;
  }
}

export async function syncToNpmMirror(options: SyncOptions) {
  const logId = await sync(options);

  // 忽略错误
  if (!logId) return true;

  const startCheckTime = Date.now();
  let checked = false;

  while (!checked && Date.now() - startCheckTime < options.timeout) {
    checked = await check(options, logId);
    await wait(1000);
  }
}
