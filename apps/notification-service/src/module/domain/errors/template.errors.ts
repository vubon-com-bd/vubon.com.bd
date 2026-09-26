import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';

export class TemplateNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 404;

  constructor(name: string) {
    super(`Template not found: ${name}`, { name });
  }
}

export class TemplateRenderError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Template render failed: ${reason}`, { reason });
  }
}

export class MissingVariableError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_REQUIRED;
  readonly httpStatus = 400;

  constructor(variable: string) {
    super(`Missing template variable: ${variable}`, { variable });
  }
}
