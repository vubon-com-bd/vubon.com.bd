/**
 * PaymentMethodService — Unit Tests (full branch coverage)
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

import { PaymentMethodService } from '@application/services/impl/payment-method.service';
import {
  PaymentMethodAddError,
  PaymentMethodNotFoundApplicationError,
  PaymentMethodUpdateError,
  PaymentMethodDeleteError,
  SetDefaultMethodError,
} from '@application/errors/method.errors';
import type { PaymentMethodRepository } from '@domain/repositories/payment-method.repository.interface';
import { PaymentMethodEntity } from '@domain/entities/payment-method.entity';
import { PaymentMethodIdVO } from '@domain/primitives/payment-method-id.vo';
import { PaymentMethodTypeVO } from '@domain/primitives/payment-method-type.vo';
import { PaymentMethodProviderVO } from '@domain/primitives/payment-method-provider.vo';

const METHOD_ID = '123e4567-e89b-42d3-a456-426614174099';

function makeMockRepo() {
  return {
    save: jest.fn(),
    findByIdVO: jest.fn(),
    findActive: jest.fn(),
    findByType: jest.fn(),
    findByProvider: jest.fn(),
    findPaginated: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    softDelete: jest.fn(),
  };
}

function makeEntity() {
  return PaymentMethodEntity.create({
    id: PaymentMethodIdVO.create(METHOD_ID),
    now: '2025-01-15T10:00:00.000Z',
    props: {
      type: PaymentMethodTypeVO.create('card', 'online'),
      provider: PaymentMethodProviderVO.create('stripe', 'production'),
      label: 'Visa · 4242',
      isActive: true,
    },
  });
}

describe('PaymentMethodService', () => {
  let service: PaymentMethodService;
  let mockRepo: ReturnType<typeof makeMockRepo>;

  beforeEach(() => {
    mockRepo = makeMockRepo();
    service = new PaymentMethodService(mockRepo as unknown as PaymentMethodRepository);
  });

  describe('add', () => {
    it('should add card method', async () => {
      mockRepo.save.mockImplementation(async (e: unknown) => e);
      const result = await service.add(
        {
          method: 'card' as never,
          type: 'online' as never,
          gateway: 'stripe' as never,
          last4: '4242',
        },
        'user-1',
      );
      expect(result.method).toBe('card');
      expect(result.type).toBe('online');
      expect(result.gateway).toBe('stripe');
    });

    it('should add non-gateway method', async () => {
      mockRepo.save.mockImplementation(async (e: unknown) => e);
      const result = await service.add(
        { method: 'cash_on_delivery' as never, type: 'offline' as never },
        'user-1',
      );
      expect(result.method).toBe('cash_on_delivery');
      expect(result.gateway).toBeUndefined();
    });

    it('should throw PaymentMethodAddError on invalid method', async () => {
      await expect(
        service.add({ method: 'invalid' as never, type: 'online' as never }, 'user-1'),
      ).rejects.toThrow(PaymentMethodAddError);
    });

    it('should throw PaymentMethodAddError when online method lacks gateway', async () => {
      await expect(
        service.add({ method: 'card' as never, type: 'online' as never }, 'user-1'),
      ).rejects.toThrow(PaymentMethodAddError);
    });
  });

  describe('update', () => {
    it('should rename label', async () => {
      mockRepo.findByIdVO.mockResolvedValue(makeEntity());
      mockRepo.save.mockImplementation(async (e: unknown) => e);
      const result = await service.update(
        { methodId: METHOD_ID, label: 'Updated' },
        'user-1',
      );
      expect(result.label).toBe('Updated');
    });

    it('should skip rename when no label provided', async () => {
      mockRepo.findByIdVO.mockResolvedValue(makeEntity());
      mockRepo.save.mockImplementation(async (e: unknown) => e);
      const result = await service.update({ methodId: METHOD_ID }, 'user-1');
      expect(result.id).toBe(METHOD_ID);
    });

    it('should throw not found', async () => {
      mockRepo.findByIdVO.mockResolvedValue(null);
      await expect(
        service.update({ methodId: METHOD_ID, label: 'X' }, 'user-1'),
      ).rejects.toThrow(PaymentMethodNotFoundApplicationError);
    });

    it('should wrap as PaymentMethodUpdateError on DB fail', async () => {
      mockRepo.findByIdVO.mockResolvedValue(makeEntity());
      mockRepo.save.mockRejectedValue(new Error('DB'));
      await expect(
        service.update({ methodId: METHOD_ID, label: 'X' }, 'user-1'),
      ).rejects.toThrow(PaymentMethodUpdateError);
    });
  });

  describe('remove', () => {
    it('should soft-delete', async () => {
      mockRepo.findByIdVO.mockResolvedValue(makeEntity());
      mockRepo.softDelete.mockResolvedValue(undefined);
      await service.remove({ methodId: METHOD_ID }, 'user-1');
      expect(mockRepo.softDelete).toHaveBeenCalled();
    });

    it('should throw not found', async () => {
      mockRepo.findByIdVO.mockResolvedValue(null);
      await expect(service.remove({ methodId: METHOD_ID }, 'user-1')).rejects.toThrow(
        PaymentMethodNotFoundApplicationError,
      );
    });

    it('should wrap as PaymentMethodDeleteError on DB fail', async () => {
      mockRepo.findByIdVO.mockResolvedValue(makeEntity());
      mockRepo.softDelete.mockRejectedValue(new Error('DB'));
      await expect(service.remove({ methodId: METHOD_ID }, 'user-1')).rejects.toThrow(
        PaymentMethodDeleteError,
      );
    });
  });

  describe('setDefault', () => {
    it('should activate entity', async () => {
      mockRepo.findByIdVO.mockResolvedValue(makeEntity());
      mockRepo.save.mockImplementation(async (e: unknown) => e);
      const result = await service.setDefault({ methodId: METHOD_ID }, 'user-1');
      expect(result.isActive).toBe(true);
    });

    it('should throw not found', async () => {
      mockRepo.findByIdVO.mockResolvedValue(null);
      await expect(service.setDefault({ methodId: METHOD_ID }, 'user-1')).rejects.toThrow(
        PaymentMethodNotFoundApplicationError,
      );
    });

    it('should wrap as SetDefaultMethodError', async () => {
      mockRepo.findByIdVO.mockResolvedValue(makeEntity());
      mockRepo.save.mockRejectedValue(new Error('DB'));
      await expect(service.setDefault({ methodId: METHOD_ID }, 'user-1')).rejects.toThrow(
        SetDefaultMethodError,
      );
    });
  });

  describe('getById', () => {
    it('should return DTO', async () => {
      mockRepo.findByIdVO.mockResolvedValue(makeEntity());
      const dto = await service.getById(METHOD_ID);
      expect(dto.id).toBe(METHOD_ID);
    });

    it('should throw not found', async () => {
      mockRepo.findByIdVO.mockResolvedValue(null);
      await expect(service.getById(METHOD_ID)).rejects.toThrow(
        PaymentMethodNotFoundApplicationError,
      );
    });
  });

  describe('listByUser', () => {
    it('should paginate empty', async () => {
      mockRepo.findPaginated.mockResolvedValue({
        items: [], total: 0, page: 1, limit: 10, totalPages: 0,
      });
      const result = await service.listByUser('user-1', { page: 1, limit: 10 });
      expect(result.total).toBe(0);
    });

    it('should paginate one', async () => {
      mockRepo.findPaginated.mockResolvedValue({
        items: [makeEntity()], total: 1, page: 1, limit: 10, totalPages: 1,
      });
      const result = await service.listByUser('user-1', { page: 1, limit: 10 });
      expect(result.items).toHaveLength(1);
    });
  });
});
