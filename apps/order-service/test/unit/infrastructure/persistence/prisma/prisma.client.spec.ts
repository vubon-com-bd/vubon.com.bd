/**
 * Prisma Client Type Tests
 * @module order-service/test/unit/infrastructure/persistence/prisma
 */
import type {
  OrderPrismaClient,
  OrderPrismaClientOptions,
} from '@infrastructure/prisma/prisma.client.js';

describe('OrderPrismaClient Types', () => {
  describe('OrderPrismaClientOptions', () => {
    it('should accept empty options object', () => {
      const opts: OrderPrismaClientOptions = {};
      expect(opts).toEqual({});
    });

    it('should accept url option', () => {
      const opts: OrderPrismaClientOptions = {
        url: 'postgresql://localhost:5432/vubon_order',
      };
      expect(opts.url).toBe('postgresql://localhost:5432/vubon_order');
    });

    it('should accept log options', () => {
      const opts: OrderPrismaClientOptions = {
        log: ['query', 'warn', 'error'],
      };
      expect(opts.log).toEqual(['query', 'warn', 'error']);
    });

    it('should accept errorFormat option', () => {
      const opts: OrderPrismaClientOptions = { errorFormat: 'pretty' };
      expect(opts.errorFormat).toBe('pretty');
    });

    it('should accept all options together', () => {
      const opts: OrderPrismaClientOptions = {
        url: 'postgresql://localhost:5432/db',
        log: ['info'],
        errorFormat: 'colorless',
      };
      expect(opts).toBeDefined();
    });
  });

  describe('OrderPrismaClient', () => {
    it('should be a valid type alias (compile-time check)', () => {
      // Type-only assertion — presence verified at compile time
      const t: OrderPrismaClient | null = null;
      expect(t).toBeNull();
    });
  });
});
