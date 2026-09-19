import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { AddressIdVO } from '../primitives/address-id.vo';

export interface UserAddressProps {
  readonly id: AddressIdVO;
  readonly userId: UserIdVO;
  readonly label: string;
  readonly fullName: string;
  readonly phone: string;
  readonly division: string;
  readonly district: string;
  readonly upazila: string;
  readonly addressLine: string;
  readonly postalCode: string | null;
  readonly isDefault: boolean;
}

export class UserAddressVO extends BaseVO<UserAddressProps> {
  private constructor(props: UserAddressProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: UserAddressProps): UserAddressVO {
    return new UserAddressVO(props);
  }

  get id(): AddressIdVO { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get label(): string { return this.value.label; }
  get fullName(): string { return this.value.fullName; }
  get phone(): string { return this.value.phone; }
  get division(): string { return this.value.division; }
  get district(): string { return this.value.district; }
  get upazila(): string { return this.value.upazila; }
  get addressLine(): string { return this.value.addressLine; }
  get postalCode(): string | null { return this.value.postalCode; }
  get isDefault(): boolean { return this.value.isDefault; }

  get formatted(): string {
    return [
      this.value.addressLine,
      this.value.upazila,
      this.value.district,
      this.value.division,
      this.value.postalCode,
    ]
      .filter(Boolean)
      .join(', ');
  }
}
