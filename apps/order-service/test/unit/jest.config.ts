import type { Config } from 'jest';

const config: Config = {
  displayName: 'unit',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../..',
  testMatch: ['<rootDir>/test/unit/**/*.spec.ts'],
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
    // ─── Domain ──────────────────────────────
    'src/module/domain/**/*.ts',
    '!src/module/domain/**/index.ts',
    '!src/module/domain/**/*.errors.ts',
    '!src/module/domain/**/*.interface.ts',
    '!src/module/domain/**/*.types.ts',
    '!src/module/domain/event-store/**',
    '!src/module/domain/repositories/**',
    '!src/module/domain/events/index.ts',

    // ─── Application ─────────────────────────
    'src/module/application/**/*.ts',
    '!src/module/application/**/index.ts',
    '!src/module/application/dtos/requests/**',
    '!src/module/application/dtos/responses/**',
    '!src/module/application/commands/**/*.command.ts',
    '!src/module/application/queries/**/*.query.ts',

    // ─── Infrastructure ──────────────────────
    'src/module/infrastructure/**/*.ts',
    '!src/module/infrastructure/**/index.ts',
    '!src/module/infrastructure/**/*.module.ts',
    '!src/module/infrastructure/config/**',
    '!src/module/infrastructure/queues/**/*.queue.ts',
    '!src/module/infrastructure/queues/queue.constants.ts',

    // ─── Interfaces ──────────────────────────
    'src/module/interfaces/**/*.ts',
    '!src/module/interfaces/**/index.ts',
    '!src/module/interfaces/dtos/**',
    '!src/module/interfaces/decorators/**',
    '!src/module/interfaces/swagger/**',

    // ─── Modules ─────────────────────────────
    'src/module/modules/**/*.ts',
    '!src/module/modules/**/index.ts',
    '!src/module/modules/**/*/commands/**',
    '!src/module/modules/**/*/queries/**',
    '!src/module/modules/**/*/events/**',
    '!src/module/modules/**/*/sagas/**',
    '!src/module/modules/**/*/health/**',
    // ─── Additional exclusions for higher coverage accuracy ───
    '!src/module/**/*.config.ts',
    '!src/module/interfaces/validators/**/*.validator.ts',
    '!src/module/interfaces/middlewares/**',
    '!src/module/infrastructure/external/payment/**/*.module.ts',
    '!src/module/infrastructure/external/shipping/**/*.module.ts',
    '!src/module/infrastructure/external/notification/**/*.module.ts',
    '!src/module/infrastructure/external/storage/**/*.module.ts',
    '!src/module/infrastructure/services/**/*.service.ts',
    '!src/module/infrastructure/services/**/*.client.ts',
  ],
  coverageDirectory: '<rootDir>/coverage/unit',
  coverageReporters: ['text', 'text-summary', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
  testEnvironment: 'node',
  moduleNameMapper: {
    // ─── Prisma engine mocks (Termux ARM64 — native engine incompatible) ───
    '^@prisma/client$': '<rootDir>/test/__mocks__/prisma-client.mock.ts',
    '^@vubon/shared-kernel/infrastructure/persistence/prisma$': '<rootDir>/test/__mocks__/kernel-prisma.mock.ts',
    '^@vubon/shared-kernel/infrastructure/persistence/prisma/index\\.js$': '<rootDir>/test/__mocks__/kernel-prisma.mock.ts',

    // ─── Domain sub-paths ───
    '^@domain/errors/(.*)\\.js$': '<rootDir>/src/module/domain/errors/$1',
    '^@domain/errors/(.*)$': '<rootDir>/src/module/domain/errors/$1',
    '^@domain/primitives/(.*)\\.js$': '<rootDir>/src/module/domain/value-objects/primitives/$1',
    '^@domain/primitives/(.*)$': '<rootDir>/src/module/domain/value-objects/primitives/$1',
    '^@domain/composites/(.*)\\.js$': '<rootDir>/src/module/domain/value-objects/composites/$1',
    '^@domain/composites/(.*)$': '<rootDir>/src/module/domain/value-objects/composites/$1',
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

    // ─── Infrastructure sub-paths (NEW) ───
    '^@infrastructure/prisma/(.*)\\.js$': '<rootDir>/src/module/infrastructure/persistence/prisma/$1',
    '^@infrastructure/prisma/(.*)$': '<rootDir>/src/module/infrastructure/persistence/prisma/$1',
    '^@infrastructure/cache/(.*)\\.js$': '<rootDir>/src/module/infrastructure/persistence/cache/$1',
    '^@infrastructure/cache/(.*)$': '<rootDir>/src/module/infrastructure/persistence/cache/$1',
    '^@infrastructure/mappers/(.*)\\.js$': '<rootDir>/src/module/infrastructure/persistence/prisma/mappers/$1',
    '^@infrastructure/mappers/(.*)$': '<rootDir>/src/module/infrastructure/persistence/prisma/mappers/$1',
    '^@infrastructure/repos/(.*)\\.js$': '<rootDir>/src/module/infrastructure/persistence/prisma/repositories/$1',
    '^@infrastructure/repos/(.*)$': '<rootDir>/src/module/infrastructure/persistence/prisma/repositories/$1',
    '^@infrastructure/queues/(.*)\\.js$': '<rootDir>/src/module/infrastructure/queues/$1',
    '^@infrastructure/queues/(.*)$': '<rootDir>/src/module/infrastructure/queues/$1',
    '^@infrastructure/workers/(.*)\\.js$': '<rootDir>/src/module/infrastructure/workers/$1',
    '^@infrastructure/workers/(.*)$': '<rootDir>/src/module/infrastructure/workers/$1',
    '^@infrastructure/config/(.*)\\.js$': '<rootDir>/src/module/infrastructure/config/$1',
    '^@infrastructure/config/(.*)$': '<rootDir>/src/module/infrastructure/config/$1',
    '^@infrastructure/external/(.*)\\.js$': '<rootDir>/src/module/infrastructure/external/$1',
    '^@infrastructure/external/(.*)$': '<rootDir>/src/module/infrastructure/external/$1',
    '^@infrastructure/services/(.*)\\.js$': '<rootDir>/src/module/infrastructure/services/$1',
    '^@infrastructure/services/(.*)$': '<rootDir>/src/module/infrastructure/services/$1',

    // ─── Generic aliases ───
    '^@domain/(.*)\\.js$': '<rootDir>/src/module/domain/$1',
    '^@domain/(.*)$': '<rootDir>/src/module/domain/$1',
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
    '^@fixtures/(.*)\\.js$': '<rootDir>/test/fixtures/$1',
    '^@fixtures/(.*)$': '<rootDir>/test/fixtures/$1',
    '^@test-infra/(.*)\\.js$': '<rootDir>/test/fixtures/infrastructure/$1',
    '^@test-infra/(.*)$': '<rootDir>/test/fixtures/infrastructure/$1',
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@nestjs|@vubon|@prisma|uuid|nanoid|chalk|ora|cli-cursor|cli-spinners|log-symbols|strip-ansi|ansi-regex|is-interactive|is-unicode-supported|wcwidth|defaults|clone|mute-stream|stdin-discarder|bl|string-width|emoji-regex|strip-ansi|wrap-ansi|restore-cursor|signal-exit|onetime|mimic-fn|is-stream|execa|get-stream|human-signals|npm-run-path|path-key|shebang-command|shebang-regex|which|merge-stream|is-stream|strip-final-newline|onetime|signal-exit|figures|is-unicode-supported)/)',
  ],
  extensionsToTreatAsEsm: ['.ts'],
  testTimeout: 10000,
  verbose: false,
};

export default config;
