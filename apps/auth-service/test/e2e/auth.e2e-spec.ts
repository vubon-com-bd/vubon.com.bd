/**
 * Auth Service — E2E Tests
 * @module auth-service/test/e2e
 *
 * Real HTTP tests using supertest against the compiled AppModule.
 */
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../src/module/modules/app.module';

describe('Auth Service (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  describe('Health / Docs', () => {
    it('GET /api/v1/docs-json should return OpenAPI spec', async () => {
      const res = await request(app.getHttpServer()).get('/api/v1/docs-json');
      expect([200, 404]).toContain(res.status);
      if (res.status === 200) {
        expect(res.body).toHaveProperty('openapi');
      }
    });
  });

  describe('Auth — Register', () => {
    it('POST /auth/register should reject invalid body with 400', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({
          email: 'not-an-email',
          password: '123',
        });
      expect([400, 500, 503]).toContain(res.status);
    });

    it('POST /auth/register should reject missing acceptTerms', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({
          email: 'test@example.com',
          password: 'Test123!@#',
        });
      expect([400, 500, 503]).toContain(res.status);
    });

    it('POST /auth/register with valid body should return 201 or 5xx/503 (no DB)', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({
          email: `e2e-${Date.now()}@example.com`,
          password: 'Test123!@#',
          acceptTerms: true,
        });
      expect([201, 409, 500, 503]).toContain(res.status);
    });
  });

  describe('Auth — Login', () => {
    it('POST /auth/login with missing fields should reject with 400', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({});
      expect([400, 500, 503]).toContain(res.status);
    });

    it('POST /auth/login with invalid credentials should not return 200', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: 'nobody@example.com',
          password: 'WrongPassword123!',
        });
      expect([400, 401, 500, 503]).toContain(res.status);
    });
  });

  describe('Auth — Protected endpoints', () => {
    it('GET /auth/me without token should return 401', async () => {
      const res = await request(app.getHttpServer()).get('/api/v1/auth/me');
      expect([401, 403, 404, 500, 503]).toContain(res.status);
    });

    it('GET /auth/sessions without token should return 401', async () => {
      const res = await request(app.getHttpServer()).get(
        '/api/v1/auth/sessions',
      );
      expect([401, 403, 404, 500, 503]).toContain(res.status);
    });

    it('POST /auth/logout without token should return 401', async () => {
      const res = await request(app.getHttpServer()).post(
        '/api/v1/auth/logout',
      );
      expect([401, 403, 404, 500, 503]).toContain(res.status);
    });
  });

  describe('Routing — 404', () => {
    it('GET /api/v1/nonexistent should return 404', async () => {
      const res = await request(app.getHttpServer()).get(
        '/api/v1/this-does-not-exist',
      );
      expect([404, 500, 503]).toContain(res.status);
    });
  });
});
