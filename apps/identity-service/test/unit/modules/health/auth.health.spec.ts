/**
 * AuthHealthIndicator tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { AuthHealthIndicator } from '@modules/health/auth.health.js';

function makePrismaMock() {
  return {
    isEngineAvailable: jest.fn(() => true),
    isHealthy: jest.fn<() => Promise<boolean>>().mockResolvedValue(true),
  };
}

function makeRedisMock() {
  return {
    isHealthy: jest.fn<() => Promise<boolean>>().mockResolvedValue(true),
  };
}

describe('AuthHealthIndicator', () => {
  let prisma: ReturnType<typeof makePrismaMock>;
  let redis: ReturnType<typeof makeRedisMock>;
  let indicator: AuthHealthIndicator;

  beforeEach(() => {
    prisma = makePrismaMock();
    redis = makeRedisMock();
    indicator = new AuthHealthIndicator(prisma as never, redis as never);
  });

  it('should report healthy when all deps healthy', async () => {
    const r = await indicator.check();
    expect(r.healthy).toBe(true);
    expect(r.service).toBe('identity-service');
    expect(r.dependencies.length).toBe(2);
  });

  it('should report unhealthy when DB down', async () => {
    prisma.isHealthy.mockResolvedValue(false);
    const r = await indicator.check();
    expect(r.healthy).toBe(false);
  });

  it('should report unhealthy when engine unavailable', async () => {
    prisma.isEngineAvailable.mockReturnValue(false);
    const r = await indicator.check();
    const dbDep = r.dependencies.find((d) => d.name === 'database');
    expect(dbDep?.healthy).toBe(false);
  });

  it('should report unhealthy when Redis down', async () => {
    redis.isHealthy.mockResolvedValue(false);
    const r = await indicator.check();
    const redisDep = r.dependencies.find((d) => d.name === 'redis');
    expect(redisDep?.healthy).toBe(false);
  });

  it('should catch DB errors', async () => {
    prisma.isHealthy.mockRejectedValue(new Error('DB crashed'));
    const r = await indicator.check();
    expect(r.healthy).toBe(false);
  });

  it('should catch Redis errors', async () => {
    redis.isHealthy.mockRejectedValue(new Error('Redis crashed'));
    const r = await indicator.check();
    expect(r.healthy).toBe(false);
  });

  it('should include uptimeSeconds', async () => {
    const r = await indicator.check();
    expect(r.uptimeSeconds).toBeGreaterThanOrEqual(0);
  });
});
