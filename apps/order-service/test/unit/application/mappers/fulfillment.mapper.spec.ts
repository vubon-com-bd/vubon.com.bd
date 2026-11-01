/**
 * FulfillmentMapper — Unit Tests
 * @module order-service/test/unit/application/mappers
 */
import { describe, it, expect } from '@jest/globals';
import { FulfillmentMapper } from '@application/mappers/fulfillment.mapper.js';
import { makeFulfillmentEntityStub } from '@fixtures/application/entity-factories.js';

describe('FulfillmentMapper', () => {
  describe('toResponse', () => {
    it('maps full fulfillment', () => {
      const entity = makeFulfillmentEntityStub();
      const dto = FulfillmentMapper.toResponse(entity);
      expect(dto.id).toBe(entity.id);
      expect(dto.status).toBe('unfulfilled');
      expect(dto.itemIds.length).toBe(2);
      expect(dto.trackingNumber).toBe('TRK-ABCD1234');
    });
  });

  describe('toSummary', () => {
    it('includes itemCount', () => {
      const entity = makeFulfillmentEntityStub();
      const dto = FulfillmentMapper.toSummary(entity);
      expect(dto.id).toBe(entity.id);
      expect(dto.itemCount).toBe(2);
    });
  });

  describe('toListResponse', () => {
    it('builds paginated response', () => {
      const items = [makeFulfillmentEntityStub()];
      const dto = FulfillmentMapper.toListResponse(items, 5, 1, 10);
      expect(dto.items.length).toBe(1);
      expect(dto.total).toBe(5);
    });
  });
});
