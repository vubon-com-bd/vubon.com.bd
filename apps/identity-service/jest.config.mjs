/**
 * Root Jest Config — Product Service
 * @type {import('jest').Config}
 *
 * This is the root jest config used for CI/test:all.
 * For unit or e2e specific runs, use:
 *   - test/unit/jest.config.ts
 *   - test/jest-e2e.json
 */
export default {
  displayName: 'product-service',
  testEnvironment: 'node',
  rootDir: '.',
  testMatch: [
    '<rootDir>/test/unit/**/*.spec.ts',
    '<rootDir>/test/e2e/**/*.e2e-spec.ts',
  ],
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
  setupFiles: ['<rootDir>/test/jest-env-setup.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/jest-after-env.ts'],
  globalSetup: '<rootDir>/test/jest-global-setup.ts',
  testTimeout: 30000,
  collectCoverage: false,
  verbose: true,
  forceExit: true,
  maxWorkers: 1,
};
