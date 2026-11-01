/**
 * CQRS mock factories for controller/resolver tests
 * @module identity-service/test/fixtures/interfaces
 */
import { jest } from '@jest/globals';

export function makeCommandBusMock() {
  return {
    execute: jest.fn<() => Promise<unknown>>(),
  };
}

export function makeQueryBusMock() {
  return {
    execute: jest.fn<() => Promise<unknown>>(),
  };
}

export function makeRedisServiceMock() {
  return {
    get: jest.fn<() => Promise<unknown>>(),
    set: jest.fn<() => Promise<void>>(),
    del: jest.fn<() => Promise<void>>(),
    exists: jest.fn<() => Promise<boolean>>(),
    isHealthy: jest.fn<() => Promise<boolean>>(),
    raw: {},
  };
}

export function makeCurrentUser(overrides: Record<string, unknown> = {}) {
  return {
    userId: '77777777-7777-4777-8777-777777777777',
    sessionId: '22222222-2222-4222-8222-222222222222',
    emailVerified: true,
    phoneVerified: true,
    mfaVerified: true,
    biometricVerified: true,
    deviceTrusted: true,
    roles: ['customer'],
    permissions: [],
    ...overrides,
  };
}

export function makeExecutionContext(overrides: {
  user?: Record<string, unknown>;
  params?: Record<string, string>;
  headers?: Record<string, string>;
  method?: string;
  url?: string;
  handler?: string;
} = {}) {
  const request = {
    user: overrides.user ?? makeCurrentUser(),
    params: overrides.params ?? {},
    headers: overrides.headers ?? {},
    method: overrides.method ?? 'POST',
    url: overrides.url ?? '/auth/login',
  };

  return {
    switchToHttp: () => ({
      getRequest: () => request,
      getResponse: () => ({}),
    }),
    getClass: () => ({ name: 'TestController' }),
    getHandler: () => ({ name: overrides.handler ?? 'test' }),
  } as never;
}
