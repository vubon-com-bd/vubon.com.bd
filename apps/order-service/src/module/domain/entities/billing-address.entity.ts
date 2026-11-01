/**
 * BillingAddressEntity — Child of Order aggregate
 * @module order-service/domain/entities
 *
 * ⚠️ BaseEntity-তে version নেই।
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';

import { BillingAddressVO } from '../value-objects/composites/billing-address.vo.js';

export class BillingAddressEntity extends BaseEntity<string> {
  private _vo: BillingAddressVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    vo: BillingAddressVO,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = vo;
  }

  // ═══ Getters ═══
  get vo(): BillingAddressVO { return this._vo; }
  get recipientName(): string { return this._vo.recipientName; }
  get phone(): string { return this._vo.phone; }
  get oneLine(): string { return this._vo.oneLine; }

  // ═══ Business methods ═══
  update(vo: BillingAddressVO, now: string = new Date().toISOString()): void {
    this._vo = vo;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    vo: BillingAddressVO;
    now: string;
  }): BillingAddressEntity {
    return new BillingAddressEntity(params.id, params.now, params.now, params.vo, null);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    vo: BillingAddressVO;
  }): BillingAddressEntity {
    return new BillingAddressEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.vo,
      params.deletedAt ?? null,
    );
  }
}
