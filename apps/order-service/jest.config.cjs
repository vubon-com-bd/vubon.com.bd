module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@domain/(.*)$': '<rootDir>/module/domain/$1',
    '^@application/(.*)$': '<rootDir>/module/application/$1',
    '^@infrastructure/(.*)$': '<rootDir>/module/infrastructure/$1',
    '^@interfaces/(.*)$': '<rootDir>/module/interfaces/$1',
    '^@modules/(.*)$': '<rootDir>/module/modules/$1',
  },
};
