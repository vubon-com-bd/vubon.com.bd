import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { VendorIdVO } from '../primitives/vendor-id.vo';
import { BusinessNameVO } from '../primitives/business-name.vo';
import { BusinessTypeVO } from '../primitives/business-type.vo';
import { BusinessRegistrationVO } from '../primitives/business-registration.vo';
import { BusinessDescriptionVO } from '../primitives/business-description.vo';

export interface VendorBusinessProps {
  readonly vendorId: VendorIdVO;
  readonly businessName: BusinessNameVO;
  readonly businessType: BusinessTypeVO;
  readonly registrationNumber: BusinessRegistrationVO;
  readonly description: BusinessDescriptionVO | null;
}

export class VendorBusinessVO extends BaseVO<VendorBusinessProps> {
  private constructor(props: VendorBusinessProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: VendorBusinessProps): VendorBusinessVO {
    return new VendorBusinessVO(props);
  }

  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get businessName(): BusinessNameVO { return this.value.businessName; }
  get businessType(): BusinessTypeVO { return this.value.businessType; }
  get registrationNumber(): BusinessRegistrationVO { return this.value.registrationNumber; }
  get description(): BusinessDescriptionVO | null { return this.value.description; }
}
