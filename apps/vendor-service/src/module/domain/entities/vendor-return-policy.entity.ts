import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';
import { ReturnPolicyTypeVO } from '../value-objects/primitives/return-policy-type.vo';

export interface VendorReturnPolicyEntityProps {
  readonly vendorId: VendorIdVO;
  readonly type: ReturnPolicyTypeVO;
  readonly returnWindowDays: number;
  readonly conditions: string | null;
}

export class VendorReturnPolicyEntity extends BaseEntity<VendorIdVO> {
  private readonly _vendorId: VendorIdVO;
  private readonly _type: ReturnPolicyTypeVO;
  private readonly _returnWindowDays: number;
  private readonly _conditions: string | null;

  private constructor(
    id: VendorIdVO,
    props: VendorReturnPolicyEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._type = props.type;
    this._returnWindowDays = props.returnWindowDays;
    this._conditions = props.conditions;
  }

  static create(props: VendorReturnPolicyEntityProps): VendorReturnPolicyEntity {
    const now = new Date().toISOString();
    return new VendorReturnPolicyEntity(props.vendorId, props, now, now, null);
  }

  static reconstitute(
    id: VendorIdVO,
    props: VendorReturnPolicyEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): VendorReturnPolicyEntity {
    return new VendorReturnPolicyEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  update(
    type: ReturnPolicyTypeVO,
    returnWindowDays: number,
    conditions: string | null,
  ): VendorReturnPolicyEntity {
    return new VendorReturnPolicyEntity(
      this.id,
      { ...this._toProps(), type, returnWindowDays, conditions },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get vendorId(): VendorIdVO { return this._vendorId; }
  get type(): ReturnPolicyTypeVO { return this._type; }
  get returnWindowDays(): number { return this._returnWindowDays; }
  get conditions(): string | null { return this._conditions; }

  get isReturnable(): boolean {
    return this._type.value !== 'no_return';
  }

  private _toProps(): VendorReturnPolicyEntityProps {
    return {
      vendorId: this._vendorId,
      type: this._type,
      returnWindowDays: this._returnWindowDays,
      conditions: this._conditions,
    };
  }
}
