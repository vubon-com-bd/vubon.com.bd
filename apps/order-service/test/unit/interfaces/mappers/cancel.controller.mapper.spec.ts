/**
 * CancelControllerMapper Tests
 * @module order-service/test/unit/interfaces/mappers
 */
import { CancelControllerMapper } from '@interfaces/mappers/cancel.controller.mapper.js';

describe('CancelControllerMapper', () => {
  describe('toRequestDto', () => {
    it('should map cancel request', () => {
      const result = CancelControllerMapper.toRequestDto(
        {
          orderId: 'order-1',
          reason: 'customer_request',
          notes: 'changed mind',
          idempotencyKey: 'idem-123',
        } as never,
        'user-1',
      );
      expect(result.orderId).toBe('order-1');
      expect(result.reason).toBe('customer_request');
      expect(result.actorId).toBe('user-1');
      expect(result.idempotencyKey).toBe('idem-123');
    });
  });

  describe('toApproveDto', () => {
    it('should map approve with refund', () => {
      const result = CancelControllerMapper.toApproveDto(
        'cancel-1',
        'order-1',
        { refundAmount: 100, notes: 'approved' } as never,
        'admin-1',
      );
      expect(result.cancelId).toBe('cancel-1');
      expect(result.orderId).toBe('order-1');
      expect(result.refundAmount).toBe(100);
      expect(result.actorId).toBe('admin-1');
    });
  });

  describe('toRejectDto', () => {
    it('should map reject with reason', () => {
      const result = CancelControllerMapper.toRejectDto(
        'cancel-1',
        'order-1',
        { reason: 'already shipped' } as never,
        'admin-1',
      );
      expect(result.cancelId).toBe('cancel-1');
      expect(result.reason).toBe('already shipped');
    });
  });
});
