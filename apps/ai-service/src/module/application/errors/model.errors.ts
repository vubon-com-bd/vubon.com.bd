import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class ModelNotFoundError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_MODEL_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(modelId: string) {
    super(`AI model not found: ${modelId}`, { modelId });
  }
}

export class ModelNotDeployableError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_MODEL_NOT_DEPLOYABLE;
  readonly httpStatus = 409;

  constructor(modelId: string, reasons: readonly string[]) {
    super(
      `Model ${modelId} is not deployable: ${reasons.join(', ')}`,
      { modelId, reasons },
    );
  }
}

export class ModelOperationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_MODEL_OPERATION_FAILED;
  readonly httpStatus = 500;

  constructor(operation: string, reason: string) {
    super(`Model operation '${operation}' failed: ${reason}`, {
      operation,
      reason,
    });
  }
}

export class ModelAlreadyExistsError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_MODEL_ALREADY_EXISTS;
  readonly httpStatus = 409;

  constructor(name: string, version: string) {
    super(`Model '${name}' v${version} already exists`, { name, version });
  }
}
