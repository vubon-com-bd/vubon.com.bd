/**
 * VendorAddressVO — Composite Value Object
 * @module vendor-service/domain/value-objects/composites
 *
 * Vendor এর physical address (head office / warehouse / billing)।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { REGEX } from '@vubon/shared-constants/common';

import { AddressIdVO } from '../primitives/address-id.vo.js';
import { VendorIdVO } from '../primitives/vendor-id.vo.js';
import { AddressLabelVO } from '../primitives/address-label.vo.js';

export interface VendorAddressVOProps {
  readonly id: AddressIdVO;
  readonly vendorId: VendorIdVO;
  readonly label: AddressLabelVO;
  readonly addressType: 'head_office' | 'warehouse' | 'billing' | 'return' | 'other';
  readonly line1: string;
  readonly line2?: string;
  readonly area?: string;
  readonly city: string;
  readonly district: string;
  readonly division: string;
  readonly postalCode?: string;
  readonly country: string;
  readonly latitude?: number;
  readonly longitude?: number;
  readonly isPrimary: boolean;
  readonly isVerified: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

const ADDRESS_TYPES = new Set(['head_office', 'warehouse', 'billing', 'return', 'other']);

export class VendorAddressVO extends BaseVO<VendorAddressVOProps> {
  private constructor(props: VendorAddressVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: VendorAddressVOProps): VendorAddressVO {
    const vo = new VendorAddressVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: VendorAddressVOProps): VendorAddressVO {
    return new VendorAddressVO(props);
  }

  protected validate(): void {
    const v = this.value;

    if (!ADDRESS_TYPES.has(v.addressType)) {
      throw new ValidationError(
        `Invalid addressType: "${v.addressType}"`,
        'addressType',
      );
    }

    if (v.line1.trim().length < 3 || v.line1.length > 255) {
      throw new ValidationError('Address line1 must be 3-255 chars', 'line1');
    }
    if (v.line2 && v.line2.length > 255) {
      throw new ValidationError('Address line2 max 255 chars', 'line2');
    }
    if (v.area && v.area.length > 100) {
      throw new ValidationError('Address area max 100 chars', 'area');
    }
    if (v.city.trim().length < 2 || v.city.length > 100) {
      throw new ValidationError('Address city must be 2-100 chars', 'city');
    }
    if (v.district.trim().length < 2 || v.district.length > 100) {
      throw new ValidationError('Address district must be 2-100 chars', 'district');
    }
    if (v.division.trim().length < 2 || v.division.length > 100) {
      throw new ValidationError('Address division must be 2-100 chars', 'division');
    }
    if (v.postalCode && !REGEX.POSTAL_BD.test(v.postalCode)) {
      throw new ValidationError('Postal code must be 4 digits', 'postalCode');
    }
    if (!v.country || v.country.length < 2 || v.country.length > 3) {
      throw new ValidationError('Country must be a 2-3 char code', 'country');
    }

    if (v.latitude !== undefined && (v.latitude < -90 || v.latitude > 90)) {
      throw new ValidationError('Latitude must be between -90 and 90', 'latitude');
    }
    if (v.longitude !== undefined && (v.longitude < -180 || v.longitude > 180)) {
      throw new ValidationError('Longitude must be between -180 and 180', 'longitude');
    }
    const hasLat = v.latitude !== undefined;
    const hasLng = v.longitude !== undefined;
    if (hasLat !== hasLng) {
      throw new ValidationError('Latitude and longitude must be provided together', 'coordinates');
    }
  }

  // ─── Getters ───
  get id(): AddressIdVO { return this.value.id; }
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get label(): AddressLabelVO { return this.value.label; }
  get addressType(): VendorAddressVOProps['addressType'] { return this.value.addressType; }
  get line1(): string { return this.value.line1; }
  get line2(): string | undefined { return this.value.line2; }
  get area(): string | undefined { return this.value.area; }
  get city(): string { return this.value.city; }
  get district(): string { return this.value.district; }
  get division(): string { return this.value.division; }
  get postalCode(): string | undefined { return this.value.postalCode; }
  get country(): string { return this.value.country; }
  get latitude(): number | undefined { return this.value.latitude; }
  get longitude(): number | undefined { return this.value.longitude; }
  get isPrimary(): boolean { return this.value.isPrimary; }
  get isVerified(): boolean { return this.value.isVerified; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  // ─── Predicates ───
  isHeadOffice(): boolean { return this.addressType === 'head_office'; }
  isWarehouse(): boolean { return this.addressType === 'warehouse'; }
  isBilling(): boolean { return this.addressType === 'billing'; }
  isReturn(): boolean { return this.addressType === 'return'; }

  hasCoordinates(): boolean {
    return this.latitude !== undefined && this.longitude !== undefined;
  }

  hasPostalCode(): boolean { return this.postalCode !== undefined; }
  hasLine2(): boolean { return this.line2 !== undefined; }
  hasArea(): boolean { return this.area !== undefined; }

  /** Address belongs to BD */
  isBangladesh(): boolean {
    return this.country.toUpperCase() === 'BD' || this.country.toUpperCase() === 'BGD';
  }

  /** Can be used for shipping (has coordinates for delivery) */
  isShippable(): boolean {
    return this.isVerified && this.isBangladesh();
  }

  /** One-line formatted address */
  get formatted(): string {
    return [
      this.line1,
      this.line2,
      this.area,
      this.city,
      this.district,
      this.division,
      this.postalCode,
      this.country,
    ]
      .filter(Boolean)
      .join(', ');
  }
}
