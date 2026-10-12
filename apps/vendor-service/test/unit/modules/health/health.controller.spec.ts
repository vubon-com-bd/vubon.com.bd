import { jest } from '@jest/globals';
/**
 * HealthController — unit tests
 */
import { HealthController } from '../../../../src/module/modules/health/health.controller.js';

describe('HealthController', () => {
  let controller: HealthController;
  let mockPrisma: { isHealthy: jest.Mock };
  let mockRedis: { isHealthy: jest.Mock };

  beforeEach(() => {
    mockPrisma = { isHealthy: jest.fn().mockResolvedValue(true) };
    mockRedis = { isHealthy: jest.fn().mockResolvedValue(true) };
    controller = new HealthController(mockPrisma as never, mockRedis as never);
  });

  describe('check()', () => {
    it('returns ok when both healthy', async () => {
      const r = (await controller.check()) as { status: string; checks: unknown };
      expect(r.status).toBe('ok');
    });

    it('returns degraded when db unhealthy', async () => {
      mockPrisma.isHealthy.mockResolvedValue(false);
      const r = (await controller.check()) as { status: string };
      expect(r.status).toBe('degraded');
    });

    it('returns degraded when redis unhealthy', async () => {
      mockRedis.isHealthy.mockResolvedValue(false);
      const r = (await controller.check()) as { status: string };
      expect(r.status).toBe('degraded');
    });

    it('handles db error gracefully', async () => {
      mockPrisma.isHealthy.mockRejectedValue(new Error('db error'));
      const r = (await controller.check()) as { status: string };
      expect(r.status).toBe('degraded');
    });

    it('handles redis error gracefully', async () => {
      mockRedis.isHealthy.mockRejectedValue(new Error('redis error'));
      const r = (await controller.check()) as { status: string };
      expect(r.status).toBe('degraded');
    });
  });

  describe('live()', () => {
    it('returns live status', () => {
      const r = controller.live() as { status: string };
      expect(r.status).toBe('live');
    });
  });

  describe('ready()', () => {
    it('returns ready when db healthy', async () => {
      const r = (await controller.ready()) as { status: string };
      expect(r.status).toBe('ready');
    });

    it('returns not-ready when db unhealthy', async () => {
      mockPrisma.isHealthy.mockResolvedValue(false);
      const r = (await controller.ready()) as { status: string };
      expect(r.status).toBe('not-ready');
    });
  });
});
