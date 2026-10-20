/**
 * ReturnMapper — Unit Tests
 * @module order-service/test/unit/application/mappers
 */
import { describe, it, expect } from '@jest/globals';
import { ReturnMapper } from '@application/mappers/return.mapper.js';
import { makeReturnEntityStub } from '@fixtures/application/entity-factories.js';

describe('ReturnMapper', () => {
  describe('toResponse', () => {
    it('maps full return', () => {
      const entity = makeReturnEntityStub();
      const dto = ReturnMapper.toResponse(entity);
      expect(dto.id).toBe(entity.id);
      expect(dto.status).toBe('requested');
      expect(dto.reason).toBe('defective');
      expect(dto.itemIds.length).toBe(2);
      expect(dto.notes).toBe('Product broken');
    });
  });

  describe('toSummary', () => {
    it('maps minimal fields', () => {
      const entity = makeReturnEntityStub();
      const dto = ReturnMapper.toSummary(entity);
      expect(dto.id).toBe(entity.id);
      expect(dto.status).toBe('requested');
      expect(dto.reason).toBe('defective');
    });
  });

  describe('toListResponse', () => {
    it('builds list response', () => {
      const items = [makeReturnEntityStub(), makeReturnEntityStub()];
      const dto = ReturnMapper.toListResponse(items, 2, 1, 10);
      expect(dto.items.length).toBe(2);
      expect(dto.total).toBe(2);
    });
  });
});
