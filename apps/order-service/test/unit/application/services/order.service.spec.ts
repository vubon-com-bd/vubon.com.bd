/**
 * OrderService — Unit Tests
 * @module order-service/test/unit/application/services
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { OrderService } from '@application/services/impl/order.service.js';
import type { OrderRepository } from '@domain/repositories/order.repository.interface.js';
import { OrderNotFoundApplicationError, OrderNumberNotFoundApplicationError, OrderInitiationError } from '@application/errors/order.errors.js';
import { makeOrderEntityStub, FIXTURE_ID, FIXTURE_ID_2, FIXTURE_NOW } from '@fixtures/application/entity-factories.js';

function makeRepo(): jest.Mocked<OrderRepository> {
  return {
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    findByIdVO: jest.fn(),
    findByOrderNumber: jest.fn(),
    findByCustomer: jest.fn(),
    findByStatus: jest.fn(),
    findPaginated: jest.fn(),
    getStats: jest.fn(),
    findStalePending: jest.fn(),
    findExpiredUnconfirmed: jest.fn(),
    findAwaitingFulfillment: jest.fn(),
    softDelete: jest.fn(),
  } as unknown as jest.Mocked<OrderRepository>;
}

describe('OrderService', () => {
  let service: OrderService;
  let repo: jest.Mocked<OrderRepository>;

  let mockEventBridge: { publishFromEntity: jest.Mock };

  beforeEach(() => {
    repo = makeRepo();
    mockEventBridge = {
      publishFromEntity: jest.fn().mockResolvedValue(undefined),
    };
    service = new OrderService(repo, mockEventBridge as never);
  });

  // ═══════════════ COMMANDS ═══════════════
  describe('create', () => {
    it('throws OrderInitiationError (domain factory pending)', async () => {
      const dto = { customerId: FIXTURE_ID, items: [] } as never;
      await expect(service.create(dto, 'user-1')).rejects.toThrow(OrderInitiationError);
    });
  });

  describe('update', () => {
    it('loads then saves', async () => {
      const entity = makeOrderEntityStub();
      repo.findByIdVO.mockResolvedValue(entity);
      repo.save.mockResolvedValue(entity);
      const dto = { orderId: FIXTURE_ID } as never;
      const result = await service.update(dto, 'admin');
      expect(repo.findByIdVO).toHaveBeenCalled();
      expect(repo.save).toHaveBeenCalled();
      expect(result.id).toBe(FIXTURE_ID);
    });

    it('throws NotFound when entity missing', async () => {
      repo.findByIdVO.mockResolvedValue(null);
      await expect(service.update({ orderId: FIXTURE_ID } as never)).rejects.toThrow(OrderNotFoundApplicationError);
    });
  });

  describe('delete', () => {
    it('soft deletes', async () => {
      repo.findByIdVO.mockResolvedValue(makeOrderEntityStub());
      await service.delete({ orderId: FIXTURE_ID } as never);
      expect(repo.softDelete).toHaveBeenCalledWith(FIXTURE_ID, undefined);
    });
  });

  describe('confirm', () => {
    it('calls entity.confirm then saves', async () => {
      const entity = makeOrderEntityStub();
      (entity as unknown as { confirm: () => void }).confirm = jest.fn();
      repo.findByIdVO.mockResolvedValue(entity);
      repo.save.mockResolvedValue(entity);
      await service.confirm({ orderId: FIXTURE_ID } as never, 'admin-1');
      expect((entity as unknown as { confirm: () => void }).confirm).toHaveBeenCalledWith('admin-1');
      expect(repo.save).toHaveBeenCalled();
    });
  });

  describe('hold', () => {
    it('saves entity', async () => {
      const entity = makeOrderEntityStub();
      repo.findByIdVO.mockResolvedValue(entity);
      repo.save.mockResolvedValue(entity);
      await service.hold({ orderId: FIXTURE_ID } as never);
      expect(repo.save).toHaveBeenCalled();
    });
  });

  describe('release', () => {
    it('saves entity', async () => {
      const entity = makeOrderEntityStub();
      repo.findByIdVO.mockResolvedValue(entity);
      repo.save.mockResolvedValue(entity);
      await service.release({ orderId: FIXTURE_ID } as never);
      expect(repo.save).toHaveBeenCalled();
    });
  });

  // ═══════════════ QUERIES ═══════════════
  describe('getById', () => {
    it('returns mapped DTO', async () => {
      repo.findByIdVO.mockResolvedValue(makeOrderEntityStub());
      const result = await service.getById(FIXTURE_ID);
      expect(result.id).toBe(FIXTURE_ID);
      expect(result.orderNumber).toBe('ORD-2024-000123');
    });

    it('throws NotFound when missing', async () => {
      repo.findByIdVO.mockResolvedValue(null);
      await expect(service.getById(FIXTURE_ID)).rejects.toThrow(OrderNotFoundApplicationError);
    });
  });

  describe('getByNumber', () => {
    it('returns mapped DTO', async () => {
      repo.findByOrderNumber.mockResolvedValue(makeOrderEntityStub());
      const result = await service.getByNumber('ORD-2024-000123');
      expect(result.orderNumber).toBe('ORD-2024-000123');
    });

    it('throws NumberNotFound when missing', async () => {
      repo.findByOrderNumber.mockResolvedValue(null);
      await expect(service.getByNumber('ORD-999')).rejects.toThrow(OrderNumberNotFoundApplicationError);
    });
  });

  describe('getPublic', () => {
    it('returns public DTO', async () => {
      repo.findByIdVO.mockResolvedValue(makeOrderEntityStub());
      const result = await service.getPublic(FIXTURE_ID);
      expect(result.id).toBe(FIXTURE_ID);
    });
  });

  describe('getDetail', () => {
    it('returns detail wrapper', async () => {
      repo.findByIdVO.mockResolvedValue(makeOrderEntityStub());
      const result = await service.getDetail(FIXTURE_ID);
      expect(result.order.id).toBe(FIXTURE_ID);
    });
  });

  describe('list', () => {
    it('returns paginated', async () => {
      repo.findPaginated.mockResolvedValue({
        items: [makeOrderEntityStub()],
        total: 1,
        page: 1,
        limit: 10,
      });
      const result = await service.list({ page: 1, limit: 10 });
      expect(result.items.length).toBe(1);
      expect(result.totalPages).toBe(1);
    });
  });

  describe('listByCustomer', () => {
    it('merges customerId into filter', async () => {
      repo.findPaginated.mockResolvedValue({ items: [], total: 0, page: 1, limit: 10 });
      await service.listByCustomer(FIXTURE_ID_2, { page: 1, limit: 10 });
      expect(repo.findPaginated).toHaveBeenCalledWith(
        expect.objectContaining({
          filter: expect.objectContaining({ customerId: FIXTURE_ID_2 }),
        }),
      );
    });
  });

  describe('listByVendor', () => {
    it('merges vendorId into filter', async () => {
      repo.findPaginated.mockResolvedValue({ items: [], total: 0, page: 1, limit: 10 });
      await service.listByVendor(FIXTURE_ID_2, { page: 1, limit: 10 });
      expect(repo.findPaginated).toHaveBeenCalledWith(
        expect.objectContaining({
          filter: expect.objectContaining({ vendorId: FIXTURE_ID_2 }),
        }),
      );
    });
  });

  describe('getStats', () => {
    it('maps stats DTO', async () => {
      repo.getStats.mockResolvedValue({
        total: 5,
        totalRevenue: 1000,
        averageOrderValue: 200,
        currency: 'BDT',
        byStatus: { pending: 2, confirmed: 3 },
      });
      const result = await service.getStats();
      expect(result.totalOrders).toBe(5);
      expect(result.totalRevenue).toBe(1000);
      expect(result.averageOrderValue).toBe(200);
    });
  });

  it('FIXTURE_NOW constant is defined', () => {
    expect(FIXTURE_NOW).toBeDefined();
  });
});
