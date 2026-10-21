/**
 * TransactionMapper — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { TransactionMapper } from '@application/mappers/transaction.mapper';
import type { TransactionEntity } from '@domain/entities/transaction.entity';

function makeMockEntity(): TransactionEntity {
  return {
    id: 'tx-1',
    paymentId: { value: 'payment-1' },
    type: { value: 'payment' },
    status: { value: 'success' },
    amount: { amount: 500, currency: 'BDT' },
    gatewayReference: { value: 'stripe_ch_123' },
    failureReason: undefined,
    settledAt: '2025-01-15T11:00:00.000Z',
    createdAt: '2025-01-15T10:00:00.000Z',
    updatedAt: '2025-01-15T11:00:00.000Z',
  } as unknown as TransactionEntity;
}

describe('TransactionMapper', () => {
  describe('toResponse', () => {
    it('should map all transaction fields', () => {
      const dto = TransactionMapper.toResponse(makeMockEntity());
      expect(dto.id).toBe('tx-1');
      expect(dto.paymentId).toBe('payment-1');
      expect(dto.type).toBe('payment');
      expect(dto.status).toBe('success');
      expect(dto.amount).toBe(500);
      expect(dto.currency).toBe('BDT');
      expect(dto.gatewayReference).toBe('stripe_ch_123');
      expect(dto.settledAt).toBe('2025-01-15T11:00:00.000Z');
    });

    it('should handle failure reason', () => {
      const entity = {
        ...makeMockEntity(),
        status: { value: 'failed' },
        failureReason: 'insufficient funds',
        gatewayReference: undefined,
      } as unknown as TransactionEntity;
      const dto = TransactionMapper.toResponse(entity);
      expect(dto.failureReason).toBe('insufficient funds');
      expect(dto.gatewayReference).toBeUndefined();
    });
  });

  describe('toSummary', () => {
    it('should map summary fields only', () => {
      const dto = TransactionMapper.toSummary(makeMockEntity());
      expect(dto.id).toBe('tx-1');
      expect(dto.type).toBe('payment');
      expect(dto.status).toBe('success');
      expect(dto.amount).toBe(500);
      expect(dto.currency).toBe('BDT');
    });
  });

  describe('toListResponse', () => {
    it('should paginate', () => {
      const dto = TransactionMapper.toListResponse([makeMockEntity(), makeMockEntity()], 2, 1, 10);
      expect(dto.items).toHaveLength(2);
      expect(dto.totalPages).toBe(1);
    });

    it('should handle empty array', () => {
      const dto = TransactionMapper.toListResponse([], 0, 1, 10);
      expect(dto.items).toHaveLength(0);
      expect(dto.total).toBe(0);
    });
  });
});
