import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';
import { WarrantyTypeVO } from '../value-objects/primitives/warranty-type.vo';

export interface VendorWarrantyEntityProps {
  readonly vendorId: VendorIdVO;
  readonly type: WarrantyTypeVO;
  readonly durationDays: number;
  readonly terms: string | null;
}

export class VendorWarrantyEntity extends BaseEntity<VendorIdVO> {
  private readonly _vendorId: VendorIdVO;
  private readonly _type: WarrantyTypeVO;
  private readonly _durationDays: number;
  private readonly _terms: string | null;

  private constructor(
    id: VendorIdVO,
    props: VendorWarrantyEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._type = props.type;
    this._durationDays = props.durationDays;
    this._terms = props.terms;
  }

  static create(props: VendorWarrantyEntityProps): VendorWarrantyEntity {
    const now = new Date().toISOString();
    return new VendorWarrantyEntity(props.vendorId, props, now, now, null);
  }

  static reconstitute(
    id: VendorIdVO,
    props: VendorWarrantyEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): VendorWarrantyEntity {
    return new VendorWarrantyEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  update(
    type: WarrantyTypeVO,
    durationDays: number,
    terms: string | null,
  ): VendorWarrantyEntity {
    return new VendorWarrantyEntity(
      this.id,
      { ...this._toProps(), type, durationDays, terms },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get vendorId(): VendorIdVO { return this._vendorId; }
  get type(): WarrantyTypeVO { return this._type; }
  get durationDays(): number { return this._durationDays; }
  get terms(): string | null { return this._terms; }

  get hasWarranty(): boolean {
    return this._type.value !== 'no_warranty';
  }

  private _toProps(): VendorWarrantyEntityProps {
    return {
      vendorId: this._vendorId,
      type: this._type,
      durationDays: this._durationDays,
      terms: this._terms,
    };
  }
}
