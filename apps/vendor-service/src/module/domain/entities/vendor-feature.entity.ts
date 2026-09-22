import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { FeatureIdVO } from '../value-objects/primitives/feature-id.vo';
import { FeatureTypeVO } from '../value-objects/primitives/feature-type.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';

export interface VendorFeatureEntityProps {
  readonly vendorId: VendorIdVO;
  readonly type: FeatureTypeVO;
  readonly enabled: boolean;
  readonly enabledAt: Date | null;
}

export class VendorFeatureEntity extends BaseEntity<FeatureIdVO> {
  private readonly _vendorId: VendorIdVO;
  private readonly _type: FeatureTypeVO;
  private readonly _enabled: boolean;
  private readonly _enabledAt: Date | null;

  private constructor(
    id: FeatureIdVO,
    props: VendorFeatureEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._type = props.type;
    this._enabled = props.enabled;
    this._enabledAt = props.enabledAt;
  }

  static create(props: VendorFeatureEntityProps): VendorFeatureEntity {
    const now = new Date().toISOString();
    const id = FeatureIdVO.create(crypto.randomUUID());
    return new VendorFeatureEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: FeatureIdVO,
    props: VendorFeatureEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): VendorFeatureEntity {
    return new VendorFeatureEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  enable(): VendorFeatureEntity {
    return new VendorFeatureEntity(
      this.id,
      { ...this._toProps(), enabled: true, enabledAt: new Date() },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  disable(): VendorFeatureEntity {
    return new VendorFeatureEntity(
      this.id,
      { ...this._toProps(), enabled: false },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get vendorId(): VendorIdVO { return this._vendorId; }
  get type(): FeatureTypeVO { return this._type; }
  get enabled(): boolean { return this._enabled; }
  get enabledAt(): Date | null { return this._enabledAt; }

  private _toProps(): VendorFeatureEntityProps {
    return {
      vendorId: this._vendorId,
      type: this._type,
      enabled: this._enabled,
      enabledAt: this._enabledAt,
    };
  }
}
