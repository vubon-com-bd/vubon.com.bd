/**
 * Root Jest config — delegates to test/unit config.
 *
 * Usage:
 *   pnpm test:unit         → test/unit/jest.config.ts
 *   pnpm test:e2e:custom   → test/jest-e2e.json
 */
export default {
  projects: [
    '<rootDir>/test/unit/jest.config.ts',
  ],
};
