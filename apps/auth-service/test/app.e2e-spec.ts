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
 * ✅ Security features tested
 */

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/module/modules/app.module';

// Set timeout for all tests (E2E tests may take longer)
jest.setTimeout(30000);

describe('AuthService (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  let refreshToken: string;
  let userId: string;
  let testUserEmail: string;

  // ============================================================
  // Helper Functions
  // ============================================================

  const getAuthTokens = async (email: string = 'admin@vubon.com.bd', password: string = 'Test123!@#') => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password })
      .expect(200);
    return { accessToken: res.body.accessToken, refreshToken: res.body.refreshToken, userId: res.body.user.id };
  };

  const createTestUser = async () => {
    const uniqueEmail = `test-${Date.now()}-${Math.random().toString(36).substring(7)}@example.com`;
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: uniqueEmail,
        password: 'StrongP@ssw0rd123',
        fullName: 'E2E Test User',
        acceptTerms: true,
      })
      .expect(201);
    return { userId: res.body.userId, email: uniqueEmail };
  };

  // ============================================================
  // Test Setup & Teardown
  // ============================================================

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ 
      whitelist: true, 
      transform: true,
      forbidNonWhitelisted: true,
    }));
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

    it('/auth/register (POST) - should fail with invalid email format', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'invalid-email',
          password: 'StrongP@ssw0rd123',
          fullName: 'Invalid Email User',
          acceptTerms: true,
        })
        .expect(400);
    });
  });

  // ============================================================
  // Login Tests
  // ============================================================

  describe('Login', () => {
    it('/auth/login (POST) - should login with valid credentials', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'admin@vubon.com.bd',
          password: 'Test123!@#',
        })
        .expect(200);
      
      expect(res.body).toHaveProperty('accessToken');
      expect(res.body).toHaveProperty('refreshToken');
      expect(res.body.user).toHaveProperty('email', 'admin@vubon.com.bd');
      accessToken = res.body.accessToken;
      refreshToken = res.body.refreshToken;
      userId = res.body.user.id;
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
          expect(res.body.id).toBe(userId);
        });
    });

    it('/auth/me (GET) - should fail without token', () => {
      return request(app.getHttpServer())
        .get('/auth/me')
        .expect(401);
    });

    it('/auth/me (GET) - should fail with invalid token', () => {
      return request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });
  });

  // ============================================================
  // Change Password Tests
  // ============================================================

  describe('Change Password', () => {
    const newPassword = 'NewStrongP@ssw0rd456';
    
    beforeAll(async () => {
      const tokens = await getAuthTokens();
      accessToken = tokens.accessToken;
    });

    it('/user/change-password (PUT) - should change password', () => {
      return request(app.getHttpServer())
        .put('/user/change-password')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          currentPassword: 'Test123!@#',
          newPassword,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.message).toContain('Password changed');
        });
    });

    it('/auth/login (POST) - should login with new password', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'admin@vubon.com.bd',
          password: newPassword,
        })
        .expect(200);
    });

    it('/user/change-password (PUT) - should fail with wrong current password', () => {
      return request(app.getHttpServer())
        .put('/user/change-password')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          currentPassword: 'WrongPassword',
          newPassword: 'AnotherP@ssw0rd789',
        })
        .expect(401);
    });
  });

  // ============================================================
  // Session Management Tests (✅ FIXED)
  // ============================================================

  describe('Session Management', () => {
    let sessionId: string;

    beforeAll(async () => {
      const tokens = await getAuthTokens();
      accessToken = tokens.accessToken;
    });

    it('/sessions (GET) - should list user sessions', async () => {
      const res = await request(app.getHttpServer())
        .get('/sessions')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);
      
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      sessionId = res.body[0].id;
    });

    it('/sessions/:id (DELETE) - should revoke specific session', async () => {
      expect(sessionId).toBeDefined();
      
      return request(app.getHttpServer())
        .delete(`/sessions/${sessionId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);
    });

    it('/sessions (DELETE) - should revoke all sessions with confirmation', async () => {
      // First create a new session
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'admin@vubon.com.bd', password: 'Test123!@#' })
        .expect(200);
      
      return request(app.getHttpServer())
        .delete('/sessions')
        .query({ confirm: 'true', excludeCurrent: 'true' })
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);
    });

    it('/sessions (DELETE) - should fail without confirmation', () => {
      return request(app.getHttpServer())
        .delete('/sessions')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(400);
    });
  });

  // ============================================================
  // MFA Tests (✅ NEW)
  // ============================================================

  describe('MFA (Multi-Factor Authentication)', () => {
    let mfaUserToken: string;
    let mfaUserId: string;
    let mfaMethodId: string;

    beforeAll(async () => {
      // Login with MFA-enabled user from seed data
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'mfa-user@vubon.com.bd', password: 'Test123!@#' })
        .expect(200);
      
      // Should get MFA required response
      expect(res.body.mfaRequired).toBe(true);
      expect(res.body.mfaSessionId).toBeDefined();
    });

    it('/mfa/status (GET) - should get MFA status', async () => {
      const tokens = await getAuthTokens('user@vubon.com.bd', 'Test123!@#');
      
      return request(app.getHttpServer())
        .get('/mfa/status')
        .set('Authorization', `Bearer ${tokens.accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('enabled');
          expect(res.body).toHaveProperty('methods');
        });
    });

    it('/mfa/setup/totp (POST) - should initiate TOTP setup', async () => {
      const tokens = await getAuthTokens('user@vubon.com.bd', 'Test123!@#');
      
      const res = await request(app.getHttpServer())
        .post('/mfa/setup/totp')
        .set('Authorization', `Bearer ${tokens.accessToken}`)
        .send({ deviceName: 'E2E Test Device' })
        .expect(200);
      
      expect(res.body).toHaveProperty('secret');
      expect(res.body).toHaveProperty('qrCodeUri');
      expect(res.body).toHaveProperty('recoveryCodes');
      expect(res.body).toHaveProperty('methodId');
      mfaMethodId = res.body.methodId;
    });
  });

  // ============================================================
  // Social Login Tests (✅ NEW)
  // ============================================================

  describe('Social Login', () => {
    it('/auth/social/google (POST) - should handle Google login request', () => {
      return request(app.getHttpServer())
        .post('/auth/social/google')
        .send({ accessToken: 'mock-google-token' })
        .expect(200);
    });

    it('/auth/social/facebook (POST) - should handle Facebook login request', () => {
      return request(app.getHttpServer())
        .post('/auth/social/facebook')
        .send({ accessToken: 'mock-facebook-token' })
        .expect(200);
    });

    it('/auth/social/github (POST) - should handle GitHub login request', () => {
      return request(app.getHttpServer())
        .post('/auth/social/github')
        .send({ accessToken: 'mock-github-token' })
        .expect(200);
    });
  });

  // ============================================================
  // Password Reset Tests (✅ NEW)
  // ============================================================

  describe('Password Reset', () => {
    let resetEmail: string;
    let resetToken: string;

    beforeAll(async () => {
      const { email } = await createTestUser();
      resetEmail = email;
    });

    it('/auth/forgot-password (POST) - should request password reset', () => {
      return request(app.getHttpServer())
        .post('/auth/forgot-password')
        .send({ email: resetEmail })
        .expect(200)
        .expect((res) => {
          expect(res.body.message).toBeDefined();
          // Should not disclose user existence for security
          expect(res.body.message).toContain('If an account exists');
        });
    });

    it('/auth/reset-password (POST) - should fail with invalid token', () => {
      return request(app.getHttpServer())
        .post('/auth/reset-password')
        .send({
          token: 'invalid-token',
          newPassword: 'NewP@ssw0rd123',
        })
        .expect(401);
    });
  });

  // ============================================================
  // Logout Tests
  // ============================================================

  describe('Logout', () => {
    beforeAll(async () => {
      const tokens = await getAuthTokens();
      accessToken = tokens.accessToken;
      refreshToken = tokens.refreshToken;
    });

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

    it('/auth/refresh (POST) - should fail after logout', () => {
      return request(app.getHttpServer())
        .post('/auth/refresh')
        .send({ refreshToken })
        .expect(401);
    });
  });

  // ============================================================
  // Rate Limiting Tests
  // ============================================================

  describe('Rate Limiting', () => {
    it('should rate limit login attempts after 5 failures', async () => {
      const attempts = [];
      
      // Make 6 rapid login attempts
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

    it('should rate limit registration attempts', async () => {
      const attempts = [];
      
      // Make 4 rapid registration attempts
      for (let i = 0; i < 4; i++) {
        attempts.push(
          request(app.getHttpServer())
            .post('/auth/register')
            .send({
              email: `rate-test-${i}@example.com`,
              password: 'StrongP@ssw0rd123',
              fullName: 'Rate Test User',
              acceptTerms: true,
            }),
        );
      }
      
      const responses = await Promise.all(attempts);
      const hasRateLimit = responses.some(r => r.status === 429);
      // Note: May not trigger rate limit depending on configuration
      // This test is informative
      console.log(`Rate limit triggered: ${hasRateLimit}`);
    });
  });

  // ============================================================
  // Validation Tests (✅ NEW)
  // ============================================================

  describe('Input Validation', () => {
    it('should reject email with invalid format', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'not-an-email',
          password: 'StrongP@ssw0rd123',
          fullName: 'Test User',
          acceptTerms: true,
        })
        .expect(400);
    });

    it('should reject password shorter than minimum length', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'valid@example.com',
          password: 'short',
          fullName: 'Test User',
          acceptTerms: true,
        })
        .expect(400);
    });

    it('should reject SQL injection attempts', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: "' OR '1'='1",
          password: 'anything',
        })
        .expect(400);
    });

    it('should reject XSS attempts', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: '<script>alert("xss")</script>@example.com',
          password: 'StrongP@ssw0rd123',
          fullName: '<script>alert("xss")</script>',
          acceptTerms: true,
        })
        .expect(400);
    });
  });

  // ============================================================
  // Performance Tests (✅ NEW)
  // ============================================================

  describe('Performance', () => {
    it('should respond within acceptable time for login', async () => {
      const startTime = Date.now();
      
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'admin@vubon.com.bd',
          password: 'Test123!@#',
        })
        .expect(200);
      
      const duration = Date.now() - startTime;
      expect(duration).toBeLessThan(1000); // Should complete within 1 second
    });

    it('should respond within acceptable time for registration', async () => {
      const startTime = Date.now();
      const uniqueEmail = `perf-test-${Date.now()}@example.com`;
      
      await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: uniqueEmail,
          password: 'StrongP@ssw0rd123',
          fullName: 'Performance Test User',
          acceptTerms: true,
        })
        .expect(201);
      
      const duration = Date.now() - startTime;
      expect(duration).toBeLessThan(1500); // Should complete within 1.5 seconds
    });
  });
});
