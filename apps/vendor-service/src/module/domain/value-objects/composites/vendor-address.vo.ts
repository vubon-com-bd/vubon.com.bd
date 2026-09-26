import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { AddressIdVO } from '../primitives/address-id.vo';
import { AddressLabelVO } from '../primitives/address-label.vo';
import { VendorIdVO } from '../primitives/vendor-id.vo';

export interface VendorAddressProps {
  readonly id: AddressIdVO;
  readonly vendorId: VendorIdVO;
  readonly label: AddressLabelVO;
  readonly division: string;
  readonly district: string;
  readonly upazila: string;
  readonly addressLine: string;
  readonly postalCode: string | null;
  readonly isDefault: boolean;
}

export class VendorAddressVO extends BaseVO<VendorAddressProps> {
  private constructor(props: VendorAddressProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: VendorAddressProps): VendorAddressVO {
    return new VendorAddressVO(props);
  }

  get id(): AddressIdVO { return this.value.id; }
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get label(): AddressLabelVO { return this.value.label; }
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
