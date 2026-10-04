/**
 * RefundStatus Value Object
 * @module payment-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { InvalidRefundStatusError } from '../../errors/refund.errors.js';

export const REFUND_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
} as const;

export type RefundStatusValue = (typeof REFUND_STATUS)[keyof typeof REFUND_STATUS];
const ALLOWED = Object.values(REFUND_STATUS) as readonly string[];

export class RefundStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): RefundStatusVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidRefundStatusError(raw, ALLOWED);
    }
    return new RefundStatusVO(raw);
  }

  static reconstitute(raw: string): RefundStatusVO {
    return new RefundStatusVO(raw);
  }

  static pending(): RefundStatusVO { return new RefundStatusVO(REFUND_STATUS.PENDING); }
  static processing(): RefundStatusVO { return new RefundStatusVO(REFUND_STATUS.PROCESSING); }
  static succeeded(): RefundStatusVO { return new RefundStatusVO(REFUND_STATUS.SUCCEEDED); }
  static failed(): RefundStatusVO { return new RefundStatusVO(REFUND_STATUS.FAILED); }
  static cancelled(): RefundStatusVO { return new RefundStatusVO(REFUND_STATUS.CANCELLED); }

  isFinal(): boolean {
    return [
      REFUND_STATUS.SUCCEEDED,
      REFUND_STATUS.FAILED,
      REFUND_STATUS.CANCELLED,
    ].includes(this.value as never);
  }

  isSuccess(): boolean {
    return this.value === REFUND_STATUS.SUCCEEDED;
  }

  canTransitionTo(target: string): boolean {
    const transitions: Record<string, readonly string[]> = {
      [REFUND_STATUS.PENDING]: [
        REFUND_STATUS.PROCESSING,
        REFUND_STATUS.SUCCEEDED,
        REFUND_STATUS.FAILED,
        REFUND_STATUS.CANCELLED,
      ],
      [REFUND_STATUS.PROCESSING]: [
        REFUND_STATUS.SUCCEEDED,
        REFUND_STATUS.FAILED,
      ],
      [REFUND_STATUS.SUCCEEDED]: [],
      [REFUND_STATUS.FAILED]: [],
      [REFUND_STATUS.CANCELLED]: [],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
