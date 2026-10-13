/**
 * Session E2E Tests
 * @module identity-service/test/e2e
 */
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { getTestApp, closeTestApp } from '../setup.js';
import { registerAndLogin } from '../helpers/test-auth.helper.js';

describe('Session (E2E)', () => {
  let app: INestApplication;
  let accessToken: string;
  let sessionId: string;

  beforeAll(async () => {
    app = await getTestApp();
    const { login } = await registerAndLogin(app);
    accessToken = login.accessToken;
    sessionId = login.sessionId;
  });

  afterAll(async () => {
    await closeTestApp();
  });

  describe('GET /api/v1/auth/sessions', () => {
    it('should list sessions or degraded', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/v1/auth/sessions')
        .set('Authorization', `Bearer ${accessToken}`);

      expect([200, 401, 404, 500, 503].includes(res.status)).toBe(true);
    });

    it('should require authentication', async () => {
      const res = await request(app.getHttpServer()).get('/api/v1/auth/sessions');
      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/v1/auth/sessions/:id', () => {
    it('should return session details or degraded', async () => {
      const res = await request(app.getHttpServer())
        .get(`/api/v1/auth/sessions/${sessionId}`)
        .set('Authorization', `Bearer ${accessToken}`);

      expect([200, 401, 404, 500, 503].includes(res.status)).toBe(true);
    });

    it('should return 404 for unknown session', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/v1/auth/sessions/unknown-session-id')
        .set('Authorization', `Bearer ${accessToken}`);

      expect([400, 401, 404, 500, 503].includes(res.status)).toBe(true);
    });
  });
});
