// ═══════════════════════════════════════════════════════════════
// Jest Configuration — Cart Service
// ═══════════════════════════════════════════════════════════════

export default {
  displayName: 'cart-service',
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
  verbose: true,
  forceExit: true,
  maxWorkers: 1,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.module.ts',
    '!src/**/*.interface.ts',
    '!src/main.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'text-summary', 'lcov', 'html'],
};
