/**
 * Interfaces test setup — comprehensive mocks
 * @module payment-service/test
 */
import { jest } from '@jest/globals';

process.env.NODE_ENV = 'test';
jest.setTimeout(30000);

// ─── Mock @nestjs/common ─────────────────────────────
jest.mock('@nestjs/common', () => {
  const passThrough = () => (target: unknown) => target;
  const noOpDecorator = () => () => undefined;

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

  const makeException = (name: string) =>
    class extends Error {
      constructor(...args: unknown[]) {
        super(typeof args[0] === 'string' ? args[0] : name);
        this.name = name;
      }
      getStatus() { return 400; }
      getResponse() { return { message: this.message }; }
    };

  return {
    Injectable: passThrough,
    Inject: () => () => undefined,
    Optional: () => () => undefined,
    forwardRef: (fn: unknown) => fn,
    Logger,
    Global: passThrough,
    Module: passThrough,
    Controller: () => () => undefined,
    Resolver: () => () => undefined,
    Get: noOpDecorator,
    Post: noOpDecorator,
    Put: noOpDecorator,
    Patch: noOpDecorator,
    Delete: noOpDecorator,
    Body: () => () => undefined,
    Param: () => () => undefined,
    Query: () => () => undefined,
    Args: () => () => undefined,
    Mutation: noOpDecorator,
    HttpCode: noOpDecorator,
    Req: () => () => undefined,
    Res: () => () => undefined,
    Headers: () => () => undefined,
    UseGuards: noOpDecorator,
    UsePipes: noOpDecorator,
    UseInterceptors: noOpDecorator,
    NotFoundException: makeException('NotFoundException'),
    BadRequestException: makeException('BadRequestException'),
    UnauthorizedException: makeException('UnauthorizedException'),
    ForbiddenException: makeException('ForbiddenException'),
    ConflictException: makeException('ConflictException'),
    InternalServerErrorException: makeException('InternalServerErrorException'),
    RequestTimeoutException: makeException('RequestTimeoutException'),
    NestMiddleware: () => (target: unknown) => target,
    createParamDecorator: (factory: unknown) => {
      // NestJS param decorators are invoked as `@MyDeco()` → first call returns
      // a decorator function (target, key, index) => void. To also support
      // direct usage `@MyDeco` (no parens), the returned value must be callable
      // AND itself return an identity decorator.
      const paramDecorator = (
        _data?: unknown,
        _ctx?: unknown,
      ): ((_target: unknown, _key?: unknown, _index?: unknown) => void) => {
        // When called with `()` at class decoration site, return an identity decorator
        const identityDecorator = (
          _target: unknown,
          _key?: unknown,
          _index?: unknown,
        ): void => {
          // no-op — parameter decorators have no runtime effect in tests
        };
        return identityDecorator;
      };
      (paramDecorator as unknown as { _factory: unknown })._factory = factory;
      return paramDecorator;
    },
    SetMetadata: () => () => undefined,
    ExecutionContextHost: class ExecutionContextHost {},
    applyDecorators: (..._decorators: unknown[]) => () => undefined,
    HttpStatus: {
      CONTINUE: 100,
      OK: 200,
      CREATED: 201,
      ACCEPTED: 202,
      NO_CONTENT: 204,
      MOVED_PERMANENTLY: 301,
      FOUND: 302,
      NOT_MODIFIED: 304,
      BAD_REQUEST: 400,
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,
      NOT_FOUND: 404,
      METHOD_NOT_ALLOWED: 405,
      CONFLICT: 409,
      GONE: 410,
      UNPROCESSABLE_ENTITY: 422,
      TOO_MANY_REQUESTS: 429,
      INTERNAL_SERVER_ERROR: 500,
      NOT_IMPLEMENTED: 501,
      BAD_GATEWAY: 502,
      SERVICE_UNAVAILABLE: 503,
      GATEWAY_TIMEOUT: 504,
    },
  };
});

// ─── Mock @nestjs/core ──────────────────────────────
jest.mock('@nestjs/core', () => ({
  Reflector: class Reflector {
    getAllAndOverride(): unknown { return undefined; }
    get(): unknown { return undefined; }
    getAll(): unknown { return []; }
  },
  ModuleRef: class ModuleRef {
    get(): unknown { return undefined; }
  },
  APP_INTERCEPTOR: 'APP_INTERCEPTOR',
  APP_GUARD: 'APP_GUARD',
  APP_FILTER: 'APP_FILTER',
  APP_PIPE: 'APP_PIPE',
  NestFactory: { create: jest.fn() },
}));

// ─── Mock @nestjs/swagger ───────────────────────────
jest.mock('@nestjs/swagger', () => ({
  ApiProperty: () => () => undefined,
  ApiPropertyOptional: () => () => undefined,
  ApiTags: () => () => undefined,
  ApiOperation: () => () => undefined,
  ApiResponse: () => () => undefined,
  ApiBearerAuth: () => () => undefined,
  ApiExcludeController: () => (target: unknown) => target,
  ApiParam: () => () => undefined,
  ApiQuery: () => () => undefined,
  ApiBody: () => () => undefined,
  ApiHeader: () => () => undefined,
  ApiCreatedResponse: () => () => undefined,
  ApiOkResponse: () => () => undefined,
  ApiNotFoundResponse: () => () => undefined,
  ApiBadRequestResponse: () => () => undefined,
  ApiUnauthorizedResponse: () => () => undefined,
  PartialType: (t: unknown) => t,
  OmitType: (t: unknown) => t,
  PickType: (t: unknown) => t,
  IntersectionType: (...t: unknown[]) => t[0],
  applyDecorators: () => () => undefined,
  ApiResponseProperty: () => () => undefined,
}));

// ─── Mock @nestjs/cqrs ──────────────────────────────
jest.mock('@nestjs/cqrs', () => {
  class CommandBus {
    async execute(): Promise<unknown> {
      return undefined;
    }
  }
  class QueryBus {
    async execute(): Promise<unknown> {
      return undefined;
    }
  }
  class EventBus {
    async publish(): Promise<void> {}
    async publishAll(): Promise<void> {}
  }
  return {
    CommandBus,
    QueryBus,
    EventBus,
    CommandHandler: () => () => undefined,
    QueryHandler: () => () => undefined,
    EventsHandler: () => () => undefined,
    Saga: () => () => undefined,
    ofType: () => (source: unknown) => source,
    CqrsModule: { forRoot: () => ({ module: class {} }) },
  };
});

// ─── Mock shared-kernel interfaces ──────────────────
jest.mock('@vubon/shared-kernel/interfaces/guards', () => {
  class BaseGuard {
    canActivate(): boolean { return true; }
  }
  class JwtAuthGuard {
    canActivate(): boolean { return true; }
  }
  class RolesGuard {
    canActivate(): boolean { return true; }
  }
  return {
    BaseGuard,
    JwtAuthGuard,
    RolesGuard,
    RequireRoles: () => () => undefined,
    ROLES_KEY: 'roles',
  };
});

jest.mock('@vubon/shared-kernel/interfaces/decorators', () => ({
  Public: () => () => undefined,
  IS_PUBLIC_KEY: 'isPublic',
  CurrentUser: () => () => undefined,
  Roles: () => () => undefined,
  Permissions: () => () => undefined,
}));

jest.mock('@vubon/shared-kernel/interfaces/controllers', () => ({
  BaseController: class BaseController {
    protected currentUser(): unknown { return null; }
    protected currentUserId(): string { return 'test-user'; }
  },
}));

// ─── Mock @nestjs/graphql ────────────────────────────
jest.mock('@nestjs/graphql', () => {
  const noOp = () => () => undefined;
  return {
    Resolver: () => () => undefined,
    Query: noOp,
    Mutation: noOp,
    Subscription: noOp,
    Args: () => () => undefined,
    ObjectType: () => (target: unknown) => target,
    InputType: () => (target: unknown) => target,
    Field: () => () => undefined,
    ID: 'ID',
    Int: 'Int',
    Float: 'Float',
    GraphQLISODateTime: 'GraphQLISODateTime',
    GraphQLSchemaBuilderModule: class GraphQLSchemaBuilderModule {},
    GraphQLModule: {
      forRoot: () => ({ module: class {} }),
      forRootAsync: () => ({ module: class {} }),
    },
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
