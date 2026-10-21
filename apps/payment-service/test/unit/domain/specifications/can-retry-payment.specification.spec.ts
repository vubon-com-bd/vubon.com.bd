/**
 * CanRetryPaymentSpecification unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CanRetryPaymentSpecification } from '@domain/specifications/can-retry-payment.specification';
import { PaymentEntity } from '@domain/entities/payment.entity';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { PaymentCurrencyVO } from '@domain/primitives/payment-currency.vo';
import { PaymentMethodTypeVO } from '@domain/primitives/payment-method-type.vo';
import { PaymentMethodProviderVO } from '@domain/primitives/payment-method-provider.vo';
import { PaymentStatusVO } from '@domain/primitives/payment-status.vo';
import { OrderIdVO } from '@domain/primitives/order-id.vo';
import { UserIdVO } from '@domain/primitives/user-id.vo';
import { PAYMENT_LIMIT } from '@vubon/shared-constants/business/payment';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';

function makeFailed(): PaymentEntity {
  return PaymentEntity.reconstitute({
    id: TEST_IDS.PAYMENT_ID,
    createdAt: TEST_DATES.NOW,
    updatedAt: TEST_DATES.NOW,
    props: {
      orderId: OrderIdVO.create(TEST_IDS.ORDER_ID),
      userId: UserIdVO.create(TEST_IDS.USER_ID),
      amount: PaymentAmountVO.reconstitute(100, 'BDT'),
      currency: PaymentCurrencyVO.reconstitute('BDT'),
      status: PaymentStatusVO.failed(),
      method: PaymentMethodTypeVO.create('card', 'online'),
      provider: PaymentMethodProviderVO.create('stripe', 'sandbox'),
      failureReason: 'card_declined',
    },
  });
}

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

describe('CanRetryPaymentSpecification', () => {
  const spec = CanRetryPaymentSpecification.strict();

  describe('isSatisfiedBy()', () => {
    it('true for failed + attempts < MAX', () => {
      expect(
        spec.isSatisfiedBy({ payment: makeFailed(), attemptCount: 1 }),
      ).toBe(true);
    });

    it('true for declined + attempts < MAX', () => {
      const declined = PaymentEntity.reconstitute({
        id: TEST_IDS.PAYMENT_ID,
        createdAt: TEST_DATES.NOW,
        updatedAt: TEST_DATES.NOW,
        props: {
          orderId: OrderIdVO.create(TEST_IDS.ORDER_ID),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          amount: PaymentAmountVO.reconstitute(100, 'BDT'),
          currency: PaymentCurrencyVO.reconstitute('BDT'),
          status: PaymentStatusVO.declined(),
          method: PaymentMethodTypeVO.create('card', 'online'),
          provider: PaymentMethodProviderVO.create('stripe', 'sandbox'),
          failureReason: 'insufficient',
        },
      });
      expect(spec.isSatisfiedBy({ payment: declined, attemptCount: 0 })).toBe(true);
    });

    it('false for paid payment (not retryable)', () => {
      const paid = PaymentEntity.reconstitute({
        id: TEST_IDS.PAYMENT_ID,
        createdAt: TEST_DATES.NOW,
        updatedAt: TEST_DATES.NOW,
        props: {
          orderId: OrderIdVO.create(TEST_IDS.ORDER_ID),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          amount: PaymentAmountVO.reconstitute(100, 'BDT'),
          currency: PaymentCurrencyVO.reconstitute('BDT'),
          status: PaymentStatusVO.paid(),
          method: PaymentMethodTypeVO.create('card', 'online'),
          provider: PaymentMethodProviderVO.create('stripe', 'sandbox'),
          capturedAt: TEST_DATES.NOW,
          paidAt: TEST_DATES.NOW,
        },
      });
      expect(spec.isSatisfiedBy({ payment: paid, attemptCount: 0 })).toBe(false);
    });

    it('false when attempts >= MAX', () => {
      expect(
        spec.isSatisfiedBy({
          payment: makeFailed(),
          attemptCount: PAYMENT_LIMIT.MAX_ATTEMPTS,
        }),
      ).toBe(false);
    });

    it('false for pending payment', () => {
      expect(
        spec.isSatisfiedBy({ payment: makePending(), attemptCount: 0 }),
      ).toBe(false);
    });
  });

  describe('explain()', () => {
    it('null when satisfied', () => {
      expect(spec.explain({ payment: makeFailed(), attemptCount: 1 })).toBeNull();
    });

    it('explains not retryable', () => {
      const msg = spec.explain({ payment: makePending(), attemptCount: 0 });
      expect(msg).toContain('not retryable');
    });

    it('explains max attempts', () => {
      const msg = spec.explain({
        payment: makeFailed(),
        attemptCount: PAYMENT_LIMIT.MAX_ATTEMPTS,
      });
      expect(msg).toContain('Max attempts');
    });
  });
});
