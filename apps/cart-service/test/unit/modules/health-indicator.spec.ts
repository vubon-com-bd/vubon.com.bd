/**
 * CartHealthIndicator — Unit Tests
 */
import { describe, it, expect, jest } from '@jest/globals';
import { CartHealthIndicator } from '../../../src/module/modules/health/cart.health.js';

const makePrisma = (healthy: boolean, engineAvailable = true) => ({
  isHealthy: jest.fn(async () => healthy),
  isEngineAvailable: jest.fn(() => engineAvailable),
});

const makeRedis = (healthy: boolean) => ({
  isHealthy: jest.fn(async () => healthy),
});

describe('CartHealthIndicator', () => {
  it('should return healthy when both deps up', async () => {
    const ind = new CartHealthIndicator(
      makePrisma(true) as never,
      makeRedis(true) as never,
    );
    const report = await ind.check();
    expect(report.healthy).toBe(true);
    expect(report.dependencies.length).toBe(2);
  });

  it('should return unhealthy when DB down', async () => {
    const ind = new CartHealthIndicator(
      makePrisma(false) as never,
      makeRedis(true) as never,
    );
    const report = await ind.check();
    expect(report.healthy).toBe(false);
    const db = report.dependencies.find((d) => d.name === 'database');
    expect(db?.healthy).toBe(false);
  });

  it('should return unhealthy when Redis down', async () => {
    const ind = new CartHealthIndicator(
      makePrisma(true) as never,
      makeRedis(false) as never,
    );
    const report = await ind.check();
    expect(report.healthy).toBe(false);
    const redis = report.dependencies.find((d) => d.name === 'redis');
    expect(redis?.healthy).toBe(false);
  });

  it('should handle degraded Prisma engine', async () => {
    const ind = new CartHealthIndicator(
      makePrisma(false, false) as never,
      makeRedis(true) as never,
    );
    const report = await ind.check();
    const db = report.dependencies.find((d) => d.name === 'database');
    expect(db?.healthy).toBe(false);
    expect(db?.message).toContain('unavailable');
  });

  it('should include service name + timestamp', async () => {
    const ind = new CartHealthIndicator(
      makePrisma(true) as never,
      makeRedis(true) as never,
    );
    const report = await ind.check();
    expect(report.service).toBe('cart-service');
    expect(report.timestamp).toBeDefined();
    expect(report.uptimeSeconds).toBeGreaterThanOrEqual(0);
  });

  it('should handle Prisma exception gracefully', async () => {
    const prisma = {
      isHealthy: jest.fn(async () => {
        throw new Error('DB connection lost');
      }),
      isEngineAvailable: jest.fn(() => true),
    };
    const ind = new CartHealthIndicator(prisma as never, makeRedis(true) as never);
    const report = await ind.check();
    expect(report.healthy).toBe(false);
    const db = report.dependencies.find((d) => d.name === 'database');
    expect(db?.message).toContain('DB connection lost');
  });
});
