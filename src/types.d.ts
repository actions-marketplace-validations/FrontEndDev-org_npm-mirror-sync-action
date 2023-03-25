export type SyncTarget = 'npmmirror';

export interface SyncOptions {
  name: string;
  target: SyncTarget;
  timeout: number;
}
