/**
 * Health E2E — health + ready endpoints
 * @module payment-service/test/e2e/interfaces
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { HealthController } from '@interfaces/controllers/rest/health.controller';
import type { PaymentPrismaService } from '@infrastructure/persistence/prisma/prisma.service';

describe('Health E2E', () => {
  let prisma: { isHealthy: jest.Mock };
  let ctrl: HealthController;

  beforeEach(() => {
    prisma = { isHealthy: jest.fn(async () => true) };
    ctrl = new HealthController(prisma as unknown as PaymentPrismaService);
  });

  it('GET /health returns healthy when DB ok', async () => {
    const result = await ctrl.check();
    expect(result.service).toBe('payment-service');
    expect(result.healthy).toBe(true);
    expect(result.dependencies).toHaveLength(1);
    expect(result.dependencies[0].name).toBe('database');
    expect(result.dependencies[0].healthy).toBe(true);
    expect(result.timestamp).toBeDefined();
  });

  it('GET /health returns unhealthy when DB down', async () => {
    prisma.isHealthy.mockImplementation(async () => false);
    const result = await ctrl.check();
    expect(result.healthy).toBe(false);
  });

  it('GET /health handles DB throw', async () => {
    prisma.isHealthy.mockImplementation(async () => {
      throw new Error('connection refused');
    });
    const result = await ctrl.check();
    expect(result.healthy).toBe(false);
    expect(result.dependencies[0].message).toBe('connection refused');
  });

  it('GET /health/ready returns true when DB ok', async () => {
    const result = await ctrl.ready();
    expect(result.ready).toBe(true);
  });

  it('GET /health/ready returns false when DB down', async () => {
    prisma.isHealthy.mockImplementation(async () => false);
    const result = await ctrl.ready();
    expect(result.ready).toBe(false);
  });

  it('GET /health/ready returns false when DB throws', async () => {
    prisma.isHealthy.mockImplementation(async () => {
      throw new Error('down');
    });
    const result = await ctrl.ready();
    expect(result.ready).toBe(false);
  });
});
