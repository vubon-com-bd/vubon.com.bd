/**
 * Infrastructure test setup — global mocks
 * @module payment-service/test
 *
 * @nestjs/common ESM has `import.meta` which Jest's CJS transform can't handle.
 * We mock the minimal surface used by infrastructure code (decorators, Logger).
 */
import { jest } from '@jest/globals';

process.env.NODE_ENV = 'test';
jest.setTimeout(30000);

// ─── Mock @nestjs/common ─────────────────────────────
jest.mock('@nestjs/common', () => {
  const Injectable = () => (target: unknown) => target;
  const Inject = () => () => undefined;
  const Optional = () => () => undefined;
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
    forwardRef,
    Logger,
    Global: () => (target: unknown) => target,
    Module: () => (target: unknown) => target,
    Controller: () => (target: unknown) => target,
    Get: () => () => undefined,
    Post: () => () => undefined,
    Put: () => () => undefined,
    Patch: () => () => undefined,
    Delete: () => () => undefined,
    Body: () => () => undefined,
    Param: () => () => undefined,
    Query: () => () => undefined,
    HttpCode: () => () => undefined,
    Req: () => () => undefined,
    Res: () => () => undefined,
    Headers: () => () => undefined,
    UseGuards: () => () => undefined,
    UsePipes: () => () => undefined,
    UseInterceptors: () => () => undefined,
    NotFoundException: class extends Error {},
    BadRequestException: class extends Error {},
    UnauthorizedException: class extends Error {},
    ForbiddenException: class extends Error {},
    ConflictException: class extends Error {},
    InternalServerErrorException: class extends Error {},
  };
});

// ─── Silence console ────────────────────────────────
if (process.env['DEBUG_TESTS'] !== 'true') {
  global.console = {
    ...console,
    log: jest.fn() as never,
    debug: jest.fn() as never,
    info: jest.fn() as never,
    warn: jest.fn() as never,
  };
}

export {};
