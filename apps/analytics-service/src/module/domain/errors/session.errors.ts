/**
 * Session Domain Errors
 * @module analytics-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class SessionNotFoundError extends DomainError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 404;

  constructor(public readonly sessionId: string) {
    super(`Session "${sessionId}" not found`, { sessionId });
    this.name = 'SessionNotFoundError';
  }
}

export class SessionAlreadyEndedError extends DomainError {
  readonly code = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 422;

  constructor(public readonly sessionId: string) {
    super(`Session "${sessionId}" has already ended`, { sessionId });
    this.name = 'SessionAlreadyEndedError';
  }
}

export class InvalidSessionDurationError extends DomainError {
  readonly code = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 422;

  constructor(
    public readonly sessionId: string,
    public readonly durationSeconds: number,
    public readonly maxSeconds: number
  ) {
    super(
      `Invalid session duration for "${sessionId}": ${durationSeconds}s (max ${maxSeconds}s)`,
      { sessionId, durationSeconds, maxSeconds }
    );
    this.name = 'InvalidSessionDurationError';
  }
}

export class SessionTrackAfterEndError extends DomainError {
  readonly code = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 422;

  constructor(public readonly sessionId: string) {
    super(`Cannot track events on ended session "${sessionId}"`, { sessionId });
    this.name = 'SessionTrackAfterEndError';
  }
}

export class SessionEndBeforeStartError extends DomainError {
  readonly code = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 422;

  constructor(
    public readonly sessionId: string,
    public readonly startMs: number,
    public readonly endMs: number
  ) {
    super(
      `Session "${sessionId}" end time (${endMs}) is before start time (${startMs})`,
      { sessionId, startMs, endMs }
    );
    this.name = 'SessionEndBeforeStartError';
  }
}
