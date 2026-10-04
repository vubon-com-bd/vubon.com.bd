/**
 * ShippingAddressLine Value Object (snapshot)
 * @module order-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export interface ShippingAddressLineValue {
  readonly fullName: string;
  readonly phone: string;
  readonly line1: string;
  readonly line2?: string;
  readonly city: string;
  readonly state?: string;
  readonly postalCode?: string;
  readonly country: string;
}

export class ShippingAddressLineVO extends BaseVO<ShippingAddressLineValue> {
  private constructor(value: ShippingAddressLineValue) { super(value); }

  static create(input: ShippingAddressLineValue): ShippingAddressLineVO {
    const vo = new ShippingAddressLineVO(input);
    vo.validate();
    return vo;
  }

  static reconstitute(input: ShippingAddressLineValue): ShippingAddressLineVO {
    return new ShippingAddressLineVO(input);
  }

  protected validate(): void {
    const v = this.value;
    if (!v.fullName || v.fullName.trim().length < 2 || v.fullName.length > 200) {
      throw new ValidationError('Full name must be 2-200 chars', 'fullName');
    }
    if (!v.phone || v.phone.trim().length < 5 || v.phone.length > 20) {
      throw new ValidationError('Phone must be 5-20 chars', 'phone');
    }
    if (!v.line1 || v.line1.trim().length < 3 || v.line1.length > 255) {
      throw new ValidationError('Address line1 must be 3-255 chars', 'line1');
    }
    if (!v.city || v.city.trim().length < 2 || v.city.length > 100) {
      throw new ValidationError('City must be 2-100 chars', 'city');
    }
    if (!v.country || v.country.length < 2 || v.country.length > 3) {
      throw new ValidationError('Country must be 2-3 char code', 'country');
    }
    if (v.postalCode !== undefined && !/^\d{4,6}$/.test(v.postalCode)) {
      throw new ValidationError('Postal code must be 4-6 digits', 'postalCode');
    }
  }

  get oneLine(): string {
    const v = this.value;
    return [v.line1, v.line2, v.city, v.state, v.postalCode, v.country]
      .filter(Boolean)
      .join(', ');
  }
}
