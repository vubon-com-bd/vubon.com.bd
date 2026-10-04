/**
 * Address Application Errors
 * @module user-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class AddressNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_REQUIRED;
  readonly httpStatus = 404;
  constructor(addressId: string) {
    super(`Address "${addressId}" not found`, { addressId });
    this.name = 'AddressNotFoundApplicationError';
  }
}

export class AddressCreationFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;
  constructor(reason: string) {
    super(`Address creation failed: ${reason}`, { reason });
    this.name = 'AddressCreationFailedError';
  }
}

export class AddressUpdateFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;
  constructor(addressId: string, reason: string) {
    super(`Address update failed for "${addressId}": ${reason}`, { addressId, reason });
    this.name = 'AddressUpdateFailedError';
  }
}

export class AddressDeletionFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;
  constructor(addressId: string, reason: string) {
    super(`Address deletion failed for "${addressId}": ${reason}`, { addressId, reason });
    this.name = 'AddressDeletionFailedError';
  }
}

export class AddressLimitExceededError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 422;
  constructor(current: number, max: number) {
    super(`Address limit exceeded: ${current}/${max}`, { current, max });
    this.name = 'AddressLimitExceededError';
  }
}

export class InvalidAddressTypeError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 422;
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid address type "${value}". Allowed: ${allowed.join(', ')}`, {
      value,
      allowed,
    });
    this.name = 'InvalidAddressTypeError';
  }
}
