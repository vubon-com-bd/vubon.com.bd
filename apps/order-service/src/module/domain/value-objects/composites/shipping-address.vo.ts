/**
 * ShippingAddressVO — Composite Value Object
 * @module order-service/domain/value-objects/composites
 *
 * Immutable snapshot of shipping address at order time.
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { ShippingAddressIdVO } from '../primitives/shipping-address-id.vo.js';

export interface ShippingAddressVOProps {
  readonly id: ShippingAddressIdVO;
  readonly recipientName: string;
  readonly phone: string;
  readonly line1: string;
  readonly line2?: string;
  readonly city: string;
  readonly district?: string;
  readonly division?: string;
  readonly postalCode?: string;
  readonly country: string;
}

export class ShippingAddressVO extends BaseVO<ShippingAddressVOProps> {
  private constructor(props: ShippingAddressVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: ShippingAddressVOProps): ShippingAddressVO {
    const vo = new ShippingAddressVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: ShippingAddressVOProps): ShippingAddressVO {
    return new ShippingAddressVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (typeof v.recipientName !== 'string' || v.recipientName.trim().length < 2) {
      throw new ValidationError('recipientName must be at least 2 chars', 'recipientName');
    }
    if (typeof v.phone !== 'string' || v.phone.trim().length < 10) {
      throw new ValidationError('phone must be at least 10 chars', 'phone');
    }
    if (typeof v.line1 !== 'string' || v.line1.trim().length < 3) {
      throw new ValidationError('line1 must be at least 3 chars', 'line1');
    }
    if (typeof v.city !== 'string' || v.city.trim().length < 2) {
      throw new ValidationError('city must be at least 2 chars', 'city');
    }
    if (typeof v.country !== 'string' || v.country.trim().length < 2) {
      throw new ValidationError('country must be a 2-3 char code', 'country');
    }
  }

  // ═══ Getters ═══
  get id(): ShippingAddressIdVO { return this.value.id; }
  get recipientName(): string { return this.value.recipientName; }
  get phone(): string { return this.value.phone; }
  get line1(): string { return this.value.line1; }
  get line2(): string | undefined { return this.value.line2; }
  get city(): string { return this.value.city; }
  get district(): string | undefined { return this.value.district; }
  get division(): string | undefined { return this.value.division; }
  get postalCode(): string | undefined { return this.value.postalCode; }
  get country(): string { return this.value.country; }

  // ═══ Business methods ═══
  get oneLine(): string {
    return [
      this.line1,
      this.line2,
      this.city,
      this.district,
      this.division,
      this.postalCode,
      this.country,
    ]
      .filter((part) => part !== undefined && part.length > 0)
      .join(', ');
  }

  isSameAs(other: ShippingAddressVO): boolean {
    return (
      this.recipientName === other.recipientName &&
      this.phone === other.phone &&
      this.line1 === other.line1 &&
      this.city === other.city &&
      this.country === other.country
    );
  }
}
