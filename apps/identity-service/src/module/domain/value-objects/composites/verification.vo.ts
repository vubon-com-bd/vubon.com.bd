/**
 * VerificationVO
 * @module identity-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { VerificationIdVO } from '../primitives/verification-id.vo.js';
import { AuthIdVO } from '../primitives/auth-id.vo.js';
import { UserIdVO } from '../primitives/user-id.vo.js';
import { VerificationChannelVO } from '../primitives/verification-channel.vo.js';
import { VerificationPurposeVO } from '../primitives/verification-purpose.vo.js';
import { VerificationStatusVO } from '../primitives/verification-status.vo.js';
import { IdentifierVO } from '../primitives/identifier.vo.js';
import { OtpCodeVO } from '../primitives/otp-code.vo.js';

export interface VerificationVOProps {
  readonly id: VerificationIdVO;
  readonly authId: AuthIdVO;
  readonly userId: UserIdVO;
  readonly target: IdentifierVO;
  readonly channel: VerificationChannelVO;
  readonly purpose: VerificationPurposeVO;
  readonly status: VerificationStatusVO;
  readonly code?: OtpCodeVO;
  readonly attempts: number;
  readonly maxAttempts: number;
  readonly resendCount: number;
  readonly maxResend: number;
  readonly createdAt: string;
  readonly expiresAt: string;
  readonly verifiedAt?: string;
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
    if (v.attempts < 0 || v.attempts > v.maxAttempts) {
      throw new ValidationError(
        `attempts must be between 0 and ${v.maxAttempts}`,
        'attempts',
      );
    }
    if (v.resendCount < 0 || v.resendCount > v.maxResend) {
      throw new ValidationError(
        `resendCount must be between 0 and ${v.maxResend}`,
        'resendCount',
      );
    }
    if (v.status.isVerified() && !v.verifiedAt) {
      throw new ValidationError(
        'verifiedAt is required when status is verified',
        'verifiedAt',
      );
    }
  }

  get id(): VerificationIdVO { return this.value.id; }
  get authId(): AuthIdVO { return this.value.authId; }
  get userId(): UserIdVO { return this.value.userId; }
  get target(): IdentifierVO { return this.value.target; }
  get channel(): VerificationChannelVO { return this.value.channel; }
  get purpose(): VerificationPurposeVO { return this.value.purpose; }
  get status(): VerificationStatusVO { return this.value.status; }
  get code(): OtpCodeVO | undefined { return this.value.code; }
  get attempts(): number { return this.value.attempts; }
  get maxAttempts(): number { return this.value.maxAttempts; }
  get resendCount(): number { return this.value.resendCount; }
  get maxResend(): number { return this.value.maxResend; }
  get createdAt(): string { return this.value.createdAt; }
  get expiresAt(): string { return this.value.expiresAt; }
  get verifiedAt(): string | undefined { return this.value.verifiedAt; }

  isExpired(nowMs: number = Date.now()): boolean {
    return nowMs >= Date.parse(this.value.expiresAt);
  }
  canAttempt(): boolean {
    return !this.isExpired() && this.attempts < this.maxAttempts && this.status.isPending();
  }
  canResend(): boolean {
    return !this.isExpired() && this.resendCount < this.maxResend;
  }
}
