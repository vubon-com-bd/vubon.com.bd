/**
 * OrderControllerMapper Tests
 * @module order-service/test/unit/interfaces/mappers
 */
import { OrderControllerMapper } from '@interfaces/mappers/order.controller.mapper.js';

describe('OrderControllerMapper', () => {
  describe('toCreateAppDto', () => {
    it('should map HTTP DTO to App DTO', () => {
      const httpDto = {
        customerId: 'customer-1',
        items: [
          {
            productId: 'product-1',
            quantity: 2,
            unitPrice: 100,
          },
        ],
        shippingAddress: { line1: '123 St', city: 'Dhaka', country: 'BD' },
      } as never;

      const result = OrderControllerMapper.toCreateAppDto(httpDto, 'user-1');
      expect(result.customerId).toBe('customer-1');
      expect(result.actorId).toBe('user-1');
      expect(result.items).toHaveLength(1);
    });
  });

  describe('toUpdateAppDto', () => {
    it('should map UpdateOrder HTTP DTO with orderId', () => {
      const httpDto = { notes: 'urgent', shippingMethod: 'express' } as never;
      const result = OrderControllerMapper.toUpdateAppDto(
        'order-1',
        httpDto,
        'user-1',
      );
      expect(result.orderId).toBe('order-1');
      expect(result.notes).toBe('urgent');
      expect(result.shippingMethod).toBe('express');
      expect(result.actorId).toBe('user-1');
    });
  });

  describe('toListOptions', () => {
    it('should map query with defaults', () => {
      const result = OrderControllerMapper.toListOptions({} as never);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(20);
    });

    it('should respect provided page and limit', () => {
      const result = OrderControllerMapper.toListOptions({
        page: 3,
        limit: 50,
      } as never);
      expect(result.page).toBe(3);
      expect(result.limit).toBe(50);
    });

    it('should map filter fields', () => {
      const result = OrderControllerMapper.toListOptions({
        customerId: 'customer-1',
        status: 'pending',
        fromDate: '2026-01-01',
        toDate: '2026-12-31',
      } as never);
      expect(result.filter?.customerId).toBe('customer-1');
      expect(result.filter?.status).toBe('pending');
    });
  });

  describe('toCreateHttpResponse', () => {
    it('should build success response', () => {
      const result = OrderControllerMapper.toCreateHttpResponse({
        orderId: 'order-1',
        orderNumber: 'ORD-2026-000001',
        status: 'pending',
      });
      expect(result.success).toBe(true);
      expect(result.orderId).toBe('order-1');
      expect(result.orderNumber).toBe('ORD-2026-000001');
      expect(result.status).toBe('pending');
    });
  });

  describe('toListHttp', () => {
    it('should map list response with summaries', () => {
      const app = {
        items: [
          {
            id: 'order-1',
            orderNumber: 'ORD-2026-000001',
            status: 'pending',
            total: 100,
            currency: 'BDT',
            itemCount: 2,
            createdAt: '2026-01-01T00:00:00.000Z',
          },
        ],
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1,
      };
      const result = OrderControllerMapper.toListHttp(app);
      expect(result.items).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.page).toBe(1);
    });
  });

  describe('toConfirmDto', () => {
    it('should map confirm DTO', () => {
      const result = OrderControllerMapper.toConfirmDto({
        paymentId: 'pay-1',
        notes: 'ok',
      } as never);
      expect(result.paymentId).toBe('pay-1');
      expect(result.notes).toBe('ok');
    });
  });

  describe('toHoldDto', () => {
    it('should map hold DTO', () => {
      const result = OrderControllerMapper.toHoldDto({
        reason: 'suspicious',
      } as never);
      expect(result.reason).toBe('suspicious');
    });
  });

  describe('toReleaseDto', () => {
    it('should map release DTO', () => {
      const result = OrderControllerMapper.toReleaseDto({ note: 'released' } as never);
      expect(result.note).toBe('released');
    });
  });

  describe('toDeleteDto', () => {
    it('should map delete DTO', () => {
      const result = OrderControllerMapper.toDeleteDto({ reason: 'test' } as never);
      expect(result.reason).toBe('test');
    });
  });
});
