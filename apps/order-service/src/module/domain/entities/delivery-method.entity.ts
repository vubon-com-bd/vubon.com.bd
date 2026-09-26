import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { DeliveryMethodIdVO } from '../value-objects/primitives/delivery-method-id.vo';
import { DeliveryMethodTypeVO } from '../value-objects/primitives/delivery-method-type.vo';

export interface DeliveryMethodEntityProps {
  readonly type: DeliveryMethodTypeVO;
  readonly name: string;
  readonly description: string | null;
  readonly basePrice: number;
  readonly isActive: boolean;
}

export class DeliveryMethodEntity extends BaseEntity<DeliveryMethodIdVO> {
  private readonly _type: DeliveryMethodTypeVO;
  private readonly _name: string;
  private readonly _description: string | null;
  private readonly _basePrice: number;
  private readonly _isActive: boolean;

  private constructor(
    id: DeliveryMethodIdVO,
    props: DeliveryMethodEntityProps,
    createdAt: string,
    updatedAt: string,
  ) {
    super(id, createdAt, updatedAt);
    this._type = props.type;
    this._name = props.name;
    this._description = props.description;
    this._basePrice = props.basePrice;
    this._isActive = props.isActive;
  }

  static create(props: DeliveryMethodEntityProps): DeliveryMethodEntity {
    const now = new Date().toISOString();
    const id = DeliveryMethodIdVO.create(crypto.randomUUID());
    return new DeliveryMethodEntity(id, props, now, now);
  }

  static reconstitute(
    id: DeliveryMethodIdVO,
    props: DeliveryMethodEntityProps,
    createdAt: string,
    updatedAt: string,
  ): DeliveryMethodEntity {
    return new DeliveryMethodEntity(id, props, createdAt, updatedAt);
  }

  get type(): DeliveryMethodTypeVO { return this._type; }
  get name(): string { return this._name; }
  get description(): string | null { return this._description; }
  get basePrice(): number { return this._basePrice; }
  get isActive(): boolean { return this._isActive; }
}
