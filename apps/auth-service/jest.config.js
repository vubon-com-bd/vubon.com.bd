module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/../tsconfig.spec.json',
        diagnostics: { ignoreCodes: [151002, 151001] },
      },
    ],
  },
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
  moduleNameMapper: {
    '^@vubon/shared-kernel/(.*)$': '<rootDir>/../../../packages/shared-kernel/src/$1',
    '^@vubon/shared-kernel$': '<rootDir>/../../../packages/shared-kernel/src',
    '^@vubon/shared-constants/(.*)$': '<rootDir>/../../../packages/shared-constants/src/$1',
    '^@vubon/shared-constants$': '<rootDir>/../../../packages/shared-constants/src',
    '^@vubon/shared-types/(.*)$': '<rootDir>/../../../packages/shared-types/src/$1',
    '^@vubon/shared-types$': '<rootDir>/../../../packages/shared-types/src',
    '^@vubon/shared-schemas/(.*)$': '<rootDir>/../../../packages/shared-schemas/src/$1',
    '^@vubon/shared-schemas$': '<rootDir>/../../../packages/shared-schemas/src',
    '^@vubon/shared-config/(.*)$': '<rootDir>/../../../packages/shared-config/src/$1',
    '^@vubon/shared-config$': '<rootDir>/../../../packages/shared-config/src',
  },
};
