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
    'src/module/domain/**/*.(t|j)s',
    // Exclude — no executable logic
    '!src/module/domain/**/index.ts',
    '!src/module/domain/**/*.errors.ts',
    '!src/module/domain/**/*.interface.ts',
    '!src/module/domain/**/event.helpers.ts',
    '!src/module/domain/**/*.events.ts',
    '!src/module/domain/**/*.types.ts',
    // Event-store = interface-only
    '!src/module/domain/event-store/**',
    // Repositories = interface-only
    '!src/module/domain/repositories/**',
    // Event helper exports only
    '!src/module/domain/events/index.ts',
  ],
  coverageDirectory: '<rootDir>/coverage/unit',
  coverageReporters: ['text', 'text-summary', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  testEnvironment: 'node',
  moduleNameMapper: {
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
