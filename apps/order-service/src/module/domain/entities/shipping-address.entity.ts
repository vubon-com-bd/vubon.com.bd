/**
 * ShippingAddressEntity — Child of Order aggregate
 * @module order-service/domain/entities
 *
 * ⚠️ BaseEntity-তে version নেই।
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { ShippingAddressVO } from '../value-objects/composites/shipping-address.vo.js';

export class ShippingAddressEntity extends BaseEntity<string> {
  private _vo: ShippingAddressVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    vo: ShippingAddressVO,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = vo;
  }

  // ═══ Getters ═══
  get vo(): ShippingAddressVO { return this._vo; }
  get recipientName(): string { return this._vo.recipientName; }
  get phone(): string { return this._vo.phone; }
  get oneLine(): string { return this._vo.oneLine; }

  // ═══ Business methods ═══
  update(vo: ShippingAddressVO, now: string = new Date().toISOString()): void {
    this._vo = vo;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    vo: ShippingAddressVO;
    now: string;
  }): ShippingAddressEntity {
    return new ShippingAddressEntity(params.id, params.now, params.now, params.vo, null);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    vo: ShippingAddressVO;
  }): ShippingAddressEntity {
    return new ShippingAddressEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.vo,
      params.deletedAt ?? null,
    );
  }
}
