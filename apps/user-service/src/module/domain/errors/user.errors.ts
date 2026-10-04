/**
 * User domain errors
 * @module user-service/domain/errors
 */
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export class UserNotFoundError extends NotFoundError {
  constructor(userId: string) {
    super('User', userId);
    this.name = 'UserNotFoundError';
  }
}

export class UserAlreadyExistsError extends ConflictError {
  constructor(email: string) {
    super(`User already exists with email "${email}"`, 'email');
    this.name = 'UserAlreadyExistsError';
  }
}

export class InvalidUserStatusError extends BusinessRuleError {
  constructor(current: string, attempted: string) {
    super(
      `Cannot transition user status from "${current}" to "${attempted}"`,
      'USER_STATUS_TRANSITION'
    );
    this.name = 'InvalidUserStatusError';
  }
}

export class UserSuspendedError extends BusinessRuleError {
  constructor(userId: string, reason?: string) {
    super(
      `User "${userId}" is suspended${reason ? `: ${reason}` : ''}`,
      'USER_SUSPENDED'
    );
    this.name = 'UserSuspendedError';
  }
}

export class UserDeletedError extends BusinessRuleError {
  constructor(userId: string) {
    super(`User "${userId}" has been deleted`, 'USER_DELETED');
    this.name = 'UserDeletedError';
  }
}
