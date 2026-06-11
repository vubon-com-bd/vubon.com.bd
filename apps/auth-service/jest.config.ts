/**
 * Jest Configuration
 * 
 * @description
 * Unit test configuration for auth service.
 * 
 * Enterprise Rules:
 * ✅ Pure test configuration - No test implementations
 * ✅ Path aliases for clean imports
 * ✅ Coverage thresholds for quality gates
 * ✅ Global setup for test environment
 */

import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // Basic settings
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  testEnvironment: 'node',
  
  // Transformers
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  
  // Coverage settings
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/*.module.ts',
    '!**/*.interface.ts',
    '!**/*.d.ts',
    '!**/main.ts',
    '!**/index.ts',
  ],
  coverageDirectory: '../coverage',
  coverageReporters: ['text', 'html', 'lcov', 'json-summary'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  
  // Path aliases (must match tsconfig.json)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@domain/(.*)$': '<rootDir>/module/domain/$1',
    '^@application/(.*)$': '<rootDir>/module/application/$1',
    '^@infrastructure/(.*)$': '<rootDir>/module/infrastructure/$1',
    '^@interfaces/(.*)$': '<rootDir>/module/interfaces/$1',
    '^@modules/(.*)$': '<rootDir>/module/modules/$1',
    '^@config/(.*)$': '<rootDir>/config/$1',
    '^@common/(.*)$': '<rootDir>/common/$1',
    '^@test/(.*)$': '<rootDir>/../test/$1',
  },
  
  // Test setup
  setupFilesAfterEnv: ['<rootDir>/../test/jest.setup.ts'],
  globalSetup: '<rootDir>/../test/global-setup.ts',
  globalTeardown: '<rootDir>/../test/global-teardown.ts',
  
  // Timeout settings
  testTimeout: 30000, // 30 seconds for async tests
  slowTestThreshold: 5000, // 5 seconds warning threshold
  
  // Output settings
  verbose: true, // Detailed test output
  bail: false, // Don't bail on first failure
  notify: true, // Desktop notifications
  
  // Cache settings (for CI/CD performance)
  cache: true,
  cacheDirectory: '<rootDir>/../.jest-cache',
  
  // Parallel execution (memory management)
  maxWorkers: '50%', // Use 50% of CPU cores
  workerIdleMemoryLimit: '512MB', // Memory limit per worker
  
  // Error handling
  errorOnDeprecated: true, // Fail on deprecated APIs
  detectOpenHandles: true, // Detect open handles
  forceExit: false, // Don't force exit
  
  // Watch mode settings
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
    'jest-watch-select-projects',
  ],
  
  // Reporting
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '<rootDir>/../test-reports',
        outputName: 'junit.xml',
        classNameTemplate: '{classname}',
        titleTemplate: '{title}',
      },
    ],
    [
      'jest-html-reporter',
      {
        outputPath: '<rootDir>/../test-reports/test-report.html',
        pageTitle: 'Auth Service Test Report',
      },
    ],
  ],
  
  // Pass with no tests (for CI)
  passWithNoTests: true,
};

export default config;
