/**
 * OrderPrismaService Tests
 * @module order-service/test/unit/infrastructure/persistence/prisma
 *
 * ⚠️ Termux ARM64 — Prisma engine mocked in test/setup.ts
 * PrismaEngineUnavailableError is order-service-specific class
 */
import {
  OrderPrismaService,
  PrismaEngineUnavailableError,
} from '@infrastructure/prisma/prisma.service.js';

describe('PrismaEngineUnavailableError', () => {
  it('should have code PRISMA_ENGINE_UNAVAILABLE', () => {
    const err = new PrismaEngineUnavailableError();
    expect(err.code).toBe('PRISMA_ENGINE_UNAVAILABLE');
  });

  it('should have httpStatus 503', () => {
    const err = new PrismaEngineUnavailableError();
    expect(err.httpStatus).toBe(503);
  });

  it('should have correct name', () => {
    const err = new PrismaEngineUnavailableError();
    expect(err.name).toBe('PrismaEngineUnavailableError');
  });

  it('should have descriptive message', () => {
    const err = new PrismaEngineUnavailableError();
    expect(err.message).toContain('Prisma engine unavailable');
  });

  it('should be instanceof Error', () => {
    const err = new PrismaEngineUnavailableError();
    expect(err).toBeInstanceOf(Error);
  });
});

describe('OrderPrismaService (mocked engine)', () => {
  let service: OrderPrismaService;

  beforeEach(() => {
    service = new OrderPrismaService();
  });

  describe('instantiation', () => {
    it('should construct without throwing', () => {
      expect(service).toBeInstanceOf(OrderPrismaService);
    });

    it('should expose isEngineAvailable method', () => {
      expect(typeof service.isEngineAvailable).toBe('function');
    });

    it('should expose getModel method', () => {
      expect(typeof service.getModel).toBe('function');
    });
  });

  describe('isEngineAvailable', () => {
    it('should return a boolean', () => {
      expect(typeof service.isEngineAvailable()).toBe('boolean');
    });

    it('should return false with mocked kernel', () => {
      expect(service.isEngineAvailable()).toBe(false);
    });
  });

  describe('isHealthy', () => {
    it('should return a boolean', async () => {
      const healthy = await service.isHealthy();
      expect(typeof healthy).toBe('boolean');
    });

    it('should return false with mocked kernel', async () => {
      expect(await service.isHealthy()).toBe(false);
    });
  });

  describe('getModel', () => {
    it('should throw when engine unavailable', () => {
      expect(() => service.getModel('order')).toThrow();
    });
  });

  describe('lifecycle hooks', () => {
    it('should not throw onModuleInit', async () => {
      await expect(service.onModuleInit()).resolves.not.toThrow();
    });

    it('should not throw onModuleDestroy', async () => {
      await expect(service.onModuleDestroy()).resolves.not.toThrow();
    });
  });
});
