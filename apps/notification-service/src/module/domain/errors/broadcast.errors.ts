/* istanbul ignore file -- pure error declarations */
/**
 * Broadcast Domain Errors
 * @module notification-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class BroadcastNotFoundError extends NotFoundError {
  constructor(broadcastId: string) {
    super('Broadcast', broadcastId);
    this.name = 'BroadcastNotFoundError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidBroadcastStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid broadcast status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidBroadcastStatusError';
  }
}

export class InvalidBroadcastTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid broadcast type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidBroadcastTypeError';
  }
}

export class InvalidBroadcastAudienceError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid broadcast audience "${value}". Allowed: ${allowed.join(', ')}`, 'audience');
    this.name = 'InvalidBroadcastAudienceError';
  }
}

// ─── Business Rule (400) ───────────────────
export class BroadcastRequiresApprovalError extends BusinessRuleError {
  constructor(broadcastId: string) {
    super(
      `Broadcast "${broadcastId}" requires approval before sending`,
      'BROADCAST_REQUIRES_APPROVAL',
      { broadcastId },
    );
    this.name = 'BroadcastRequiresApprovalError';
  }
}

export class BroadcastRecipientLimitExceededError extends BusinessRuleError {
  constructor(count: number, max: number) {
    super(
      `Broadcast recipient count ${count} exceeds maximum ${max}`,
      'BROADCAST_RECIPIENT_LIMIT_EXCEEDED',
      { count, max },
    );
    this.name = 'BroadcastRecipientLimitExceededError';
  }
}

export class BroadcastCannotBeCancelledError extends BusinessRuleError {
  constructor(broadcastId: string, status: string) {
    super(
      `Broadcast "${broadcastId}" cannot be cancelled in status "${status}"`,
      'BROADCAST_CANNOT_BE_CANCELLED',
      { broadcastId, status },
    );
    this.name = 'BroadcastCannotBeCancelledError';
  }
}

export class BroadcastInProgressError extends BusinessRuleError {
  constructor(broadcastId: string) {
    super(
      `Broadcast "${broadcastId}" is already in progress`,
      'BROADCAST_IN_PROGRESS',
      { broadcastId },
    );
    this.name = 'BroadcastInProgressError';
  }
}
