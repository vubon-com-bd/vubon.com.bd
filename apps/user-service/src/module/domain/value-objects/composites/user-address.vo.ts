import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { AddressIdVO } from '../primitives/address-id.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { AddressLabelVO } from '../primitives/address-label.vo';
import { AddressLineVO } from '../primitives/address-line.vo';
import { CityVO } from '../primitives/city.vo';
import { DistrictVO } from '../primitives/district.vo';
import { DivisionVO } from '../primitives/division.vo';
import { PostalCodeVO } from '../primitives/postal-code.vo';

export interface UserAddressProps {
  readonly id: AddressIdVO;
  readonly userId: UserIdVO;
  readonly label: AddressLabelVO | null;
  readonly line1: AddressLineVO;
  readonly line2: AddressLineVO | null;
  readonly city: CityVO;
  readonly district: DistrictVO;
  readonly division: DivisionVO;
  readonly postalCode: PostalCodeVO | null;
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
  get label(): AddressLabelVO | null { return this.value.label; }
  get line1(): AddressLineVO { return this.value.line1; }
  get line2(): AddressLineVO | null { return this.value.line2; }
  get city(): CityVO { return this.value.city; }
  get district(): DistrictVO { return this.value.district; }
  get division(): DivisionVO { return this.value.division; }
  get postalCode(): PostalCodeVO | null { return this.value.postalCode; }
  get isDefault(): boolean { return this.value.isDefault; }

  get formatted(): string {
    return [
      this.value.line1.value,
      this.value.line2?.value,
      this.value.city.value,
      this.value.district.value,
      this.value.division.value,
      this.value.postalCode?.value,
    ]
      .filter(Boolean)
      .join(', ');
  }
}
