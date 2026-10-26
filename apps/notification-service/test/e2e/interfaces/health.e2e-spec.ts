/**
 * Health API E2E Tests (lightweight)
 * @module notification-service/test/e2e/interfaces
 *
 * Direct controller invocation — covers behavior without HTTP server.
 * HTTP layer (routing, guards) covered by unit tests separately.
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { HealthController } from '@interfaces/controllers/rest/health.controller.js';

describe('Health API (e2e)', () => {
  let controller: HealthController;
  let mockPrisma: { isHealthy: jest.Mock };

  beforeEach(() => {
    mockPrisma = { isHealthy: jest.fn() };
    controller = new HealthController(mockPrisma as never);
  });

  it('GET /health returns healthy payload', async () => {
    mockPrisma.isHealthy.mockResolvedValueOnce(true);
    const payload = await controller.check();
    expect(payload.healthy).toBe(true);
    expect(payload.service).toBe('notification-service');
    expect(payload.dependencies).toHaveLength(1);
    expect(payload.dependencies[0]?.name).toBe('database');
  });

  it('GET /health returns unhealthy on DB error', async () => {
    mockPrisma.isHealthy.mockResolvedValueOnce(false);
    const payload = await controller.check();
    expect(payload.healthy).toBe(false);
    expect(payload.dependencies[0]?.message).toBe('DB check failed');
  });
});
