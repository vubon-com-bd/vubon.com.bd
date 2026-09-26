import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';
import { ShippingMethodVO } from '../value-objects/primitives/shipping-method.vo';
import { PayoutAmountVO } from '../value-objects/primitives/payout-amount.vo';

export interface VendorShippingEntityProps {
  readonly vendorId: VendorIdVO;
  readonly methods: ReadonlyArray<ShippingMethodVO>;
  readonly freeShippingThreshold: PayoutAmountVO | null;
  readonly defaultShippingCost: PayoutAmountVO;
  readonly shipsInternationally: boolean;
}

export class VendorShippingEntity extends BaseEntity<VendorIdVO> {
  private readonly _vendorId: VendorIdVO;
  private readonly _methods: ReadonlyArray<ShippingMethodVO>;
  private readonly _freeShippingThreshold: PayoutAmountVO | null;
  private readonly _defaultShippingCost: PayoutAmountVO;
  private readonly _shipsInternationally: boolean;

  private constructor(
    id: VendorIdVO,
    props: VendorShippingEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._methods = Object.freeze([...props.methods]);
    this._freeShippingThreshold = props.freeShippingThreshold;
    this._defaultShippingCost = props.defaultShippingCost;
    this._shipsInternationally = props.shipsInternationally;
  }

  static create(props: VendorShippingEntityProps): VendorShippingEntity {
    const now = new Date().toISOString();
    return new VendorShippingEntity(props.vendorId, props, now, now, null);
  }

  static reconstitute(
    id: VendorIdVO,
    props: VendorShippingEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): VendorShippingEntity {
    return new VendorShippingEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  updateMethods(methods: ReadonlyArray<ShippingMethodVO>): VendorShippingEntity {
    return new VendorShippingEntity(
      this.id,
      { ...this._toProps(), methods },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get vendorId(): VendorIdVO { return this._vendorId; }
  get methods(): ReadonlyArray<ShippingMethodVO> { return this._methods; }
  get freeShippingThreshold(): PayoutAmountVO | null { return this._freeShippingThreshold; }
  get defaultShippingCost(): PayoutAmountVO { return this._defaultShippingCost; }
  get shipsInternationally(): boolean { return this._shipsInternationally; }

  private _toProps(): VendorShippingEntityProps {
    return {
      vendorId: this._vendorId,
      methods: this._methods,
      freeShippingThreshold: this._freeShippingThreshold,
      defaultShippingCost: this._defaultShippingCost,
      shipsInternationally: this._shipsInternationally,
    };
  }
}
