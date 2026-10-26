/**
 * Jest configuration — Modules layer only
 * @module notification-service/test/unit
 *
 * Coverage target: 90% statements, 80% branches, 90% functions, 90% lines.
 *
 * ⚠️ Modules layer is mostly wiring — coverage excludes:
 *   - Module class files (pure decoration/wiring)
 *   - Barrel exports
 *   - Config-based health indicators (tested via e2e)
 */
import type { Config } from 'jest';

const config: Config = {
  displayName: 'unit:modules',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../..',
  testMatch: ['<rootDir>/test/unit/modules/**/*.spec.ts'],
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  // ─── Allow transforming ESM packages ─────
  transformIgnorePatterns: [
    'node_modules/(?!(@nestjs|@vubon|uuid|zod)/)',
  ],
  collectCoverageFrom: [
    'src/module/modules/**/*.(t|j)s',
    // ─── Barrels ─────
    '!src/module/modules/**/index.ts',
    // ─── Module wiring (tested via e2e) ─────
    '!src/module/modules/**/*.module.ts',
    '!src/module/modules/app.module.ts',
    // ─── Handler arrays (just imports) ─────
    '!src/module/modules/**/commands/index.ts',
    '!src/module/modules/**/queries/index.ts',
    '!src/module/modules/**/events/index.ts',
    '!src/module/modules/**/sagas/index.ts',
  ],
  coverageDirectory: '<rootDir>/coverage/unit-modules',
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
    '^@infrastructure/persistence/(.*)\\.js$': '<rootDir>/src/module/infrastructure/persistence/$1',
    '^@infrastructure/persistence/(.*)$': '<rootDir>/src/module/infrastructure/persistence/$1',
    '^@infrastructure/queues/(.*)\\.js$': '<rootDir>/src/module/infrastructure/queues/$1',
    '^@infrastructure/queues/(.*)$': '<rootDir>/src/module/infrastructure/queues/$1',
    '^@infrastructure/workers/(.*)\\.js$': '<rootDir>/src/module/infrastructure/workers/$1',
    '^@infrastructure/workers/(.*)$': '<rootDir>/src/module/infrastructure/workers/$1',
    '^@infrastructure/providers/(.*)\\.js$': '<rootDir>/src/module/infrastructure/providers/$1',
    '^@infrastructure/providers/(.*)$': '<rootDir>/src/module/infrastructure/providers/$1',
    '^@infrastructure/template-engine/(.*)\\.js$': '<rootDir>/src/module/infrastructure/template-engine/$1',
    '^@infrastructure/template-engine/(.*)$': '<rootDir>/src/module/infrastructure/template-engine/$1',
    '^@infrastructure/services/(.*)\\.js$': '<rootDir>/src/module/infrastructure/services/$1',
    '^@infrastructure/services/(.*)$': '<rootDir>/src/module/infrastructure/services/$1',
    '^@infrastructure/config/(.*)\\.js$': '<rootDir>/src/module/infrastructure/config/$1',
    '^@infrastructure/config/(.*)$': '<rootDir>/src/module/infrastructure/config/$1',
    '^@infrastructure/(.*)\\.js$': '<rootDir>/src/module/infrastructure/$1',
    '^@infrastructure/(.*)$': '<rootDir>/src/module/infrastructure/$1',
    // ─── Interfaces ─────────────
    '^@interfaces/controllers/(.*)\\.js$': '<rootDir>/src/module/interfaces/controllers/$1',
    '^@interfaces/controllers/(.*)$': '<rootDir>/src/module/interfaces/controllers/$1',
    '^@interfaces/guards/(.*)\\.js$': '<rootDir>/src/module/interfaces/guards/$1',
    '^@interfaces/guards/(.*)$': '<rootDir>/src/module/interfaces/guards/$1',
    '^@interfaces/interceptors/(.*)\\.js$': '<rootDir>/src/module/interfaces/interceptors/$1',
    '^@interfaces/interceptors/(.*)$': '<rootDir>/src/module/interfaces/interceptors/$1',
    '^@interfaces/dtos/(.*)\\.js$': '<rootDir>/src/module/interfaces/dtos/$1',
    '^@interfaces/dtos/(.*)$': '<rootDir>/src/module/interfaces/dtos/$1',
    '^@interfaces/(.*)\\.js$': '<rootDir>/src/module/interfaces/$1',
    '^@interfaces/(.*)$': '<rootDir>/src/module/interfaces/$1',
    // ─── Modules (self) ─────────
    '^@modules/(.*)\\.js$': '<rootDir>/src/module/modules/$1',
    '^@modules/(.*)$': '<rootDir>/src/module/modules/$1',
    // ─── Root alias ─────────────
    '^@/(.*)\\.js$': '<rootDir>/src/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
    // ─── Test fixtures ──────────
    '^@test-fixtures/(.*)\\.js$': '<rootDir>/test/fixtures/$1',
    '^@test-fixtures/(.*)$': '<rootDir>/test/fixtures/$1',
    '^@fixtures/(.*)\\.js$': '<rootDir>/test/fixtures/$1',
    '^@fixtures/(.*)$': '<rootDir>/test/fixtures/$1',
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  extensionsToTreatAsEsm: ['.ts'],
  testTimeout: 10000,
};

export default config;
