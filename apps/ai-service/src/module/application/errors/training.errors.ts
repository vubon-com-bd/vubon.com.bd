import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class TrainingNotFoundError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_TRAINING_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(trainingId: string) {
    super(`Training job not found: ${trainingId}`, { trainingId });
  }
}

export class TrainingInProgressError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_TRAINING_IN_PROGRESS;
  readonly httpStatus = 409;

  constructor(modelId: string) {
    super(`Training already in progress for model: ${modelId}`, { modelId });
  }
}

export class InsufficientTrainingDataError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_TRAINING_INSUFFICIENT_DATA;
  readonly httpStatus = 400;

  constructor(required: number, provided: number) {
    super(`Insufficient training data: required ${required}, got ${provided}`, {
      required,
      provided,
    });
  }
}

export class TrainingFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_TRAINING_FAILED;
  readonly httpStatus = 500;

  constructor(trainingId: string, reason: string) {
    super(`Training ${trainingId} failed: ${reason}`, { trainingId, reason });
  }
}
