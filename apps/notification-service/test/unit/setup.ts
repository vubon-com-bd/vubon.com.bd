/**
 * Shared unit test setup
 * @module notification-service/test/unit
 *
 * Runs BEFORE test framework for all unit tests।
 */

// ─── Silence noise in test output ───
process.env['NODE_ENV'] = 'test';
process.env['LOG_LEVEL'] = 'error';
process.env['PRISMA_SKIP_ENGINE_BOOTSTRAP'] = 'true';
process.env['REDIS_LAZY_CONNECT'] = 'true';
process.env['QUEUE_AUTO_START_WORKERS'] = 'false';

// ─── Silence Prisma warnings ───
process.env['PRISMA_HIDE_UPDATE_MESSAGE'] = 'true';

// ─── Increase default timeout for slow CI ───
if (typeof jest !== 'undefined') {
  jest.setTimeout(10_000);
}

// ─── Mock @nestjs/common for infrastructure tests ───
// @nestjs/common uses `import.meta` in ESM which Jest CJS transform can't handle
// Mock the minimal surface used by infrastructure code
import { jest as jestGlobals } from '@jest/globals';

jestGlobals.mock('@nestjs/common', () => {
  const Injectable = () => (target: unknown) => target;
  const Inject = () => () => undefined;
  const Optional = () => () => undefined;
  const Global = () => (target: unknown) => target;
  const Module = () => (target: unknown) => target;
  const forwardRef = (fn: unknown) => fn;

  class Logger {
    constructor(public readonly context?: string) {}
    log(): void {}
    error(): void {}
    warn(): void {}
    debug(): void {}
    verbose(): void {}
    static overrideLogger(): void {}
    static log(): void {}
    static error(): void {}
    static warn(): void {}
    static debug(): void {}
    static verbose(): void {}
  }

  return {
    Injectable,
    Inject,
    Optional,
    Global,
    Module,
    forwardRef,
    Logger,
  };
});
