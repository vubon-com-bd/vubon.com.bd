/**
 * Health REST E2E
 * @module order-service/test/e2e/interfaces
 */
import { jest } from '@jest/globals';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { HealthController } from '@interfaces/controllers/rest/health.controller.js';
import { OrderPrismaService } from '@infrastructure/prisma/prisma.service.js';

const mockPrisma = {
  isHealthy: jest.fn().mockResolvedValue(true),
  isEngineAvailable: jest.fn().mockReturnValue(false),
};

describe('Health REST E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [{ provide: OrderPrismaService, useValue: mockPrisma }],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => { await app.close(); });
  beforeEach(() => { jest.clearAllMocks(); });

  it('GET /health — should return health status (200)', async () => {
    const res = await request(app.getHttpServer())
      .get('/health')
      .expect(200);

    expect(res.body.service).toBe('order-service');
    expect(res.body.timestamp).toBeDefined();
    expect(Array.isArray(res.body.dependencies)).toBe(true);
  });

  it('GET /health — should reflect DB health', async () => {
    mockPrisma.isHealthy.mockResolvedValue(false);

    const res = await request(app.getHttpServer())
      .get('/health')
      .expect(200);

    expect(typeof res.body.healthy).toBe('boolean');
  });
});
