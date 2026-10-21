/**
 * PaymentMethodEntity unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { PaymentMethodEntity } from '@domain/entities/payment-method.entity';
import { PaymentMethodIdVO } from '@domain/primitives/payment-method-id.vo';
import { PaymentMethodTypeVO } from '@domain/primitives/payment-method-type.vo';
import { PaymentMethodProviderVO } from '@domain/primitives/payment-method-provider.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';

function makeMethod(): PaymentMethodEntity {
  return PaymentMethodEntity.create({
    id: PaymentMethodIdVO.create(TEST_IDS.METHOD_ID),
    props: {
      type: PaymentMethodTypeVO.create('card', 'online'),
      provider: PaymentMethodProviderVO.create('stripe', 'sandbox'),
      label: 'Credit Card',
      isActive: true,
    },
    now: TEST_DATES.NOW,
  });
}

describe('PaymentMethodEntity', () => {
  describe('create()', () => {
    it('creates active payment method', () => {
      const m = makeMethod();
      expect(m.label).toBe('Credit Card');
      expect(m.isActive).toBe(true);
    });
    it('throws when label empty', () => {
      expect(() =>
        PaymentMethodEntity.create({
          id: PaymentMethodIdVO.create(TEST_IDS.METHOD_ID),
          props: {
            type: PaymentMethodTypeVO.create('card', 'online'),
            provider: PaymentMethodProviderVO.create('stripe', 'sandbox'),
            label: '',
            isActive: true,
          },
          now: TEST_DATES.NOW,
        }),
      ).toThrow(ValidationError);
    });
    it('throws when online without provider', () => {
      expect(() =>
        PaymentMethodEntity.create({
          id: PaymentMethodIdVO.create(TEST_IDS.METHOD_ID),
          props: {
            type: PaymentMethodTypeVO.create('card', 'online'),
            label: 'Card',
            isActive: true,
          },
          now: TEST_DATES.NOW,
        }),
      ).toThrow(ValidationError);
    });
    it('accepts COD without provider', () => {
      const m = PaymentMethodEntity.create({
        id: PaymentMethodIdVO.create(TEST_IDS.METHOD_ID),
        props: {
          type: PaymentMethodTypeVO.create('cash_on_delivery', 'offline'),
          label: 'COD',
          isActive: true,
        },
        now: TEST_DATES.NOW,
      });
      expect(m.isCod()).toBe(true);
    });
  });

  describe('rename()', () => {
    it('updates label', () => {
      const m = makeMethod();
      m.rename('Debit Card', TEST_DATES.NOW);
      expect(m.label).toBe('Debit Card');
    });
    it('throws on empty label', () => {
      const m = makeMethod();
      expect(() => m.rename('', TEST_DATES.NOW)).toThrow(ValidationError);
    });
  });

  describe('activate() / deactivate()', () => {
    it('deactivate sets isActive false', () => {
      const m = makeMethod();
      m.deactivate(TEST_DATES.NOW);
      expect(m.isActive).toBe(false);
    });
    it('activate after deactivate', () => {
      const m = makeMethod();
      m.deactivate(TEST_DATES.NOW);
      m.activate(TEST_DATES.NOW);
      expect(m.isActive).toBe(true);
    });
  });

  describe('reconstitute()', () => {
    it('rebuilds valid state', () => {
      const m = PaymentMethodEntity.reconstitute({
        id: TEST_IDS.METHOD_ID,
        createdAt: TEST_DATES.YESTERDAY,
        updatedAt: TEST_DATES.NOW,
        props: {
          type: PaymentMethodTypeVO.create('card', 'online'),
          provider: PaymentMethodProviderVO.create('stripe', 'sandbox'),
          label: 'Card',
          isActive: false,
        },
      });
      expect(m.label).toBe('Card');
      expect(m.isActive).toBe(false);
    });

    it('also runs invariants (label required)', () => {
      // PaymentMethodEntity.reconstitute does NOT skip invariants
      expect(() =>
        PaymentMethodEntity.reconstitute({
          id: TEST_IDS.METHOD_ID,
          createdAt: TEST_DATES.NOW,
          updatedAt: TEST_DATES.NOW,
          props: {
            type: PaymentMethodTypeVO.create('card', 'online'),
            provider: PaymentMethodProviderVO.create('stripe', 'sandbox'),
            label: '',
            isActive: false,
          },
        }),
      ).toThrow(ValidationError);
    });
  });
});
