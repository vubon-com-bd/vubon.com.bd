/**
 * CancelMapper — Unit Tests
 * @module order-service/test/unit/application/mappers
 */
import { describe, it, expect } from '@jest/globals';
import { CancelMapper } from '@application/mappers/cancel.mapper.js';
import { makeCancelEntityStub } from '@fixtures/application/entity-factories.js';

describe('CancelMapper', () => {
  describe('toResponse', () => {
    it('maps full cancel', () => {
      const entity = makeCancelEntityStub();
      const dto = CancelMapper.toResponse(entity);
      expect(dto.id).toBe(entity.id);
      expect(dto.reason).toBe('customer_request');
      expect(dto.status).toBe('requested');
      expect(dto.notes).toBe('Change of mind');
    });
  });

  describe('toSummary', () => {
    it('maps minimal fields', () => {
      const entity = makeCancelEntityStub();
      const dto = CancelMapper.toSummary(entity);
      expect(dto.id).toBe(entity.id);
      expect(dto.status).toBe('requested');
      expect(dto.reason).toBe('customer_request');
    });
  });

  describe('toListResponse', () => {
    it('builds paginated response', () => {
      const items = [makeCancelEntityStub(), makeCancelEntityStub()];
      const dto = CancelMapper.toListResponse(items, 15, 2, 10);
      expect(dto.items.length).toBe(2);
      expect(dto.total).toBe(15);
      expect(dto.page).toBe(2);
      expect(dto.totalPages).toBe(2);
    });
  });
});
