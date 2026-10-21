/**
 * CanRefundSpecification
 * @module payment-service/domain/specifications
 *
 * Uses RefundEligibilityService internally (single source of truth).
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { PaymentEntity } from '@domain/entities/payment.entity';
import type { RefundReasonVO } from '@domain/primitives/refund-reason.vo';
import { RefundEligibilityService } from '@domain/services/refund-eligibility.service';

export interface CanRefundContext {
  readonly payment: PaymentEntity;
  readonly refundAmount: number;
  readonly reason: RefundReasonVO;
  readonly referenceDate?: Date;
}

export class CanRefundSpecification extends Specification<CanRefundContext> {
  isSatisfiedBy(ctx: CanRefundContext): boolean {
    return RefundEligibilityService.check(ctx).eligible;
  }

  explain(ctx: CanRefundContext): string | null {
    const result = RefundEligibilityService.check(ctx);
    return result.eligible ? null : result.reason ?? 'Not eligible';
  }

  static strict(): CanRefundSpecification {
    return new CanRefundSpecification();
  }
}
