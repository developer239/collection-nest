const sharedConfig = require('../../jest.config.js');
const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig')

module.exports = {
  ...sharedConfig,
  roots: ['../../'],
  modulePaths: ['../../'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  modulePathIgnorePatterns: ['lib', 'dist'],
}
