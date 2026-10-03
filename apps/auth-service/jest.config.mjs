/**
 * Jest config for auth-service — ESM native.
 *
 * Requires: NODE_OPTIONS=--experimental-vm-modules
 */
export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: '<rootDir>/../tsconfig.spec.json',
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts'],
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/*.module.ts',
    '!**/*.interface.ts',
    '!**/*.dto.ts',
    '!**/index.ts',
    '!**/*.spec.ts',
    '!**/*.types.ts',
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  forceExit: true,
  testTimeout: 30000,
  // ESM node_modules — Jest 29 with --experimental-vm-modules handles this natively
  transformIgnorePatterns: [
    'node_modules/(?!(\\.pnpm/[^/]+/node_modules/)?(@nestjs|@vubon|@apollo|graphql|rxjs)/)',
  ],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^@vubon/shared-kernel/(.*)$': '<rootDir>/../../../packages/shared-kernel/dist/$1',
    '^@vubon/shared-kernel$': '<rootDir>/../../../packages/shared-kernel/dist/index.js',
    '^@vubon/shared-constants/(.*)$': '<rootDir>/../../../packages/shared-constants/dist/$1',
    '^@vubon/shared-constants$': '<rootDir>/../../../packages/shared-constants/dist/index.js',
    '^@vubon/shared-types/(.*)$': '<rootDir>/../../../packages/shared-types/dist/$1',
    '^@vubon/shared-types$': '<rootDir>/../../../packages/shared-types/dist/index.js',
    '^@vubon/shared-schemas/(.*)$': '<rootDir>/../../../packages/shared-schemas/dist/$1',
    '^@vubon/shared-schemas$': '<rootDir>/../../../packages/shared-schemas/dist/index.js',
    '^@vubon/shared-config/(.*)$': '<rootDir>/../../../packages/shared-config/dist/$1',
    '^@vubon/shared-config$': '<rootDir>/../../../packages/shared-config/dist/index.js',
  },
};
