/**
 * SplitPaymentMapper — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { SplitPaymentMapper } from '@application/mappers/split-payment.mapper';
import type { SplitPaymentEntity } from '@domain/entities/split-payment.entity';

function makeMockEntity(executed = true): SplitPaymentEntity {
  return {
    id: 'split-1',
    paymentId: { value: 'payment-1' },
    type: { value: 'percentage' },
    totalAmount: 1000,
    currency: 'BDT',
    receivers: [
      { receiverId: 'vendor-a', amount: { amount: 700 }, percentage: { value: 70 } },
      { receiverId: 'vendor-b', amount: { amount: 300 }, percentage: { value: 30 } },
    ],
    executedAt: executed ? '2025-01-15T11:00:00.000Z' : undefined,
    failureReason: undefined,
    createdAt: '2025-01-15T10:00:00.000Z',
    updatedAt: '2025-01-15T11:00:00.000Z',
    isExecuted: () => executed,
  } as unknown as SplitPaymentEntity;
}

describe('SplitPaymentMapper', () => {
  describe('toResponse', () => {
    it('should map split with receivers', () => {
      const dto = SplitPaymentMapper.toResponse(makeMockEntity());
      expect(dto.id).toBe('split-1');
      expect(dto.paymentId).toBe('payment-1');
      expect(dto.type).toBe('percentage');
      expect(dto.totalAmount).toBe(1000);
      expect(dto.receivers).toHaveLength(2);
      expect(dto.receivers[0]?.receiverId).toBe('vendor-a');
      expect(dto.receivers[0]?.amount).toBe(700);
      expect(dto.receivers[0]?.percentage).toBe(70);
      expect(dto.isExecuted).toBe(true);
    });

    it('should map non-executed split', () => {
      const dto = SplitPaymentMapper.toResponse(makeMockEntity(false));
      expect(dto.isExecuted).toBe(false);
      expect(dto.executedAt).toBeUndefined();
    });
  });

  describe('toListResponse', () => {
    it('should paginate', () => {
      const dto = SplitPaymentMapper.toListResponse([makeMockEntity()], 1, 1, 10);
      expect(dto.items).toHaveLength(1);
    });
  });
});
