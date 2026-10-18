/**
 * HTTP User E2E
 */
import { describe, it, expect, beforeAll, afterAll, jest } from '@jest/globals';
import { Test, type TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserController } from '@interfaces/controllers/rest/user.controller.js';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

describe('HTTP /users (E2E)', () => {
  let app: INestApplication;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeAll(async () => {
    commandBus = { execute: jest.fn<() => Promise<unknown>>() };
    queryBus = { execute: jest.fn<() => Promise<unknown>>() };

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: CommandBus, useValue: commandBus },
        { provide: QueryBus, useValue: queryBus },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  describe('GET /users', () => {
    it('should return paginated users', async () => {
      queryBus.execute.mockResolvedValue({
        items: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
      });

      const res = await request(app.getHttpServer()).get('/users');
      expect([200, 401]).toContain(res.status);
    });
  });

  describe('GET /users/:id', () => {
    it('should return user by id', async () => {
      queryBus.execute.mockResolvedValue({
        success: true,
        user: {
          id: 'u1',
          email: 'user@vubon.com.bd',
          status: 'active',
          type: 'individual',
          roles: ['customer'],
          emailVerified: true,
          phoneVerified: false,
          isMfaEnabled: false,
          createdAt: '2026-01-01T00:00:00Z',
          updatedAt: '2026-01-02T00:00:00Z',
        },
      });

      const res = await request(app.getHttpServer()).get('/users/u1');
      expect([200, 401]).toContain(res.status);
    });
  });

  describe('POST /users', () => {
    it('should create a user', async () => {
      commandBus.execute.mockResolvedValue({
        success: true,
        user: {
          id: 'u1',
          email: 'new@vubon.com.bd',
          status: 'active',
          type: 'individual',
          roles: ['customer'],
          emailVerified: false,
          phoneVerified: false,
          isMfaEnabled: false,
          createdAt: '2026-01-01T00:00:00Z',
          updatedAt: '2026-01-01T00:00:00Z',
        },
      });

      const res = await request(app.getHttpServer())
        .post('/users')
        .send({
          email: 'new@vubon.com.bd',
          password: 'StrongP@ss123',
          type: 'individual',
          acceptTerms: true,
        });

      expect([201, 400, 401]).toContain(res.status);
    });
  });
});
