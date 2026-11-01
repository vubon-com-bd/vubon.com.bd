/**
 * Jest configuration — Infrastructure layer only
 * @module notification-service/test/unit
 *
 * Coverage target: 90% statements, 80% branches, 90% functions, 90% lines.
 * Per payment-service target spec.
 */
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  displayName: 'unit:infrastructure',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../..',
  testMatch: ['<rootDir>/test/unit/infrastructure/**/*.spec.ts'],
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  collectCoverageFrom: [
    'src/module/infrastructure/**/*.(t|j)s',
    // ─── Barrels ─────
    '!src/module/infrastructure/**/index.ts',
    // ─── Type-only files ─────
    '!src/module/infrastructure/**/*.interface.ts',
    '!src/module/infrastructure/**/*.types.ts',
    // ─── NestJS module wiring ─────
    '!src/module/infrastructure/**/*.module.ts',
    '!src/module/infrastructure/modules/**',
    // ─── Config files (smoke-tested separately) ─────
    '!src/module/infrastructure/**/*.config.ts',
    '!src/module/infrastructure/config/**',
    // ─── Prisma lifecycle (Termux engine-dependent) ─────
    '!src/module/infrastructure/persistence/prisma/prisma.client.ts',
    '!src/module/infrastructure/persistence/prisma/prisma.service.ts',
    '!src/module/infrastructure/persistence/prisma/base.prisma.repository.ts',
    // ─── Queue wrappers (thin BullMQ façade) ─────
    '!src/module/infrastructure/queues/**',
    // ─── Provider abstract base (extends IProvider) ─────
    '!src/module/infrastructure/providers/base/provider.abstract.ts',
    '!src/module/infrastructure/providers/base/provider.interface.ts',
    '!src/module/infrastructure/providers/base/provider.types.ts',
  ],
  coverageDirectory: '<rootDir>/coverage/unit-infrastructure',
  coverageReporters: ['text', 'text-summary', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 89,
      lines: 90,
      statements: 90,
    },
  },
  testEnvironment: 'node',
  moduleNameMapper: {
    // ─── Domain ─────────────────
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
    '^@domain/services/(.*)\\.js$': '<rootDir>/src/module/domain/services/$1',
    '^@domain/services/(.*)$': '<rootDir>/src/module/domain/services/$1',
    '^@domain/(.*)\\.js$': '<rootDir>/src/module/domain/$1',
    '^@domain/(.*)$': '<rootDir>/src/module/domain/$1',
    // ─── Application ────────────
    '^@application/(.*)\\.js$': '<rootDir>/src/module/application/$1',
    '^@application/(.*)$': '<rootDir>/src/module/application/$1',
    // ─── Infrastructure ─────────
    '^@infrastructure/persistence/prisma/(.*)\\.js$': '<rootDir>/src/module/infrastructure/persistence/prisma/$1',
    '^@infrastructure/persistence/prisma/(.*)$': '<rootDir>/src/module/infrastructure/persistence/prisma/$1',
    '^@infrastructure/persistence/cache/(.*)\\.js$': '<rootDir>/src/module/infrastructure/persistence/cache/$1',
    '^@infrastructure/persistence/cache/(.*)$': '<rootDir>/src/module/infrastructure/persistence/cache/$1',
    '^@infrastructure/queues/(.*)\\.js$': '<rootDir>/src/module/infrastructure/queues/$1',
    '^@infrastructure/queues/(.*)$': '<rootDir>/src/module/infrastructure/queues/$1',
    '^@infrastructure/workers/(.*)\\.js$': '<rootDir>/src/module/infrastructure/workers/$1',
    '^@infrastructure/workers/(.*)$': '<rootDir>/src/module/infrastructure/workers/$1',
    '^@infrastructure/providers/(.*)\\.js$': '<rootDir>/src/module/infrastructure/providers/$1',
    '^@infrastructure/providers/(.*)$': '<rootDir>/src/module/infrastructure/providers/$1',
    '^@infrastructure/template-engine/(.*)\\.js$': '<rootDir>/src/module/infrastructure/template-engine/$1',
    '^@infrastructure/template-engine/(.*)$': '<rootDir>/src/module/infrastructure/template-engine/$1',
    '^@infrastructure/services/internal/(.*)\\.js$': '<rootDir>/src/module/infrastructure/services/internal/$1',
    '^@infrastructure/services/internal/(.*)$': '<rootDir>/src/module/infrastructure/services/internal/$1',
    '^@infrastructure/services/external/(.*)\\.js$': '<rootDir>/src/module/infrastructure/services/external/$1',
    '^@infrastructure/services/external/(.*)$': '<rootDir>/src/module/infrastructure/services/external/$1',
    '^@infrastructure/services/(.*)\\.js$': '<rootDir>/src/module/infrastructure/services/$1',
    '^@infrastructure/services/(.*)$': '<rootDir>/src/module/infrastructure/services/$1',
    '^@infrastructure/config/(.*)\\.js$': '<rootDir>/src/module/infrastructure/config/$1',
    '^@infrastructure/config/(.*)$': '<rootDir>/src/module/infrastructure/config/$1',
    '^@infrastructure/(.*)\\.js$': '<rootDir>/src/module/infrastructure/$1',
    '^@infrastructure/(.*)$': '<rootDir>/src/module/infrastructure/$1',
    // ─── Root ───────────────────
    '^@/(.*)\\.js$': '<rootDir>/src/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
    // ─── Fixtures ───────────────
    '^@fixtures/(.*)\\.js$': '<rootDir>/test/fixtures/$1',
    '^@fixtures/(.*)$': '<rootDir>/test/fixtures/$1',
    '^@test-infra/(.*)\\.js$': '<rootDir>/test/fixtures/infrastructure/$1',
    '^@test-infra/(.*)$': '<rootDir>/test/fixtures/infrastructure/$1',
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  setupFiles: ['<rootDir>/test/setup.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/setup-infra.ts'],
  extensionsToTreatAsEsm: ['.ts'],
  testTimeout: 10000,
  transformIgnorePatterns: [
    'node_modules/(?!(@nestjs|@vubon|@prisma|uuid|nanoid|chalk|ora|cli-cursor|cli-spinners|log-symbols|strip-ansi|ansi-regex|is-interactive|is-unicode-supported|wcwidth|defaults|clone|mute-stream|stdin-discarder|bl|string-width|emoji-regex|strip-ansi|wrap-ansi|restore-cursor|signal-exit|onetime|mimic-fn|is-stream|execa|get-stream|human-signals|npm-run-path|path-key|shebang-command|shebang-regex|which|merge-stream|is-stream|strip-final-newline|onetime|signal-exit|figures|is-unicode-supported)/)',
  ],
  verbose: false,
};

export default config;
