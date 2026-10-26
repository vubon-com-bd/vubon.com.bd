/**
 * Jest Config — Application Unit Tests
 * @module notification-service/test
 *
 * Coverage targets: 90/80/90/90 (statements/branches/functions/lines)
 *
 * ⚠️ Uses isolated modules + commonjs module override — required because
 *    @nestjs/* packages are ESM-only and Jest runs in CJS mode.
 */
import type { Config } from 'jest';

const WORKSPACE_SRC = '<rootDir>/../../packages';

const config: Config = {
  displayName: 'application-unit',
  rootDir: '../..',
  testEnvironment: 'node',
  preset: 'ts-jest',
  testMatch: [
    '<rootDir>/test/unit/application/**/*.spec.ts',
    '<rootDir>/test/unit/application/**/*.test.ts',
  ],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        // ⚠️ Inline tsconfig — overrides project's ESM config for Jest compatibility
        tsconfig: {
          module: 'commonjs',
          target: 'ES2022',
          moduleResolution: 'node',
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          experimentalDecorators: true,
          emitDecoratorMetadata: true,
          skipLibCheck: true,
          strict: true,
          resolveJsonModule: true,
          isolatedModules: true,
        },
        isolatedModules: true,
      },
    ],
  },
  moduleNameMapper: {
    // ═══ @nestjs/* → CJS shims (test-only) ═══
    '^@nestjs/common$': '<rootDir>/test/shims/nestjs-common.shim.ts',
    '^@nestjs/cqrs$': '<rootDir>/test/shims/nestjs-cqrs.shim.ts',
    '^@nestjs/core$': '<rootDir>/test/shims/nestjs-core.shim.ts',
    '^@vubon/shared-kernel/infrastructure/messaging/event-bridge$': '<rootDir>/test/shims/domain-event-bridge.mock.ts',
    '^@vubon/shared-kernel/infrastructure/messaging/event-bridge/(.*)$': '<rootDir>/test/shims/domain-event-bridge.mock.ts',
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
    '^@vubon/shared-schemas/(.*)\\.js$': `${WORKSPACE_SRC}/shared-schemas/src/$1`,
    '^@vubon/shared-schemas/(.*)$': `${WORKSPACE_SRC}/shared-schemas/src/$1`,

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

    '^@application/errors/(.*)\\.js$': '<rootDir>/src/module/application/errors/$1',
    '^@application/errors/(.*)$': '<rootDir>/src/module/application/errors/$1',
    '^@application/dtos/(.*)\\.js$': '<rootDir>/src/module/application/dtos/$1',
    '^@application/dtos/(.*)$': '<rootDir>/src/module/application/dtos/$1',
    '^@application/services/interfaces/(.*)\\.js$': '<rootDir>/src/module/application/services/interfaces/$1',
    '^@application/services/interfaces/(.*)$': '<rootDir>/src/module/application/services/interfaces/$1',
    '^@application/services/impl/(.*)\\.js$': '<rootDir>/src/module/application/services/impl/$1',
    '^@application/services/impl/(.*)$': '<rootDir>/src/module/application/services/impl/$1',
    '^@application/commands/(.*)\\.js$': '<rootDir>/src/module/application/commands/$1',
    '^@application/commands/(.*)$': '<rootDir>/src/module/application/commands/$1',
    '^@application/queries/(.*)\\.js$': '<rootDir>/src/module/application/queries/$1',
    '^@application/queries/(.*)$': '<rootDir>/src/module/application/queries/$1',
    '^@application/sagas/(.*)\\.js$': '<rootDir>/src/module/application/sagas/$1',
    '^@application/sagas/(.*)$': '<rootDir>/src/module/application/sagas/$1',
    '^@application/mappers/(.*)\\.js$': '<rootDir>/src/module/application/mappers/$1',
    '^@application/mappers/(.*)$': '<rootDir>/src/module/application/mappers/$1',
    '^@application/validators/(.*)\\.js$': '<rootDir>/src/module/application/validators/$1',
    '^@application/validators/(.*)$': '<rootDir>/src/module/application/validators/$1',
    '^@application/(.*)\\.js$': '<rootDir>/src/module/application/$1',
    '^@application/(.*)$': '<rootDir>/src/module/application/$1',
    '^@application$': '<rootDir>/src/module/application/index.ts',

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
    '^@domain-fixtures/(.*)\\.js$': '<rootDir>/test/fixtures/domain/$1',
    '^@domain-fixtures/(.*)$': '<rootDir>/test/fixtures/domain/$1',
    '^@application-fixtures/(.*)\\.js$': '<rootDir>/test/fixtures/application/$1',
    '^@application-fixtures/(.*)$': '<rootDir>/test/fixtures/application/$1',

    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  setupFilesAfterEnv: ['<rootDir>/test/unit/setup-application.ts'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/module/application/**/*.ts',
    '!src/module/application/**/index.ts',
    '!src/module/application/**/*.d.ts',
    '!src/module/application/commands/**',
    '!src/module/application/queries/**',
    '!src/module/application/services/interfaces/**',
    '!src/module/application/dtos/**',
    // Test-only shims — not production code
    '!test/shims/**',
    // Exclude test files from coverage
    '!test/**',
  ],
  coverageDirectory: '<rootDir>/coverage/application-unit',
  coverageReporters: ['text', 'text-summary', 'lcov', 'html', 'json-summary'],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 80,
      functions: 90,
      lines: 90,
    },
  },
  testTimeout: 15000,
  maxWorkers: '50%',
  clearMocks: true,
  restoreMocks: true,
  verbose: true,
  // ═══ ESM packages that must be transformed ═══
  transformIgnorePatterns: [
    'node_modules/(?!(@nestjs|@vubon|rxjs|uuid)/)',
  ],
};

export default config;
