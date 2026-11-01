/**
 * Payment test fixtures — entity makers
 */
import { PaymentEntity } from '@domain/entities/payment.entity.js';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { PaymentStatusVO } from '@domain/primitives/payment-status.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { PaymentCurrencyVO } from '@domain/primitives/payment-currency.vo';
import { PaymentMethodTypeVO } from '@domain/primitives/payment-method-type.vo';
import { PaymentMethodProviderVO } from '@domain/primitives/payment-method-provider.vo';
import { OrderIdVO } from '@domain/primitives/order-id.vo';
import { UserIdVO } from '@domain/primitives/user-id.vo';
import { TEST_IDS } from './ids.fixture.js';
import { TEST_DATES, TEST_NUMBERS } from './dates.fixture.js';

/**
 * Fresh pending payment (card + stripe)
 */
export function makePendingPayment(
  overrides: Partial<{ amount: number; currency: string }> = {},
): PaymentEntity {
  return PaymentEntity.create({
    id: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
    props: {
      orderId: OrderIdVO.create(TEST_IDS.ORDER_ID),
      userId: UserIdVO.create(TEST_IDS.USER_ID),
      amount: PaymentAmountVO.create(
        overrides.amount ?? TEST_NUMBERS.TYPICAL,
        overrides.currency ?? 'BDT',
      ),
      currency: PaymentCurrencyVO.create(overrides.currency ?? 'BDT'),
      method: PaymentMethodTypeVO.create('card', 'online'),
      provider: PaymentMethodProviderVO.create('stripe', 'sandbox'),
    },
    now: TEST_DATES.NOW,
  });
}

/**
 * Payment already in given status (reconstituted, no invariants broken)
 */
export function makePaymentWithStatus(
  status: 'pending' | 'processing' | 'authorized' | 'captured' | 'paid' | 'failed' | 'cancelled',
  overrides: Partial<{ amount: number; refundedAmount: number }> = {},
): PaymentEntity {
  const amount = overrides.amount ?? TEST_NUMBERS.TYPICAL;
  return PaymentEntity.reconstitute({
    id: TEST_IDS.PAYMENT_ID,
    createdAt: TEST_DATES.YESTERDAY,
    updatedAt: TEST_DATES.NOW,
    props: {
      orderId: OrderIdVO.create(TEST_IDS.ORDER_ID),
      userId: UserIdVO.create(TEST_IDS.USER_ID),
      amount: PaymentAmountVO.reconstitute(amount, 'BDT'),
      currency: PaymentCurrencyVO.reconstitute('BDT'),
      status: PaymentStatusVO.create(status),
      method: PaymentMethodTypeVO.create('card', 'online'),
      provider: PaymentMethodProviderVO.create('stripe', 'sandbox'),
      capturedAt: status === 'captured' || status === 'paid' ? TEST_DATES.NOW : undefined,
      paidAt: status === 'paid' ? TEST_DATES.NOW : undefined,
      refundedAmount: overrides.refundedAmount,
      failureReason: status === 'failed' ? 'card_declined' : undefined,
    },
    version: 3,
  });
}

/**
 * COD payment — no provider
 */
export function makeCodPayment(): PaymentEntity {
  return PaymentEntity.create({
    id: PaymentIdVO.create(TEST_IDS.PAYMENT_ID_2),
    props: {
      orderId: OrderIdVO.create(TEST_IDS.ORDER_ID),
      userId: UserIdVO.create(TEST_IDS.USER_ID),
      amount: PaymentAmountVO.create(TEST_NUMBERS.TYPICAL, 'BDT'),
      currency: PaymentCurrencyVO.create('BDT'),
      method: PaymentMethodTypeVO.create('cash_on_delivery', 'offline'),
    },
    now: TEST_DATES.NOW,
  });
}

/**
 * bKash payment — sandbox
 */
export function makeBkashPayment(): PaymentEntity {
  return PaymentEntity.create({
    id: PaymentIdVO.create(TEST_IDS.PAYMENT_ID_3),
    props: {
      orderId: OrderIdVO.create(TEST_IDS.ORDER_ID_2),
      userId: UserIdVO.create(TEST_IDS.USER_ID_2),
      amount: PaymentAmountVO.create(500, 'BDT'),
      currency: PaymentCurrencyVO.create('BDT'),
      method: PaymentMethodTypeVO.create('mobile_banking', 'online'),
      provider: PaymentMethodProviderVO.create('bkash', 'sandbox'),
    },
    now: TEST_DATES.NOW,
  });
}
