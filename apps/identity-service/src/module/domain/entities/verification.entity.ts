/**
 * VerificationEntity — AGGREGATE ROOT
 * @module identity-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import { VerificationIdVO } from '../value-objects/primitives/verification-id.vo.js';
import { AuthIdVO } from '../value-objects/primitives/auth-id.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { VerificationChannelVO } from '../value-objects/primitives/verification-channel.vo.js';
import { VerificationPurposeVO } from '../value-objects/primitives/verification-purpose.vo.js';
import { VerificationStatusVO } from '../value-objects/primitives/verification-status.vo.js';
import { IdentifierVO } from '../value-objects/primitives/identifier.vo.js';
import { OtpCodeVO } from '../value-objects/primitives/otp-code.vo.js';

import {
  VerificationVerifiedEvent,
  VerificationExpiredEvent,
  VerificationOtpResentEvent,
} from '../events/verification.events.js';

export interface VerificationEntityProps {
  readonly authId: AuthIdVO;
  readonly userId: UserIdVO;
  readonly target: IdentifierVO;
  readonly channel: VerificationChannelVO;
  readonly purpose: VerificationPurposeVO;
  readonly code?: OtpCodeVO;
  readonly status: VerificationStatusVO;
  readonly attempts: number;
  readonly maxAttempts: number;
  readonly resendCount: number;
  readonly maxResend: number;
  readonly expiresAt: string;
  readonly verifiedAt?: string;
}

export class VerificationEntity extends AggregateRoot<string> {
  private _status: VerificationStatusVO;
  private _attempts: number;
  private _resendCount: number;
  private _code?: OtpCodeVO;
  private _verifiedAt?: string;

  private readonly _authId: AuthIdVO;
  private readonly _userId: UserIdVO;
  private readonly _target: IdentifierVO;
  private readonly _channel: VerificationChannelVO;
  private readonly _purpose: VerificationPurposeVO;
  private readonly _maxAttempts: number;
  private readonly _maxResend: number;
  private readonly _expiresAt: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VerificationEntityProps,
  ) {
    super(id, createdAt, updatedAt, null);
    this._authId = props.authId;
    this._userId = props.userId;
    this._target = props.target;
    this._channel = props.channel;
    this._purpose = props.purpose;
    this._code = props.code;
    this._status = props.status;
    this._attempts = props.attempts;
    this._maxAttempts = props.maxAttempts;
    this._resendCount = props.resendCount;
    this._maxResend = props.maxResend;
    this._expiresAt = props.expiresAt;
    this._verifiedAt = props.verifiedAt;
  }

  get authId(): AuthIdVO { return this._authId; }
  get userId(): UserIdVO { return this._userId; }
  get target(): IdentifierVO { return this._target; }
  get channel(): VerificationChannelVO { return this._channel; }
  get purpose(): VerificationPurposeVO { return this._purpose; }
  get code(): OtpCodeVO | undefined { return this._code; }
  get status(): VerificationStatusVO { return this._status; }
  get attempts(): number { return this._attempts; }
  get maxAttempts(): number { return this._maxAttempts; }
  get resendCount(): number { return this._resendCount; }
  get expiresAt(): string { return this._expiresAt; }
  get verifiedAt(): string | undefined { return this._verifiedAt; }

  isExpired(nowMs: number = Date.now()): boolean {
    return nowMs >= Date.parse(this._expiresAt);
  }

  canAttempt(nowMs: number = Date.now()): boolean {
    return (
      !this.isExpired(nowMs) &&
      this._attempts < this._maxAttempts &&
      this._status.isPending()
    );
  }

  canResend(nowMs: number = Date.now()): boolean {
    return !this.isExpired(nowMs) && this._resendCount < this._maxResend;
  }

  recordAttempt(now: string = new Date().toISOString()): void {
    if (!this.canAttempt()) {
      throw new BusinessRuleError(
        'Cannot record attempt for this verification',
        'VERIFICATION_CANNOT_ATTEMPT',
        { verificationId: this.id, attempts: this._attempts },
      );
    }
    this._attempts += 1;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  verify(now: string = new Date().toISOString()): void {
    // ⚠️ Expiry check FIRST — prevents verifying an expired code
    if (this.isExpired(Date.parse(now))) {
      throw new BusinessRuleError(
        'Cannot verify expired verification',
        'VERIFICATION_EXPIRED',
        { verificationId: this.id, expiresAt: this._expiresAt },
      );
    }
    if (!this._status.isPending() && !this._status.isResubmitted()) {
      throw new BusinessRuleError(
        'Verification cannot be verified in current status',
        'VERIFICATION_CANNOT_VERIFY',
        { verificationId: this.id, status: this._status.value },
      );
    }
    this._status = VerificationStatusVO.verified();
    this._verifiedAt = now;
    this.addDomainEvent(
      new VerificationVerifiedEvent({
        aggregateId: this.id,
        payload: {
          verificationId: this.id,
          userId: this._userId.value,
          channel: this._channel.value,
          purpose: this._purpose.value,
          completedAt: now,
        },
        version: this.version + 1,
      }),
    );
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  expire(now: string = new Date().toISOString()): void {
    if (this._status.isFinal()) return;
    this._status = VerificationStatusVO.expired();
    this.addDomainEvent(
      new VerificationExpiredEvent({
        aggregateId: this.id,
        payload: {
          verificationId: this.id,
          userId: this._userId.value,
          channel: this._channel.value,
          purpose: this._purpose.value,
          completedAt: now,
        },
        version: this.version + 1,
      }),
    );
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  resendOtp(newCode: OtpCodeVO, now: string = new Date().toISOString()): void {
    if (!this.canResend()) {
      throw new BusinessRuleError(
        'Cannot resend OTP',
        'VERIFICATION_CANNOT_RESEND',
        { verificationId: this.id, resendCount: this._resendCount },
      );
    }
    this._code = newCode;
    this._resendCount += 1;
    this._attempts = 0;
    this.addDomainEvent(
      new VerificationOtpResentEvent({
        aggregateId: this.id,
        payload: {
          verificationId: this.id,
          userId: this._userId.value,
          channel: this._channel.value,
          purpose: this._purpose.value,
          target: this._target.normalized,
          requestedAt: now,
          expiresAt: this._expiresAt,
        },
        version: this.version + 1,
      }),
    );
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  static create(params: {
    id: VerificationIdVO;
    props: Omit<VerificationEntityProps, 'status' | 'attempts' | 'resendCount'>;
    now: string;
  }): VerificationEntity {
    return new VerificationEntity(
      params.id.value,
      params.now,
      params.now,
      {
        ...params.props,
        status: VerificationStatusVO.pending(),
        attempts: 0,
        resendCount: 0,
      },
    );
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: VerificationEntityProps;
    version?: number;
  }): VerificationEntity {
    const entity = new VerificationEntity(params.id, params.createdAt, params.updatedAt, params.props);
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
