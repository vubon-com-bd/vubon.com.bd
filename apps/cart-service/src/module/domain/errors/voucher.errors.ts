import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class VoucherNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(code: string) {
    super(`Voucher not found: ${code}`, { code });
  }
}

export class VoucherInvalidError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;
  constructor(code: string, reason: string) {
    super(`Voucher invalid [${code}]: ${reason}`, { code, reason });
  }
}
