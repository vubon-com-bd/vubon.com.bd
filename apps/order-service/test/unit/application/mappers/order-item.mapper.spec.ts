/**
 * OrderItemMapper — Unit Tests
 * @module order-service/test/unit/application/mappers
 */
import { describe, it, expect } from '@jest/globals';
import { OrderItemMapper } from '@application/mappers/order-item.mapper.js';
import { makeOrderItemEntityStub } from '@fixtures/application/entity-factories.js';

describe('OrderItemMapper', () => {
  describe('toResponse', () => {
    it('maps full fields', () => {
      const entity = makeOrderItemEntityStub();
      const dto = OrderItemMapper.toResponse(entity);
      expect(dto.id).toBe(entity.id);
      expect(dto.name).toBe('Sample Product');
      expect(dto.sku).toBe('SKU-001');
      expect(dto.quantity).toBe(2);
      expect(dto.unitPrice).toBe(50);
      expect(dto.lineTotal).toBe(100);
      expect(dto.currency).toBe('BDT');
      expect(dto.status).toBe('pending');
    });
  });

  describe('toSummary', () => {
    it('maps minimal fields', () => {
      const entity = makeOrderItemEntityStub();
      const dto = OrderItemMapper.toSummary(entity);
      expect(dto.id).toBe(entity.id);
      expect(dto.productId).toBeDefined();
      expect(dto.quantity).toBe(2);
      expect(dto.lineTotal).toBe(100);
    });
  });

  describe('toListResponse', () => {
    it('wraps items in list response', () => {
      const items = [makeOrderItemEntityStub(), makeOrderItemEntityStub()];
      const dto = OrderItemMapper.toListResponse(items);
      expect(dto.items.length).toBe(2);
      expect(dto.total).toBe(2);
    });
  });
});
