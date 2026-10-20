/**
 * TrackingMapper — Unit Tests
 * @module order-service/test/unit/application/mappers
 */
import { describe, it, expect } from '@jest/globals';
import { TrackingMapper } from '@application/mappers/tracking.mapper.js';
import {
  makeTrackingEntityStub,
  FIXTURE_ID_2,
} from '@fixtures/application/entity-factories.js';

describe('TrackingMapper', () => {
  describe('toResponse', () => {
    it('maps tracking entry', () => {
      const entity = makeTrackingEntityStub();
      const dto = TrackingMapper.toResponse(entity);
      expect(dto.id).toBe(entity.id);
      expect(dto.status).toBe('in_transit');
      expect(dto.trackingNumber).toBe('TRK-ABCD1234');
      expect(dto.message).toBe('Package in transit');
      expect(dto.location).toBe('Dhaka hub');
      expect(dto.carrier).toBe('Pathao');
    });
  });

  describe('toSummary', () => {
    it('builds summary from entries', () => {
      const entries = [makeTrackingEntityStub()];
      const dto = TrackingMapper.toSummary(FIXTURE_ID_2, entries);
      expect(dto.orderId).toBe(FIXTURE_ID_2);
      expect(dto.currentStatus).toBe('in_transit');
      expect(dto.events.length).toBe(1);
    });

    it('handles empty entries', () => {
      const dto = TrackingMapper.toSummary(FIXTURE_ID_2, []);
      expect(dto.orderId).toBe(FIXTURE_ID_2);
      expect(dto.currentStatus).toBe('pending');
      expect(dto.events.length).toBe(0);
    });
  });

  describe('toListResponse', () => {
    it('wraps entries', () => {
      const entries = [makeTrackingEntityStub(), makeTrackingEntityStub()];
      const dto = TrackingMapper.toListResponse(entries);
      expect(dto.items.length).toBe(2);
      expect(dto.total).toBe(2);
    });
  });
});
