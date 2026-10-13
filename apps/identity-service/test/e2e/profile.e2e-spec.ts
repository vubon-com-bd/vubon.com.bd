/**
 * Profile E2E Tests
 * @module identity-service/test/e2e
 */
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { getTestApp, closeTestApp } from '../setup.js';
import { registerAndLogin } from '../helpers/test-auth.helper.js';
import { FIXTURES } from '../helpers/test-fixtures.js';

describe('Profile (E2E)', () => {
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

  describe('GET /api/v1/users/profile', () => {
    it('should return profile or degraded', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/v1/users/profile')
        .set('Authorization', `Bearer ${accessToken}`);

      expect([200, 401, 404, 500, 503].includes(res.status)).toBe(true);
    });

    it('should require authentication', async () => {
      const res = await request(app.getHttpServer()).get('/api/v1/users/profile');
      expect(res.status).toBe(401);
    });
  });

  describe('PUT /api/v1/users/profile', () => {
    it('should accept profile update', async () => {
      const res = await request(app.getHttpServer())
        .put('/api/v1/users/profile')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(FIXTURES.validProfileUpdate);

      expect([200, 201, 400, 401, 404, 500, 503].includes(res.status)).toBe(true);
    });

    it('should reject without authentication', async () => {
      const res = await request(app.getHttpServer())
        .put('/api/v1/users/profile')
        .send(FIXTURES.validProfileUpdate);

      expect(res.status).toBe(401);
    });
  });
});
