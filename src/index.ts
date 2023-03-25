import { parseOptions } from './configure';
import { syncToNpmMirror } from './sync-npmmirror';

const options = parseOptions();

async function main() {
  await syncToNpmMirror(options);
}

void main();
