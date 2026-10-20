/**
 * OrderController Tests
 * @module order-service/test/unit/interfaces/controllers/rest
 */
import { jest } from '@jest/globals';
import { Test } from '@nestjs/testing';
import { OrderController } from '@interfaces/controllers/rest/order.controller.js';
import { ORDER_SERVICE } from '@application/services/interfaces/order.service.interface.js';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { OwnOrderGuard } from '@interfaces/guards/own-order.guard.js';
import { VendorOrderGuard } from '@interfaces/guards/vendor-order.guard.js';
import { OrderStatusGuard } from '@interfaces/guards/order-status.guard.js';
import { OrderCacheInterceptor } from '@interfaces/interceptors/order-cache.interceptor.js';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { ORDER_REPOSITORY } from '@domain/repositories/order.repository.interface.js';

const mockService = {
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  confirm: jest.fn(),
  hold: jest.fn(),
  release: jest.fn(),
  getById: jest.fn(),
  getByNumber: jest.fn(),
  getPublic: jest.fn(),
  getDetail: jest.fn(),
  list: jest.fn(),
  listByCustomer: jest.fn(),
  listByVendor: jest.fn(),
  getStats: jest.fn(),
};

const mockRedis = {
  get: jest.fn().mockResolvedValue(null),
  raw: { set: jest.fn().mockResolvedValue('OK') },
  set: jest.fn(),
  del: jest.fn(),
  exists: jest.fn(),
  isHealthy: jest.fn().mockResolvedValue(true),
};

const mockRepo = {
  findById: jest.fn().mockResolvedValue(null),
  findByIdVO: jest.fn().mockResolvedValue(null),
};

const mockUser = { userId: 'user-1', roles: ['customer'] };

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleRef = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        { provide: ORDER_SERVICE, useValue: mockService },
        { provide: RedisService, useValue: mockRedis },
        { provide: ORDER_REPOSITORY, useValue: mockRepo },
        OrderCacheInterceptor,
        OwnOrderGuard,
        VendorOrderGuard,
        OrderStatusGuard,
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(OwnOrderGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(VendorOrderGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(OrderStatusGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = moduleRef.get(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create and map response', async () => {
      mockService.create.mockResolvedValue({
        orderId: 'o-1',
        orderNumber: 'ORD-2026-000001',
        status: 'pending',
      });

      const result = await controller.create(
        {
          customerId: 'c-1',
          items: [{ productId: 'p-1', quantity: 1, unitPrice: 100 }],
          shippingAddress: { line1: 'L', city: 'C', country: 'BD' },
        } as never,
        mockUser as never,
      );

      expect(mockService.create).toHaveBeenCalled();
      expect(result.success).toBe(true);
      expect(result.orderId).toBe('o-1');
    });
  });

  describe('getById', () => {
    it('should call service.getById', async () => {
      const app = { id: 'o-1', orderNumber: 'ORD-1', status: 'pending' };
      mockService.getById.mockResolvedValue(app);
      const result = await controller.getById('o-1');
      expect(mockService.getById).toHaveBeenCalledWith('o-1');
      expect(result).toEqual(app as never);
    });
  });

  describe('getPublic', () => {
    it('should call service.getPublic', async () => {
      const pub = { id: 'o-1', orderNumber: 'ORD-1' };
      mockService.getPublic.mockResolvedValue(pub);
      const result = await controller.getPublic('o-1');
      expect(mockService.getPublic).toHaveBeenCalledWith('o-1');
      expect(result).toEqual(pub as never);
    });
  });

  describe('list', () => {
    it('should call listByCustomer for non-admin', async () => {
      mockService.listByCustomer.mockResolvedValue({
        items: [], total: 0, page: 1, limit: 20, totalPages: 0,
      });
      await controller.list({} as never, mockUser as never);
      expect(mockService.listByCustomer).toHaveBeenCalled();
      expect(mockService.list).not.toHaveBeenCalled();
    });

    it('should call list for admin', async () => {
      mockService.list.mockResolvedValue({
        items: [], total: 0, page: 1, limit: 20, totalPages: 0,
      });
      await controller.list({} as never, { userId: 'a-1', roles: ['admin'] } as never);
      expect(mockService.list).toHaveBeenCalled();
    });
  });

  describe('getStats', () => {
    it('should call service.getStats', async () => {
      mockService.getStats.mockResolvedValue({
        totalOrders: 0, totalRevenue: 0, averageOrderValue: 0, currency: 'BDT', byStatus: {},
      });
      await controller.stats(undefined);
      expect(mockService.getStats).toHaveBeenCalledWith(undefined);
    });
  });

  describe('update', () => {
    it('should call service.update', async () => {
      const app = { id: 'o-1', status: 'confirmed' };
      mockService.update.mockResolvedValue(app);
      const result = await controller.update('o-1', { notes: 'urgent' } as never, mockUser as never);
      expect(mockService.update).toHaveBeenCalled();
      expect(result).toEqual(app as never);
    });
  });

  describe('delete', () => {
    it('should call service.delete', async () => {
      mockService.delete.mockResolvedValue(undefined);
      await controller.delete('o-1', { reason: 'test' } as never, mockUser as never);
      expect(mockService.delete).toHaveBeenCalled();
    });
  });
});
