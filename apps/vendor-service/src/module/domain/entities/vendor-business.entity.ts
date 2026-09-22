import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';
import { BusinessNameVO } from '../value-objects/primitives/business-name.vo';
import { BusinessTypeVO } from '../value-objects/primitives/business-type.vo';
import { BusinessRegistrationVO } from '../value-objects/primitives/business-registration.vo';
import { BusinessDescriptionVO } from '../value-objects/primitives/business-description.vo';

export interface VendorBusinessEntityProps {
  readonly vendorId: VendorIdVO;
  readonly businessName: BusinessNameVO;
  readonly businessType: BusinessTypeVO;
  readonly registrationNumber: BusinessRegistrationVO;
  readonly description: BusinessDescriptionVO | null;
}

export class VendorBusinessEntity extends BaseEntity<VendorIdVO> {
  private readonly _vendorId: VendorIdVO;
  private readonly _businessName: BusinessNameVO;
  private readonly _businessType: BusinessTypeVO;
  private readonly _registrationNumber: BusinessRegistrationVO;
  private readonly _description: BusinessDescriptionVO | null;

  private constructor(
    id: VendorIdVO,
    props: VendorBusinessEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._businessName = props.businessName;
    this._businessType = props.businessType;
    this._registrationNumber = props.registrationNumber;
    this._description = props.description;
  }

  static create(props: VendorBusinessEntityProps): VendorBusinessEntity {
    const now = new Date().toISOString();
    return new VendorBusinessEntity(props.vendorId, props, now, now, null);
  }

  static reconstitute(
    id: VendorIdVO,
    props: VendorBusinessEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): VendorBusinessEntity {
    return new VendorBusinessEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  updateBusiness(
    businessName: BusinessNameVO,
    businessType: BusinessTypeVO,
    description: BusinessDescriptionVO | null,
  ): VendorBusinessEntity {
    return new VendorBusinessEntity(
      this.id,
      { ...this._toProps(), businessName, businessType, description },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get vendorId(): VendorIdVO { return this._vendorId; }
  get businessName(): BusinessNameVO { return this._businessName; }
  get businessType(): BusinessTypeVO { return this._businessType; }
  get registrationNumber(): BusinessRegistrationVO { return this._registrationNumber; }
  get description(): BusinessDescriptionVO | null { return this._description; }

  private _toProps(): VendorBusinessEntityProps {
    return {
      vendorId: this._vendorId,
      businessName: this._businessName,
      businessType: this._businessType,
      registrationNumber: this._registrationNumber,
      description: this._description,
    };
  }
}
