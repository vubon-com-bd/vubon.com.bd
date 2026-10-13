/**
 * Unit Test Jest Config
 * @module identity-service/test/unit
 */
export default {
  displayName: 'unit',
  testEnvironment: 'node',
  rootDir: '../..',
  testMatch: ['<rootDir>/test/unit/**/*.spec.ts'],
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: '<rootDir>/tsconfig.json',
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  // ✅ AUTO INJECT jest globals
  injectGlobals: true,
  setupFilesAfterEnv: ['<rootDir>/test/unit/setup.ts'],
  testTimeout: 10000,
  verbose: true,
  collectCoverage: false,
};
