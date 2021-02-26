import cleaner from 'rollup-plugin-cleaner';
import commonjs from 'rollup-plugin-commonjs'
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
    commonjs({ ignore: ['conditional-runtime-dependency'] }),
    typescript({
      clean: true,
      tsconfig: 'tsconfig.build.json',
      tsconfigOverride: {
        module: 'es2015',
      },
    }),
  ],
}
