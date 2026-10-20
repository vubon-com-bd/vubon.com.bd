/**
 * Delivery & DeliveryMethod Mappers — Unit Tests
 * @module order-service/test/unit/application/mappers
 */
import { describe, it, expect } from '@jest/globals';
import {
  DeliveryMapper,
  DeliveryMethodMapper,
} from '@application/mappers/delivery.mapper.js';
import {
  makeDeliveryEntityStub,
  makeDeliveryMethodEntityStub,
} from '@fixtures/application/entity-factories.js';

describe('DeliveryMapper', () => {
  describe('toResponse', () => {
    it('maps full fields', () => {
      const entity = makeDeliveryEntityStub();
      const dto = DeliveryMapper.toResponse(entity);
      expect(dto.id).toBe(entity.id);
      expect(dto.status).toBe('pending');
      expect(dto.type).toBe('standard');
      expect(dto.trackingNumber).toBe('TRK-ABCD1234');
      expect(dto.attempts).toBe(0);
    });
  });

  describe('toSummary', () => {
    it('maps minimal fields', () => {
      const entity = makeDeliveryEntityStub();
      const dto = DeliveryMapper.toSummary(entity);
      expect(dto.id).toBe(entity.id);
      expect(dto.status).toBe('pending');
      expect(dto.type).toBe('standard');
    });
  });

  describe('toListResponse', () => {
    it('builds paginated response', () => {
      const items = [makeDeliveryEntityStub(), makeDeliveryEntityStub()];
      const dto = DeliveryMapper.toListResponse(items, 20, 1, 10);
      expect(dto.items.length).toBe(2);
      expect(dto.total).toBe(20);
      expect(dto.totalPages).toBe(2);
    });
  });
});

describe('DeliveryMethodMapper', () => {
  it('maps delivery method', () => {
    const entity = makeDeliveryMethodEntityStub();
    const dto = DeliveryMethodMapper.toResponse(entity);
    expect(dto.id).toBe(entity.id);
    expect(dto.name).toBe('Standard Delivery');
    expect(dto.type).toBe('flat_rate');
    expect(dto.baseCost).toBe(60);
    expect(dto.estimatedDays).toBe(3);
    expect(dto.isActive).toBe(true);
  });
});
