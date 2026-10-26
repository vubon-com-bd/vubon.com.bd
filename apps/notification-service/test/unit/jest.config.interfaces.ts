/**
 * Jest configuration — Interfaces layer only
 * @module notification-service/test/unit
 */
import type { Config } from 'jest';

const config: Config = {
  displayName: 'unit:interfaces',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../..',
  testMatch: ['<rootDir>/test/unit/interfaces/**/*.spec.ts'],
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
    'src/module/interfaces/**/*.(t|j)s',
    '!src/module/interfaces/**/index.ts',
    '!src/module/interfaces/**/*.dto.ts',
    '!src/module/interfaces/**/*.swagger.ts',
    '!src/module/interfaces/dtos/**',
    '!src/module/interfaces/errors/http-errors.ts',
  ],
  coverageDirectory: '<rootDir>/coverage/unit-interfaces',
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
  setupFilesAfterEnv: ['<rootDir>/test/setup-interfaces.ts'],
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
    '^@domain/event-store/(.*)\\.js$': '<rootDir>/src/module/domain/event-store/$1',
    '^@domain/event-store/(.*)$': '<rootDir>/src/module/domain/event-store/$1',
    '^@domain/services/(.*)\\.js$': '<rootDir>/src/module/domain/services/$1',
    '^@domain/services/(.*)$': '<rootDir>/src/module/domain/services/$1',
    '^@domain/specifications/(.*)\\.js$': '<rootDir>/src/module/domain/specifications/$1',
    '^@domain/specifications/(.*)$': '<rootDir>/src/module/domain/specifications/$1',
    '^@domain/(.*)\\.js$': '<rootDir>/src/module/domain/$1',
    '^@domain/(.*)$': '<rootDir>/src/module/domain/$1',

    // ─── Application ────────────────
    '^@application/(.*)\\.js$': '<rootDir>/src/module/application/$1',
    '^@application/(.*)$': '<rootDir>/src/module/application/$1',

    // ─── Infrastructure ─────────────
    '^@infrastructure/(.*)\\.js$': '<rootDir>/src/module/infrastructure/$1',
    '^@infrastructure/(.*)$': '<rootDir>/src/module/infrastructure/$1',

    // ─── Interfaces ─────────────────
    '^@interfaces/(.*)\\.js$': '<rootDir>/src/module/interfaces/$1',
    '^@interfaces/(.*)$': '<rootDir>/src/module/interfaces/$1',

    // ─── Fixtures ───────────────────
    '^@fixtures/(.*)$': '<rootDir>/test/fixtures/$1',
    '^@app-fixtures/(.*)$': '<rootDir>/test/fixtures/application/$1',
    '^@infra-fixtures/(.*)$': '<rootDir>/test/fixtures/infrastructure/$1',
  },
  extensionsToTreatAsEsm: ['.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  transformIgnorePatterns: ['node_modules/(?!(@nestjs|uuid|nanoid)/)'],
};

export default config;
