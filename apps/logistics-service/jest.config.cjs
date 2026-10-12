/**
 * Jest config — ESM + ts-jest + alias resolution.
 * Coverage focused on layers with real testable logic.
 */
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: 'test/.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': ['ts-jest', { useESM: true, tsconfig: '<rootDir>/tsconfig.json' }],
  },
  extensionsToTreatAsEsm: ['.ts'],

  collectCoverageFrom: [
    // ─── What we test ───
    'src/module/domain/**/*.ts',
    'src/module/application/services/**/*.ts',
    'src/module/application/commands/**/*.command.ts',
    'src/module/application/commands/**/*.handler.ts',
    'src/module/application/queries/**/*.query.ts',
    'src/module/application/queries/**/*.handler.ts',
    'src/module/application/mappers/**/*.ts',
    'src/module/application/validators/**/*.ts',
    'src/module/interfaces/controllers/**/*.ts',
    'src/module/interfaces/mappers/**/*.ts',
    'src/module/infrastructure/persistence/prisma/*.mapper.ts',
    'src/module/infrastructure/persistence/prisma/repositories/**/*.ts',
    'src/module/infrastructure/persistence/cache/repositories/**/*.ts',
    'src/module/infrastructure/external/couriers/*.ts',
    'src/module/infrastructure/external/maps/*.ts',

    // ─── What we skip (data-only, external I/O, wire-up) ───
    '!src/**/*.module.ts',
    '!src/**/*.interface.ts',
    '!src/**/index.ts',
    '!src/**/*.spec.ts',
    '!src/**/dtos/**',
    '!src/**/swagger/**',
    '!src/**/*.swagger.ts',
    '!src/main.ts',
    '!src/module/domain/events/*.events.ts',
    '!src/module/domain/events/event.helpers.ts',
    '!src/module/domain/errors/*.errors.ts',
    '!src/module/domain/repositories/**',
    '!src/module/application/errors/*.errors.ts',
    '!src/module/application/sagas/**',
    '!src/module/infrastructure/queues/**',
    '!src/module/infrastructure/workers/**',
    '!src/module/modules/**',
  ],

  coverageDirectory: './coverage-report',
  coverageReporters: ['text-summary', 'text', 'html', 'lcov'],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 85,
      functions: 90,
      lines: 90,
    },
  },

  testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest.env-load.cjs'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  forceExit: true,
  testTimeout: 45000,
  transformIgnorePatterns: ['node_modules/(?!(@nestjs|@vubon|@apollo|graphql|rxjs)/)'],

  moduleNameMapper: {
    // Relative .js strip
    '^(\\.{1,2}/.*)\\.js$': '$1',

    // Aliased .js strip (MUST be before the generic alias)
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

    // Shared-kernel prisma subpaths
    '^@vubon/shared-kernel/prisma$': '<rootDir>/../../packages/shared-kernel/dist/infrastructure/persistence/prisma/index.js',
    '^@vubon/shared-kernel/prisma/(.*)$': '<rootDir>/../../packages/shared-kernel/dist/infrastructure/persistence/prisma/$1',
    '^@vubon/shared-kernel/infrastructure/persistence/cache$': '<rootDir>/../../packages/shared-kernel/dist/infrastructure/persistence/cache/index.js',
    '^@vubon/shared-kernel/infrastructure/persistence/cache/(.*)$': '<rootDir>/../../packages/shared-kernel/dist/infrastructure/persistence/cache/$1',
    '^@vubon/shared-kernel/infrastructure$': '<rootDir>/../../packages/shared-kernel/dist/infrastructure/index.js',
    '^@vubon/shared-kernel/infrastructure/(.*)$': '<rootDir>/../../packages/shared-kernel/dist/infrastructure/$1',
    '^@vubon/shared-kernel/(.*)$': '<rootDir>/../../packages/shared-kernel/dist/$1',
    '^@vubon/shared-kernel$': '<rootDir>/../../packages/shared-kernel/dist/index.js',
    '^@vubon/shared-constants/(.*)$': '<rootDir>/../../packages/shared-constants/dist/$1',
    '^@vubon/shared-constants$': '<rootDir>/../../packages/shared-constants/dist/index.js',
    '^@vubon/shared-types/(.*)$': '<rootDir>/../../packages/shared-types/dist/$1',
    '^@vubon/shared-types$': '<rootDir>/../../packages/shared-types/dist/index.js',
    '^@vubon/shared-schemas/(.*)$': '<rootDir>/../../packages/shared-schemas/dist/$1',
    '^@vubon/shared-schemas$': '<rootDir>/../../packages/shared-schemas/dist/index.js',
    '^@vubon/shared-config/(.*)$': '<rootDir>/../../packages/shared-config/dist/$1',
    '^@vubon/shared-config$': '<rootDir>/../../packages/shared-config/dist/index.js',
    '^@vubon/shared-utils/(.*)$': '<rootDir>/../../packages/shared-utils/dist/$1',
    '^@vubon/shared-utils$': '<rootDir>/../../packages/shared-utils/dist/index.js',
  },
};
