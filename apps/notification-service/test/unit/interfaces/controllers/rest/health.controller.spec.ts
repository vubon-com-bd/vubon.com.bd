/**
 * HealthController Tests
 * @module notification-service/test/unit/interfaces/controllers/rest
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { HealthController } from '@interfaces/controllers/rest/health.controller.js';

describe('HealthController', () => {
  let controller: HealthController;
  let mockPrisma: { isHealthy: jest.Mock };

  beforeEach(() => {
    mockPrisma = { isHealthy: jest.fn() };
    controller = new HealthController(mockPrisma as never);
  });

  it('returns healthy when DB is up', async () => {
    mockPrisma.isHealthy.mockResolvedValueOnce(true);
    const result = await controller.check();
    expect(result.healthy).toBe(true);
    expect(result.service).toBe('notification-service');
    expect(result.dependencies).toHaveLength(1);
    expect(result.dependencies[0]?.name).toBe('database');
    expect(result.dependencies[0]?.healthy).toBe(true);
  });

  it('returns unhealthy when DB check returns false', async () => {
    mockPrisma.isHealthy.mockResolvedValueOnce(false);
    const result = await controller.check();
    expect(result.healthy).toBe(false);
    expect(result.dependencies[0]?.healthy).toBe(false);
    expect(result.dependencies[0]?.message).toBe('DB check failed');
  });

  it('returns unhealthy when DB throws', async () => {
    mockPrisma.isHealthy.mockRejectedValueOnce(new Error('connection refused'));
    const result = await controller.check();
    expect(result.healthy).toBe(false);
    expect(result.dependencies[0]?.message).toBe('connection refused');
  });

  it('handles non-Error throw in DB check', async () => {
    mockPrisma.isHealthy.mockRejectedValueOnce('string-error');
    const result = await controller.check();
    expect(result.healthy).toBe(false);
    expect(result.dependencies[0]?.message).toBe('unknown');
  });

  it('includes ISO timestamp', async () => {
    mockPrisma.isHealthy.mockResolvedValueOnce(true);
    const result = await controller.check();
    expect(result.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });
});
