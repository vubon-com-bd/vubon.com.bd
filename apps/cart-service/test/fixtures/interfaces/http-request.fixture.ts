import { jest } from '@jest/globals';

/**
 * HTTP Request/Response Mocks
 * @module test/fixtures/interfaces
 */
import type { ExecutionContext } from '@nestjs/common';

export interface MockRequest {
  readonly method: string;
  readonly url: string;
  readonly headers: Record<string, string | string[] | undefined>;
  readonly params?: Record<string, string>;
  readonly query?: Record<string, unknown>;
  readonly body?: Record<string, unknown>;
  user?: {
    readonly userId: string;
    readonly roles?: readonly string[];
    readonly permissions?: readonly string[];
  };
  guestToken?: string;
  correlationId?: string;
  cartContext?: unknown;
}

export interface MockResponse {
  readonly setHeader: (key: string, value: string) => void;
  readonly status: (code: number) => { readonly json: (body: unknown) => void };
}

export interface MockExecutionContext {
  switchToHttp: () => {
    readonly getRequest: () => MockRequest;
    readonly getResponse: () => MockResponse;
    readonly getNext: () => unknown;
  };
  getHandler: () => () => unknown;
  getClass: () => new () => unknown;
}

export const createMockRequest = (
  overrides: Partial<MockRequest> = {},
): MockRequest => ({
  method: 'GET',
  url: '/carts/test',
  headers: {},
  params: {},
  query: {},
  ...overrides,
});

export const createMockResponse = (): MockResponse => {
  const captured: { status?: number; body?: unknown; headers: Record<string, string> } = {
    headers: {},
  };
  return {
    setHeader: (key: string, value: string) => {
      captured.headers[key] = value;
    },
    status: (code: number) => {
      captured.status = code;
      return {
        json: (body: unknown) => {
          captured.body = body;
        },
      };
    },
  };
};

export const createMockContext = (
  req: Partial<MockRequest> = {},
  handlerFn?: () => unknown,
  classRef?: new () => unknown,
): ExecutionContext => {
  const request = createMockRequest(req);
  const response = createMockResponse();
  const handler = handlerFn ?? (() => undefined);
  const klass = classRef ?? class MockController {};

  return {
    switchToHttp: () => ({
      getRequest: () => request,
      getResponse: () => response,
      getNext: () => undefined,
    }),
    getHandler: () => handler,
    getClass: () => klass,
  } as unknown as ExecutionContext;
};

export const createAuthUser = (
  overrides: Partial<NonNullable<MockRequest['user']>> = {},
) => ({
  userId: 'user-11111111-1111-1111-1111-111111111111',
  roles: ['customer'],
  permissions: [],
  ...overrides,
});
