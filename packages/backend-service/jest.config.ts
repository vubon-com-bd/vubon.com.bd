import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.spec.ts'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^@vubon/shared-constants$': '<rootDir>/../shared-constants/src/index.ts',
    '^@vubon/shared-types$': '<rootDir>/../shared-types/src/index.ts',
    '^@vubon/shared-schemas$': '<rootDir>/../shared-schemas/src/index.ts',
    '^@vubon/shared-utils$': '<rootDir>/../shared-utils/src/index.ts',
    '^@vubon/shared-config$': '<rootDir>/../shared-config/src/env/env.validation.ts',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts', '!src/**/index.ts', '!src/main.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  testTimeout: 30000,
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
};

export default config;
