/* eslint-disable import/no-default-export */
import cleaner from 'rollup-plugin-cleaner'
import typescript from 'rollup-plugin-typescript2'
import ttypescript from 'ttypescript'

export default {
  input: `./src/index.ts`,
  output: [
    { file: 'lib/index.js' },
  ],
  plugins: [
    cleaner({
      targets: ['./lib'],
    }),
    typescript({
      tsconfig: 'tsconfig.build.json',
      typescript: ttypescript
    }),
  ],
}
