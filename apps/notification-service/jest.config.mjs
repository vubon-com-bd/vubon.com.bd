/**
 * Notification Service — Root Jest config
 * @module notification-service
 *
 * Used by: `pnpm test` (from root of service)
 * Runs: all unit + e2e tests
 */
export default {
  displayName: 'notification-service',
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
  testTimeout: 30000,
  verbose: true,
  forceExit: true,
  maxWorkers: 1,
  passWithNoTests: true,
};
