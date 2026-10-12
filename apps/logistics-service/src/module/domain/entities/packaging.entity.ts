/**
 * PackagingEntity — AGGREGATE ROOT
 * @module logistics-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { PACKAGING } from '@vubon/shared-constants/logistics';
import type { Url } from '@vubon/shared-types/common';

import { PackagingIdVO } from '../value-objects/primitives/packaging-id.vo.js';
import { PackagingStatusVO } from '../value-objects/primitives/packaging-status.vo.js';
import { PackagingTypeVO } from '../value-objects/primitives/packaging-type.vo.js';
import { PackagingMaterialVO } from '../value-objects/primitives/packaging-material.vo.js';
import { DimensionCmVO } from '../value-objects/primitives/dimension-cm.vo.js';
import { WeightKgVO } from '../value-objects/primitives/weight-kg.vo.js';
import { ShippingCostVO } from '../value-objects/primitives/shipping-cost.vo.js';

import {
  PackagingCreatedEvent,
  PackagingActivatedEvent,
  PackagingDeactivatedEvent,
  PackagingOutOfStockEvent,
  PackagingRestockedEvent,
  PackagingDiscontinuedEvent,
  PackagingStockAdjustedEvent,
  PackagingMadeDefaultEvent,
} from '../events/packaging.events.js';

export interface PackagingEntityProps {
  readonly name: string;
  readonly code: string;
  readonly type: PackagingTypeVO;
  readonly material: PackagingMaterialVO;
  readonly status: PackagingStatusVO;
  readonly dimensions: DimensionCmVO;
  readonly maxWeightKg: WeightKgVO;
  readonly cost?: ShippingCostVO;
  readonly imageUrl?: Url;
  readonly isFragile: boolean;
  readonly isTemperatureControlled: boolean;
  readonly isRecyclable: boolean;
  readonly stock: number;
  readonly isDefault: boolean;
}

export class PackagingEntity extends AggregateRoot<string> {
  private _status: PackagingStatusVO;
  private _stock: number;
  private _isDefault: boolean;

  private readonly _name: string;
  private readonly _code: string;
  private readonly _type: PackagingTypeVO;
  private readonly _material: PackagingMaterialVO;
  private readonly _dimensions: DimensionCmVO;
  private readonly _maxWeightKg: WeightKgVO;
  private readonly _cost?: ShippingCostVO;
  private readonly _imageUrl?: Url;
  private readonly _isFragile: boolean;
  private readonly _isTemperatureControlled: boolean;
  private readonly _isRecyclable: boolean;

  private constructor(
    id: string, createdAt: string, updatedAt: string,
    props: PackagingEntityProps, deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._code = props.code;
    this._type = props.type;
    this._material = props.material;
    this._status = props.status;
    this._dimensions = props.dimensions;
    this._maxWeightKg = props.maxWeightKg;
    this._cost = props.cost;
    this._imageUrl = props.imageUrl;
    this._isFragile = props.isFragile;
    this._isTemperatureControlled = props.isTemperatureControlled;
    this._isRecyclable = props.isRecyclable;
    this._stock = props.stock;
    this._isDefault = props.isDefault;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._name.trim().length === 0) throw new ValidationError('Packaging name required', 'name');
    if (this._code.trim().length === 0) throw new ValidationError('Packaging code required', 'code');
    if (this._stock < 0) throw new ValidationError('Stock cannot be negative', 'stock');
    if (this._maxWeightKg.value > PACKAGING.MAX_PACKAGE_WEIGHT_KG) {
      throw new ValidationError(`maxWeightKg exceeds ${PACKAGING.MAX_PACKAGE_WEIGHT_KG}`, 'maxWeightKg');
    }
  }

  get name(): string { return this._name; }
  get code(): string { return this._code; }
  get type(): PackagingTypeVO { return this._type; }
  get material(): PackagingMaterialVO { return this._material; }
  get status(): PackagingStatusVO { return this._status; }
  get dimensions(): DimensionCmVO { return this._dimensions; }
  get maxWeightKg(): WeightKgVO { return this._maxWeightKg; }
  get cost(): ShippingCostVO | undefined { return this._cost; }
  get imageUrl(): Url | undefined { return this._imageUrl; }
  get isFragile(): boolean { return this._isFragile; }
  get isTemperatureControlled(): boolean { return this._isTemperatureControlled; }
  get isRecyclable(): boolean { return this._isRecyclable; }
  get stock(): number { return this._stock; }
  get isDefault(): boolean { return this._isDefault; }
  get toIdVO(): PackagingIdVO { return PackagingIdVO.reconstitute(this.id); }

  canBeUsed(): boolean { return this._status.canBeUsed() && this._stock > 0; }

  canHold(weightKg: number, dims?: { lengthCm: number; widthCm: number; heightCm: number }): boolean {
    if (weightKg > this._maxWeightKg.value) return false;
    if (dims) {
      if (
        dims.lengthCm > this._dimensions.lengthCm ||
        dims.widthCm > this._dimensions.widthCm ||
        dims.heightCm > this._dimensions.heightCm
      ) {
        return false;
      }
    }
    return true;
  }

  requiresSpecialHandling(): boolean { return this._isFragile || this._isTemperatureControlled; }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  activate(now: string = new Date().toISOString()): void {
    if (!this._status.canTransitionTo('active')) {
      throw new ValidationError(`Cannot activate packaging from ${this._status.value}`, 'status');
    }
    const from = this._status.value;
    this._status = PackagingStatusVO.active();
    this.addDomainEvent(new PackagingActivatedEvent({
      aggregateId: this.id,
      payload: { packagingId: this.id, fromStatus: from, toStatus: 'active' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  deactivate(reason?: string, now: string = new Date().toISOString()): void {
    const from = this._status.value;
    this._status = PackagingStatusVO.inactive();
    this.addDomainEvent(new PackagingDeactivatedEvent({
      aggregateId: this.id,
      payload: { packagingId: this.id, fromStatus: from, toStatus: 'inactive', reason },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  markOutOfStock(now: string = new Date().toISOString()): void {
    if (this._status.isOutOfStock()) return;
    const from = this._status.value;
    this._status = PackagingStatusVO.outOfStock();
    this.addDomainEvent(new PackagingOutOfStockEvent({
      aggregateId: this.id,
      payload: { packagingId: this.id, fromStatus: from, toStatus: 'out_of_stock' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  restock(quantity: number, now: string = new Date().toISOString()): void {
    if (quantity <= 0) throw new ValidationError('Restock quantity must be positive', 'quantity');
    const previous = this._stock;
    this._stock += quantity;
    if (this._status.isOutOfStock()) {
      this._status = PackagingStatusVO.active();
    }
    this.addDomainEvent(new PackagingRestockedEvent({
      aggregateId: this.id,
      payload: {
        packagingId: this.id,
        previousStock: previous,
        newStock: this._stock,
        delta: quantity,
        adjustedAt: now,
        reason: 'restock',
      },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  consume(quantity: number, now: string = new Date().toISOString()): void {
    if (quantity <= 0) throw new ValidationError('Consume quantity must be positive', 'quantity');
    if (quantity > this._stock) {
      throw new ValidationError('Insufficient packaging stock', 'quantity');
    }
    const previous = this._stock;
    this._stock -= quantity;
    if (this._stock === 0) {
      this._status = PackagingStatusVO.outOfStock();
    }
    this.addDomainEvent(new PackagingStockAdjustedEvent({
      aggregateId: this.id,
      payload: {
        packagingId: this.id,
        previousStock: previous,
        newStock: this._stock,
        delta: -quantity,
        adjustedAt: now,
        reason: 'consume',
      },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  adjustStock(delta: number, reason: string, now: string = new Date().toISOString()): void {
    if (!Number.isInteger(delta)) throw new ValidationError('Delta must be integer', 'delta');
    const previous = this._stock;
    const newStock = Math.max(0, this._stock + delta);
    this._stock = newStock;
    if (newStock === 0 && !this._status.isOutOfStock()) {
      this._status = PackagingStatusVO.outOfStock();
    } else if (newStock > 0 && this._status.isOutOfStock()) {
      this._status = PackagingStatusVO.active();
    }
    this.addDomainEvent(new PackagingStockAdjustedEvent({
      aggregateId: this.id,
      payload: {
        packagingId: this.id,
        previousStock: previous,
        newStock,
        delta,
        adjustedAt: now,
        reason,
      },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  discontinue(reason: string, now: string = new Date().toISOString()): void {
    const from = this._status.value;
    this._status = PackagingStatusVO.discontinued();
    this.addDomainEvent(new PackagingDiscontinuedEvent({
      aggregateId: this.id,
      payload: { packagingId: this.id, fromStatus: from, toStatus: 'discontinued', reason },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  markAsDefault(now: string = new Date().toISOString()): void {
    this._isDefault = true;
    this.addDomainEvent(new PackagingMadeDefaultEvent({
      aggregateId: this.id,
      payload: { packagingId: this.id, isDefault: true, changedAt: now },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  unmarkAsDefault(now: string = new Date().toISOString()): void {
    if (!this._isDefault) return;
    this._isDefault = false;
    this.addDomainEvent(new PackagingMadeDefaultEvent({
      aggregateId: this.id,
      payload: { packagingId: this.id, isDefault: false, changedAt: now },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  static create(params: {
    id: string;
    props: Omit<PackagingEntityProps, 'status' | 'stock'> & { status?: PackagingStatusVO; stock?: number };
    now: string;
  }): PackagingEntity {
    const status = params.props.status ?? PackagingStatusVO.active();
    const fullProps: PackagingEntityProps = {
      ...params.props,
      status,
      stock: params.props.stock ?? 0,
    };
    const entity = new PackagingEntity(params.id, params.now, params.now, fullProps);
    entity.addDomainEvent(new PackagingCreatedEvent({
      aggregateId: params.id,
      payload: {
        packagingId: params.id,
        code: fullProps.code,
        name: fullProps.name,
        type: fullProps.type.value,
        material: fullProps.material.value,
      },
      version: 1,
    }));
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string; createdAt: string; updatedAt: string;
    deletedAt?: string | null; props: PackagingEntityProps; version?: number;
  }): PackagingEntity {
    const entity = new PackagingEntity(
      params.id, params.createdAt, params.updatedAt, params.props, params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
