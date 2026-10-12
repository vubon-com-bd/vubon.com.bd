/**
 * AddressType Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { InvalidAddressTypeError } from '../../errors/profile.errors.js';

export type AddressTypeValue = 'home' | 'office' | 'billing' | 'shipping' | 'other';

const VALID_TYPES: readonly AddressTypeValue[] = [
  'home',
  'office',
  'billing',
  'shipping',
  'other',
];

export class AddressTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): AddressTypeVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new InvalidAddressTypeError(String(raw), VALID_TYPES);
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TYPES.includes(normalized as AddressTypeValue)) {
      throw new InvalidAddressTypeError(normalized, VALID_TYPES);
    }
    return new AddressTypeVO(normalized);
  }

  static home(): AddressTypeVO { return new AddressTypeVO('home'); }
  static office(): AddressTypeVO { return new AddressTypeVO('office'); }
  static billing(): AddressTypeVO { return new AddressTypeVO('billing'); }
  static shipping(): AddressTypeVO { return new AddressTypeVO('shipping'); }
  static other(): AddressTypeVO { return new AddressTypeVO('other'); }

  static reconstitute(raw: string): AddressTypeVO {
    return new AddressTypeVO(raw);
  }

  isHome(): boolean { return this.value === 'home'; }
  isOffice(): boolean { return this.value === 'office'; }
  isBilling(): boolean { return this.value === 'billing'; }
  isShipping(): boolean { return this.value === 'shipping'; }
}
