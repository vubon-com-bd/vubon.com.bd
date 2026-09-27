/**
 * KycStatus Value Object
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { USER_KYC_STATUS } from '@vubon/shared-constants/user';

export type KycStatusType = (typeof USER_KYC_STATUS)[keyof typeof USER_KYC_STATUS];

const KYC_STATUS_VALUES: ReadonlySet<string> = new Set(Object.values(USER_KYC_STATUS));

export class KycStatusVO extends BaseStatusVO<KycStatusType> {
  private constructor(value: KycStatusType) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return KYC_STATUS_VALUES;
  }

  static create(raw: string): KycStatusVO {
    if (typeof raw !== 'string') {
      throw new Error('KycStatus must be a string');
    }
    const normalized = raw.trim().toLowerCase();
    if (!KYC_STATUS_VALUES.has(normalized)) {
      throw new Error(
        `Invalid KYC status: "${raw}". Allowed: ${[...KYC_STATUS_VALUES].join(', ')}`
      );
    }
    return new KycStatusVO(normalized as KycStatusType);
  }

  static notStarted(): KycStatusVO {
    return new KycStatusVO(USER_KYC_STATUS.NOT_STARTED as KycStatusType);
  }

  static pending(): KycStatusVO {
    return new KycStatusVO(USER_KYC_STATUS.PENDING as KycStatusType);
  }

  static approved(): KycStatusVO {
    return new KycStatusVO(USER_KYC_STATUS.APPROVED as KycStatusType);
  }

  isApproved(): boolean {
    return this.value === USER_KYC_STATUS.APPROVED;
  }

  isPending(): boolean {
    return (
      this.value === USER_KYC_STATUS.PENDING ||
      this.value === USER_KYC_STATUS.IN_REVIEW
    );
  }

  isRejected(): boolean {
    return this.value === USER_KYC_STATUS.REJECTED;
  }

  canSubmit(): boolean {
    return (
      this.value === USER_KYC_STATUS.NOT_STARTED ||
      this.value === USER_KYC_STATUS.REJECTED ||
      this.value === USER_KYC_STATUS.EXPIRED
    );
  }
}
