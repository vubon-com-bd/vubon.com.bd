/**
 * UserAddressVO — Structured BD address
 * @module auth-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface UserAddressVOProps {
  readonly userId: UserIdVO;
  readonly label: string;
  readonly line1: string;
  readonly line2?: string;
  readonly division: string;
  readonly district: string;
  readonly upazila: string;
  readonly postalCode: string;
  readonly isDefault: boolean;
}

const MAX_LABEL = 50;
const MAX_LINE = 200;
const POSTAL_REGEX = /^\d{4}$/;

export class UserAddressVO extends BaseVO<UserAddressVOProps> {
  private constructor(props: UserAddressVOProps) {
    super(props);
  }

  static of(props: UserAddressVOProps): UserAddressVO {
    if (!props.label || props.label.length > MAX_LABEL) {
      throw new Error('Address label invalid');
    }
    if (!props.line1 || props.line1.length > MAX_LINE) {
      throw new Error('Address line1 invalid');
    }
    if (props.line2 && props.line2.length > MAX_LINE) {
      throw new Error('Address line2 too long');
    }
    if (!props.division || !props.district || !props.upazila) {
      throw new Error('Division/district/upazila are required');
    }
    if (!POSTAL_REGEX.test(props.postalCode)) {
      throw new Error('Postal code must be 4 digits');
    }
    return new UserAddressVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get isDefault(): boolean { return this.value.isDefault; }

  /** Single-line formatted address */
  format(): string {
    const parts = [
      this.value.line1,
      this.value.line2,
      this.value.upazila,
      this.value.district,
      this.value.division,
      this.value.postalCode,
    ].filter((p): p is string => typeof p === 'string' && p.length > 0);
    return parts.join(', ');
  }
}
