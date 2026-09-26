import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ContactIdVO } from '../value-objects/primitives/contact-id.vo';
import { ContactTypeVO } from '../value-objects/primitives/contact-type.vo';
import { ContactValueVO } from '../value-objects/primitives/contact-value.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';

export interface VendorContactEntityProps {
  readonly vendorId: VendorIdVO;
  readonly type: ContactTypeVO;
  readonly value: ContactValueVO;
  readonly isPrimary: boolean;
}

export class VendorContactEntity extends BaseEntity<ContactIdVO> {
  private readonly _vendorId: VendorIdVO;
  private readonly _type: ContactTypeVO;
  private readonly _value: ContactValueVO;
  private readonly _isPrimary: boolean;

  private constructor(
    id: ContactIdVO,
    props: VendorContactEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._type = props.type;
    this._value = props.value;
    this._isPrimary = props.isPrimary;
  }

  static create(props: VendorContactEntityProps): VendorContactEntity {
    const now = new Date().toISOString();
    const id = ContactIdVO.create(crypto.randomUUID());
    return new VendorContactEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: ContactIdVO,
    props: VendorContactEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): VendorContactEntity {
    return new VendorContactEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  updateValue(value: ContactValueVO): VendorContactEntity {
    return new VendorContactEntity(
      this.id,
      { ...this._toProps(), value },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  markPrimary(): VendorContactEntity {
    return new VendorContactEntity(
      this.id,
      { ...this._toProps(), isPrimary: true },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get vendorId(): VendorIdVO { return this._vendorId; }
  get type(): ContactTypeVO { return this._type; }
  get value(): ContactValueVO { return this._value; }
  get isPrimary(): boolean { return this._isPrimary; }

  private _toProps(): VendorContactEntityProps {
    return {
      vendorId: this._vendorId,
      type: this._type,
      value: this._value,
      isPrimary: this._isPrimary,
    };
  }
}
