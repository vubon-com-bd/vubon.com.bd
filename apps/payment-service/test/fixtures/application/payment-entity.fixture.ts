/**
 * Payment Entity Fixtures
 * @module payment-service/test/fixtures/application
 */
import { PaymentEntity } from '@domain/entities/payment.entity';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { PaymentCurrencyVO } from '@domain/primitives/payment-currency.vo';
import { PaymentMethodTypeVO } from '@domain/primitives/payment-method-type.vo';
import { PaymentMethodProviderVO } from '@domain/primitives/payment-method-provider.vo';
import { OrderIdVO } from '@domain/primitives/order-id.vo';
import { UserIdVO } from '@domain/primitives/user-id.vo';

export const VALID_PAYMENT_ID = '123e4567-e89b-42d3-a456-426614174000';
export const VALID_ORDER_ID = '223e4567-e89b-42d3-a456-426614174001';
export const VALID_USER_ID = '323e4567-e89b-42d3-a456-426614174002';

export function makePaymentEntity(overrides: { status?: string; amount?: number } = {}): PaymentEntity {
  const now = '2025-01-15T10:00:00.000Z';
  return PaymentEntity.create({
    id: PaymentIdVO.create(VALID_PAYMENT_ID),
    now,
    props: {
      orderId: OrderIdVO.create(VALID_ORDER_ID),
      userId: UserIdVO.create(VALID_USER_ID),
      amount: PaymentAmountVO.create(overrides.amount ?? 1000, 'BDT'),
      currency: PaymentCurrencyVO.create('BDT'),
      method: PaymentMethodTypeVO.create('card', 'online'),
      provider: PaymentMethodProviderVO.create('stripe', 'production'),
    },
  });
}

export function makeCapturedPaymentEntity(overrides: { amount?: number } = {}): PaymentEntity {
  const entity = makePaymentEntity(overrides);
  entity.startProcessing();
  entity.capture(overrides.amount ?? 1000, 'stripe_ch_12345');
  return entity;
}
