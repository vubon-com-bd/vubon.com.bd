import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class InsightNotFoundError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_INSIGHT_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(insightId: string) {
    super(`Insight not found: ${insightId}`, { insightId });
  }
}

export class InsightGenerationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_INSIGHT_GENERATION_FAILED;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Insight generation failed: ${reason}`, { reason });
  }
}

export class AnomalyDetectionFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_ANOMALY_DETECTION_FAILED;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Anomaly detection failed: ${reason}`, { reason });
  }
}
