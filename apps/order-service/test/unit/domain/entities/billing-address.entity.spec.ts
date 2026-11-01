/**
 * BillingAddressEntity — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { BillingAddressEntity } from '@domain/entities/billing-address.entity.js';
import { BillingAddressVO } from '@domain/composites/billing-address.vo.js';
import { fixtureBillingAddressVO } from '@fixtures/domain/composite-fixtures.js';
import { fixtureBillingAddressId } from '@fixtures/domain/primitive-fixtures.js';

const NOW = '2024-01-01T10:00:00.000Z';

function makeCreateParams(overrides: Partial<Parameters<typeof BillingAddressEntity.create>[0]> = {}) {
  return {
    id: fixtureBillingAddressId.value,
    vo: fixtureBillingAddressVO,
    now: NOW,
    ...overrides,
  };
}

describe('BillingAddressEntity', () => {
  describe('create', () => {
    it('creates with valid VO', () => {
      const entity = BillingAddressEntity.create(makeCreateParams());
      expect(entity.id).toBe(fixtureBillingAddressId.value);
      expect(entity.recipientName).toBe('John Doe');
    });
  });

  describe('reconstitute', () => {
    it('rehydrates existing address', () => {
      const entity = BillingAddressEntity.reconstitute({
        id: fixtureBillingAddressId.value,
        createdAt: NOW,
        updatedAt: NOW,
        vo: fixtureBillingAddressVO,
      });
      expect(entity.id).toBe(fixtureBillingAddressId.value);
    });
  });

  describe('update', () => {
    it('updates VO', () => {
      const entity = BillingAddressEntity.create(makeCreateParams());
      const newVO = BillingAddressVO.create({
        id: fixtureBillingAddressId,
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
      const entity = BillingAddressEntity.create(makeCreateParams());
      expect(entity.oneLine).toContain('123 Main Street');
    });
  });
});

// ═══════════════ Branch edge cases ═══════════════
describe('BillingAddressEntity — branch coverage', () => {
  it('phone getter', () => {
    const entity = BillingAddressEntity.create(makeCreateParams());
    expect(entity.phone).toBeDefined();
  });

  it('oneLine joins', () => {
    const entity = BillingAddressEntity.create(makeCreateParams());
    expect(entity.oneLine).toContain('123 Main Street');
  });
});
