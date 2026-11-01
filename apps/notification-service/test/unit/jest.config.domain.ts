/**
 * Jest Config — Domain Unit Tests
 * @module notification-service/test
 */
import type { Config } from '@jest/types';

// Resolve workspace packages to their SOURCE (not dist) so ts-jest can transform
const WORKSPACE_SRC = '<rootDir>/../../packages';

const config: Config.InitialOptions = {
  displayName: 'domain-unit',
  rootDir: '../..',
  testEnvironment: 'node',
  preset: 'ts-jest',
  testMatch: [
    '<rootDir>/test/unit/domain/**/*.spec.ts',
    '<rootDir>/test/unit/domain/**/*.test.ts',
  ],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.json',
        isolatedModules: true,
      },
    ],
  },
  moduleNameMapper: {
    // ═══ Workspace packages → SOURCE (must be FIRST) ═══
    '^@vubon/shared-kernel/(.*)\\.js$': `${WORKSPACE_SRC}/shared-kernel/src/$1`,
    '^@vubon/shared-kernel/(.*)$': `${WORKSPACE_SRC}/shared-kernel/src/$1`,
    '^@vubon/shared-constants/(.*)\\.js$': `${WORKSPACE_SRC}/shared-constants/src/$1`,
    '^@vubon/shared-constants/(.*)$': `${WORKSPACE_SRC}/shared-constants/src/$1`,
    '^@vubon/shared-types/(.*)\\.js$': `${WORKSPACE_SRC}/shared-types/src/$1`,
    '^@vubon/shared-types/(.*)$': `${WORKSPACE_SRC}/shared-types/src/$1`,
    '^@vubon/shared-utils/(.*)\\.js$': `${WORKSPACE_SRC}/shared-utils/src/$1`,
    '^@vubon/shared-utils/(.*)$': `${WORKSPACE_SRC}/shared-utils/src/$1`,
    '^@vubon/shared-config/(.*)\\.js$': `${WORKSPACE_SRC}/shared-config/src/$1`,
    '^@vubon/shared-config/(.*)$': `${WORKSPACE_SRC}/shared-config/src/$1`,
    '^@vubon/shared-api/(.*)\\.js$': `${WORKSPACE_SRC}/shared-api/src/$1`,
    '^@vubon/shared-api/(.*)$': `${WORKSPACE_SRC}/shared-api/src/$1`,
    '^@vubon/shared-schemas/(.*)\\.js$': `${WORKSPACE_SRC}/shared-schemas/src/$1`,
    '^@vubon/shared-schemas/(.*)$': `${WORKSPACE_SRC}/shared-schemas/src/$1`,

    // ═══ Domain sub-aliases ═══
    '^@domain/primitives/(.*)\\.js$': '<rootDir>/src/module/domain/value-objects/primitives/$1',
    '^@domain/primitives/(.*)$': '<rootDir>/src/module/domain/value-objects/primitives/$1',
    '^@domain/composites/(.*)\\.js$': '<rootDir>/src/module/domain/value-objects/composites/$1',
    '^@domain/composites/(.*)$': '<rootDir>/src/module/domain/value-objects/composites/$1',
    '^@domain/errors/(.*)\\.js$': '<rootDir>/src/module/domain/errors/$1',
    '^@domain/errors/(.*)$': '<rootDir>/src/module/domain/errors/$1',
    '^@domain/events/(.*)\\.js$': '<rootDir>/src/module/domain/events/$1',
    '^@domain/events/(.*)$': '<rootDir>/src/module/domain/events/$1',
    '^@domain/entities/(.*)\\.js$': '<rootDir>/src/module/domain/entities/$1',
    '^@domain/entities/(.*)$': '<rootDir>/src/module/domain/entities/$1',
    '^@domain/repositories/(.*)\\.js$': '<rootDir>/src/module/domain/repositories/$1',
    '^@domain/repositories/(.*)$': '<rootDir>/src/module/domain/repositories/$1',
    '^@domain/event-store/(.*)\\.js$': '<rootDir>/src/module/domain/event-store/$1',
    '^@domain/event-store/(.*)$': '<rootDir>/src/module/domain/event-store/$1',
    '^@domain/services/(.*)\\.js$': '<rootDir>/src/module/domain/services/$1',
    '^@domain/services/(.*)$': '<rootDir>/src/module/domain/services/$1',
    '^@domain/specifications/(.*)\\.js$': '<rootDir>/src/module/domain/specifications/$1',
    '^@domain/specifications/(.*)$': '<rootDir>/src/module/domain/specifications/$1',
    '^@domain/(.*)\\.js$': '<rootDir>/src/module/domain/$1',
    '^@domain/(.*)$': '<rootDir>/src/module/domain/$1',
    '^@domain$': '<rootDir>/src/module/domain/index.ts',

    // ═══ Other layers ═══
    '^@application/(.*)\\.js$': '<rootDir>/src/module/application/$1',
    '^@application/(.*)$': '<rootDir>/src/module/application/$1',
    '^@infrastructure/(.*)\\.js$': '<rootDir>/src/module/infrastructure/$1',
    '^@infrastructure/(.*)$': '<rootDir>/src/module/infrastructure/$1',
    '^@interfaces/(.*)\\.js$': '<rootDir>/src/module/interfaces/$1',
    '^@interfaces/(.*)$': '<rootDir>/src/module/interfaces/$1',
    '^@modules/(.*)\\.js$': '<rootDir>/src/module/modules/$1',
    '^@modules/(.*)$': '<rootDir>/src/module/modules/$1',
    '^@/(.*)\\.js$': '<rootDir>/src/$1',
    '^@/(.*)$': '<rootDir>/src/$1',

    // ═══ Fixtures ═══
    '^@fixtures/(.*)\\.js$': '<rootDir>/test/fixtures/$1',
    '^@fixtures/(.*)$': '<rootDir>/test/fixtures/$1',
    '^@domain-fixtures/(.*)\\.js$': '<rootDir>/test/fixtures/domain/$1',
    '^@domain-fixtures/(.*)$': '<rootDir>/test/fixtures/domain/$1',

    // ═══ Relative paths ═══
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  setupFiles: ['<rootDir>/test/setup.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/unit/setup.ts'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/module/domain/**/*.ts',
    '!src/module/domain/**/index.ts',
    '!src/module/domain/**/*.d.ts',
    // Pure declarations — errors/events are data-only, no business logic
    '!src/module/domain/errors/**',
    '!src/module/domain/events/**',
  ],
  coverageDirectory: '<rootDir>/coverage/domain-unit',
  coverageReporters: ['text', 'text-summary', 'lcov', 'html', 'json-summary'],
  coverageThreshold: {
    global: {
      branches: 80,
      statements: 90,
      functions: 90,
      lines: 90,
    },
  },
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
