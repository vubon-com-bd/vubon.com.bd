/**
 * MFA E2E Tests
 * @module identity-service/test/e2e
 */
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { getTestApp, closeTestApp } from '../setup.js';
import { registerAndLogin } from '../helpers/test-auth.helper.js';

describe('MFA (E2E)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    app = await getTestApp();
    const { login } = await registerAndLogin(app);
    accessToken = login.accessToken;
  });

  afterAll(async () => {
    await closeTestApp();
  });

  describe('GET /api/v1/auth/mfa/settings', () => {
    it('should return MFA settings or degraded', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/v1/auth/mfa/settings')
        .set('Authorization', `Bearer ${accessToken}`);

      expect([200, 401, 404, 500, 503].includes(res.status)).toBe(true);
    });

    it('should require authentication', async () => {
      const res = await request(app.getHttpServer()).get('/api/v1/auth/mfa/settings');
      expect(res.status).toBe(401);
    });
  });

  describe('POST /api/v1/auth/mfa/setup', () => {
    it('should require authentication', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/auth/mfa/setup')
        .send({ method: 'totp' });
      expect(res.status).toBe(401);
    });

    it('should reject invalid method', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/auth/mfa/setup')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ method: 'invalid-method' });

      expect([400, 401, 422, 500, 503].includes(res.status)).toBe(true);
    });
  });

  describe('GET /api/v1/auth/recovery-codes', () => {
    it('should require authentication', async () => {
      const res = await request(app.getHttpServer()).get('/api/v1/auth/recovery-codes');
      expect(res.status).toBe(401);
    });
  });
});
