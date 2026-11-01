/**
 * Abandoned Cart Domain Errors
 * @module cart-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class AbandonedCartNotFoundError extends NotFoundError {
  constructor(id: string) {
    super('AbandonedCart', id);
    this.name = 'AbandonedCartNotFoundError';
  }
}

export class AbandonedCartAlreadyRecoveredError extends ConflictError {
  constructor(id: string) {
    super(`Abandoned cart "${id}" already recovered`, 'id');
    this.name = 'AbandonedCartAlreadyRecoveredError';
  }
}

export class InvalidAbandonedCartStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(
      `Invalid abandoned cart status "${value}". Allowed: ${allowed.join(', ')}`,
      'status',
    );
    this.name = 'InvalidAbandonedCartStatusError';
  }
}

export class InvalidReminderChannelError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(
      `Invalid reminder channel "${value}". Allowed: ${allowed.join(', ')}`,
      'channel',
    );
    this.name = 'InvalidReminderChannelError';
  }
}

export class AbandonedCartNotRecoverableError extends BusinessRuleError {
  constructor(id: string, status: string) {
    super(
      `Abandoned cart "${id}" not recoverable in status "${status}"`,
      'ABANDONED_CART_NOT_RECOVERABLE',
      { id, status },
    );
    this.name = 'AbandonedCartNotRecoverableError';
  }
}

export class ReminderLimitExceededError extends BusinessRuleError {
  constructor(id: string, max: number) {
    super(
      `Reminder limit exceeded for abandoned cart "${id}": max ${max}`,
      'REMINDER_LIMIT_EXCEEDED',
      { id, max },
    );
    this.name = 'ReminderLimitExceededError';
  }
}

export class AbandonedCartThresholdNotMetError extends BusinessRuleError {
  constructor(id: string, requiredHours: number, currentHours: number) {
    super(
      `Abandoned cart "${id}" threshold not met: required ${requiredHours}h, current ${currentHours}h`,
      'ABANDONED_CART_THRESHOLD_NOT_MET',
      { id, requiredHours, currentHours },
    );
    this.name = 'AbandonedCartThresholdNotMetError';
  }
}
