/**
 * PaymentMapper — Unit Tests (full branch coverage)
 */
import { describe, it, expect } from '@jest/globals';
import { PaymentMapper } from '@application/mappers/payment.mapper';
import type { PaymentEntity } from '@domain/entities/payment.entity';

function makeMockEntity(overrides: Partial<Record<string, unknown>> = {}): PaymentEntity {
  return {
    id: 'payment-1',
    orderId: { value: 'order-1' },
    userId: { value: 'user-1' },
    status: { value: 'paid' },
    method: { method: 'card' },
    provider: { provider: 'stripe' },
    amount: { amount: 1000 },
    currency: { value: 'BDT' },
    gatewayReference: { value: 'ch_123' },
    refundedAmount: 200,
    failureReason: undefined,
    failureCode: undefined,
    authorizedAt: '2025-01-15T10:00:00.000Z',
    capturedAt: '2025-01-15T10:01:00.000Z',
    paidAt: '2025-01-15T10:02:00.000Z',
    metadata: { source: 'web' },
    createdAt: '2025-01-15T10:00:00.000Z',
    updatedAt: '2025-01-15T10:02:00.000Z',
    ...overrides,
  } as unknown as PaymentEntity;
}

describe('PaymentMapper', () => {
  describe('toResponse', () => {
    it('should map all fields', () => {
      const dto = PaymentMapper.toResponse(makeMockEntity());
      expect(dto.id).toBe('payment-1');
      expect(dto.gateway).toBe('stripe');
      expect(dto.gatewayReference).toBe('ch_123');
    });

    it('should convert refundedAmount 0 to undefined', () => {
      const dto = PaymentMapper.toResponse(makeMockEntity({ refundedAmount: 0 }));
      expect(dto.refundedAmount).toBeUndefined();
    });

    it('should convert refundedAmount positive to number', () => {
      const dto = PaymentMapper.toResponse(makeMockEntity({ refundedAmount: 200 }));
      expect(dto.refundedAmount).toBe(200);
    });

    it('should handle missing provider', () => {
      const dto = PaymentMapper.toResponse(makeMockEntity({ provider: undefined }));
      expect(dto.gateway).toBeUndefined();
    });

    it('should handle missing gatewayReference', () => {
      const dto = PaymentMapper.toResponse(makeMockEntity({ gatewayReference: undefined }));
      expect(dto.gatewayReference).toBeUndefined();
    });
  });

  describe('toPublicResponse', () => {
    it('should map public fields', () => {
      const dto = PaymentMapper.toPublicResponse(makeMockEntity());
      expect(dto.id).toBe('payment-1');
      expect('userId' in dto).toBe(false);
    });

    it('should handle refundedAmount 0', () => {
      const dto = PaymentMapper.toPublicResponse(makeMockEntity({ refundedAmount: 0 }));
      expect(dto.refundedAmount).toBeUndefined();
    });

    it('should handle refundedAmount positive', () => {
      const dto = PaymentMapper.toPublicResponse(makeMockEntity({ refundedAmount: 100 }));
      expect(dto.refundedAmount).toBe(100);
    });
  });

  describe('toSummary', () => {
    it('should map summary', () => {
      const dto = PaymentMapper.toSummary(makeMockEntity());
      expect(dto.id).toBe('payment-1');
    });
  });

  describe('toListResponse', () => {
    it('should map array + totalPages', () => {
      const dto = PaymentMapper.toListResponse([makeMockEntity()], 2, 1, 10);
      expect(dto.totalPages).toBe(1);
    });

    it('should round totalPages', () => {
      const dto = PaymentMapper.toListResponse([makeMockEntity()], 25, 2, 10);
      expect(dto.totalPages).toBe(3);
    });

    it('should handle empty', () => {
      const dto = PaymentMapper.toListResponse([], 0, 1, 10);
      expect(dto.items).toHaveLength(0);
      expect(dto.totalPages).toBe(0);
    });
  });
});
