/**
 * HTTP Health E2E
 */
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { Test, type TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { HealthController } from '@interfaces/controllers/rest/health.controller.js';
import { AuthPrismaService } from '@infrastructure/persistence/prisma/prisma.service.js';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';

describe('HTTP /health (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: AuthPrismaService,
          useValue: {
            isEngineAvailable: () => true,
            isHealthy: async () => true,
          },
        },
        {
          provide: RedisService,
          useValue: {
            isHealthy: async () => true,
          },
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  it('GET /health → 200 with healthy=true', async () => {
    const res = await request(app.getHttpServer()).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.healthy).toBe(true);
  });

  it('GET /health → service=identity-service', async () => {
    const res = await request(app.getHttpServer()).get('/health');
    expect(res.body.service).toBe('identity-service');
  });

  it('GET /health → dependencies array', async () => {
    const res = await request(app.getHttpServer()).get('/health');
    expect(Array.isArray(res.body.dependencies)).toBe(true);
  });
});
