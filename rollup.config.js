/* eslint-disable import/no-default-export */
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve'
import cleaner from 'rollup-plugin-cleaner'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import typescript from 'rollup-plugin-typescript2'
import ttypescript from 'ttypescript'

export default {
  input: `./src/index.ts`,
  output: [
    { file: 'lib/index.js', format: 'cjs', },
  ],
  plugins: [
    cleaner({
      targets: ['./lib'],
    }),
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: 'tsconfig.build.json',
      typescript: ttypescript
    }),
  ],
}
