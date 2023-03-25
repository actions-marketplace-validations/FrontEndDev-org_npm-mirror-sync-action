import * as core from '@actions/core';

export async function wait(timeout: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(resolve, timeout);
  });
}

export function nsLogger(ns: string) {
  const toNsMessage = (message: string) => [ns, message].join(': ');

  return {
    info(message: string) {
      core.info(toNsMessage(message));
    },
    error(message: string) {
      core.error(toNsMessage(message));
    },
  };
}
