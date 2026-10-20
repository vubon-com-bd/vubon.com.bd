/**
 * ReturnControllerMapper Tests
 * @module order-service/test/unit/interfaces/mappers
 */
import { ReturnControllerMapper } from '@interfaces/mappers/return.controller.mapper.js';

describe('ReturnControllerMapper', () => {
  describe('toRequestDto', () => {
    it('should map return request with itemIds spread', () => {
      const result = ReturnControllerMapper.toRequestDto(
        {
          orderId: 'order-1',
          reason: 'defective',
          itemIds: ['item-1', 'item-2'],
          images: ['https://example.com/img1.jpg'],
          notes: 'broken',
          idempotencyKey: 'idem-1',
        } as never,
        'user-1',
      );
      expect(result.orderId).toBe('order-1');
      expect(result.reason).toBe('defective');
      expect(result.itemIds).toEqual(['item-1', 'item-2']);
      expect(Array.isArray(result.itemIds)).toBe(true);
      expect(result.images).toEqual(['https://example.com/img1.jpg']);
      expect(result.actorId).toBe('user-1');
    });

    it('should handle missing images gracefully', () => {
      const result = ReturnControllerMapper.toRequestDto(
        {
          orderId: 'order-1',
          reason: 'defective',
          itemIds: ['item-1'],
        } as never,
        'user-1',
      );
      expect(result.images).toBeUndefined();
    });
  });

  describe('toApproveDto', () => {
    it('should map approve DTO', () => {
      const result = ReturnControllerMapper.toApproveDto(
        'return-1',
        'order-1',
        { notes: 'approved' } as never,
        'admin-1',
      );
      expect(result.returnId).toBe('return-1');
      expect(result.orderId).toBe('order-1');
    });
  });

  describe('toRejectDto', () => {
    it('should map reject with reason', () => {
      const result = ReturnControllerMapper.toRejectDto(
        'return-1',
        'order-1',
        { reason: 'not eligible' } as never,
        'admin-1',
      );
      expect(result.reason).toBe('not eligible');
    });
  });

  describe('toCompleteDto', () => {
    it('should map complete with refundAmount', () => {
      const result = ReturnControllerMapper.toCompleteDto(
        'return-1',
        'order-1',
        { refundAmount: 500, restockFee: 25 } as never,
        'admin-1',
      );
      expect(result.refundAmount).toBe(500);
      expect(result.restockFee).toBe(25);
    });
  });
});
