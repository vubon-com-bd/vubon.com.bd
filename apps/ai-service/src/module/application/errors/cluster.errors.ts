import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class ClusteringFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_CLUSTER_FAILED;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Clustering failed: ${reason}`, { reason });
  }
}

export class InsufficientClusterDataError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_CLUSTER_INSUFFICIENT_DATA;
  readonly httpStatus = 400;

  constructor(required: number, provided: number) {
    super(`Insufficient data for clustering: need ${required}, got ${provided}`, {
      required,
      provided,
    });
  }
}

export class InvalidKError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_CLUSTER_INVALID_K;
  readonly httpStatus = 400;

  constructor(k: number, max: number) {
    super(`Invalid k for clustering: ${k} (max ${max})`, { k, max });
  }
}
