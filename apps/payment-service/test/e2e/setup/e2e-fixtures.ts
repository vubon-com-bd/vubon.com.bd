/**
 * E2E fixtures — in-memory helpers (no DB, no NestJS)
 * @module payment-service/test/e2e
 */
import { PaymentEntity } from '@domain/entities/payment.entity';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { PaymentCurrencyVO } from '@domain/primitives/payment-currency.vo';
import { PaymentMethodTypeVO } from '@domain/primitives/payment-method-type.vo';
import { PaymentMethodProviderVO } from '@domain/primitives/payment-method-provider.vo';
import { OrderIdVO } from '@domain/primitives/order-id.vo';
import { UserIdVO } from '@domain/primitives/user-id.vo';
import { RefundEntity } from '@domain/entities/refund.entity';
import { RefundIdVO } from '@domain/primitives/refund-id.vo';
import { RefundAmountVO } from '@domain/primitives/refund-amount.vo';
import { RefundReasonVO } from '@domain/primitives/refund-reason.vo';
import { SubscriptionEntity } from '@domain/entities/subscription.entity';
import { SubscriptionIdVO } from '@domain/primitives/subscription-id.vo';
import { SubscriptionPlanVO } from '@domain/primitives/subscription-plan.vo';
import { RecurringFrequencyVO } from '@domain/primitives/recurring-frequency.vo';
import { TEST_IDS, TEST_DATES, TEST_NUMBERS } from '@fixtures/index';

export const E2E_IDS = TEST_IDS;
export const E2E_DATES = TEST_DATES;
export const E2E_NUMBERS = TEST_NUMBERS;
export const E2E_CURRENCY = 'BDT';

export function makeE2EPayment(overrides: Partial<{ amount: number }> = {}): PaymentEntity {
  return PaymentEntity.create({
    id: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
    props: {
      orderId: OrderIdVO.create(TEST_IDS.ORDER_ID),
      userId: UserIdVO.create(TEST_IDS.USER_ID),
      amount: PaymentAmountVO.create(overrides.amount ?? TEST_NUMBERS.TYPICAL, E2E_CURRENCY),
      currency: PaymentCurrencyVO.create(E2E_CURRENCY),
      method: PaymentMethodTypeVO.create('card', 'online'),
      provider: PaymentMethodProviderVO.create('stripe', 'sandbox'),
    },
    now: TEST_DATES.NOW,
  });
}

export function makeE2ERefund(paymentId = TEST_IDS.PAYMENT_ID, amount = 50): RefundEntity {
  return RefundEntity.create({
    id: RefundIdVO.create(TEST_IDS.REFUND_ID),
    props: {
      paymentId: PaymentIdVO.create(paymentId),
      amount: RefundAmountVO.create(amount, E2E_CURRENCY),
      reason: RefundReasonVO.create('customer_request'),
      requestedBy: TEST_IDS.USER_ID,
    },
    now: TEST_DATES.NOW,
  });
}

export function makeE2ESubscription(): SubscriptionEntity {
  return SubscriptionEntity.create({
    id: SubscriptionIdVO.create(TEST_IDS.SUBSCRIPTION_ID),
    props: {
      userId: UserIdVO.create(TEST_IDS.USER_ID),
      plan: SubscriptionPlanVO.create('premium'),
      frequency: RecurringFrequencyVO.create('monthly'),
      price: PaymentAmountVO.create(500, E2E_CURRENCY),
      startedAt: TEST_DATES.NOW,
      currentPeriodStart: TEST_DATES.NOW,
      currentPeriodEnd: TEST_DATES.NEXT_MONTH,
    },
    now: TEST_DATES.NOW,
  });
}
