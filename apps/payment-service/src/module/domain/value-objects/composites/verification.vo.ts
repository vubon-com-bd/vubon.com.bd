/**
 * Verification Value Object (Composite)
 * @module payment-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VerificationIdVO } from '@domain/primitives/verification-id.vo';
import { VerificationStatusVO } from '@domain/primitives/verification-status.vo';
import { VerificationMethodVO } from '@domain/primitives/verification-method.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';

export interface VerificationVOProps {
  readonly id: VerificationIdVO;
  readonly paymentId: PaymentIdVO;
  readonly status: VerificationStatusVO;
  readonly method: VerificationMethodVO;
  readonly attempts: number;
  readonly expiresAt: string;
  readonly verifiedAt?: string;
  readonly failureReason?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class VerificationVO extends BaseVO<VerificationVOProps> {
  private constructor(props: VerificationVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: VerificationVOProps): VerificationVO {
    const vo = new VerificationVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: VerificationVOProps): VerificationVO {
    return new VerificationVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.attempts < 0) {
      throw new ValidationError('Verification attempts cannot be negative', 'attempts');
    }
    if (v.status.isVerified() && !v.verifiedAt) {
      throw new ValidationError('Verified requires verifiedAt', 'verifiedAt');
    }
    if (v.status.isFailed() && !v.failureReason) {
      throw new ValidationError('Failed verification requires failureReason', 'failureReason');
    }
  }

  get id(): VerificationIdVO { return this.value.id; }
  get paymentId(): PaymentIdVO { return this.value.paymentId; }
  get status(): VerificationStatusVO { return this.value.status; }
  get method(): VerificationMethodVO { return this.value.method; }
  get attempts(): number { return this.value.attempts; }
  get expiresAt(): string { return this.value.expiresAt; }
  get verifiedAt(): string | undefined { return this.value.verifiedAt; }
  get failureReason(): string | undefined { return this.value.failureReason; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isVerified(): boolean { return this.status.isVerified(); }
  isFinal(): boolean { return this.status.isFinal(); }
  isExpired(reference: Date = new Date()): boolean {
    return new Date(this.expiresAt).getTime() < reference.getTime();
  }
}
