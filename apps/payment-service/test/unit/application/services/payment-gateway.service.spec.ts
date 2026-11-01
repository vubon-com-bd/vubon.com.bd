/**
 * PaymentGatewayService — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

jest.mock('@nestjs/common', () => ({
  Injectable: () => (target: unknown) => target,
  Inject: () => () => undefined,
  Logger: class {
    log(): void {}
    error(): void {}
    warn(): void {}
    debug(): void {}
    verbose(): void {}
  },
}));

import { PaymentGatewayService } from '@application/services/impl/payment-gateway.service';
import type { PaymentGatewayRepository } from '@domain/repositories/payment-gateway.repository.interface';

function makeMockGatewayEntity(provider = 'stripe', isActive = true, isMaintenance = false) {
  return {
    id: `gw-${provider}`,
    provider: { provider },
    displayName: `Gateway ${provider}`,
    isActive,
    isMaintenance,
    supportedCurrencies: ['BDT', 'USD'],
    minAmount: 1,
    maxAmount: 10000000,
    isAvailable: () => isActive && !isMaintenance,
  };
}

function makeMockRepo() {
  return {
    save: jest.fn(),
    findByIdVO: jest.fn(),
    findByProvider: jest.fn(),
    findAvailable: jest.fn(),
    findByCurrency: jest.fn(),
    findPaginated: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    softDelete: jest.fn(),
  };
}

describe('PaymentGatewayService', () => {
  let service: PaymentGatewayService;
  let mockRepo: ReturnType<typeof makeMockRepo>;

  beforeEach(() => {
    mockRepo = makeMockRepo();
    service = new PaymentGatewayService(mockRepo as unknown as PaymentGatewayRepository);
  });

  describe('getByProvider', () => {
    it('should return gateway when found', async () => {
      const gw = makeMockGatewayEntity('stripe');
      mockRepo.findByProvider.mockResolvedValue(gw);
      const result = await service.getByProvider('stripe');
      expect(result).toBe(gw);
    });

    it('should throw GatewayNotFoundError when not found', async () => {
      mockRepo.findByProvider.mockResolvedValue(null);
      await expect(service.getByProvider('stripe')).rejects.toThrow();
    });
  });

  describe('listAvailable', () => {
    it('should return available gateways', async () => {
      mockRepo.findAvailable.mockResolvedValue([
        makeMockGatewayEntity('stripe'),
        makeMockGatewayEntity('bkash'),
      ]);
      const result = await service.listAvailable();
      expect(result).toHaveLength(2);
    });
  });

  describe('listByCurrency', () => {
    it('should filter by currency', async () => {
      mockRepo.findByCurrency.mockResolvedValue([makeMockGatewayEntity('stripe')]);
      const result = await service.listByCurrency('USD');
      expect(result).toHaveLength(1);
      expect(mockRepo.findByCurrency).toHaveBeenCalledWith('USD');
    });
  });

  describe('list', () => {
    it('should paginate', async () => {
      mockRepo.findPaginated.mockResolvedValue({
        items: [makeMockGatewayEntity('stripe')],
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
      });
      const result = await service.list({ page: 1, limit: 10 });
      expect(result.items).toHaveLength(1);
      expect(result.total).toBe(1);
    });
  });

  describe('getHealth', () => {
    it('should return health DTO for each gateway', async () => {
      mockRepo.findAvailable.mockResolvedValue([
        makeMockGatewayEntity('stripe', true, false),
        makeMockGatewayEntity('bkash', true, true),
      ]);
      const result = await service.getHealth();
      expect(result).toHaveLength(2);
      expect(result[0]?.status).toBe('healthy');
      expect(result[1]?.status).toBe('degraded');
    });

    it('should handle empty gateway list', async () => {
      mockRepo.findAvailable.mockResolvedValue([]);
      const result = await service.getHealth();
      expect(result).toHaveLength(0);
    });
  });
});
