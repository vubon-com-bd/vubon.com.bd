/**
 * Funnel Domain Errors
 * @module analytics-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class FunnelNotFoundError extends DomainError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 404;

  constructor(public readonly funnelId: string) {
    super(`Funnel "${funnelId}" not found`, { funnelId });
    this.name = 'FunnelNotFoundError';
  }
}

export class FunnelStepError extends DomainError {
  readonly code = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 422;

  constructor(
    public readonly funnelId: string,
    public readonly stepOrder: number,
    public readonly reason: string
  ) {
    super(`Funnel step error in "${funnelId}" at step ${stepOrder}: ${reason}`, {
      funnelId,
      stepOrder,
      reason,
    });
    this.name = 'FunnelStepError';
  }
}

export class InvalidFunnelOrderError extends DomainError {
  readonly code = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 422;

  constructor(
    public readonly funnelId: string,
    public readonly expectedOrder: number,
    public readonly actualOrder: number
  ) {
    super(
      `Funnel "${funnelId}" step order invalid: expected ${expectedOrder}, got ${actualOrder}`,
      { funnelId, expectedOrder, actualOrder }
    );
    this.name = 'InvalidFunnelOrderError';
  }
}

export class FunnelAnalysisError extends DomainError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 422;

  constructor(
    public readonly funnelId: string,
    public readonly reason: string
  ) {
    super(`Funnel analysis failed for "${funnelId}": ${reason}`, {
      funnelId,
      reason,
    });
    this.name = 'FunnelAnalysisError';
  }
}

export class FunnelStepCountMismatchError extends DomainError {
  readonly code = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 422;

  constructor(
    public readonly funnelId: string,
    public readonly expectedCount: number,
    public readonly actualCount: number
  ) {
    super(
      `Funnel "${funnelId}" step count mismatch: expected ${expectedCount}, got ${actualCount}`,
      { funnelId, expectedCount, actualCount }
    );
    this.name = 'FunnelStepCountMismatchError';
  }
}
