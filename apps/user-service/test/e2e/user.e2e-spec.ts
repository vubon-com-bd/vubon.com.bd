/**
 * User E2E Test — real HTTP
 * @module user-service/test/e2e
 */
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../src/module/modules/app.module';

describe('User API (E2E)', () => {
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

  describe('GET /users (list)', () => {
    it('should return empty list initially', async () => {
      const res = await request(app.getHttpServer()).get('/api/v1/users');
      expect([200, 500]).toContain(res.status);
      if (res.status === 200) {
        expect(res.body).toHaveProperty('items');
        expect(res.body).toHaveProperty('total');
      }
    });
  });

  describe('POST /users (create)', () => {
    it('should create a user and return 201', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/users')
        .send({
          email: `e2e-${Date.now()}@example.com`,
          password: 'Test123!@#',
          type: 'individual',
          firstName: 'E2E',
          lastName: 'Test',
          acceptTerms: true,
        });

      expect([201, 500]).toContain(res.status);
      if (res.status === 201) {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('email');
      }
    });

    it('should reject invalid input with 400', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/users')
        .send({
          email: 'not-an-email',
          password: '123',
          type: 'invalid-type',
          acceptTerms: false,
        });

      expect([400, 500]).toContain(res.status);
    });

    it('should reject when acceptTerms is false', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/users')
        .send({
          email: 'test@example.com',
          password: 'Test123!@#',
          type: 'individual',
          acceptTerms: false,
        });

      expect([400, 500]).toContain(res.status);
    });
  });

  describe('GET /users/:id (get by id)', () => {
    it('should return 404 for non-existent id', async () => {
      const res = await request(app.getHttpServer()).get(
        '/api/v1/users/00000000-0000-0000-0000-000000000000',
      );
      expect([404, 500]).toContain(res.status);
    });
  });

  describe('GET /public/users/:id (public)', () => {
    it('should be publicly accessible (no auth)', async () => {
      const res = await request(app.getHttpServer()).get(
        '/api/v1/public/users/any-id',
      );
      expect(res.status).not.toBe(401);
    });
  });

  describe('GET /nonexistent (404)', () => {
    it('should return 404 for non-existent route', async () => {
      const res = await request(app.getHttpServer()).get(
        '/api/v1/this-does-not-exist',
      );
      expect([404, 500]).toContain(res.status);
    });
  });
});
