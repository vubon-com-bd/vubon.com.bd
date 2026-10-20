/**
 * ShippingAddressEntity — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { ShippingAddressEntity } from '@domain/entities/shipping-address.entity.js';
import { ShippingAddressVO } from '@domain/composites/shipping-address.vo.js';
import { fixtureShippingAddressVO } from '@fixtures/domain/composite-fixtures.js';
import { fixtureShippingAddressId } from '@fixtures/domain/primitive-fixtures.js';

const NOW = '2024-01-01T10:00:00.000Z';

function makeCreateParams(overrides: Partial<Parameters<typeof ShippingAddressEntity.create>[0]> = {}) {
  return {
    id: fixtureShippingAddressId.value,
    vo: fixtureShippingAddressVO,
    now: NOW,
    ...overrides,
  };
}

describe('ShippingAddressEntity', () => {
  describe('create', () => {
    it('creates with valid VO', () => {
      const entity = ShippingAddressEntity.create(makeCreateParams());
      expect(entity.id).toBe(fixtureShippingAddressId.value);
      expect(entity.recipientName).toBe('John Doe');
    });
  });

  describe('reconstitute', () => {
    it('rehydrates existing address', () => {
      const entity = ShippingAddressEntity.reconstitute({
        id: fixtureShippingAddressId.value,
        createdAt: NOW,
        updatedAt: NOW,
        vo: fixtureShippingAddressVO,
      });
      expect(entity.id).toBe(fixtureShippingAddressId.value);
    });
  });

  describe('update', () => {
    it('updates VO', () => {
      const entity = ShippingAddressEntity.create(makeCreateParams());
      const newVO = ShippingAddressVO.create({
        id: fixtureShippingAddressId,
        recipientName: 'Jane Doe',
        phone: '01712345678',
        line1: '456 New Street',
        city: 'Chittagong',
        country: 'BD',
      });
      entity.update(newVO, NOW);
      expect(entity.recipientName).toBe('Jane Doe');
    });
  });

  describe('oneLine', () => {
    it('returns joined address', () => {
      const entity = ShippingAddressEntity.create(makeCreateParams());
      expect(entity.oneLine).toContain('123 Main Street');
    });
  });
});

// ═══════════════ Branch edge cases ═══════════════
describe('ShippingAddressEntity — branch coverage', () => {
  it('phone getter', () => {
    const entity = ShippingAddressEntity.create(makeCreateParams());
    expect(entity.phone).toBeDefined();
  });

  it('oneLine joins fields', () => {
    const entity = ShippingAddressEntity.create(makeCreateParams());
    expect(entity.oneLine).toContain('123 Main Street');
    expect(entity.oneLine).toContain('Dhaka');
  });
});
