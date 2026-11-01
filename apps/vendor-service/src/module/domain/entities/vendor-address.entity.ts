/**
 * VendorAddressEntity — Child Entity
 * @module vendor-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import {
  VendorAddressVO,
  type VendorAddressVOProps,
} from '../value-objects/composites/vendor-address.vo.js';
import { AddressLabelVO } from '../value-objects/primitives/address-label.vo.js';

export interface VendorAddressEntityProps {
  readonly vo: VendorAddressVO;
}

export class VendorAddressEntity extends BaseEntity<string> {
  private _vo: VendorAddressVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorAddressEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
  }

  // ═══ Getters ═══
  get vo(): VendorAddressVO { return this._vo; }
  get addressId() { return this._vo.id; }
  get vendorId() { return this._vo.vendorId; }
  get label() { return this._vo.label; }
  get addressType() { return this._vo.addressType; }
  get line1(): string { return this._vo.line1; }
  get line2(): string | undefined { return this._vo.line2; }
  get area(): string | undefined { return this._vo.area; }
  get city(): string { return this._vo.city; }
  get district(): string { return this._vo.district; }
  get division(): string { return this._vo.division; }
  get postalCode(): string | undefined { return this._vo.postalCode; }
  get country(): string { return this._vo.country; }
  get latitude(): number | undefined { return this._vo.latitude; }
  get longitude(): number | undefined { return this._vo.longitude; }
  get isPrimary(): boolean { return this._vo.isPrimary; }
  get isVerified(): boolean { return this._vo.isVerified; }

  // ═══ Predicates ═══
  isHeadOffice(): boolean { return this._vo.isHeadOffice(); }
  isWarehouse(): boolean { return this._vo.isWarehouse(); }
  isBilling(): boolean { return this._vo.isBilling(); }
  isReturn(): boolean { return this._vo.isReturn(); }
  hasCoordinates(): boolean { return this._vo.hasCoordinates(); }
  isBangladesh(): boolean { return this._vo.isBangladesh(); }
  isShippable(): boolean { return this._vo.isShippable(); }

  get formatted(): string { return this._vo.formatted; }

  // ═══ Business Actions ═══
  markPrimary(now: string = new Date().toISOString()): void {
    if (this.isPrimary) return;
    const current = this._vo.value;
    this._vo = VendorAddressVO.create({ ...current, isPrimary: true });
    this.touch(now);
  }

  unmarkPrimary(now: string = new Date().toISOString()): void {
    if (!this.isPrimary) return;
    const current = this._vo.value;
    this._vo = VendorAddressVO.create({ ...current, isPrimary: false });
    this.touch(now);
  }

  verify(now: string = new Date().toISOString()): void {
    if (this.isVerified) return;
    const current = this._vo.value;
    this._vo = VendorAddressVO.create({ ...current, isVerified: true });
    this.touch(now);
  }

  updateLabel(label: AddressLabelVO, now: string = new Date().toISOString()): void {
    const current = this._vo.value;
    this._vo = VendorAddressVO.create({ ...current, label });
    this.touch(now);
  }

  updateCoordinates(
    latitude: number | undefined,
    longitude: number | undefined,
    now: string = new Date().toISOString(),
  ): void {
    const current = this._vo.value;
    this._vo = VendorAddressVO.create({
      ...current,
      latitude,
      longitude,
    });
    this.touch(now);
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    vo: VendorAddressVO;
    now: string;
  }): VendorAddressEntity {
    return new VendorAddressEntity(
      params.id,
      params.now,
      params.now,
      { vo: params.vo },
      null,
    );
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: VendorAddressEntityProps;
  }): VendorAddressEntity {
    return new VendorAddressEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
  }
}
