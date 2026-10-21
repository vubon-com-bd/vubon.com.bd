/**
 * RefundMapper — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { RefundMapper } from '@application/mappers/refund.mapper';
import type { RefundEntity } from '@domain/entities/refund.entity';

function makeMockEntity(): RefundEntity {
  return {
    id: 'refund-1',
    paymentId: { value: 'payment-1' },
    status: { value: 'completed' },
    amount: { amount: 200, currency: 'BDT' },
    reason: { reason: 'customer_request', note: 'unhappy' },
    approvedBy: 'admin-1',
    completedAt: '2025-01-15T11:00:00.000Z',
    failureReason: undefined,
    createdAt: '2025-01-15T10:00:00.000Z',
    updatedAt: '2025-01-15T11:00:00.000Z',
  } as unknown as RefundEntity;
}

describe('RefundMapper', () => {
  describe('toResponse', () => {
    it('should map full refund DTO', () => {
      const dto = RefundMapper.toResponse(makeMockEntity());
      expect(dto.id).toBe('refund-1');
      expect(dto.paymentId).toBe('payment-1');
      expect(dto.status).toBe('completed');
      expect(dto.amount).toBe(200);
      expect(dto.currency).toBe('BDT');
      expect(dto.reason).toBe('customer_request');
      expect(dto.note).toBe('unhappy');
      expect(dto.approvedBy).toBe('admin-1');
      expect(dto.completedAt).toBe('2025-01-15T11:00:00.000Z');
    });
  });

  describe('toSummary', () => {
    it('should map summary', () => {
      const dto = RefundMapper.toSummary(makeMockEntity());
      expect(dto.id).toBe('refund-1');
      expect(dto.status).toBe('completed');
      expect(dto.amount).toBe(200);
    });
  });

  describe('toListResponse', () => {
    it('should paginate', () => {
      const dto = RefundMapper.toListResponse([makeMockEntity()], 3, 1, 10);
      expect(dto.total).toBe(3);
      expect(dto.items).toHaveLength(1);
    });
  });
});
