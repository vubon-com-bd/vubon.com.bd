/**
 * Jest E2E Configuration - Enterprise Grade
 * 
 * @description
 * End-to-end test configuration for auth service with monorepo support.
 * Optimized for NestJS e2e tests with shared packages integration.
 * 
 * Enterprise Features:
 * ✅ Extended timeouts for API tests (60 seconds)
 * ✅ Shared packages (constants, types, utils, config, schemas) support
 * ✅ Coverage collection for integration tests (optional, can be disabled)
 * ✅ JUnit reports for CI/CD integration
 * ✅ HTML reports for visual test results
 * ✅ Race condition prevention with limited workers (2)
 * ✅ Global setup/teardown for test environment
 * ✅ Path aliases matching tsconfig.json
 * ✅ Memory limit per worker (1GB) for heavy operations
 * ✅ Slow test detection (10 seconds warning)
 */

import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // ============================================================
  // Basic Settings
  // ============================================================

  /** File extensions Jest should handle */
  moduleFileExtensions: ['js', 'json', 'ts'],
  
  /** Root directory for test discovery */
  rootDir: '.',
  
  /** Node.js environment for backend tests */
  testEnvironment: 'node',
  
  /** Pattern to find e2e test files */
  testRegex: '.e2e-spec.ts$',
  
  // ============================================================
  // Transformers
  // ============================================================

  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  
  // ============================================================
  // Timeout Settings (E2E tests take longer)
  // ============================================================

  /** Default timeout for async tests (60 seconds) */
  testTimeout: 60000,
  
  /** Threshold for slow test warning (10 seconds) */
  slowTestThreshold: 10000,
  
  // ============================================================
  // Coverage Configuration (Optional for E2E)
  // ============================================================

  /** ✅ Enterprise: Enable coverage for integration tests */
  collectCoverage: true,
  
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.module.ts',
    '!src/**/*.interface.ts',
    '!src/**/*.d.ts',
    '!src/main.ts',
    '!src/**/index.ts',
  ],
  
  /** Separate coverage directory for e2e (avoid conflicts) */
  coverageDirectory: './coverage-e2e',
  
  /** Multiple report formats for different tools */
  coverageReporters: ['text', 'html', 'lcov', 'json-summary'],
  
  // ============================================================
  // Path Aliases (Must match tsconfig.json + Shared Packages)
  // ============================================================

  moduleNameMapper: {
    // Application aliases
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@domain/(.*)$': '<rootDir>/src/module/domain/$1',
    '^@application/(.*)$': '<rootDir>/src/module/application/$1',
    '^@infrastructure/(.*)$': '<rootDir>/src/module/infrastructure/$1',
    '^@interfaces/(.*)$': '<rootDir>/src/module/interfaces/$1',
    '^@modules/(.*)$': '<rootDir>/src/module/modules/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@common/(.*)$': '<rootDir>/src/common/$1',
    '^@test/(.*)$': '<rootDir>/test/$1',

    // ✅ FIXED: Shared packages (monorepo support)
    '^@vubon/shared-constants$': '<rootDir>/../../packages/shared-constants/src',
    '^@vubon/shared-types$': '<rootDir>/../../packages/shared-types/src',
    '^@vubon/shared-schemas$': '<rootDir>/../../packages/shared-schemas/src',
    '^@vubon/shared-utils$': '<rootDir>/../../packages/shared-utils/src',
    '^@vubon/shared-config$': '<rootDir>/../../packages/shared-config/src',

    // Handle sub-path imports from shared packages
    '^@vubon/shared-constants/(.*)$': '<rootDir>/../../packages/shared-constants/src/$1',
    '^@vubon/shared-types/(.*)$': '<rootDir>/../../packages/shared-types/src/$1',
    '^@vubon/shared-schemas/(.*)$': '<rootDir>/../../packages/shared-schemas/src/$1',
    '^@vubon/shared-utils/(.*)$': '<rootDir>/../../packages/shared-utils/src/$1',
    '^@vubon/shared-config/(.*)$': '<rootDir>/../../packages/shared-config/src/$1',
  },

  // ✅ FIXED: Transform shared packages for Jest
  transformIgnorePatterns: [
    '/node_modules/(?!(jest-runtime|@vubon)/)',
  ],
  
  // ============================================================
  // Test Setup & Environment
  // ============================================================

  /** Setup files run after Jest is initialized */
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
  
  /** Global setup runs once before all e2e tests (e.g., start test DB) */
  globalSetup: '<rootDir>/test/e2e-setup.ts',
  
  /** Global teardown runs once after all e2e tests (e.g., stop test DB) */
  globalTeardown: '<rootDir>/test/e2e-teardown.ts',
  
  // ============================================================
  // Output & Logging
  // ============================================================

  /** Detailed test output for debugging */
  verbose: true,
  
  /** Don't stop on first failure (run all tests) */
  bail: false,
  
  // ============================================================
  // Parallel Execution (Limit for E2E to avoid race conditions)
  // ============================================================

  /** Use only 2 workers to prevent database/API race conditions */
  maxWorkers: 2,
  
  /** Memory limit per worker (1GB for heavy E2E operations) */
  workerIdleMemoryLimit: '1GB',
  
  // ============================================================
  // Cache Settings (For CI/CD Performance)
  // ============================================================

  /** Enable caching between test runs */
  cache: true,
  
  /** Separate cache directory from unit tests */
  cacheDirectory: '<rootDir>/.jest-cache-e2e',
  
  // ============================================================
  // Reporting (CI/CD Integration)
  // ============================================================

  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '<rootDir>/test-reports/e2e',
        outputName: 'junit.xml',
        classNameTemplate: '{classname}',
        titleTemplate: '{title}',
        ancestorSeparator: ' › ',
        usePathForSuiteName: 'true',
      },
    ],
    [
      'jest-html-reporter',
      {
        outputPath: '<rootDir>/test-reports/e2e/test-report.html',
        pageTitle: 'Auth Service E2E Test Report',
        includeFailureMsg: true,
        includeConsoleLog: true,
        sort: 'titleAsc',
      },
    ],
  ],
  
  // ============================================================
  // Error Handling
  // ============================================================

  /** Fail on deprecated API usage */
  errorOnDeprecated: true,
  
  /** Detect open handles (e.g., database connections) */
  detectOpenHandles: true,
  
  /** Don't force exit (let tests clean up) */
  forceExit: false,
  
  // ============================================================
  // Miscellaneous
  // ============================================================

  /** Allow tests to pass even if no tests found */
  passWithNoTests: true,
  
  /** Test environment variables */
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
};

export default config;
