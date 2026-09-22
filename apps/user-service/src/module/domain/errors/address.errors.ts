import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class AddressNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(addressId: string) {
    super(`Address not found: ${addressId}`, { addressId });
  }
}

export class AddressLimitExceededError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;
  constructor(limit: number) {
    super(`Address limit exceeded: max ${limit}`, { limit });
  }
}

export class InvalidPostalCodeError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;
  constructor(postalCode: string) {
    super(`Invalid postal code: ${postalCode}`, { postalCode });
  }
}

export class DistrictDivisionMismatchError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;
  constructor(district: string, division: string) {
    super(`District '${district}' does not belong to division '${division}'`, {
      district,
      division,
    });
  }
}

export class InvalidAddressIdError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_REQUIRED;
  readonly httpStatus = 400;
  constructor(reason: string) {
    super(`Invalid address ID: ${reason}`, { reason });
  }
}

export class InvalidAddressLabelError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;
  constructor(reason: string) {
    super(`Invalid address label: ${reason}`, { reason });
  }
}

export class InvalidAddressLineError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;
  constructor(reason: string) {
    super(`Invalid address line: ${reason}`, { reason });
  }
}

export class InvalidCityError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;
  constructor(city: string) {
    super(`Invalid city: ${city}`, { city });
  }
}

export class InvalidDistrictError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;
  constructor(district: string) {
    super(`Invalid district: ${district}`, { district });
  }
}

export class InvalidDivisionError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;
  constructor(division: string) {
    super(`Invalid division: ${division}`, { division });
  }
}
