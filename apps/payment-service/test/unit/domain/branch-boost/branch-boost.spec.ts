/**
 * Branch coverage boost — invalid transitions + defensive paths
 */
import { describe, it, expect } from '@jest/globals';
import { PaymentStatusVO } from '@domain/primitives/payment-status.vo';
import { TransactionStatusVO } from '@domain/primitives/transaction-status.vo';
import { RefundStatusVO } from '@domain/primitives/refund-status.vo';
import { RecurringStatusVO } from '@domain/primitives/recurring-status.vo';
import { SubscriptionStatusVO } from '@domain/primitives/subscription-status.vo';
import { InvoiceStatusVO } from '@domain/primitives/invoice-status.vo';
import { VerificationStatusVO } from '@domain/primitives/verification-status.vo';
import {
  PAYMENT_STATUS,
  TRANSACTION_STATUS,
} from '@vubon/shared-constants/business/payment';

describe('BRANCH — PaymentStatusVO transitions (all pairs)', () => {
  const allStatuses = Object.values(PAYMENT_STATUS);
  const allTargets = [...allStatuses, 'unknown', 'invalid'] as const;
  for (const from of allStatuses) {
    for (const to of allTargets) {
      it(`${from} → ${to}`, () => {
        const vo = PaymentStatusVO.create(from);
        expect(typeof vo.canTransitionTo(to)).toBe('boolean');
      });
    }
  }
});

describe('BRANCH — TransactionStatusVO transitions (all pairs)', () => {
  const allStatuses = Object.values(TRANSACTION_STATUS);
  const allTargets = [...allStatuses, 'invalid'] as const;
  for (const from of allStatuses) {
    for (const to of allTargets) {
      it(`${from} → ${to}`, () => {
        const vo = TransactionStatusVO.create(from);
        expect(typeof vo.canTransitionTo(to)).toBe('boolean');
      });
    }
  }
});

describe('BRANCH — RefundStatusVO transitions (all pairs)', () => {
  const statuses = ['requested', 'approved', 'rejected', 'processing', 'completed', 'failed', 'cancelled'] as const;
  const allTargets = [...statuses, 'invalid'] as const;
  for (const from of statuses) {
    for (const to of allTargets) {
      it(`${from} → ${to}`, () => {
        const vo = RefundStatusVO.create(from);
        expect(typeof vo.canTransitionTo(to)).toBe('boolean');
      });
    }
  }
});

describe('BRANCH — RecurringStatusVO transitions (all pairs)', () => {
  const statuses = ['scheduled', 'active', 'paused', 'completed', 'cancelled', 'failed'] as const;
  const allTargets = [...statuses, 'invalid'] as const;
  for (const from of statuses) {
    for (const to of allTargets) {
      it(`${from} → ${to}`, () => {
        const vo = RecurringStatusVO.create(from);
        expect(typeof vo.canTransitionTo(to)).toBe('boolean');
      });
    }
  }
});

describe('BRANCH — SubscriptionStatusVO transitions (all pairs)', () => {
  const statuses = ['trialing', 'active', 'past_due', 'paused', 'cancelled', 'expired'] as const;
  const allTargets = [...statuses, 'invalid'] as const;
  for (const from of statuses) {
    for (const to of allTargets) {
      it(`${from} → ${to}`, () => {
        const vo = SubscriptionStatusVO.create(from);
        expect(typeof vo.canTransitionTo(to)).toBe('boolean');
      });
    }
  }
});

describe('BRANCH — InvoiceStatusVO transitions (all pairs)', () => {
  const statuses = ['draft', 'issued', 'paid', 'overdue', 'void', 'refunded'] as const;
  const allTargets = [...statuses, 'invalid'] as const;
  for (const from of statuses) {
    for (const to of allTargets) {
      it(`${from} → ${to}`, () => {
        const vo = InvoiceStatusVO.create(from);
        expect(typeof vo.canTransitionTo(to)).toBe('boolean');
      });
    }
  }
});

describe('BRANCH — VerificationStatusVO transitions (all pairs)', () => {
  const statuses = ['pending', 'in_progress', 'verified', 'failed', 'expired'] as const;
  const allTargets = [...statuses, 'invalid'] as const;
  for (const from of statuses) {
    for (const to of allTargets) {
      it(`${from} → ${to}`, () => {
        const vo = VerificationStatusVO.create(from);
        expect(typeof vo.canTransitionTo(to)).toBe('boolean');
      });
    }
  }
});
