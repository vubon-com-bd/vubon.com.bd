/**
 * Auth Service E2E Tests
 * 
 * @module test/app.e2e-spec
 * 
 * @description
 * End-to-end tests for authentication service.
 * 
 * Enterprise Rules:
 * ✅ Pure test implementation
 * ✅ Comprehensive coverage
 * ✅ Test data isolation
 * ✅ All CRUD operations
 */

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/module/modules/app.module';

describe('AuthService (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  let refreshToken: string;
  let userId: string;
  let sessionId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // ============================================================
  // Health Check Tests
  // ============================================================

  describe('Health Check', () => {
    it('/health (GET) - should return health status', () => {
      return request(app.getHttpServer())
        .get('/health')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('status');
          expect(res.body.status).toBe('ok');
        });
    });
  });

  // ============================================================
  // Registration Tests
  // ============================================================

  describe('Registration', () => {
    const uniqueEmail = `test-${Date.now()}@example.com`;

    it('/auth/register (POST) - should register a new user', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: uniqueEmail,
          password: 'StrongP@ssw0rd123',
          fullName: 'Test User',
          acceptTerms: true,
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('userId');
          expect(res.body.email).toBe(uniqueEmail);
          expect(res.body.requiresEmailVerification).toBe(true);
          userId = res.body.userId;
        });
    });

    it('/auth/register (POST) - should fail with duplicate email', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: uniqueEmail,
          password: 'StrongP@ssw0rd123',
          fullName: 'Duplicate User',
          acceptTerms: true,
        })
        .expect(409)
        .expect((res) => {
          expect(res.body.message).toContain('already exists');
        });
    });

    it('/auth/register (POST) - should fail with weak password', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'weak@example.com',
          password: '123',
          fullName: 'Weak Password User',
          acceptTerms: true,
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('password');
        });
    });

    it('/auth/register (POST) - should fail without terms acceptance', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'noterms@example.com',
          password: 'StrongP@ssw0rd123',
          fullName: 'No Terms User',
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('terms');
        });
    });
  });

  // ============================================================
  // Login Tests
  // ============================================================

  describe('Login', () => {
    it('/auth/login (POST) - should login with valid credentials', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'admin@vubon.com.bd',
          password: 'Test123!@#',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('accessToken');
          expect(res.body).toHaveProperty('refreshToken');
          expect(res.body.user).toHaveProperty('email', 'admin@vubon.com.bd');
          accessToken = res.body.accessToken;
          refreshToken = res.body.refreshToken;
        });
    });

    it('/auth/login (POST) - should fail with invalid password', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'admin@vubon.com.bd',
          password: 'WrongPassword123',
        })
        .expect(401)
        .expect((res) => {
          expect(res.body.message).toContain('Invalid credentials');
        });
    });

    it('/auth/login (POST) - should fail with non-existent email', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'SomePassword123',
        })
        .expect(401);
    });

    it('/auth/login (POST) - should fail with invalid email format', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'invalid-email',
          password: 'SomePassword123',
        })
        .expect(400);
    });
  });

  // ============================================================
  // Token Refresh Tests
  // ============================================================

  describe('Token Refresh', () => {
    it('/auth/refresh (POST) - should refresh access token', () => {
      return request(app.getHttpServer())
        .post('/auth/refresh')
        .send({
          refreshToken,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('accessToken');
          expect(res.body).toHaveProperty('refreshToken');
          accessToken = res.body.accessToken;
          refreshToken = res.body.refreshToken;
        });
    });

    it('/auth/refresh (POST) - should fail with invalid refresh token', () => {
      return request(app.getHttpServer())
        .post('/auth/refresh')
        .send({
          refreshToken: 'invalid-token',
        })
        .expect(401);
    });
  });

  // ============================================================
  // Current User Tests
  // ============================================================

  describe('Current User', () => {
    it('/auth/me (GET) - should get current user profile', () => {
      return request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body).toHaveProperty('email');
          expect(res.body).toHaveProperty('fullName');
        });
    });

    it('/auth/me (GET) - should fail without token', () => {
      return request(app.getHttpServer())
        .get('/auth/me')
        .expect(401);
    });
  });

  // ============================================================
  // Change Password Tests
  // ============================================================

  describe('Change Password', () => {
    it('/user/change-password (PUT) - should change password', () => {
      return request(app.getHttpServer())
        .put('/user/change-password')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          currentPassword: 'Test123!@#',
          newPassword: 'NewStrongP@ssw0rd456',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.message).toContain('Password changed');
        });
    });

    it('/user/change-password (PUT) - should fail with wrong current password', () => {
      return request(app.getHttpServer())
        .put('/user/change-password')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          currentPassword: 'WrongPassword',
          newPassword: 'NewStrongP@ssw0rd456',
        })
        .expect(401);
    });
  });

  // ============================================================
  // Session Management Tests
  // ============================================================

  describe('Session Management', () => {
    it('/sessions (GET) - should list user sessions', () => {
      return request(app.getHttpServer())
        .get('/sessions')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          if (res.body.length > 0) {
            sessionId = res.body[0].id;
          }
        });
    });

    it('/sessions/:id (DELETE) - should revoke specific session', () => {
      if (!sessionId) return;
      return request(app.getHttpServer())
        .delete(`/sessions/${sessionId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);
    });

    it('/sessions (DELETE) - should revoke all sessions with confirmation', () => {
      return request(app.getHttpServer())
        .delete('/sessions')
        .query({ confirm: 'true', excludeCurrent: 'true' })
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);
    });
  });

  // ============================================================
  // Logout Tests
  // ============================================================

  describe('Logout', () => {
    it('/auth/logout (POST) - should logout user', () => {
      return request(app.getHttpServer())
        .post('/auth/logout')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ refreshToken })
        .expect(200)
        .expect((res) => {
          expect(res.body.message).toContain('Logged out');
        });
    });

    it('/auth/me (GET) - should fail after logout', () => {
      return request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(401);
    });
  });

  // ============================================================
  // Rate Limiting Tests
  // ============================================================

  describe('Rate Limiting', () => {
    it('should rate limit login attempts', async () => {
      const attempts = [];
      for (let i = 0; i < 6; i++) {
        attempts.push(
          request(app.getHttpServer())
            .post('/auth/login')
            .send({
              email: 'admin@vubon.com.bd',
              password: 'WrongPassword',
            }),
        );
      }
      
      const responses = await Promise.all(attempts);
      const hasRateLimit = responses.some(r => r.status === 429);
      expect(hasRateLimit).toBe(true);
    });
  });
});
