/**
 * Gap-fill tests — targeted branches/functions uncovered by main specs
 */
import { describe, it, expect } from '@jest/globals';

import { PaymentMethodProviderVO } from '@domain/primitives/payment-method-provider.vo';
import { PaymentVO } from '@domain/composites/payment.vo';
import { InvoiceVO } from '@domain/composites/invoice.vo';
import { RefundVO } from '@domain/composites/refund.vo';
import { SubscriptionVO } from '@domain/composites/subscription.vo';
import { TransactionVO } from '@domain/composites/transaction.vo';
import { RecurringPaymentVO } from '@domain/composites/recurring-payment.vo';
import { SplitPaymentVO } from '@domain/composites/split-payment.vo';
import { VerificationVO } from '@domain/composites/verification.vo';
import { PaymentGatewayVO } from '@domain/composites/payment-gateway.vo';
import { PaymentMethodVO } from '@domain/composites/payment-method.vo';
import { CardDetailsVO } from '@domain/composites/card-details.vo';

import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { PaymentStatusVO } from '@domain/primitives/payment-status.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { PaymentCurrencyVO } from '@domain/primitives/payment-currency.vo';
import { PaymentMethodIdVO } from '@domain/primitives/payment-method-id.vo';
import { PaymentMethodTypeVO } from '@domain/primitives/payment-method-type.vo';
import { OrderIdVO } from '@domain/primitives/order-id.vo';
import { UserIdVO } from '@domain/primitives/user-id.vo';
import { TransactionIdVO } from '@domain/primitives/transaction-id.vo';
import { TransactionTypeVO } from '@domain/primitives/transaction-type.vo';
import { TransactionStatusVO } from '@domain/primitives/transaction-status.vo';
import { RefundIdVO } from '@domain/primitives/refund-id.vo';
import { RefundAmountVO } from '@domain/primitives/refund-amount.vo';
import { RefundReasonVO } from '@domain/primitives/refund-reason.vo';
import { RefundStatusVO } from '@domain/primitives/refund-status.vo';
import { SubscriptionIdVO } from '@domain/primitives/subscription-id.vo';
import { SubscriptionStatusVO } from '@domain/primitives/subscription-status.vo';
import { SubscriptionPlanVO } from '@domain/primitives/subscription-plan.vo';
import { RecurringFrequencyVO } from '@domain/primitives/recurring-frequency.vo';
import { RecurringIdVO } from '@domain/primitives/recurring-id.vo';
import { RecurringStatusVO } from '@domain/primitives/recurring-status.vo';
import { SplitIdVO } from '@domain/primitives/split-id.vo';
import { SplitTypeVO } from '@domain/primitives/split-type.vo';
import { SplitAmountVO } from '@domain/primitives/split-amount.vo';
import { SplitPercentageVO } from '@domain/primitives/split-percentage.vo';
import { VerificationIdVO } from '@domain/primitives/verification-id.vo';
import { VerificationStatusVO } from '@domain/primitives/verification-status.vo';
import { VerificationMethodVO } from '@domain/primitives/verification-method.vo';
import { InvoiceIdVO } from '@domain/primitives/invoice-id.vo';
import { InvoiceNumberVO } from '@domain/primitives/invoice-number.vo';
import { InvoiceStatusVO } from '@domain/primitives/invoice-status.vo';
import { InvoiceAmountVO } from '@domain/primitives/invoice-amount.vo';
import { CardTokenVO } from '@domain/primitives/card-token.vo';
import { CardLast4VO } from '@domain/primitives/card-last4.vo';
import { CardBrandVO } from '@domain/primitives/card-brand.vo';
import { CardExpiryVO } from '@domain/primitives/card-expiry.vo';

import { InvoiceEntity } from '@domain/entities/invoice.entity';
import { PaymentGatewayEntity } from '@domain/entities/payment-gateway.entity';
import { PaymentMethodEntity } from '@domain/entities/payment-method.entity';
import { RecurringPaymentEntity } from '@domain/entities/recurring-payment.entity';
import { SplitPaymentEntity } from '@domain/entities/split-payment.entity';
import { VerificationEntity } from '@domain/entities/verification.entity';
import { PaymentEntity } from '@domain/entities/payment.entity';

import { PaymentValidationService } from '@domain/services/payment-validation.service';

import { TEST_IDS, TEST_DATES } from '@fixtures/index';

const REF = new Date(TEST_DATES.NOW);

// ═══════════════════════════════════════════════
// PRIMITIVES
// ═══════════════════════════════════════════════
describe('GAP — PaymentMethodProviderVO', () => {
  it('isManual()', () => {
    expect(PaymentMethodProviderVO.create('manual', 'production').isManual()).toBe(true);
    expect(PaymentMethodProviderVO.create('stripe', 'production').isManual()).toBe(false);
  });
  it('isBkash/isNagad/isStripe (branches)', () => {
    expect(PaymentMethodProviderVO.create('bkash', 'sandbox').isBkash()).toBe(true);
    expect(PaymentMethodProviderVO.create('nagad', 'sandbox').isNagad()).toBe(true);
    expect(PaymentMethodProviderVO.create('stripe', 'sandbox').isStripe()).toBe(true);
  });
});

// ═══════════════════════════════════════════════
// COMPOSITES
// ═══════════════════════════════════════════════
describe('GAP — PaymentVO getters', () => {
  it('exposes orderId, userId, createdAt, updatedAt', () => {
    const v = PaymentVO.create({
      id: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
      orderId: OrderIdVO.create(TEST_IDS.ORDER_ID),
      userId: UserIdVO.create(TEST_IDS.USER_ID),
      amount: PaymentAmountVO.create(100, 'BDT'),
      currency: PaymentCurrencyVO.create('BDT'),
      status: PaymentStatusVO.paid(),
      method: PaymentMethodTypeVO.create('card', 'online'),
      provider: PaymentMethodProviderVO.create('stripe', 'sandbox'),
      createdAt: TEST_DATES.NOW,
      updatedAt: TEST_DATES.NOW,
    });
    expect(v.orderId).toBeDefined();
    expect(v.userId).toBeDefined();
    expect(v.createdAt).toBe(TEST_DATES.NOW);
    expect(v.updatedAt).toBe(TEST_DATES.NOW);
  });
});

describe('GAP — InvoiceVO getters + isOverdue/isPayable', () => {
  it('exposes notes/issuedAt/dueAt/paidAt', () => {
    const v = InvoiceVO.create({
      id: InvoiceIdVO.create(TEST_IDS.INVOICE_ID),
      invoiceNumber: InvoiceNumberVO.create(TEST_IDS.INVOICE_NUMBER),
      status: InvoiceStatusVO.issued(),
      amount: InvoiceAmountVO.create(100, 15, 'BDT'),
      userId: UserIdVO.create(TEST_IDS.USER_ID),
      issuedAt: TEST_DATES.NOW,
      notes: 'net 30',
      createdAt: TEST_DATES.NOW,
      updatedAt: TEST_DATES.NOW,
    });
    expect(v.notes).toBe('net 30');
    expect(v.issuedAt).toBe(TEST_DATES.NOW);
    expect(v.dueAt).toBeUndefined();
    expect(v.paidAt).toBeUndefined();
    expect(v.orderId).toBeUndefined();
    expect(v.createdAt).toBe(TEST_DATES.NOW);
    expect(v.updatedAt).toBe(TEST_DATES.NOW);
  });

  it('isOverdue + isPayable', () => {
    const overdue = InvoiceVO.create({
      id: InvoiceIdVO.create(TEST_IDS.INVOICE_ID),
      invoiceNumber: InvoiceNumberVO.create(TEST_IDS.INVOICE_NUMBER),
      status: InvoiceStatusVO.overdue(),
      amount: InvoiceAmountVO.create(100, 15, 'BDT'),
      userId: UserIdVO.create(TEST_IDS.USER_ID),
      issuedAt: TEST_DATES.YESTERDAY,
      dueAt: TEST_DATES.NOW,
      createdAt: TEST_DATES.NOW,
      updatedAt: TEST_DATES.NOW,
    });
    expect(overdue.isOverdue()).toBe(true);
    expect(overdue.isPayable()).toBe(true);
  });
});

describe('GAP — RefundVO getters', () => {
  it('exposes requestedBy/approvedBy/completedAt', () => {
    const v = RefundVO.create({
      id: RefundIdVO.create(TEST_IDS.REFUND_ID),
      paymentId: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
      amount: RefundAmountVO.create(50, 'BDT'),
      reason: RefundReasonVO.create('customer_request'),
      status: RefundStatusVO.completed(),
      requestedBy: 'u1',
      approvedBy: 'admin',
      completedAt: TEST_DATES.NOW,
      createdAt: TEST_DATES.NOW,
      updatedAt: TEST_DATES.NOW,
    });
    expect(v.requestedBy).toBe('u1');
    expect(v.approvedBy).toBe('admin');
    expect(v.completedAt).toBe(TEST_DATES.NOW);
    expect(v.createdAt).toBe(TEST_DATES.NOW);
    expect(v.updatedAt).toBe(TEST_DATES.NOW);
  });
});

describe('GAP — SubscriptionVO getters', () => {
  it('exposes startedAt/trialEndsAt/cancelledAt/cancelAtPeriodEnd', () => {
    const v = SubscriptionVO.create({
      id: SubscriptionIdVO.create(TEST_IDS.SUBSCRIPTION_ID),
      userId: UserIdVO.create(TEST_IDS.USER_ID),
      status: SubscriptionStatusVO.active(),
      plan: SubscriptionPlanVO.create('premium'),
      frequency: RecurringFrequencyVO.create('monthly'),
      price: PaymentAmountVO.create(500, 'BDT'),
      startedAt: TEST_DATES.NOW,
      currentPeriodStart: TEST_DATES.NOW,
      currentPeriodEnd: TEST_DATES.NEXT_MONTH,
      cancelAtPeriodEnd: false,
      createdAt: TEST_DATES.NOW,
      updatedAt: TEST_DATES.NOW,
    });
    expect(v.startedAt).toBe(TEST_DATES.NOW);
    expect(v.trialEndsAt).toBeUndefined();
    expect(v.cancelledAt).toBeUndefined();
    expect(v.cancelAtPeriodEnd).toBe(false);
    expect(v.createdAt).toBe(TEST_DATES.NOW);
    expect(v.updatedAt).toBe(TEST_DATES.NOW);
  });
});

describe('GAP — TransactionVO via reconstitute', () => {
  it('exposes getters with undefined gateway', () => {
    const v = TransactionVO.reconstitute({
      id: TransactionIdVO.create(TEST_IDS.TRANSACTION_ID),
      paymentId: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
      type: TransactionTypeVO.create('payment'),
      status: TransactionStatusVO.success(),
      amount: PaymentAmountVO.create(100, 'BDT'),
      createdAt: TEST_DATES.NOW,
      updatedAt: TEST_DATES.NOW,
    });
    expect(v.gatewayReference).toBeUndefined();
    expect(v.createdAt).toBe(TEST_DATES.NOW);
    expect(v.updatedAt).toBe(TEST_DATES.NOW);
  });
});

describe('GAP — RecurringPaymentVO getters', () => {
  it('exposes all fields', () => {
    const v = RecurringPaymentVO.create({
      id: RecurringIdVO.create(TEST_IDS.RECURRING_ID),
      paymentId: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
      status: RecurringStatusVO.active(),
      frequency: RecurringFrequencyVO.create('monthly'),
      amount: PaymentAmountVO.create(100, 'BDT'),
      startAt: TEST_DATES.NOW,
      endAt: TEST_DATES.NEXT_MONTH,
      nextRunAt: TEST_DATES.TOMORROW,
      attemptCount: 3,
      createdAt: TEST_DATES.NOW,
      updatedAt: TEST_DATES.NOW,
    });
    expect(v.endAt).toBe(TEST_DATES.NEXT_MONTH);
    expect(v.nextRunAt).toBe(TEST_DATES.TOMORROW);
    expect(v.attemptCount).toBe(3);
    expect(v.isFinal()).toBe(false);
  });
});

describe('GAP — SplitPaymentVO getters', () => {
  it('exposes type/currency/createdAt', () => {
    const v = SplitPaymentVO.create({
      id: SplitIdVO.create(TEST_IDS.SPLIT_ID),
      paymentId: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
      type: SplitTypeVO.create('percentage'),
      receivers: [
        { receiverId: 'a', amount: SplitAmountVO.create(60, 'BDT'), percentage: SplitPercentageVO.create(60) },
        { receiverId: 'b', amount: SplitAmountVO.create(40, 'BDT'), percentage: SplitPercentageVO.create(40) },
      ],
      totalAmount: 100,
      currency: 'BDT',
      createdAt: TEST_DATES.NOW,
      updatedAt: TEST_DATES.NOW,
    });
    expect(v.type.isPercentage()).toBe(true);
    expect(v.currency).toBe('BDT');
    expect(v.createdAt).toBe(TEST_DATES.NOW);
    expect(v.updatedAt).toBe(TEST_DATES.NOW);
  });
});

describe('GAP — VerificationVO getters', () => {
  it('exposes attempts/expiresAt/verifiedAt', () => {
    const v = VerificationVO.create({
      id: VerificationIdVO.create(TEST_IDS.VERIFICATION_ID),
      paymentId: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
      status: VerificationStatusVO.verified(),
      method: VerificationMethodVO.create('otp_sms'),
      attempts: 2,
      expiresAt: TEST_DATES.EXPIRES_IN_1_HOUR,
      verifiedAt: TEST_DATES.NOW,
      createdAt: TEST_DATES.NOW,
      updatedAt: TEST_DATES.NOW,
    });
    expect(v.attempts).toBe(2);
    expect(v.expiresAt).toBe(TEST_DATES.EXPIRES_IN_1_HOUR);
    expect(v.verifiedAt).toBe(TEST_DATES.NOW);
    expect(v.failureReason).toBeUndefined();
    expect(v.isFinal()).toBe(true);
  });
});

describe('GAP — PaymentGatewayVO getters', () => {
  it('exposes isActive/isMaintenance/minAmount/maxAmount', () => {
    const v = PaymentGatewayVO.create({
      provider: PaymentMethodProviderVO.create('stripe', 'sandbox'),
      displayName: 'Stripe',
      isActive: true,
      isMaintenance: false,
      supportedCurrencies: ['BDT'],
      minAmount: 1,
      maxAmount: 100,
      createdAt: TEST_DATES.NOW,
      updatedAt: TEST_DATES.NOW,
    });
    expect(v.isActive).toBe(true);
    expect(v.isMaintenance).toBe(false);
    expect(v.minAmount).toBe(1);
    expect(v.maxAmount).toBe(100);
  });
});

describe('GAP — PaymentMethodVO getters', () => {
  it('exposes id/provider/createdAt', () => {
    const v = PaymentMethodVO.create({
      id: PaymentMethodIdVO.create(TEST_IDS.METHOD_ID),
      type: PaymentMethodTypeVO.create('card', 'online'),
      provider: PaymentMethodProviderVO.create('stripe', 'sandbox'),
      label: 'Card',
      isActive: true,
      createdAt: TEST_DATES.NOW,
      updatedAt: TEST_DATES.NOW,
    });
    expect(v.id.value).toBe(TEST_IDS.METHOD_ID);
    expect(v.provider).toBeDefined();
    expect(v.createdAt).toBe(TEST_DATES.NOW);
  });
});

describe('GAP — CardDetailsVO holderName', () => {
  it('exposes holderName', () => {
    const v = CardDetailsVO.create({
      token: CardTokenVO.create(TEST_IDS.CARD_TOKEN),
      last4: CardLast4VO.create('4242'),
      brand: CardBrandVO.create('visa'),
      expiry: CardExpiryVO.create(12, 2030, REF),
      holderName: 'John Doe',
    });
    expect(v.holderName).toBe('John Doe');
  });
});

// ═══════════════════════════════════════════════
// ENTITIES — extra branches
// ═══════════════════════════════════════════════
describe('GAP — InvoiceEntity void/refund timestamps', () => {
  const make = () =>
    InvoiceEntity.create({
      id: InvoiceIdVO.create(TEST_IDS.INVOICE_ID),
      props: {
        invoiceNumber: InvoiceNumberVO.create(TEST_IDS.INVOICE_NUMBER),
        amount: InvoiceAmountVO.create(100, 15, 'BDT'),
        userId: UserIdVO.create(TEST_IDS.USER_ID),
        orderId: OrderIdVO.create(TEST_IDS.ORDER_ID),
        notes: 'net 30',
      },
      now: TEST_DATES.NOW,
    });

  it('void sets voidedAt', () => {
    const i = make();
    i.void(TEST_DATES.NOW);
    expect(i.voidedAt).toBe(TEST_DATES.NOW);
  });

  it('refund sets refundedAt', () => {
    const i = make();
    i.issue(TEST_DATES.YESTERDAY);
    i.markPaid(TEST_DATES.NOW);
    i.refund(TEST_DATES.NOW);
    expect(i.refundedAt).toBe(TEST_DATES.NOW);
  });

  it('exposes getters', () => {
    const i = make();
    expect(i.invoiceNumber.value).toBe(TEST_IDS.INVOICE_NUMBER);
    expect(i.userId).toBeDefined();
    expect(i.orderId).toBeDefined();
    expect(i.notes).toBe('net 30');
  });
});

describe('GAP — PaymentGatewayEntity getters', () => {
  it('exposes provider/supportedCurrencies', () => {
    const g = PaymentGatewayEntity.create({
      id: TEST_IDS.GATEWAY_ID,
      props: {
        provider: PaymentMethodProviderVO.create('stripe', 'sandbox'),
        displayName: 'Stripe',
        isActive: true,
        isMaintenance: false,
        supportedCurrencies: ['BDT'],
        minAmount: 1,
        maxAmount: 100,
      },
      now: TEST_DATES.NOW,
    });
    expect(g.provider).toBeDefined();
    expect(g.supportedCurrencies.length).toBe(1);
  });
});

describe('GAP — PaymentMethodEntity activate', () => {
  it('activate transitions to active', () => {
    const m = PaymentMethodEntity.create({
      id: PaymentMethodIdVO.create(TEST_IDS.METHOD_ID),
      props: {
        type: PaymentMethodTypeVO.create('cash_on_delivery', 'offline'),
        label: 'COD',
        isActive: false,
      },
      now: TEST_DATES.NOW,
    });
    m.activate(TEST_DATES.NOW);
    expect(m.isActive).toBe(true);
  });
});

describe('GAP — RecurringPaymentEntity getters', () => {
  it('exposes paymentId/frequency/amount/startAt/endAt', () => {
    const r = RecurringPaymentEntity.create({
      id: RecurringIdVO.create(TEST_IDS.RECURRING_ID),
      props: {
        paymentId: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
        frequency: RecurringFrequencyVO.create('monthly'),
        amount: PaymentAmountVO.create(100, 'BDT'),
        startAt: TEST_DATES.NOW,
        endAt: TEST_DATES.NEXT_MONTH,
      },
      now: TEST_DATES.NOW,
    });
    expect(r.paymentId).toBeDefined();
    expect(r.frequency.interval).toBe('monthly');
    expect(r.amount.amount).toBe(100);
    expect(r.startAt).toBe(TEST_DATES.NOW);
    expect(r.endAt).toBe(TEST_DATES.NEXT_MONTH);
  });
});

describe('GAP — SplitPaymentEntity getters', () => {
  it('exposes paymentId/type/receivers/currency', () => {
    const s = SplitPaymentEntity.create({
      id: SplitIdVO.create(TEST_IDS.SPLIT_ID),
      props: {
        paymentId: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
        type: SplitTypeVO.create('percentage'),
        receivers: [
          { receiverId: 'a', amount: SplitAmountVO.create(60, 'BDT'), percentage: SplitPercentageVO.create(60) },
          { receiverId: 'b', amount: SplitAmountVO.create(40, 'BDT'), percentage: SplitPercentageVO.create(40) },
        ],
        totalAmount: 100,
        currency: 'BDT',
      },
      now: TEST_DATES.NOW,
    });
    expect(s.paymentId).toBeDefined();
    expect(s.type.isPercentage()).toBe(true);
    expect(s.receivers.length).toBe(2);
    expect(s.currency).toBe('BDT');
  });
});

describe('GAP — VerificationEntity getters', () => {
  it('exposes paymentId/method/expiresAt', () => {
    const v = VerificationEntity.create({
      id: VerificationIdVO.create(TEST_IDS.VERIFICATION_ID),
      props: {
        paymentId: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
        method: VerificationMethodVO.create('otp_sms'),
        expiresAt: TEST_DATES.EXPIRES_IN_1_HOUR,
      },
      now: TEST_DATES.NOW,
    });
    expect(v.paymentId).toBeDefined();
    expect(v.method.value).toBe('otp_sms');
    expect(v.expiresAt).toBe(TEST_DATES.EXPIRES_IN_1_HOUR);
  });
});

// ═══════════════════════════════════════════════
// SERVICES — extra branches
// ═══════════════════════════════════════════════
describe('GAP — PaymentValidationService negative amount', () => {
  it('validate() detects negative amount via reconstitute', () => {
    const bad = PaymentEntity.reconstitute({
      id: TEST_IDS.PAYMENT_ID,
      createdAt: TEST_DATES.NOW,
      updatedAt: TEST_DATES.NOW,
      props: {
        orderId: OrderIdVO.create(TEST_IDS.ORDER_ID),
        userId: UserIdVO.create(TEST_IDS.USER_ID),
        amount: PaymentAmountVO.reconstitute(-10, 'BDT'),
        currency: PaymentCurrencyVO.reconstitute('BDT'),
        status: PaymentStatusVO.pending(),
        method: PaymentMethodTypeVO.create('card', 'online'),
        provider: PaymentMethodProviderVO.create('stripe', 'sandbox'),
      },
    });
    const r = PaymentValidationService.validate(bad);
    expect(r.valid).toBe(false);
    expect(r.errors.length).toBeGreaterThan(0);
  });
});
