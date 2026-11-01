/**
 * Health Controller — E2E Tests
 * @module test/e2e/interfaces
 */
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import { HealthController } from '../../../src/module/interfaces/controllers/rest/health.controller.js';
import { CartPrismaService } from '../../../src/module/infrastructure/persistence/prisma/prisma.service.js';

describe('HealthController (e2e)', () => {
  let app: INestApplication;
  let controller: HealthController;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: CartPrismaService,
          useValue: {
            isHealthy: async () => true,
            isEngineAvailable: () => true,
          },
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    controller = moduleRef.get(HealthController);
  }, 30_000);

  afterAll(async () => {
    await app?.close();
  });

  it('should return health report', async () => {
    const result = await controller.check();
    expect(result.service).toBe('cart-service');
    expect(result.healthy).toBe(true);
    expect(result.dependencies).toBeDefined();
    expect(result.timestamp).toBeDefined();
  });

  it('should include database dependency', async () => {
    const result = await controller.check();
    const db = result.dependencies.find((d) => d.name === 'database');
    expect(db).toBeDefined();
    expect(db?.healthy).toBe(true);
  });
});
