import cleaner from 'rollup-plugin-cleaner';
import typescript from 'rollup-plugin-typescript2'

export default {
  input: `./src/index.ts`,
  output: {
    file: `./lib/index.js`,
    format: 'es',
  },
  plugins: [
    cleaner({
      targets: [
        './lib'
      ]
    }),
    typescript({
      tsconfig: 'tsconfig.build.json',
    }),
  ],
}
