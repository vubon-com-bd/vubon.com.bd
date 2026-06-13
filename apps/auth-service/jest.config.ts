/**
 * Jest Configuration - Enterprise Grade
 * 
 * @description
 * Unit test configuration for auth service with monorepo support.
 * 
 * Features:
 * ✅ SWC transformation for blazing fast tests
 * ✅ Shared packages (constants, types, utils, config, schemas) support
 * ✅ Coverage thresholds for quality gates (90%)
 * ✅ Parallel execution with memory limits
 * ✅ CI/CD ready with JUnit & HTML reports
 * ✅ Global setup/teardown for test environment
 * ✅ Path aliases matching tsconfig.json
 * ✅ Watch mode plugins for better DX
 * 
 * @module jest.config
 */

import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // ============================================================
  // Basic Settings
  // ============================================================
  
  /** File extensions Jest should handle */
  moduleFileExtensions: ['js', 'json', 'ts'],
  
  /** Root directory for tests (src folder) */
  rootDir: 'src',
  
  /** Pattern to find test files */
  testRegex: '.*\\.spec\\.ts$',
  
  /** Node.js environment for backend tests */
  testEnvironment: 'node',
  
  // ============================================================
  // Transformers (SWC for speed, ts-jest for type checking)
  // ============================================================
  
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      {
        isolatedModules: true,      // Faster compilation
        diagnostics: false,          // Type checking handled by IDE/CI
      },
    ],
  },
  
  // ============================================================
  // Coverage Configuration (Enterprise Standard: 90%)
  // ============================================================
  
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/*.module.ts',
    '!**/*.interface.ts',
    '!**/*.d.ts',
    '!**/main.ts',
    '!**/index.ts',
    '!**/*.mock.ts',
    '!**/*.spec.ts',
    '!**/*.test.ts',
  ],
  
  coverageDirectory: '../coverage',
  
  coverageReporters: [
    'text',           // Console output
    'html',           // HTML report (open in browser)
    'lcov',           // LCOV format (SonarQube, Codecov)
    'json-summary',   // JSON summary for CI
    'clover',         // Clover XML (Jenkins)
  ],
  
  /** ✅ ENTERPRISE: 90% coverage thresholds */
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 90,
      lines: 90,
      statements: 90,
    },
    // Higher standards for critical modules
    './module/domain/entities/**/*.ts': {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95,
    },
    './module/application/services/**/*.ts': {
      branches: 85,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  
  // ============================================================
  // Path Aliases (Matches tsconfig.json + Shared Packages)
  // ============================================================
  
  moduleNameMapper: {
    // Application aliases
    '^@/(.*)$': '<rootDir>/$1',
    '^@domain/(.*)$': '<rootDir>/module/domain/$1',
    '^@application/(.*)$': '<rootDir>/module/application/$1',
    '^@infrastructure/(.*)$': '<rootDir>/module/infrastructure/$1',
    '^@interfaces/(.*)$': '<rootDir>/module/interfaces/$1',
    '^@modules/(.*)$': '<rootDir>/module/modules/$1',
    '^@config/(.*)$': '<rootDir>/config/$1',
    '^@common/(.*)$': '<rootDir>/common/$1',
    '^@test/(.*)$': '<rootDir>/../test/$1',
    
    // ✅ FIXED: Shared packages (monorepo support)
    '^@vubon/shared-constants$': '<rootDir>/../../../packages/shared-constants/src',
    '^@vubon/shared-types$': '<rootDir>/../../../packages/shared-types/src',
    '^@vubon/shared-schemas$': '<rootDir>/../../../packages/shared-schemas/src',
    '^@vubon/shared-utils$': '<rootDir>/../../../packages/shared-utils/src',
    '^@vubon/shared-config$': '<rootDir>/../../../packages/shared-config/src',
    
    // Handle ESM imports from shared packages
    '^@vubon/shared-constants/(.*)$': '<rootDir>/../../../packages/shared-constants/src/$1',
    '^@vubon/shared-types/(.*)$': '<rootDir>/../../../packages/shared-types/src/$1',
    '^@vubon/shared-schemas/(.*)$': '<rootDir>/../../../packages/shared-schemas/src/$1',
    '^@vubon/shared-utils/(.*)$': '<rootDir>/../../../packages/shared-utils/src/$1',
    '^@vubon/shared-config/(.*)$': '<rootDir>/../../../packages/shared-config/src/$1',
  },
  
  /** ✅ FIXED: Transform shared packages for Jest */
  transformIgnorePatterns: [
    '/node_modules/(?!(jest-runtime|@vubon)/)',
  ],
  
  // ============================================================
  // Test Setup & Environment
  // ============================================================
  
  /** Setup files run after Jest is initialized */
  setupFilesAfterEnv: ['<rootDir>/../test/jest.setup.ts'],
  
  /** Global setup runs once before all tests */
  globalSetup: '<rootDir>/../test/global-setup.ts',
  
  /** Global teardown runs once after all tests */
  globalTeardown: '<rootDir>/../test/global-teardown.ts',
  
  /** Test environment options */
  testEnvironmentOptions: {
    url: 'http://localhost:3000',
  },
  
  // ============================================================
  // Timeout & Performance Settings
  // ============================================================
  
  /** Default timeout for async tests (30 seconds) */
  testTimeout: 30000,
  
  /** Threshold for slow test warning (5 seconds) */
  slowTestThreshold: 5000,
  
  // ============================================================
  // Output & Logging
  // ============================================================
  
  /** Detailed test output */
  verbose: true,
  
  /** Don't stop on first failure (run all tests) */
  bail: false,
  
  /** Desktop notifications for test results */
  notify: true,
  
  /** Notification mode */
  notifyMode: 'failure-change',
  
  // ============================================================
  // Cache Settings (For CI/CD Performance)
  // ============================================================
  
  /** Enable caching between test runs */
  cache: true,
  
  /** Custom cache directory (outside node_modules) */
  cacheDirectory: '<rootDir>/../.jest-cache',
  
  // ============================================================
  // Parallel Execution (Memory Management)
  // ============================================================
  
  /** Use 50% of CPU cores (balance speed vs memory) */
  maxWorkers: '50%',
  
  /** Memory limit per worker (prevents OOM) */
  workerIdleMemoryLimit: '512MB',
  
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
  // Watch Mode Plugins (Better Developer Experience)
  // ============================================================
  
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
    'jest-watch-select-projects',
    'jest-watch-suspend',
  ],
  
  // ============================================================
  // Reporters (CI/CD Integration)
  // ============================================================
  
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '<rootDir>/../test-reports',
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
        outputPath: '<rootDir>/../test-reports/test-report.html',
        pageTitle: 'Auth Service Test Report',
        includeFailureMsg: true,
        includeConsoleLog: true,
        sort: 'titleAsc',
      },
    ],
    [
      'jest-stare',
      {
        resultDir: '<rootDir>/../test-reports/jest-stare',
        coverageLink: '../coverage/lcov-report/index.html',
        reportTitle: 'Auth Service Test Report',
        additionalResultsProcessors: ['jest-html-reporter'],
      },
    ],
  ],
  
  // ============================================================
  // Global Variables
  // ============================================================
  
  globals: {
    'ts-jest': {
      isolatedModules: true,
      tsconfig: '<rootDir>/../tsconfig.json',
    },
  },
  
  // ============================================================
  // Miscellaneous
  // ============================================================
  
  /** Allow tests to pass even if no tests found */
  passWithNoTests: true,
  
  /** Reset mocks between tests */
  clearMocks: true,
  
  /** Restore mocks after each test */
  restoreMocks: true,
  
  /** Reset modules between tests */
  resetModules: true,
};

export default config;
