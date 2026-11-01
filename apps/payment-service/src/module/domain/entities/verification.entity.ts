/**
 * VerificationEntity
 * @module payment-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { VerificationIdVO } from '@domain/primitives/verification-id.vo';
import { VerificationStatusVO } from '@domain/primitives/verification-status.vo';
import { VerificationMethodVO } from '@domain/primitives/verification-method.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';

export interface VerificationEntityProps {
  readonly paymentId: PaymentIdVO;
  readonly status: VerificationStatusVO;
  readonly method: VerificationMethodVO;
  readonly attempts: number;
  readonly expiresAt: string;
  readonly verifiedAt?: string;
  readonly failureReason?: string;
}

export class VerificationEntity extends BaseEntity<string> {
  private _status: VerificationStatusVO;
  private _attempts: number;
  private _verifiedAt?: string;
  private _failureReason?: string;

  private readonly _paymentId: PaymentIdVO;
  private readonly _method: VerificationMethodVO;
  private readonly _expiresAt: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VerificationEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._paymentId = props.paymentId;
    this._status = props.status;
    this._method = props.method;
    this._attempts = props.attempts;
    this._expiresAt = props.expiresAt;
    this._verifiedAt = props.verifiedAt;
    this._failureReason = props.failureReason;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._attempts < 0) {
      throw new ValidationError('attempts cannot be negative', 'attempts');
    }
    if (this._status.isVerified() && !this._verifiedAt) {
      throw new ValidationError('Verified requires verifiedAt', 'verifiedAt');
    }
    if (this._status.isFailed() && !this._failureReason) {
      throw new ValidationError('Failed verification requires failureReason', 'failureReason');
    }
  }

  get paymentId(): PaymentIdVO { return this._paymentId; }
  get status(): VerificationStatusVO { return this._status; }
  get method(): VerificationMethodVO { return this._method; }
  get attempts(): number { return this._attempts; }
  get expiresAt(): string { return this._expiresAt; }
  get verifiedAt(): string | undefined { return this._verifiedAt; }
  get failureReason(): string | undefined { return this._failureReason; }

  isVerified(): boolean { return this._status.isVerified(); }
  isFinal(): boolean { return this._status.isFinal(); }

  isExpired(reference: Date = new Date()): boolean {
    return new Date(this._expiresAt).getTime() < reference.getTime();
  }

  startProgress(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('in_progress');
    this._status = VerificationStatusVO.create('in_progress');
    this.touch(now);
  }

  recordAttempt(now: string = new Date().toISOString()): void {
    if (this.isFinal()) {
      throw new BusinessRuleError(
        `Cannot record attempt on final verification`,
        'VERIFICATION_FINAL',
        { verificationId: this.id, status: this._status.value },
      );
    }
    this._attempts += 1;
    this.touch(now);
  }

  verify(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('verified');
    this._status = VerificationStatusVO.verified();
    this._verifiedAt = now;
    this.touch(now);
  }

  fail(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('failed');
    this._status = VerificationStatusVO.failed();
    this._failureReason = reason;
    this.touch(now);
  }

  expire(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('expired');
    this._status = VerificationStatusVO.expired();
    this.touch(now);
  }

  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid verification transition: "${this._status.value}" → "${target}"`,
        'INVALID_VERIFICATION_STATUS_TRANSITION',
        { from: this._status.value, to: target, verificationId: this.id },
      );
    }
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: VerificationIdVO;
    props: Omit<VerificationEntityProps, 'status' | 'attempts'>;
    now: string;
  }): VerificationEntity {
    return new VerificationEntity(params.id.value, params.now, params.now, {
      ...params.props,
      status: VerificationStatusVO.pending(),
      attempts: 0,
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: VerificationEntityProps;
  }): VerificationEntity {
    return new VerificationEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
  }
}
