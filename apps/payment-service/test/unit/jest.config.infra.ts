/**
 * Jest configuration — Infrastructure layer only
 * @module payment-service/test/unit
 *
 * Dedicated config for infrastructure tests (repositories, gateways, services, workers).
 * Coverage target: 90% statements, 80% branches, 90% functions, 90% lines.
 */
import type { Config } from 'jest';

const config: Config = {
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
    // ─── Barrels (pure re-exports) ─────
    '!src/module/infrastructure/**/index.ts',
    // ─── Type-only files ─────────────
    '!src/module/infrastructure/**/*.interface.ts',
    '!src/module/infrastructure/**/*.types.ts',
    // ─── NestJS module wiring (no runtime logic) ─────
    '!src/module/infrastructure/**/*.module.ts',
    '!src/module/infrastructure/infrastructure.module.ts',
    '!src/module/infrastructure/queues-workers.module.ts',
    // ─── Config files (separately smoke-tested) ─────
    '!src/module/infrastructure/**/*.config.ts',
    // ─── Prisma lifecycle (engine-dependent on Termux) ─────
    '!src/module/infrastructure/persistence/prisma/prisma.client.ts',
    '!src/module/infrastructure/persistence/prisma/prisma.service.ts',
    // ─── Queue wrappers (thin BullMQ enqueue façade) ─────
    '!src/module/infrastructure/queues/**',
    // ─── Email HTML templates (indirect renderers) ─────
    '!src/module/infrastructure/external/email/templates/**',
    '!src/module/infrastructure/external/email/email.module.ts',
    // ─── External module wiring ─────
    '!src/module/infrastructure/external/sms/sms.module.ts',
    '!src/module/infrastructure/external/push/push.module.ts',
    '!src/module/infrastructure/external/external.module.ts',
  ],
  coverageDirectory: '<rootDir>/coverage/unit-infrastructure',
  coverageReporters: ['text', 'text-summary', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  testEnvironment: 'node',
  moduleNameMapper: {
    // ─── Domain ─────────────────────
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
    // ─── Application ────────────────
    '^@application/errors/(.*)\\.js$': '<rootDir>/src/module/application/errors/$1',
    '^@application/errors/(.*)$': '<rootDir>/src/module/application/errors/$1',
    '^@application/dtos/(.*)\\.js$': '<rootDir>/src/module/application/dtos/$1',
    '^@application/dtos/(.*)$': '<rootDir>/src/module/application/dtos/$1',
    '^@application/services/(.*)\\.js$': '<rootDir>/src/module/application/services/$1',
    '^@application/services/(.*)$': '<rootDir>/src/module/application/services/$1',
    '^@application/(.*)\\.js$': '<rootDir>/src/module/application/$1',
    '^@application/(.*)$': '<rootDir>/src/module/application/$1',
    // ─── Infrastructure ─────────────
    '^@infrastructure/persistence/prisma/(.*)\\.js$': '<rootDir>/src/module/infrastructure/persistence/prisma/$1',
    '^@infrastructure/persistence/prisma/(.*)$': '<rootDir>/src/module/infrastructure/persistence/prisma/$1',
    '^@infrastructure/persistence/cache/(.*)\\.js$': '<rootDir>/src/module/infrastructure/persistence/cache/$1',
    '^@infrastructure/persistence/cache/(.*)$': '<rootDir>/src/module/infrastructure/persistence/cache/$1',
    '^@infrastructure/persistence/(.*)\\.js$': '<rootDir>/src/module/infrastructure/persistence/$1',
    '^@infrastructure/persistence/(.*)$': '<rootDir>/src/module/infrastructure/persistence/$1',
    '^@infrastructure/repos/(.*)\\.js$': '<rootDir>/src/module/infrastructure/persistence/prisma/repositories/$1',
    '^@infrastructure/repos/(.*)$': '<rootDir>/src/module/infrastructure/persistence/prisma/repositories/$1',
    '^@infrastructure/mappers/(.*)\\.js$': '<rootDir>/src/module/infrastructure/persistence/prisma/mappers/$1',
    '^@infrastructure/mappers/(.*)$': '<rootDir>/src/module/infrastructure/persistence/prisma/mappers/$1',
    '^@infrastructure/cache/(.*)\\.js$': '<rootDir>/src/module/infrastructure/persistence/cache/$1',
    '^@infrastructure/cache/(.*)$': '<rootDir>/src/module/infrastructure/persistence/cache/$1',
    '^@infrastructure/gateways/(.*)\\.js$': '<rootDir>/src/module/infrastructure/gateways/$1',
    '^@infrastructure/gateways/(.*)$': '<rootDir>/src/module/infrastructure/gateways/$1',
    '^@infrastructure/services/internal/(.*)\\.js$': '<rootDir>/src/module/infrastructure/services/internal/$1',
    '^@infrastructure/services/internal/(.*)$': '<rootDir>/src/module/infrastructure/services/internal/$1',
    '^@infrastructure/services/external/(.*)\\.js$': '<rootDir>/src/module/infrastructure/services/external/$1',
    '^@infrastructure/services/external/(.*)$': '<rootDir>/src/module/infrastructure/services/external/$1',
    '^@infrastructure/services/(.*)\\.js$': '<rootDir>/src/module/infrastructure/services/$1',
    '^@infrastructure/services/(.*)$': '<rootDir>/src/module/infrastructure/services/$1',
    '^@infrastructure/queues/(.*)\\.js$': '<rootDir>/src/module/infrastructure/queues/$1',
    '^@infrastructure/queues/(.*)$': '<rootDir>/src/module/infrastructure/queues/$1',
    '^@infrastructure/workers/(.*)\\.js$': '<rootDir>/src/module/infrastructure/workers/$1',
    '^@infrastructure/workers/(.*)$': '<rootDir>/src/module/infrastructure/workers/$1',
    '^@infrastructure/config/(.*)\\.js$': '<rootDir>/src/module/infrastructure/config/$1',
    '^@infrastructure/config/(.*)$': '<rootDir>/src/module/infrastructure/config/$1',
    '^@infrastructure/external/(.*)\\.js$': '<rootDir>/src/module/infrastructure/external/$1',
    '^@infrastructure/external/(.*)$': '<rootDir>/src/module/infrastructure/external/$1',
    '^@infrastructure/(.*)\\.js$': '<rootDir>/src/module/infrastructure/$1',
    '^@infrastructure/(.*)$': '<rootDir>/src/module/infrastructure/$1',
    // ─── Root ──────────────────────
    '^@/(.*)\\.js$': '<rootDir>/src/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
    // ─── Fixtures ──────────────────
    '^@fixtures/(.*)\\.js$': '<rootDir>/test/fixtures/$1',
    '^@fixtures/(.*)$': '<rootDir>/test/fixtures/$1',
    '^@test-infra/(.*)\\.js$': '<rootDir>/test/fixtures/infrastructure/$1',
    '^@test-infra/(.*)$': '<rootDir>/test/fixtures/infrastructure/$1',
    '^@app-fixtures/(.*)\\.js$': '<rootDir>/test/fixtures/application/$1',
    '^@app-fixtures/(.*)$': '<rootDir>/test/fixtures/application/$1',
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  setupFilesAfterEnv: ['<rootDir>/test/setup-infra.ts'],
  extensionsToTreatAsEsm: ['.ts'],
  testTimeout: 10000,
  verbose: false,
};

export default config;
