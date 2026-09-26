import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class ModelNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 404;

  constructor(modelId: string) {
    super(`Model not found: ${modelId}`, { modelId });
  }
}

export class ModelNotDeployedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 400;

  constructor(modelId: string) {
    super(`Model not deployed: ${modelId}`, { modelId });
  }
}

export class ModelDeprecatedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 410;

  constructor(modelId: string) {
    super(`Model deprecated: ${modelId}`, { modelId });
  }
}
