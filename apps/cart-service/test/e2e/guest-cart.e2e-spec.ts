import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import { createTestApp } from './setup-e2e.js';

jest.setTimeout(45000);

const VALID_TOKEN = 'a'.repeat(32);

describe('E2E — Guest Cart', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  describe('POST /api/v1/guest-cart', () => {
    it('creates a guest cart', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/guest-cart')
        .send({ token: VALID_TOKEN, currency: 'BDT' })
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body.token).toBe(VALID_TOKEN);
      expect(res.body.status).toBe('active');
    });

    it('rejects invalid token (too short) with 422', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/guest-cart')
        .send({ token: 'short', currency: 'BDT' });

      // Domain ValidationError → 422 (via AllExceptionsFilter)
      expect(res.status).toBe(422);
      expect(res.body).toHaveProperty('statusCode', 422);
    });
  });
});
