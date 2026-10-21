/**
 * PaymentVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { PaymentVO } from '@domain/composites/payment.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { PaymentStatusVO } from '@domain/primitives/payment-status.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { PaymentCurrencyVO } from '@domain/primitives/payment-currency.vo';
import { PaymentMethodTypeVO } from '@domain/primitives/payment-method-type.vo';
import { PaymentMethodProviderVO } from '@domain/primitives/payment-method-provider.vo';
import { OrderIdVO } from '@domain/primitives/order-id.vo';
import { UserIdVO } from '@domain/primitives/user-id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';

function makeProps(overrides: Partial<Parameters<typeof PaymentVO.create>[0]> = {}) {
  return {
    id: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
    orderId: OrderIdVO.create(TEST_IDS.ORDER_ID),
    userId: UserIdVO.create(TEST_IDS.USER_ID),
    amount: PaymentAmountVO.create(100, 'BDT'),
    currency: PaymentCurrencyVO.create('BDT'),
    status: PaymentStatusVO.pending(),
    method: PaymentMethodTypeVO.create('card', 'online'),
    provider: PaymentMethodProviderVO.create('stripe', 'sandbox'),
    createdAt: TEST_DATES.NOW,
    updatedAt: TEST_DATES.NOW,
    ...overrides,
  };
}

describe('PaymentVO', () => {
  describe('create()', () => {
    it('creates valid payment', () => {
      const vo = PaymentVO.create(makeProps());
      expect(vo.amount.amount).toBe(100);
      expect(vo.status.isPending()).toBe(true);
    });
    it('throws on currency mismatch', () => {
      expect(() =>
        PaymentVO.create(
          makeProps({
            amount: PaymentAmountVO.create(100, 'USD'),
            currency: PaymentCurrencyVO.create('BDT'),
          }),
        ),
      ).toThrow(ValidationError);
    });
    it('throws when online without provider', () => {
      expect(() => PaymentVO.create(makeProps({ provider: undefined }))).toThrow(ValidationError);
    });
    it('accepts COD without provider', () => {
      const vo = PaymentVO.create(
        makeProps({
          method: PaymentMethodTypeVO.create('cash_on_delivery', 'offline'),
          provider: undefined,
        }),
      );
      expect(vo.method.isCod()).toBe(true);
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      const vo = PaymentVO.reconstitute(
        makeProps({
          amount: PaymentAmountVO.create(100, 'USD'),
          currency: PaymentCurrencyVO.create('BDT'),
        }),
      );
      expect(vo.amount.currency).toBe('USD');
    });
  });

  describe('predicates', () => {
    it('isSuccessful', () => {
      expect(
        PaymentVO.create(makeProps({ status: PaymentStatusVO.paid() })).isSuccessful(),
      ).toBe(true);
    });
    it('isFinal', () => {
      expect(
        PaymentVO.create(makeProps({ status: PaymentStatusVO.paid() })).isFinal(),
      ).toBe(true);
    });
    it('isRefundable', () => {
      expect(
        PaymentVO.create(makeProps({ status: PaymentStatusVO.paid() })).isRefundable(),
      ).toBe(true);
    });
    it('isRetryable', () => {
      expect(
        PaymentVO.create(makeProps({ status: PaymentStatusVO.failed() })).isRetryable(),
      ).toBe(true);
    });
    it('hasGateway', () => {
      expect(PaymentVO.create(makeProps()).hasGateway()).toBe(true);
    });
  });
});
