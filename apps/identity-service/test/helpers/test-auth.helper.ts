/**
 * Test Auth Helper — reusable auth flows for tests
 * @module identity-service/test/helpers
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
  readonly sessionId: string;
}

/**
 * Generates a unique test email to avoid conflicts.
 */
export function uniqueEmail(prefix = 'test'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@example.com`;
}

/**
 * Generates strong password meeting policy requirements.
 */
export function strongPassword(): string {
  return `SecureP@ss${Date.now().toString().slice(-4)}`;
}

/**
 * Registers a new user via the API.
 */
export async function registerUser(
  app: INestApplication,
  creds: TestCredentials,
): Promise<{ userId: string }> {
  const res = await request(app.getHttpServer())
    .post('/api/v1/auth/register')
    .send({
      email: creds.email,
      password: creds.password,
      confirmPassword: creds.password,
      acceptTerms: true,
    });

  if (res.status !== 201) {
    throw new Error(`Register failed: ${res.status} ${JSON.stringify(res.body)}`);
  }

  return { userId: res.body.user?.id };
}

/**
 * Logs in via the API.
 */
export async function loginUser(
  app: INestApplication,
  creds: TestCredentials,
): Promise<TestLoginResult> {
  const res = await request(app.getHttpServer())
    .post('/api/v1/auth/login')
    .send({
      identifier: creds.email,
      password: creds.password,
    });

  if (res.status !== 200) {
    throw new Error(`Login failed: ${res.status} ${JSON.stringify(res.body)}`);
  }

  return {
    accessToken: res.body.tokens?.accessToken ?? '',
    refreshToken: res.body.tokens?.refreshToken ?? '',
    userId: res.body.user?.id ?? '',
    sessionId: res.body.session?.id ?? '',
  };
}

/**
 * Full flow: register + login → returns login result.
 */
export async function registerAndLogin(
  app: INestApplication,
): Promise<{ creds: TestCredentials; login: TestLoginResult }> {
  const creds: TestCredentials = {
    email: uniqueEmail(),
    password: strongPassword(),
  };

  await registerUser(app, creds);
  const login = await loginUser(app, creds);

  return { creds, login };
}
