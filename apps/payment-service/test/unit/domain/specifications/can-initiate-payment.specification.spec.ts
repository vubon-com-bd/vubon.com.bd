/**
 * CanInitiatePaymentSpecification unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CanInitiatePaymentSpecification } from '@domain/specifications/can-initiate-payment.specification';
import { PaymentEntity } from '@domain/entities/payment.entity';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { PaymentCurrencyVO } from '@domain/primitives/payment-currency.vo';
import { PaymentMethodTypeVO } from '@domain/primitives/payment-method-type.vo';
import { PaymentMethodProviderVO } from '@domain/primitives/payment-method-provider.vo';
import { OrderIdVO } from '@domain/primitives/order-id.vo';
import { UserIdVO } from '@domain/primitives/user-id.vo';
import { PAYMENT_LIMIT } from '@vubon/shared-constants/business/payment';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';

function makePending(): PaymentEntity {
  return PaymentEntity.create({
    id: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
    props: {
      orderId: OrderIdVO.create(TEST_IDS.ORDER_ID),
      userId: UserIdVO.create(TEST_IDS.USER_ID),
      amount: PaymentAmountVO.create(100, 'BDT'),
      currency: PaymentCurrencyVO.create('BDT'),
      method: PaymentMethodTypeVO.create('card', 'online'),
      provider: PaymentMethodProviderVO.create('stripe', 'sandbox'),
    },
    now: TEST_DATES.NOW,
  });
}

describe('CanInitiatePaymentSpecification', () => {
  const spec = CanInitiatePaymentSpecification.strict();

  describe('isSatisfiedBy()', () => {
    it('true for fresh context (no existing payments)', () => {
      expect(
        spec.isSatisfiedBy({
          amount: 100,
          currency: 'BDT',
          existingPayments: [],
        }),
      ).toBe(true);
    });

    it('false when amount below MIN', () => {
      expect(
        spec.isSatisfiedBy({
          amount: PAYMENT_LIMIT.MIN_AMOUNT - 1,
          currency: 'BDT',
          existingPayments: [],
        }),
      ).toBe(false);
    });

    it('false when amount > MAX', () => {
      expect(
        spec.isSatisfiedBy({
          amount: PAYMENT_LIMIT.MAX_AMOUNT + 1,
          currency: 'BDT',
          existingPayments: [],
        }),
      ).toBe(false);
    });

    it('false when currency invalid (not 3 chars)', () => {
      expect(
        spec.isSatisfiedBy({
          amount: 100,
          currency: 'BD',
          existingPayments: [],
        }),
      ).toBe(false);
    });

    it('false when existing active payment of same currency', () => {
      const existing = makePending();
      expect(
        spec.isSatisfiedBy({
          amount: 100,
          currency: 'BDT',
          existingPayments: [existing],
        }),
      ).toBe(false);
    });

    it('true when existing payments are final', () => {
      const existing = makePending();
      existing.cancel('test', 'admin', TEST_DATES.NOW);
      expect(
        spec.isSatisfiedBy({
          amount: 100,
          currency: 'BDT',
          existingPayments: [existing],
        }),
      ).toBe(true);
    });
  });

  describe('explain()', () => {
    it('returns null when satisfied', () => {
      expect(
        spec.explain({
          amount: 100,
          currency: 'BDT',
          existingPayments: [],
        }),
      ).toBeNull();
    });

    it('explains min violation', () => {
      const msg = spec.explain({
        amount: 0,
        currency: 'BDT',
        existingPayments: [],
      });
      expect(msg).toContain('>=');
    });

    it('explains max violation', () => {
      const msg = spec.explain({
        amount: PAYMENT_LIMIT.MAX_AMOUNT + 1,
        currency: 'BDT',
        existingPayments: [],
      });
      expect(msg).toContain('max');
    });

    it('explains invalid currency', () => {
      const msg = spec.explain({
        amount: 100,
        currency: 'BD',
        existingPayments: [],
      });
      expect(msg).toContain('currency');
    });

    it('explains existing payment conflict', () => {
      const msg = spec.explain({
        amount: 100,
        currency: 'BDT',
        existingPayments: [makePending()],
      });
      expect(msg).toContain('Existing');
    });
  });
});
