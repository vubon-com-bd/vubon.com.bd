/**
 * NotificationHealthIndicator — Unit tests
 * @module notification-service/test/unit/modules/health
 *
 * Verifies:
 *  - Healthy path (DB + Redis OK)
 *  - DB degraded (engine unavailable)
 *  - DB exception
 *  - Redis exception
 *  - Both down → overall unhealthy
 *  - Uptime calculation
 *
 * ⚠️ Uses mock providers directly — avoids importing heavy PrismaService/RedisService
 */
import 'reflect-metadata';
import { jest } from '@jest/globals';
import { Test } from '@nestjs/testing';
import { NotificationHealthIndicator } from '@modules/health/notification.health.js';
import { NotificationPrismaService } from '@infrastructure/persistence/prisma/prisma.service.js';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';

interface PrismaMock {
  isEngineAvailable: jest.Mock<boolean, []>;
  isHealthy: jest.Mock<Promise<boolean>, []>;
}

interface RedisMock {
  isHealthy: jest.Mock<Promise<boolean>, []>;
}

describe('NotificationHealthIndicator', () => {
  let indicator: NotificationHealthIndicator;
  let prismaMock: PrismaMock;
  let redisMock: RedisMock;

  beforeEach(async () => {
    prismaMock = {
      isEngineAvailable: jest.fn().mockReturnValue(true),
      isHealthy: jest.fn().mockResolvedValue(true),
    };
    redisMock = {
      isHealthy: jest.fn().mockResolvedValue(true),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        NotificationHealthIndicator,
        { provide: NotificationPrismaService, useValue: prismaMock },
        { provide: RedisService, useValue: redisMock },
      ],
    }).compile();

    indicator = moduleRef.get(NotificationHealthIndicator);
  });

  describe('healthy path', () => {
    it('should return healthy when DB + Redis OK', async () => {
      const report = await indicator.check();
      expect(report.service).toBe('notification-service');
      expect(report.healthy).toBe(true);
      expect(report.dependencies).toHaveLength(2);
      expect(report.dependencies.every((d) => d.healthy)).toBe(true);
      expect(report.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
      expect(report.uptimeSeconds).toBeGreaterThanOrEqual(0);
    });

    it('should include database and redis dependencies', async () => {
      const report = await indicator.check();
      const names = report.dependencies.map((d) => d.name);
      expect(names).toContain('database');
      expect(names).toContain('redis');
    });
  });

  describe('DB degraded', () => {
    it('should report unhealthy when engine unavailable', async () => {
      prismaMock.isEngineAvailable.mockReturnValue(false);

      const report = await indicator.check();
      const dbDep = report.dependencies.find((d) => d.name === 'database');

      expect(dbDep).toBeDefined();
      expect(dbDep?.healthy).toBe(false);
      expect(dbDep?.message).toContain('Prisma engine unavailable');
      expect(report.healthy).toBe(false);
    });

    it('should not call isHealthy when engine unavailable', async () => {
      prismaMock.isEngineAvailable.mockReturnValue(false);
      await indicator.check();
      expect(prismaMock.isHealthy).not.toHaveBeenCalled();
    });
  });

  describe('DB unhealthy', () => {
    it('should report unhealthy when isHealthy returns false', async () => {
      prismaMock.isHealthy.mockResolvedValue(false);

      const report = await indicator.check();
      const dbDep = report.dependencies.find((d) => d.name === 'database');

      expect(dbDep?.healthy).toBe(false);
      expect(dbDep?.message).toBe('DB query failed');
    });
  });

  describe('DB exception', () => {
    it('should catch exception and report message', async () => {
      prismaMock.isHealthy.mockRejectedValue(new Error('connection refused'));

      const report = await indicator.check();
      const dbDep = report.dependencies.find((d) => d.name === 'database');

      expect(dbDep?.healthy).toBe(false);
      expect(dbDep?.message).toBe('connection refused');
      expect(report.healthy).toBe(false);
    });

    it('should handle non-Error thrown', async () => {
      prismaMock.isHealthy.mockRejectedValue('string error');

      const report = await indicator.check();
      const dbDep = report.dependencies.find((d) => d.name === 'database');

      expect(dbDep?.healthy).toBe(false);
      expect(dbDep?.message).toBe('unknown');
    });
  });

  describe('Redis exception', () => {
    it('should catch Redis exception and report', async () => {
      redisMock.isHealthy.mockRejectedValue(new Error('redis down'));

      const report = await indicator.check();
      const redisDep = report.dependencies.find((d) => d.name === 'redis');

      expect(redisDep?.healthy).toBe(false);
      expect(redisDep?.message).toBe('redis down');
      expect(report.healthy).toBe(false);
    });

    it('should handle Redis unhealthy (ping failed)', async () => {
      redisMock.isHealthy.mockResolvedValue(false);

      const report = await indicator.check();
      const redisDep = report.dependencies.find((d) => d.name === 'redis');

      expect(redisDep?.healthy).toBe(false);
      expect(redisDep?.message).toBe('Redis ping failed');
    });
  });

  describe('both down', () => {
    it('should report unhealthy when both DB + Redis down', async () => {
      prismaMock.isHealthy.mockResolvedValue(false);
      redisMock.isHealthy.mockResolvedValue(false);

      const report = await indicator.check();
      expect(report.healthy).toBe(false);
      expect(report.dependencies).toHaveLength(2);
    });
  });

  describe('uptime', () => {
    it('should report non-negative uptime', async () => {
      const report = await indicator.check();
      expect(report.uptimeSeconds).toBeGreaterThanOrEqual(0);
      expect(Number.isInteger(report.uptimeSeconds)).toBe(true);
    });
  });
});
