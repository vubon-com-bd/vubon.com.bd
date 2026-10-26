/**
 * Root Jest config — imports sub-configs
 * @module notification-service/test
 *
 * Run:
 *  - Domain only:      jest --config test/unit/jest.config.domain.ts
 *  - Application only: jest --config test/unit/jest.config.application.ts
 *  - Both:             jest --config test/unit/jest.config.ts
 */
import type { Config } from 'jest';
import domainConfig from './jest.config.domain.js';
import applicationConfig from './jest.config.application.js';

const config: Config = {
  displayName: 'all-unit',
  rootDir: '../..',
  testEnvironment: 'node',
  preset: 'ts-jest',
  testMatch: [
    '<rootDir>/test/unit/domain/**/*.spec.ts',
    '<rootDir>/test/unit/domain/**/*.test.ts',
    '<rootDir>/test/unit/application/**/*.spec.ts',
    '<rootDir>/test/unit/application/**/*.test.ts',
  ],
  transform: domainConfig.transform,
  moduleNameMapper: {
    ...domainConfig.moduleNameMapper,
    ...applicationConfig.moduleNameMapper,
  },
  setupFilesAfterEnv: ['<rootDir>/test/unit/setup.ts'],
  testTimeout: 15000,
  maxWorkers: '50%',
  clearMocks: true,
  restoreMocks: true,
  verbose: true,
};

export default config;
