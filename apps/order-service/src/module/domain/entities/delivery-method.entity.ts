/**
 * DeliveryMethodEntity — AGGREGATE ROOT
 * @module order-service/domain/entities
 *
 * Reference data: Delivery options offered by carrier.
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { DeliveryMethodVO } from '../value-objects/composites/delivery-method.vo.js';

export interface DeliveryMethodEntityProps {
  readonly vo: DeliveryMethodVO;
}

export class DeliveryMethodEntity extends AggregateRoot<string> {
  private _vo: DeliveryMethodVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: DeliveryMethodEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._vo.baseCost < 0) {
      throw new ValidationError('DeliveryMethod baseCost cannot be negative', 'baseCost');
    }
  }

  // ═══ Getters ═══
  get vo(): DeliveryMethodVO { return this._vo; }
  get name(): string { return this._vo.name; }
  get baseCost(): number { return this._vo.baseCost; }
  get currency(): string { return this._vo.currency; }
  get estimatedDays(): number { return this._vo.estimatedDays; }
  get isActive(): boolean { return this._vo.isActive; }

  // ═══ Predicates ═══
  isFree(): boolean { return this._vo.isFree(); }
  isFast(): boolean { return this._vo.isFast(); }

  // ═══ Business Actions ═══
  activate(now: string = new Date().toISOString()): void {
    if (this._vo.isActive) return;
    this._vo = DeliveryMethodVO.create({ ...this._vo.value, isActive: true });
    this.touch(now);
    this.incrementVersion();
  }

  deactivate(now: string = new Date().toISOString()): void {
    if (!this._vo.isActive) return;
    this._vo = DeliveryMethodVO.create({ ...this._vo.value, isActive: false });
    this.touch(now);
    this.incrementVersion();
  }

  updateBaseCost(newCost: number, now: string = new Date().toISOString()): void {
    if (!Number.isFinite(newCost) || newCost < 0) {
      throw new BusinessRuleError(
        'Base cost must be non-negative finite',
        'INVALID_DELIVERY_METHOD_COST',
        { deliveryMethodId: this.id, newCost },
      );
    }
    this._vo = DeliveryMethodVO.create({ ...this._vo.value, baseCost: newCost });
    this.touch(now);
    this.incrementVersion();
  }

  // ═══ Private Helpers ═══
  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    vo: DeliveryMethodVO;
    now: string;
  }): DeliveryMethodEntity {
    return new DeliveryMethodEntity(params.id, params.now, params.now, { vo: params.vo }, null);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: DeliveryMethodEntityProps;
    version?: number;
  }): DeliveryMethodEntity {
    const entity = new DeliveryMethodEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
