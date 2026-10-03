/**
 * Profile domain errors
 */
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export class ProfileNotFoundError extends NotFoundError {
  constructor(userId: string) {
    super('UserProfile', userId);
    this.name = 'ProfileNotFoundError';
  }
}

export class ProfileIncompleteError extends BusinessRuleError {
  constructor(missingFields: readonly string[]) {
    super(
      `Profile is incomplete. Missing: ${missingFields.join(', ')}`,
      'PROFILE_INCOMPLETE'
    );
    this.name = 'ProfileIncompleteError';
  }
}

export class InvalidVisibilityError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid visibility "${value}". Allowed: ${allowed.join(', ')}`, 'visibility');
    this.name = 'InvalidVisibilityError';
  }
}

export class AvatarTooLargeError extends ValidationError {
  constructor(sizeMB: number, maxMB: number) {
    super(`Avatar size ${sizeMB}MB exceeds maximum ${maxMB}MB`, 'avatar');
    this.name = 'AvatarTooLargeError';
  }
}

export class BioTooLongError extends ValidationError {
  constructor(length: number, max: number) {
    super(`Bio length ${length} exceeds maximum ${max}`, 'bio');
    this.name = 'BioTooLongError';
  }
}
