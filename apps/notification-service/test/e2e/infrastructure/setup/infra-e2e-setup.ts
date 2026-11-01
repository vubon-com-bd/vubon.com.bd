/**
 * Infrastructure E2E Setup
 * @module notification-service/test/e2e/infrastructure
 */
import { jest } from '@jest/globals';

process.env.NODE_ENV = 'test';
process.env.PRISMA_SKIP_ENGINE_BOOTSTRAP = 'true';
jest.setTimeout(30000);

// ─── Mock @nestjs/common ─────────────────────────────
jest.mock('@nestjs/common', () => {
  const Injectable = () => (target: unknown) => target;
  const Inject = () => () => undefined;
  const Optional = () => () => undefined;
  const forwardRef = (fn: unknown) => fn;

  class Logger {
    constructor(context?: string) {
      void context;
    }
    log(...args: unknown[]): void { void args; }
    error(...args: unknown[]): void { void args; }
    warn(...args: unknown[]): void { void args; }
    debug(...args: unknown[]): void { void args; }
    verbose(...args: unknown[]): void { void args; }
    static overrideLogger(): void {}
    static log(): void {}
    static error(): void {}
    static warn(): void {}
    static debug(): void {}
    static verbose(): void {}
  }

  return {
    Injectable, Inject, Optional, forwardRef, Logger,
    Global: () => (target: unknown) => target,
    Module: () => (target: unknown) => target,
    NotFoundException: class extends Error {},
    BadRequestException: class extends Error {},
    UnauthorizedException: class extends Error {},
    ForbiddenException: class extends Error {},
    ConflictException: class extends Error {},
    InternalServerErrorException: class extends Error {},
  };
});

// ─── Mock @nestjs/cqrs ───────────────────────────────
jest.mock('@nestjs/cqrs', () => {
  class EventBus {
    publish(): void {}
    publishAll(): void {}
    subscribe(): void {}
  }
  class CommandBus {
    execute(): Promise<unknown> { return Promise.resolve(undefined); }
  }
  class QueryBus {
    execute(): Promise<unknown> { return Promise.resolve(undefined); }
  }
  return {
    EventBus, CommandBus, QueryBus,
    CommandHandler: () => (target: unknown) => target,
    QueryHandler: () => (target: unknown) => target,
    EventsHandler: () => (target: unknown) => target,
    Saga: () => () => undefined,
    ofType: () => () => undefined,
    ICommandHandler: class {},
    IQueryHandler: class {},
    IEventHandler: class {},
    ICommand: class {},
    IQuery: class {},
    IEvent: class {},
    AggregateRoot: class {},
    CqrsModule: class {},
  };
});

// ─── Mock Event Bridge ───────────────────────────────
jest.mock('@vubon/shared-kernel/infrastructure/messaging/event-bridge', () => {
  class DomainEventBridgeService {
    publishInProcess = jest.fn();
    publish = jest.fn(async () => undefined);
    publishBatch = jest.fn(async () => undefined);
    publishFromEntity = jest.fn(async () => undefined);
  }
  return { DomainEventBridgeService, EventBridgeModule: class {} };
});

// ─── Mock Prisma ─────────────────────────────────────
jest.mock('@prisma/client', () => {
  class PrismaClient {
    $connect = jest.fn(async () => undefined);
    $disconnect = jest.fn(async () => undefined);
    $queryRaw = jest.fn(async () => undefined);
    $transaction = jest.fn(async (fn: (tx: unknown) => Promise<unknown>) => fn({}));
  }
  return { PrismaClient };
});

// ─── Mock Queue + BullMQ ─────────────────────────────
jest.mock('bullmq', () => ({
  Queue: class {
    add = jest.fn(async () => ({ id: 'job-1' }));
    close = jest.fn();
    getWaitingCount = jest.fn(async () => 0);
    getActiveCount = jest.fn(async () => 0);
    getFailedCount = jest.fn(async () => 0);
    getCompletedCount = jest.fn(async () => 0);
  },
  Worker: class {
    close = jest.fn();
  },
}));

jest.mock('ioredis', () => {
  class IORedis {
    get = jest.fn(async () => null);
    set = jest.fn(async () => 'OK');
    del = jest.fn(async () => 1);
    exists = jest.fn(async () => 0);
    quit = jest.fn(async () => 'OK');
    ping = jest.fn(async () => 'PONG');
  }
  return { default: IORedis, Redis: IORedis };
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
