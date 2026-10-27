/**
 * Root Jest config — imports sub-configs
 * @module notification-service/test
 *
 * Run:
 *  - Domain only:      jest --config test/unit/jest.config.domain.ts
 *  - Application only: jest --config test/unit/jest.config.application.ts
 *  - Both:             jest --config test/unit/jest.config.ts
 */
import type { Config } from '@jest/types';
import domainConfig from './jest.config.domain';
import applicationConfig from './jest.config.application';

const config: Config.InitialOptions = {
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
  setupFiles: ['<rootDir>/test/setup.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/unit/setup.ts'],
  testTimeout: 15000,
  transformIgnorePatterns: [
    'node_modules/(?!(@nestjs|@vubon|@prisma|uuid|nanoid|chalk|ora|cli-cursor|cli-spinners|log-symbols|strip-ansi|ansi-regex|is-interactive|is-unicode-supported|wcwidth|defaults|clone|mute-stream|stdin-discarder|bl|string-width|emoji-regex|strip-ansi|wrap-ansi|restore-cursor|signal-exit|onetime|mimic-fn|is-stream|execa|get-stream|human-signals|npm-run-path|path-key|shebang-command|shebang-regex|which|merge-stream|is-stream|strip-final-newline|onetime|signal-exit|figures|is-unicode-supported)/)',
  ],
  maxWorkers: '50%',
  clearMocks: true,
  restoreMocks: true,
  verbose: true,
};

export default config;
