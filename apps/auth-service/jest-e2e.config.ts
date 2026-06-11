/**
 * Jest E2E Configuration
 * 
 * @description
 * End-to-end test configuration for auth service.
 * 
 * Enterprise Rules:
 * ✅ Pure test configuration - No test implementations
 * ✅ Longer timeouts for API tests
 * ✅ Coverage collection for integration tests
 * ✅ JUnit reports for CI/CD
 */

import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // Basic settings
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  
  // Transformers
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  
  // Timeout (E2E tests take longer)
  testTimeout: 60000, // 60 seconds
  slowTestThreshold: 10000, // Warn if > 10 seconds
  
  // Coverage settings
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.module.ts',
    '!src/**/*.interface.ts',
    '!src/**/*.d.ts',
    '!src/main.ts',
    '!src/**/index.ts',
  ],
  coverageDirectory: './coverage-e2e',
  coverageReporters: ['text', 'html', 'lcov', 'json-summary'],
  
  // Path aliases (must match tsconfig.json)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@domain/(.*)$': '<rootDir>/src/module/domain/$1',
    '^@application/(.*)$': '<rootDir>/src/module/application/$1',
    '^@infrastructure/(.*)$': '<rootDir>/src/module/infrastructure/$1',
    '^@interfaces/(.*)$': '<rootDir>/src/module/interfaces/$1',
    '^@modules/(.*)$': '<rootDir>/src/module/modules/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@common/(.*)$': '<rootDir>/src/common/$1',
    '^@test/(.*)$': '<rootDir>/test/$1',
  },
  
  // Test setup
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
  globalSetup: '<rootDir>/test/e2e-setup.ts',
  globalTeardown: '<rootDir>/test/e2e-teardown.ts',
  
  // Output settings
  verbose: true,
  bail: false, // Don't bail on first failure for E2E
  
  // Parallel execution (limit for E2E to avoid race conditions)
  maxWorkers: 2,
  workerIdleMemoryLimit: '1GB',
  
  // Cache settings
  cache: true,
  cacheDirectory: '<rootDir>/.jest-cache-e2e',
  
  // Reporting
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
      },
    ],
    [
      'jest-html-reporter',
      {
        outputPath: '<rootDir>/test-reports/e2e/test-report.html',
        pageTitle: 'Auth Service E2E Test Report',
        includeFailureMsg: true,
        includeConsoleLog: true,
      },
    ],
  ],
  
  // Error handling
  errorOnDeprecated: true,
  detectOpenHandles: true,
  forceExit: false,
  
  // Pass with no tests
  passWithNoTests: true,
  
  // Test environment variables
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
};

export default config;
