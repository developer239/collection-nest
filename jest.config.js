module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@collection-nest/(.*)$': '<rootDir>/packages/$1/src'
  },
  modulePathIgnorePatterns: ['lib', 'dist'],
}
