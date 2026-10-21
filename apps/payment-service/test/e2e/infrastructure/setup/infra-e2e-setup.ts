/**
 * Infrastructure E2E Test Setup
 * @module payment-service/test/e2e/infrastructure
 */
import { jest } from '@jest/globals';

process.env['NODE_ENV'] = 'test';
process.env['PAYMENT_ENABLED'] = 'true';
process.env['PRISMA_SKIP_ENGINE_BOOTSTRAP'] = 'true';
// NOTE: QUEUE_AUTO_START_WORKERS not set — workers must register so queue mock captures them

jest.setTimeout(30000);

// Mock @nestjs/common
jest.mock('@nestjs/common', () => {
  const Injectable = () => (target: unknown) => target;
  const Inject = () => () => undefined;
  const forwardRef = (fn: unknown) => fn;

  class Logger {
    constructor(public readonly context?: string) {}
    log(): void {}
    error(): void {}
    warn(): void {}
    debug(): void {}
    verbose(): void {}
    static overrideLogger(): void {}
  }

  return {
    Injectable,
    Inject,
    forwardRef,
    Logger,
    Global: () => (target: unknown) => target,
    Module: () => (target: unknown) => target,
    NotFoundException: class extends Error {},
    BadRequestException: class extends Error {},
    UnauthorizedException: class extends Error {},
    ConflictException: class extends Error {},
  };
});

// Silence console
if (process.env['DEBUG_TESTS'] !== 'true') {
  const noop = (): void => {};
  console.log = noop;
  console.info = noop;
  console.debug = noop;
  console.warn = noop;
}

export {};
