/**
 * HTTP Auth E2E
 */
import { describe, it, expect, beforeAll, afterAll, jest } from '@jest/globals';
import { Test, type TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { CommandBus } from '@nestjs/cqrs';
import { AuthController } from '@interfaces/controllers/rest/auth.controller.js';

describe('HTTP /auth (E2E)', () => {
  let app: INestApplication;
  let commandBus: { execute: jest.Mock };

  beforeAll(async () => {
    commandBus = { execute: jest.fn<() => Promise<unknown>>() };
    commandBus.execute.mockResolvedValue({ success: true, user: { id: 'u1' } });

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: CommandBus, useValue: commandBus }],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: false }));
    await app.init();
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  describe('POST /auth/login', () => {
    it('should return 200 on valid credentials', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ identifier: 'user@vubon.com.bd', password: 'StrongP@ss123' });
      expect(res.status).toBe(200);
    });

    it('should return 4xx on empty body', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({});
      expect(res.status).toBeGreaterThanOrEqual(400);
    });
  });

  describe('POST /auth/register', () => {
    it('should return 201 on valid register', async () => {
      commandBus.execute.mockResolvedValue({
        success: true,
        requiresVerification: true,
        user: { id: 'u1' },
      });
      const res = await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'new@vubon.com.bd',
          password: 'StrongP@ss123',
          confirmPassword: 'StrongP@ss123',
          acceptTerms: true,
        });
      expect(res.status).toBe(201);
    });
  });

  describe('POST /auth/forgot-password', () => {
    it('should return 200', async () => {
      commandBus.execute.mockResolvedValue({ success: true, message: 'sent' });
      const res = await request(app.getHttpServer())
        .post('/auth/forgot-password')
        .send({ identifier: 'user@vubon.com.bd' });
      expect(res.status).toBe(200);
    });
  });

  describe('POST /auth/verify-email', () => {
    it('should return 200', async () => {
      commandBus.execute.mockResolvedValue({ success: true, verified: true });
      const res = await request(app.getHttpServer())
        .post('/auth/verify-email')
        .send({ email: 'user@vubon.com.bd', token: 'tok' });
      expect(res.status).toBe(200);
    });
  });

  describe('POST /auth/resend-verification', () => {
    it('should return 200', async () => {
      commandBus.execute.mockResolvedValue({ success: true, message: 'sent' });
      const res = await request(app.getHttpServer())
        .post('/auth/resend-verification')
        .send({ email: 'user@vubon.com.bd' });
      expect(res.status).toBe(200);
    });
  });
});
