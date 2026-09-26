/**
 * UserKycVO — KYC submission snapshot
 * @module auth-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export type KycStatus = 'not_submitted' | 'pending' | 'approved' | 'rejected';
export type KycDocumentType = 'nid' | 'passport' | 'driving_license' | 'birth_certificate';

export interface UserKycVOProps {
  readonly userId: UserIdVO;
  readonly status: KycStatus;
  readonly documentType: KycDocumentType;
  readonly documentNumber: string;
  readonly submittedAt?: number;
  readonly reviewedAt?: number;
  readonly rejectionReason?: string;
}

const MIN_DOC = 5;
const MAX_DOC = 40;

export class UserKycVO extends BaseVO<UserKycVOProps> {
  private constructor(props: UserKycVOProps) {
    super(props);
  }

  static of(props: UserKycVOProps): UserKycVO {
    if (props.documentNumber.length < MIN_DOC || props.documentNumber.length > MAX_DOC) {
      throw new Error('KYC document number length invalid');
    }
    if (props.status === 'rejected' && !props.rejectionReason) {
      throw new Error('Rejected KYC must have a reason');
    }
    return new UserKycVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get status(): KycStatus { return this.value.status; }

  isApproved(): boolean { return this.value.status === 'approved'; }
  canSubmit(): boolean {
    return this.value.status === 'not_submitted' || this.value.status === 'rejected';
  }
}
