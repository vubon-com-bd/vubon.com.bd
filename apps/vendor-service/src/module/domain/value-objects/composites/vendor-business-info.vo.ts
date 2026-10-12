/**
 * VendorBusinessInfoVO — legal entity + registration details
 * @module vendor-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VendorTypeVO } from '../primitives/vendor-type.vo.js';
import { VendorBusinessTypeVO } from '../primitives/vendor-business-type.vo.js';
import { BusinessNameVO } from '../primitives/business-name.vo.js';
import { BusinessRegistrationVO } from '../primitives/business-registration.vo.js';
import { BusinessDescriptionVO } from '../primitives/business-description.vo.js';

export interface VendorBusinessInfoVOProps {
  readonly type: VendorTypeVO;
  readonly businessType: VendorBusinessTypeVO;
  readonly legalName: BusinessNameVO;
  readonly registrationNumber?: BusinessRegistrationVO;
  readonly description?: BusinessDescriptionVO;
}

export class VendorBusinessInfoVO extends BaseVO<VendorBusinessInfoVOProps> {
  private constructor(props: VendorBusinessInfoVOProps) {
    super(props);
  }

  static create(props: VendorBusinessInfoVOProps): VendorBusinessInfoVO {
    if (!(props.type instanceof VendorTypeVO)) {
      throw new ValidationError('Business info requires VendorTypeVO', 'type');
    }
    if (!(props.businessType instanceof VendorBusinessTypeVO)) {
      throw new ValidationError('Business info requires VendorBusinessTypeVO', 'businessType');
    }
    if (!(props.legalName instanceof BusinessNameVO)) {
      throw new ValidationError('Business info requires legal name', 'legalName');
    }
    // Business rule: corporate entities must have a registration number
    if (props.type.requiresTaxId() && !props.registrationNumber) {
      throw new ValidationError(
        `Vendor type "${props.type.value}" requires a registration number`,
        'registrationNumber',
      );
    }
    return new VendorBusinessInfoVO(props);
  }

  static reconstitute(props: VendorBusinessInfoVOProps): VendorBusinessInfoVO {
    return new VendorBusinessInfoVO(props);
  }

  get type(): VendorTypeVO { return this.value.type; }
  get businessType(): VendorBusinessTypeVO { return this.value.businessType; }
  get legalName(): BusinessNameVO { return this.value.legalName; }
  get registrationNumber(): BusinessRegistrationVO | undefined { return this.value.registrationNumber; }
  get description(): BusinessDescriptionVO | undefined { return this.value.description; }

  isCorporate(): boolean {
    return this.value.type.isCorporate();
  }

  requiresInventory(): boolean {
    return this.value.businessType.requiresInventory();
  }

  hasDescription(): boolean {
    return this.value.description !== undefined && this.value.description.value.length > 0;
  }
}
