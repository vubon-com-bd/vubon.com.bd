/**
 * DeliveryControllerMapper Tests
 * @module order-service/test/unit/interfaces/mappers
 */
import { DeliveryControllerMapper } from '@interfaces/mappers/delivery.controller.mapper.js';

describe('DeliveryControllerMapper', () => {
  describe('toScheduleDto', () => {
    it('should map schedule delivery', () => {
      const result = DeliveryControllerMapper.toScheduleDto({
        orderId: 'order-1',
        deliveryMethodId: 'method-1',
        type: 'express',
        estimatedAt: '2026-01-15T10:00:00.000Z',
      } as never);
      expect(result.orderId).toBe('order-1');
      expect(result.deliveryMethodId).toBe('method-1');
      expect(result.type).toBe('express');
      expect(result.estimatedAt).toBe('2026-01-15T10:00:00.000Z');
    });
  });

  describe('toRescheduleDto', () => {
    it('should map reschedule with all fields', () => {
      const result = DeliveryControllerMapper.toRescheduleDto('del-1', 'order-1', {
        reason: 'customer unavailable',
        newEstimatedAt: '2026-02-01T10:00:00.000Z',
      } as never);
      expect(result.deliveryId).toBe('del-1');
      expect(result.orderId).toBe('order-1');
      expect(result.reason).toBe('customer unavailable');
      expect(result.newEstimatedAt).toBe('2026-02-01T10:00:00.000Z');
    });
  });

  describe('toConfirmDto', () => {
    it('should map confirm delivery', () => {
      const result = DeliveryControllerMapper.toConfirmDto('del-1', 'order-1', {
        receivedBy: 'Jane Doe',
        signature: 'sig-123',
      } as never);
      expect(result.deliveryId).toBe('del-1');
      expect(result.receivedBy).toBe('Jane Doe');
      expect(result.signature).toBe('sig-123');
    });
  });

  describe('toListOptions', () => {
    it('should build list options with defaults', () => {
      const result = DeliveryControllerMapper.toListOptions();
      expect(result.page).toBe(1);
      expect(result.limit).toBe(20);
    });

    it('should respect provided page and limit', () => {
      const result = DeliveryControllerMapper.toListOptions(5, 100);
      expect(result.page).toBe(5);
      expect(result.limit).toBe(100);
    });
  });
});
