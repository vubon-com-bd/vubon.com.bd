/**
 * PaymentValidationService unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { PaymentValidationService } from '@domain/services/payment-validation.service';
import { PaymentEntity } from '@domain/entities/payment.entity';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { PaymentCurrencyVO } from '@domain/primitives/payment-currency.vo';
import { PaymentMethodTypeVO } from '@domain/primitives/payment-method-type.vo';
import { PaymentMethodProviderVO } from '@domain/primitives/payment-method-provider.vo';
import { PaymentStatusVO } from '@domain/primitives/payment-status.vo';
import { OrderIdVO } from '@domain/primitives/order-id.vo';
import { UserIdVO } from '@domain/primitives/user-id.vo';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
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

describe('PaymentValidationService', () => {
  describe('validate()', () => {
    it('valid payment returns valid=true', () => {
      const r = PaymentValidationService.validate(makePending());
      expect(r.valid).toBe(true);
      expect(r.errors).toHaveLength(0);
    });

    it('detects missing capturedAt for captured status', () => {
      const bad = PaymentEntity.reconstitute({
        id: TEST_IDS.PAYMENT_ID,
        createdAt: TEST_DATES.NOW,
        updatedAt: TEST_DATES.NOW,
        props: {
          orderId: OrderIdVO.create(TEST_IDS.ORDER_ID),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          amount: PaymentAmountVO.reconstitute(100, 'BDT'),
          currency: PaymentCurrencyVO.reconstitute('BDT'),
          status: PaymentStatusVO.captured(),
          method: PaymentMethodTypeVO.create('card', 'online'),
          provider: PaymentMethodProviderVO.create('stripe', 'sandbox'),
        },
      });
      const r = PaymentValidationService.validate(bad);
      expect(r.valid).toBe(false);
      expect(r.errors.some((e) => e.includes('capturedAt'))).toBe(true);
    });

    it('detects refundedAmount > amount', () => {
      const bad = PaymentEntity.reconstitute({
        id: TEST_IDS.PAYMENT_ID,
        createdAt: TEST_DATES.NOW,
        updatedAt: TEST_DATES.NOW,
        props: {
          orderId: OrderIdVO.create(TEST_IDS.ORDER_ID),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          amount: PaymentAmountVO.reconstitute(100, 'BDT'),
          currency: PaymentCurrencyVO.reconstitute('BDT'),
          status: PaymentStatusVO.partiallyRefunded(),
          method: PaymentMethodTypeVO.create('card', 'online'),
          provider: PaymentMethodProviderVO.create('stripe', 'sandbox'),
          refundedAmount: 200,
        },
      });
      const r = PaymentValidationService.validate(bad);
      expect(r.valid).toBe(false);
      expect(r.errors.some((e) => e.includes('Refunded amount'))).toBe(true);
    });
  });

  describe('assertValid()', () => {
    it('passes on valid', () => {
      expect(() => PaymentValidationService.assertValid(makePending())).not.toThrow();
    });
    it('throws on invalid', () => {
      const bad = PaymentEntity.reconstitute({
        id: TEST_IDS.PAYMENT_ID,
        createdAt: TEST_DATES.NOW,
        updatedAt: TEST_DATES.NOW,
        props: {
          orderId: OrderIdVO.create(TEST_IDS.ORDER_ID),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          amount: PaymentAmountVO.reconstitute(100, 'BDT'),
          currency: PaymentCurrencyVO.reconstitute('BDT'),
          status: PaymentStatusVO.captured(),
          method: PaymentMethodTypeVO.create('card', 'online'),
          provider: PaymentMethodProviderVO.create('stripe', 'sandbox'),
        },
      });
      expect(() => PaymentValidationService.assertValid(bad)).toThrow(ValidationError);
    });
  });

  describe('assertCapturable()', () => {
    it('throws on pending', () => {
      expect(() => PaymentValidationService.assertCapturable(makePending())).toThrow(BusinessRuleError);
    });
    it('passes when processing', () => {
      const p = makePending();
      p.startProcessing(TEST_DATES.NOW);
      expect(() => PaymentValidationService.assertCapturable(p)).not.toThrow();
    });
  });

  describe('assertRefundable()', () => {
    it('throws when pending', () => {
      expect(() => PaymentValidationService.assertRefundable(makePending(), 50)).toThrow(BusinessRuleError);
    });
    it('throws on zero amount', () => {
      const p = PaymentEntity.reconstitute({
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
      expect(() => PaymentValidationService.assertRefundable(p, 0)).toThrow(ValidationError);
    });
    it('throws when amount exceeds remaining', () => {
      const p = PaymentEntity.reconstitute({
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
      expect(() => PaymentValidationService.assertRefundable(p, 200)).toThrow(BusinessRuleError);
    });
  });
});
