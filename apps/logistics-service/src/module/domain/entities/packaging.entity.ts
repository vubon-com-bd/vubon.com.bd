/**
 * PackagingEntity — AGGREGATE ROOT
 * @module logistics-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { PackagingIdVO } from '../value-objects/primitives/packaging-id.vo.js';
import { PackagingTypeVO } from '../value-objects/primitives/packaging-type.vo.js';
import { PackagingMaterialVO } from '../value-objects/primitives/packaging-material.vo.js';
import { PackagingStatusVO } from '../value-objects/primitives/packaging-status.vo.js';
import { PackagingSizeVO } from '../value-objects/primitives/packaging-size.vo.js';

import {
  PackagingCreatedEvent,
  PackagingActivatedEvent,
  PackagingDeactivatedEvent,
  PackagingStockAddedEvent,
  PackagingStockConsumedEvent,
  PackagingOutOfStockEvent,
  PackagingDiscontinuedEvent,
  PackagingStatusChangedEvent,
} from '../events/packaging.events.js';

export interface PackagingEntityProps {
  readonly name: string;
  readonly code: string;
  readonly type: PackagingTypeVO;
  readonly material: PackagingMaterialVO;
  readonly status: PackagingStatusVO;
  readonly size: PackagingSizeVO;
  readonly cost?: number;
  readonly currency?: string;
  readonly imageUrl?: string;
  readonly isFragile: boolean;
  readonly isTemperatureControlled: boolean;
  readonly isRecyclable: boolean;
  readonly stock: number;
  readonly isDefault: boolean;
  readonly activatedAt?: string;
  readonly deactivatedAt?: string;
  readonly discontinuedAt?: string;
  readonly deactivateReason?: string;
  readonly discontinueReason?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class PackagingEntity extends AggregateRoot<string> {
  private _status: PackagingStatusVO;
  private _size: PackagingSizeVO;
  private _cost?: number;
  private _stock: number;
  private _isDefault: boolean;
  private _activatedAt?: string;
  private _deactivatedAt?: string;
  private _discontinuedAt?: string;
  private _deactivateReason?: string;
  private _discontinueReason?: string;

  private readonly _name: string;
  private readonly _code: string;
  private readonly _type: PackagingTypeVO;
  private readonly _material: PackagingMaterialVO;
  private readonly _currency?: string;
  private readonly _imageUrl?: string;
  private readonly _isFragile: boolean;
  private readonly _isTemperatureControlled: boolean;
  private readonly _isRecyclable: boolean;
  private readonly _metadata?: Readonly<Record<string, unknown>>;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: PackagingEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._code = props.code;
    this._type = props.type;
    this._material = props.material;
    this._status = props.status;
    this._size = props.size;
    this._cost = props.cost;
    this._currency = props.currency;
    this._imageUrl = props.imageUrl;
    this._isFragile = props.isFragile;
    this._isTemperatureControlled = props.isTemperatureControlled;
    this._isRecyclable = props.isRecyclable;
    this._stock = props.stock;
    this._isDefault = props.isDefault;
    this._activatedAt = props.activatedAt;
    this._deactivatedAt = props.deactivatedAt;
    this._discontinuedAt = props.discontinuedAt;
    this._deactivateReason = props.deactivateReason;
    this._discontinueReason = props.discontinueReason;
    this._metadata = props.metadata;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!this._code || this._code.trim().length === 0) {
      throw new ValidationError('Code required', 'code');
    }
    if (!this._name || this._name.trim().length === 0) {
      throw new ValidationError('Name required', 'name');
    }
    if (this._stock < 0) {
      throw new ValidationError('Stock cannot be negative', 'stock');
    }
    if (this._cost !== undefined && this._cost < 0) {
      throw new ValidationError('Cost cannot be negative', 'cost');
    }
  }

  get name(): string { return this._name; }
  get code(): string { return this._code; }
  get type(): PackagingTypeVO { return this._type; }
  get material(): PackagingMaterialVO { return this._material; }
  get status(): PackagingStatusVO { return this._status; }
  get size(): PackagingSizeVO { return this._size; }
  get cost(): number | undefined { return this._cost; }
  get currency(): string | undefined { return this._currency; }
  get imageUrl(): string | undefined { return this._imageUrl; }
  get isFragile(): boolean { return this._isFragile; }
  get isTemperatureControlled(): boolean { return this._isTemperatureControlled; }
  get isRecyclable(): boolean { return this._isRecyclable; }
  get stock(): number { return this._stock; }
  get isDefault(): boolean { return this._isDefault; }
  get activatedAt(): string | undefined { return this._activatedAt; }
  get deactivatedAt(): string | undefined { return this._deactivatedAt; }
  get discontinuedAt(): string | undefined { return this._discontinuedAt; }
  get deactivateReason(): string | undefined { return this._deactivateReason; }
  get discontinueReason(): string | undefined { return this._discontinueReason; }
  get metadata(): Readonly<Record<string, unknown>> | undefined { return this._metadata; }

  get toIdVO(): PackagingIdVO { return PackagingIdVO.reconstitute(this.id); }

  isActive(): boolean { return this._status.isActive(); }
  isInactive(): boolean { return this._status.isInactive(); }
  isOutOfStock(): boolean { return this._status.isOutOfStock(); }
  isDiscontinued(): boolean { return this._status.isDiscontinued(); }
  isFinal(): boolean { return this._status.isFinal(); }
  isUsable(): boolean {
    return this._status.isUsable() && this._stock > 0;
  }

  get volumeM3(): number { return this._size.volumeM3; }
  get dimensions(): string {
    return `${this._size.lengthCm}×${this._size.widthCm}×${this._size.heightCm}cm`;
  }

  canHold(weightKg: number): boolean {
    return weightKg <= this._size.maxWeightKg;
  }

  hasStock(quantity: number = 1): boolean {
    return this._stock >= quantity;
  }

  // ═══ Business Actions ═══
  activate(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('active');
    const from = this._status.value;
    this._status = PackagingStatusVO.active();
    this._activatedAt = now;
    this.emitStatusChange(from, 'active');
    this.addDomainEvent(
      new PackagingActivatedEvent({
        aggregateId: this.id,
        payload: { packagingId: this.id, activatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  deactivate(reason?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('inactive');
    const from = this._status.value;
    this._status = PackagingStatusVO.create('inactive');
    this._deactivatedAt = now;
    this._deactivateReason = reason;
    this.emitStatusChange(from, 'inactive', reason);
    this.addDomainEvent(
      new PackagingDeactivatedEvent({
        aggregateId: this.id,
        payload: { packagingId: this.id, reason, deactivatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  addStock(quantity: number, now: string = new Date().toISOString()): void {
    if (quantity <= 0) {
      throw new ValidationError('Quantity must be positive', 'quantity');
    }
    if (this._status.isFinal()) {
      throw new BusinessRuleError(
        'Cannot add stock to discontinued packaging',
        'PACKAGING_DISCONTINUED',
        { packagingId: this.id },
      );
    }
    this._stock += quantity;
    // Auto-reactivate if was out_of_stock
    if (this._status.isOutOfStock()) {
      this._status = PackagingStatusVO.active();
    }
    this.addDomainEvent(
      new PackagingStockAddedEvent({
        aggregateId: this.id,
        payload: {
          packagingId: this.id,
          quantity,
          newStock: this._stock,
          addedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  consumeStock(quantity: number, now: string = new Date().toISOString()): void {
    if (quantity <= 0) {
      throw new ValidationError('Quantity must be positive', 'quantity');
    }
    if (this._stock < quantity) {
      throw new BusinessRuleError(
        `Insufficient stock (requested ${quantity}, available ${this._stock})`,
        'PACKAGING_OUT_OF_STOCK',
        { packagingId: this.id, requested: quantity, available: this._stock },
      );
    }
    this._stock -= quantity;
    this.addDomainEvent(
      new PackagingStockConsumedEvent({
        aggregateId: this.id,
        payload: {
          packagingId: this.id,
          quantity,
          newStock: this._stock,
          consumedAt: now,
        },
        version: this.version + 1,
      }),
    );
    // Auto-mark out_of_stock
    if (this._stock === 0 && this._status.isActive()) {
      this._status = PackagingStatusVO.create('out_of_stock');
      this.addDomainEvent(
        new PackagingOutOfStockEvent({
          aggregateId: this.id,
          payload: { packagingId: this.id, markedAt: now },
          version: this.version + 2,
        }),
      );
    }
    this.touch(now);
    this.incrementVersion();
  }

  discontinue(reason?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('discontinued');
    const from = this._status.value;
    this._status = PackagingStatusVO.create('discontinued');
    this._discontinuedAt = now;
    this._discontinueReason = reason;
    this.emitStatusChange(from, 'discontinued', reason);
    this.addDomainEvent(
      new PackagingDiscontinuedEvent({
        aggregateId: this.id,
        payload: { packagingId: this.id, reason, discontinuedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  updateSize(size: PackagingSizeVO, now: string = new Date().toISOString()): void {
    if (this._status.isFinal()) {
      throw new BusinessRuleError(
        'Cannot update size of discontinued packaging',
        'PACKAGING_DISCONTINUED',
        { packagingId: this.id },
      );
    }
    this._size = size;
    this.touch(now);
    this.incrementVersion();
  }

  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid packaging status transition: "${this._status.value}" → "${target}"`,
        'INVALID_PACKAGING_STATUS_TRANSITION',
        { from: this._status.value, to: target, packagingId: this.id },
      );
    }
  }

  private emitStatusChange(from: string, to: string, reason?: string): void {
    this.addDomainEvent(
      new PackagingStatusChangedEvent({
        aggregateId: this.id,
        payload: { packagingId: this.id, fromStatus: from, toStatus: to, reason },
        version: this.version + 1,
      }),
    );
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: PackagingIdVO;
    props: Omit<PackagingEntityProps, 'status'>;
    now: string;
  }): PackagingEntity {
    const status =
      params.props.stock > 0
        ? PackagingStatusVO.create('inactive')
        : PackagingStatusVO.create('out_of_stock');
    const entity = new PackagingEntity(
      params.id.value,
      params.now,
      params.now,
      { ...params.props, status },
    );
    entity.addDomainEvent(
      new PackagingCreatedEvent({
        aggregateId: params.id.value,
        payload: {
          packagingId: params.id.value,
          code: params.props.code,
          name: params.props.name,
          type: params.props.type.value,
          dimensions: entity.dimensions,
          createdAt: params.now,
        },
        version: 1,
      }),
    );
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: PackagingEntityProps;
    version?: number;
  }): PackagingEntity {
    const entity = new PackagingEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
