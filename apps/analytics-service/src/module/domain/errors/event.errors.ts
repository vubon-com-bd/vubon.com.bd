/**
 * Event Domain Errors
 * @module analytics-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class EventNotFoundError extends DomainError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 404;

  constructor(public readonly eventId: string) {
    super(`Event "${eventId}" not found`, { eventId });
    this.name = 'EventNotFoundError';
  }
}

export class InvalidEventPayloadError extends DomainError {
  readonly code = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 422;

  constructor(
    public readonly reason: string,
    public readonly eventName?: string
  ) {
    super(
      `Invalid event payload${eventName ? ` for "${eventName}"` : ''}: ${reason}`,
      { reason, eventName }
    );
    this.name = 'InvalidEventPayloadError';
  }
}

export class DuplicateEventError extends DomainError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(public readonly eventId: string) {
    super(`Event "${eventId}" already exists`, { eventId });
    this.name = 'DuplicateEventError';
  }
}

export class EventRateLimitError extends DomainError {
  readonly code = ERROR_CODE.RATE_LIMIT_EXCEEDED;
  readonly httpStatus = 429;

  constructor(
    public readonly source: string,
    public readonly limit: number
  ) {
    super(`Rate limit exceeded for source "${source}" (max ${limit}/s)`, {
      source,
      limit,
    });
    this.name = 'EventRateLimitError';
  }
}

export class EventTooOldError extends DomainError {
  readonly code = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 422;

  constructor(
    public readonly ageMs: number,
    public readonly maxAgeMs: number
  ) {
    super(`Event too old (age ${ageMs}ms, max ${maxAgeMs}ms)`, {
      ageMs,
      maxAgeMs,
    });
    this.name = 'EventTooOldError';
  }
}

export class BotEventRejectedError extends DomainError {
  readonly code = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 403;

  constructor(public readonly userAgent: string) {
    super(`Bot traffic rejected`, { userAgent });
    this.name = 'BotEventRejectedError';
  }
}
