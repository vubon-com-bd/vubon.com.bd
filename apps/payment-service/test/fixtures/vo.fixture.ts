/**
 * VO makers — simplified constructors for common tests
 */
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { TransactionIdVO } from '@domain/primitives/transaction-id.vo';
import { RefundIdVO } from '@domain/primitives/refund-id.vo';
import { SplitIdVO } from '@domain/primitives/split-id.vo';
import { RecurringIdVO } from '@domain/primitives/recurring-id.vo';
import { SubscriptionIdVO } from '@domain/primitives/subscription-id.vo';
import { InvoiceIdVO } from '@domain/primitives/invoice-id.vo';
import { VerificationIdVO } from '@domain/primitives/verification-id.vo';
import { OrderIdVO } from '@domain/primitives/order-id.vo';
import { UserIdVO } from '@domain/primitives/user-id.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { RefundAmountVO } from '@domain/primitives/refund-amount.vo';
import { SplitAmountVO } from '@domain/primitives/split-amount.vo';
import { InvoiceAmountVO } from '@domain/primitives/invoice-amount.vo';
import { PaymentStatusVO } from '@domain/primitives/payment-status.vo';
import { TransactionStatusVO } from '@domain/primitives/transaction-status.vo';
import { RefundStatusVO } from '@domain/primitives/refund-status.vo';
import { PaymentMethodTypeVO } from '@domain/primitives/payment-method-type.vo';
import { PaymentMethodProviderVO } from '@domain/primitives/payment-method-provider.vo';
import { TEST_IDS } from './ids.fixture.js';

export const makePaymentId = (id = TEST_IDS.PAYMENT_ID): PaymentIdVO =>
  PaymentIdVO.create(id);
export const makeTransactionId = (id = TEST_IDS.TRANSACTION_ID): TransactionIdVO =>
  TransactionIdVO.create(id);
export const makeRefundId = (id = TEST_IDS.REFUND_ID): RefundIdVO =>
  RefundIdVO.create(id);
export const makeSplitId = (id = TEST_IDS.SPLIT_ID): SplitIdVO =>
  SplitIdVO.create(id);
export const makeRecurringId = (id = TEST_IDS.RECURRING_ID): RecurringIdVO =>
  RecurringIdVO.create(id);
export const makeSubscriptionId = (id = TEST_IDS.SUBSCRIPTION_ID): SubscriptionIdVO =>
  SubscriptionIdVO.create(id);
export const makeInvoiceId = (id = TEST_IDS.INVOICE_ID): InvoiceIdVO =>
  InvoiceIdVO.create(id);
export const makeVerificationId = (id = TEST_IDS.VERIFICATION_ID): VerificationIdVO =>
  VerificationIdVO.create(id);
export const makeOrderId = (id = TEST_IDS.ORDER_ID): OrderIdVO =>
  OrderIdVO.create(id);
export const makeUserId = (id = TEST_IDS.USER_ID): UserIdVO =>
  UserIdVO.create(id);

export const makePaymentAmount = (amount = 100, currency = 'BDT'): PaymentAmountVO =>
  PaymentAmountVO.create(amount, currency);
export const makeRefundAmount = (amount = 50, currency = 'BDT'): RefundAmountVO =>
  RefundAmountVO.create(amount, currency);
export const makeSplitAmount = (amount = 50, currency = 'BDT'): SplitAmountVO =>
  SplitAmountVO.create(amount, currency);
export const makeInvoiceAmount = (
  subtotal = 100,
  tax = 15,
  currency = 'BDT',
): InvoiceAmountVO => InvoiceAmountVO.create(subtotal, tax, currency);

export const makePaymentStatus = (s = 'pending'): PaymentStatusVO =>
  PaymentStatusVO.create(s);
export const makeTransactionStatus = (s = 'pending'): TransactionStatusVO =>
  TransactionStatusVO.create(s);
export const makeRefundStatus = (s = 'requested'): RefundStatusVO =>
  RefundStatusVO.create(s);

export const makeCardMethod = (): PaymentMethodTypeVO =>
  PaymentMethodTypeVO.create('card', 'online');
export const makeCodMethod = (): PaymentMethodTypeVO =>
  PaymentMethodTypeVO.create('cash_on_delivery', 'offline');
export const makeBkashMethod = (): PaymentMethodTypeVO =>
  PaymentMethodTypeVO.create('mobile_banking', 'online');

export const makeStripeProvider = (env = 'sandbox'): PaymentMethodProviderVO =>
  PaymentMethodProviderVO.create('stripe', env);
export const makeBkashProvider = (env = 'sandbox'): PaymentMethodProviderVO =>
  PaymentMethodProviderVO.create('bkash', env);
