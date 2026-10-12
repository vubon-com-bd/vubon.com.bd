/**
 * UserVerificationVO
 * @module identity-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

import { UserIdVO } from '../primitives/user-id.vo.js';
import { VerificationStatusVO } from '../primitives/verification-status.vo.js';

export interface UserVerificationVOProps {
  readonly id: string;
  readonly userId: UserIdVO;
  readonly emailVerified: boolean;
  readonly emailVerifiedAt?: string;
  readonly phoneVerified: boolean;
  readonly phoneVerifiedAt?: string;
  readonly identityVerified: boolean;
  readonly identityVerifiedAt?: string;
  readonly addressVerified: boolean;
  readonly addressVerifiedAt?: string;
  readonly kycStatus: VerificationStatusVO;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class UserVerificationVO extends BaseVO<UserVerificationVOProps> {
  private constructor(props: UserVerificationVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: UserVerificationVOProps): UserVerificationVO {
    return new UserVerificationVO(props);
  }

  static reconstitute(props: UserVerificationVOProps): UserVerificationVO {
    return new UserVerificationVO(props);
  }

  get id(): string { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get emailVerified(): boolean { return this.value.emailVerified; }
  get emailVerifiedAt(): string | undefined { return this.value.emailVerifiedAt; }
  get phoneVerified(): boolean { return this.value.phoneVerified; }
  get phoneVerifiedAt(): string | undefined { return this.value.phoneVerifiedAt; }
  get identityVerified(): boolean { return this.value.identityVerified; }
  get identityVerifiedAt(): string | undefined { return this.value.identityVerifiedAt; }
  get addressVerified(): boolean { return this.value.addressVerified; }
  get addressVerifiedAt(): string | undefined { return this.value.addressVerifiedAt; }
  get kycStatus(): VerificationStatusVO { return this.value.kycStatus; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isFullyVerified(): boolean {
    return (
      this.value.emailVerified &&
      this.value.phoneVerified &&
      this.value.identityVerified
    );
  }
  hasBasicVerification(): boolean {
    return this.value.emailVerified && this.value.phoneVerified;
  }
  isKycVerified(): boolean { return this.value.kycStatus.isVerified(); }
}
