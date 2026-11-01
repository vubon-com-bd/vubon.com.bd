/**
 * OrderMapper — Unit Tests
 * @module order-service/test/unit/application/mappers
 */
import { describe, it, expect } from '@jest/globals';
import { OrderMapper } from '@application/mappers/order.mapper.js';
import { makeOrderEntityStub } from '@fixtures/application/entity-factories.js';

describe('OrderMapper', () => {
  describe('toResponse', () => {
    it('maps full order fields', () => {
      const entity = makeOrderEntityStub();
      const dto = OrderMapper.toResponse(entity);
      expect(dto.id).toBe(entity.id);
      expect(dto.orderNumber).toBe('ORD-2024-000123');
      expect(dto.status).toBe('pending');
      expect(dto.subtotal).toBe(100);
      expect(dto.discountAmount).toBe(10);
      expect(dto.taxAmount).toBe(5);
      expect(dto.shippingAmount).toBe(20);
      expect(dto.total).toBe(115);
      expect(dto.currency).toBe('BDT');
      expect(dto.notes).toBe('Please deliver before 5pm');
    });
  });

  describe('toPublicResponse', () => {
    it('hides sensitive fields', () => {
      const entity = makeOrderEntityStub();
      const dto = OrderMapper.toPublicResponse(entity);
      expect(dto.id).toBe(entity.id);
      expect(dto.orderNumber).toBe('ORD-2024-000123');
      expect(dto.total).toBe(115);
      expect(dto.currency).toBe('BDT');
    });
  });

  describe('toSummary', () => {
    it('maps summary with itemCount', () => {
      const entity = makeOrderEntityStub();
      const dto = OrderMapper.toSummary(entity);
      expect(dto.id).toBe(entity.id);
      expect(dto.itemCount).toBe(0);
      expect(dto.total).toBe(115);
    });
  });

  describe('toListResponse', () => {
    it('builds paginated response', () => {
      const items = [
        makeOrderEntityStub(),
        makeOrderEntityStub({ id: '550e8400-e29b-41d4-a716-446655440001' }),
      ];
      const dto = OrderMapper.toListResponse(items, 25, 1, 10);
      expect(dto.items.length).toBe(2);
      expect(dto.total).toBe(25);
      expect(dto.page).toBe(1);
      expect(dto.limit).toBe(10);
      expect(dto.totalPages).toBe(3);
    });
  });

  describe('toDetail', () => {
    it('wraps order with items', () => {
      const entity = makeOrderEntityStub();
      const dto = OrderMapper.toDetail(entity);
      expect(dto.order.id).toBe(entity.id);
      expect(Array.isArray(dto.items)).toBe(true);
    });
  });
});
