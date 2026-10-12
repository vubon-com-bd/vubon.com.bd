/**
 * VendorLocationVO — full structured address for a vendor
 * @module vendor-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VendorAddressVO } from '../primitives/vendor-address.vo.js';
import { VendorDivisionVO } from '../primitives/vendor-division.vo.js';
import { VendorDistrictVO } from '../primitives/vendor-district.vo.js';
import { VendorUpazilaVO } from '../primitives/vendor-upazila.vo.js';
import { PostalCodeVO } from '../primitives/postal-code.vo.js';

export interface VendorLocationVOProps {
  readonly address: VendorAddressVO;
  readonly division: VendorDivisionVO;
  readonly district: VendorDistrictVO;
  readonly upazila: VendorUpazilaVO;
  readonly postalCode?: PostalCodeVO;
}

export class VendorLocationVO extends BaseVO<VendorLocationVOProps> {
  private constructor(props: VendorLocationVOProps) {
    super(props);
  }

  static create(props: VendorLocationVOProps): VendorLocationVO {
    if (!(props.address instanceof VendorAddressVO)) {
      throw new ValidationError('Location requires a VendorAddressVO', 'address');
    }
    if (!(props.division instanceof VendorDivisionVO)) {
      throw new ValidationError('Location requires a VendorDivisionVO', 'division');
    }
    if (!(props.district instanceof VendorDistrictVO)) {
      throw new ValidationError('Location requires a VendorDistrictVO', 'district');
    }
    if (!(props.upazila instanceof VendorUpazilaVO)) {
      throw new ValidationError('Location requires a VendorUpazilaVO', 'upazila');
    }
    // Business rule: address.division must match top-level division
    if (!props.division.matches(props.address.value.division)) {
      throw new ValidationError(
        `Address division "${props.address.value.division}" does not match "${props.division.value}"`,
        'division',
      );
    }
    return new VendorLocationVO(props);
  }

  static reconstitute(props: VendorLocationVOProps): VendorLocationVO {
    return new VendorLocationVO(props);
  }

  get address(): VendorAddressVO { return this.value.address; }
  get division(): VendorDivisionVO { return this.value.division; }
  get district(): VendorDistrictVO { return this.value.district; }
  get upazila(): VendorUpazilaVO { return this.value.upazila; }
  get postalCode(): PostalCodeVO | undefined { return this.value.postalCode; }

  isBangladeshi(): boolean {
    return this.value.address.isBangladeshi();
  }

  hasPostalCode(): boolean {
    return this.value.postalCode !== undefined;
  }

  oneLine(): string {
    return this.value.address.oneLine;
  }

  /** Same district & upazila = same micro-region. */
  isInSameRegionAs(other: VendorLocationVO): boolean {
    return this.district.value === other.district.value
      && this.upazila.value === other.upazila.value;
  }
}
