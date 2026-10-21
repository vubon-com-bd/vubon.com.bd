/**
 * HealthController — unit tests
 * @module payment-service/test/unit/interfaces/controllers/rest
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { HealthController } from '@interfaces/controllers/rest/health.controller';
import type { PaymentPrismaService } from '@infrastructure/persistence/prisma/prisma.service';

interface FakePrisma {
  isHealthy: jest.Mock;
}

describe('HealthController', () => {
  let prisma: FakePrisma;
  let controller: HealthController;

  beforeEach(() => {
    prisma = { isHealthy: jest.fn(async () => true) };
    controller = new HealthController(prisma as unknown as PaymentPrismaService);
  });

  describe('check', () => {
    it('reports healthy when DB healthy', async () => {
      const result = await controller.check();
      expect(result.service).toBe('payment-service');
      expect(result.healthy).toBe(true);
      expect(result.dependencies).toHaveLength(1);
      expect(result.dependencies[0].name).toBe('database');
      expect(result.dependencies[0].healthy).toBe(true);
    });

    it('reports unhealthy when DB fails', async () => {
      prisma.isHealthy.mockImplementation(async () => false);
      const result = await controller.check();
      expect(result.healthy).toBe(false);
      expect(result.dependencies[0].healthy).toBe(false);
    });

    it('catches thrown error and reports unhealthy', async () => {
      prisma.isHealthy.mockImplementation(async () => {
        throw new Error('boom');
      });
      const result = await controller.check();
      expect(result.healthy).toBe(false);
      expect(result.dependencies[0].message).toBe('boom');
    });
  });

  describe('ready', () => {
    it('ready when DB healthy', async () => {
      const result = await controller.ready();
      expect(result.ready).toBe(true);
    });

    it('not ready when DB fails', async () => {
      prisma.isHealthy.mockImplementation(async () => false);
      const result = await controller.ready();
      expect(result.ready).toBe(false);
    });

    it('not ready when DB throws', async () => {
      prisma.isHealthy.mockImplementation(async () => {
        throw new Error('db down');
      });
      const result = await controller.ready();
      expect(result.ready).toBe(false);
    });
  });
});
