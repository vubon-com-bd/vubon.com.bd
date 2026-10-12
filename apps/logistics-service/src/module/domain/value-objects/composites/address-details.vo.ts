/**
 * AddressDetailsVO — wraps shared-kernel AddressVO with geo + contact
 * @module logistics-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { AddressVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import type { Address, Phone } from '@vubon/shared-types/common';

export interface AddressDetailsValue {
  readonly address: AddressVO;
  readonly contactName?: string;
  readonly contactPhone?: Phone;
  readonly latitude?: number;
  readonly longitude?: number;
  readonly instructions?: string;
}

export class AddressDetailsVO extends BaseVO<AddressDetailsValue> {
  private constructor(value: AddressDetailsValue) { super(value); }

  static create(input: {
    address: Address;
    contactName?: string;
    contactPhone?: string;
    latitude?: number;
    longitude?: number;
    instructions?: string;
  }): AddressDetailsVO {
    const address = AddressVO.of(input.address);
    if (input.latitude !== undefined && (input.latitude < -90 || input.latitude > 90)) {
      throw new ValidationError('Latitude must be -90 to 90', 'latitude');
    }
    if (input.longitude !== undefined && (input.longitude < -180 || input.longitude > 180)) {
      throw new ValidationError('Longitude must be -180 to 180', 'longitude');
    }
    return new AddressDetailsVO({
      address,
      contactName: input.contactName?.trim(),
      contactPhone: input.contactPhone?.trim() as Phone | undefined,
      latitude: input.latitude,
      longitude: input.longitude,
      instructions: input.instructions?.trim(),
    });
  }

  static reconstitute(value: AddressDetailsValue): AddressDetailsVO {
    return new AddressDetailsVO(value);
  }

  get address(): AddressVO { return this.value.address; }
  get contactName(): string | undefined { return this.value.contactName; }
  get contactPhone(): Phone | undefined { return this.value.contactPhone; }
  get latitude(): number | undefined { return this.value.latitude; }
  get longitude(): number | undefined { return this.value.longitude; }
  get instructions(): string | undefined { return this.value.instructions; }

  hasGeoCoordinates(): boolean {
    return this.value.latitude !== undefined && this.value.longitude !== undefined;
  }

  hasContact(): boolean {
    return Boolean(this.value.contactName || this.value.contactPhone);
  }

  toAddress(): Address { return this.value.address.value; }
}
