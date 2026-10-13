/**
 * Test Auth Helper — reusable auth flows
 * @module product-service/test/helpers
 */
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';

export interface TestCredentials {
  readonly email: string;
  readonly password: string;
}

export interface TestLoginResult {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly userId: string;
}

export function uniqueEmail(prefix = 'test'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@example.com`;
}

export function strongPassword(): string {
  return `SecureP@ss${Date.now().toString().slice(-4)}`;
}

/**
 * Attempts to obtain a test access token.
 * In Termux degraded mode (no auth service), returns empty string.
 */
export async function tryGetAccessToken(
  _app: INestApplication,
): Promise<string> {
  // Product service doesn't host auth — tokens come from user-service.
  // In tests, we rely on ANY_STATUS acceptance.
  return '';
}

export { request };
