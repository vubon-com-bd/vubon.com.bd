/**
 * Mock user shapes for controller tests
 */
import { USER_ID } from '../helpers.js';

export interface MockUser {
  readonly userId: string;
  readonly sessionId?: string;
  readonly email?: string;
  readonly roles?: readonly string[];
  readonly permissions?: readonly string[];
}

export function mockUser(overrides: Partial<MockUser> = {}): MockUser {
  return {
    userId: USER_ID,
    sessionId: 'session-mock',
    email: 'user@test.com',
    roles: ['vendor'],
    permissions: ['product:create', 'product:update'],
    ...overrides,
  };
}

export function mockAdmin(): MockUser {
  return mockUser({
    userId: 'admin-11111111-1111-1111-1111-111111111111',
    roles: ['admin'],
    permissions: ['*'],
  });
}
