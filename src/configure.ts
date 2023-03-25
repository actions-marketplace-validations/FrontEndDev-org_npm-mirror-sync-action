import * as core from '@actions/core';
import * as fs from 'fs';
import { SyncOptions, SyncTarget } from './types';

export function parseOptions(): SyncOptions {
  let name = core.getInput('name');
  // 目前仅支持 npmmirror
  const target = core.getInput('target') as SyncTarget;
  const timeout = Number(core.getInput('timeout'));
  const timeoutFinal = (Number.isNaN(timeout) ? 10 : timeout) * 1000;

  if (!name) {
    const data = fs.readFileSync('package.json', 'utf8');
    name = JSON.parse(data).name;
  }

  if (!name) {
    core.setFailed('package.json name 获取失败');
  }

  return {
    name,
    target,
    timeout: timeoutFinal,
  };
}
