/**
 * DeliveryMethodEntity
 * @module order-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { DeliveryMethodIdVO } from '../value-objects/primitives/delivery-method-id.vo.js';
import { DeliveryMethodTypeVO } from '../value-objects/primitives/delivery-method-type.vo.js';

export interface DeliveryMethodEntityProps {
  readonly name: string;
  readonly type: DeliveryMethodTypeVO;
  readonly carrier?: string;
  readonly baseCost: number;
  readonly currency: string;
  readonly estimatedDays: number;
  readonly isActive: boolean;
}

export class DeliveryMethodEntity extends BaseEntity<string> {
  private _name: string;
  private _baseCost: number;
  private _estimatedDays: number;
  private _isActive: boolean;
  private readonly _type: DeliveryMethodTypeVO;
  private readonly _carrier?: string;
  private readonly _currency: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: DeliveryMethodEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._type = props.type;
    this._carrier = props.carrier;
    this._baseCost = props.baseCost;
    this._currency = props.currency;
    this._estimatedDays = props.estimatedDays;
    this._isActive = props.isActive;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._name.trim().length === 0) throw new ValidationError('Name required', 'name');
    if (this._baseCost < 0) throw new ValidationError('Base cost cannot be negative', 'baseCost');
    if (this._estimatedDays < 0 || this._estimatedDays > 30) {
      throw new ValidationError('Estimated days must be 0-30', 'estimatedDays');
    }
  }

  get toIdVO(): DeliveryMethodIdVO { return DeliveryMethodIdVO.reconstitute(this.id); }
  get name(): string { return this._name; }
  get type(): DeliveryMethodTypeVO { return this._type; }
  get carrier(): string | undefined { return this._carrier; }
  get baseCost(): number { return this._baseCost; }
  get currency(): string { return this._currency; }
  get estimatedDays(): number { return this._estimatedDays; }
  get isActive(): boolean { return this._isActive; }

  isFree(): boolean { return this._baseCost === 0; }
  isFast(): boolean { return this._estimatedDays <= 2; }

  activate(now: string): void {
    this._isActive = true;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  deactivate(now: string): void {
    this._isActive = false;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  updateCost(newCost: number, now: string): void {
    if (newCost < 0) throw new ValidationError('Cost cannot be negative', 'baseCost');
    this._baseCost = newCost;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: string;
    props: DeliveryMethodEntityProps;
    now: string;
  }): DeliveryMethodEntity {
    return new DeliveryMethodEntity(params.id, params.now, params.now, params.props);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: DeliveryMethodEntityProps;
  }): DeliveryMethodEntity {
    return new DeliveryMethodEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
  }
}
