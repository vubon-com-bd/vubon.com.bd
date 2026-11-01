/**
 * MethodMapper — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { MethodMapper } from '@application/mappers/method.mapper';
import type { PaymentMethodEntity } from '@domain/entities/payment-method.entity';

function makeMockEntity(): PaymentMethodEntity {
  return {
    id: 'method-1',
    type: { method: 'card', type: 'online' },
    provider: { provider: 'stripe' },
    label: 'Visa · 4242',
    isActive: true,
    createdAt: '2025-01-15T10:00:00.000Z',
    updatedAt: '2025-01-15T10:00:00.000Z',
  } as unknown as PaymentMethodEntity;
}

describe('MethodMapper', () => {
  describe('toResponse', () => {
    it('should map full method DTO', () => {
      const dto = MethodMapper.toResponse(makeMockEntity());
      expect(dto.id).toBe('method-1');
      expect(dto.method).toBe('card');
      expect(dto.type).toBe('online');
      expect(dto.gateway).toBe('stripe');
      expect(dto.label).toBe('Visa · 4242');
      expect(dto.isActive).toBe(true);
      expect(dto.isDefault).toBe(false);
    });

    it('should handle undefined provider', () => {
      const entity = { ...makeMockEntity(), provider: undefined } as unknown as PaymentMethodEntity;
      const dto = MethodMapper.toResponse(entity);
      expect(dto.gateway).toBeUndefined();
    });
  });

  describe('toSummary', () => {
    it('should map summary', () => {
      const dto = MethodMapper.toSummary(makeMockEntity());
      expect(dto.id).toBe('method-1');
      expect(dto.method).toBe('card');
      expect(dto.label).toBe('Visa · 4242');
    });
  });

  describe('toListResponse', () => {
    it('should paginate', () => {
      const dto = MethodMapper.toListResponse([makeMockEntity()], 5, 1, 10);
      expect(dto.items).toHaveLength(1);
      expect(dto.total).toBe(5);
      expect(dto.totalPages).toBe(1);
    });
  });
});
