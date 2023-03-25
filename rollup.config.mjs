import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';

/** @type {import('rollup').RollupOptions} */
export default {
  input: ['src/index.ts'],
  output: [
    {
      format: 'cjs',
      dir: 'dist',
      entryFileNames: '[name].cjs',
      sourcemap: false,
    },
  ],
  plugins: [
    typescript({
      tsconfig: 'tsconfig.json',
    }),
    resolve(),
    commonjs(),
    json(),
    terser(),
  ],
};
