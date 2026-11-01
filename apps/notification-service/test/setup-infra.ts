/**
 * Infrastructure test setup — global mocks
 * @module notification-service/test
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

  const CommandHandler = () => (target: unknown) => target;
  const QueryHandler = () => (target: unknown) => target;
  const EventsHandler = () => (target: unknown) => target;
  const Saga = () => () => undefined;
  const ofType = () => () => undefined;

  return {
    EventBus,
    CommandBus,
    QueryBus,
    CommandHandler,
    QueryHandler,
    EventsHandler,
    Saga,
    ofType,
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

// ─── Mock domain event bridge (kernel dist) ──────────
jest.mock('@vubon/shared-kernel/infrastructure/messaging/event-bridge', () => {
  class DomainEventBridgeService {
    publishInProcess = jest.fn();
    publish = jest.fn(async () => undefined);
    publishBatch = jest.fn(async () => undefined);
    publishFromEntity = jest.fn(async () => undefined);
  }

  class EventBridgeModule {}

  return {
    DomainEventBridgeService,
    EventBridgeModule,
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
