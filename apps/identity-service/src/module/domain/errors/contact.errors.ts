/**
 * Contact Domain Errors
 * @module identity-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class ContactLimitReachedError extends BusinessRuleError {
  constructor(userId: string, limit: number) {
    super(`Max contacts (${limit}) reached for user "${userId}"`,
      'CONTACT_LIMIT_REACHED', { userId, limit });
    this.name = 'ContactLimitReachedError';
  }
}

export class ContactAlreadyExistsError extends ConflictError {
  constructor(value: string) {
    super(`Contact "${value}" already exists`, 'value');
    this.name = 'ContactAlreadyExistsError';
  }
}

export class ContactNotFoundError2 extends NotFoundError {
  constructor(contactId: string) {
    super('Contact', contactId);
    this.name = 'ContactNotFoundError2';
  }
}

export class InvalidContactValueError extends ValidationError {
  constructor(type: string, value: string) {
    super(`Invalid contact value for type "${type}": "${value}"`, 'value');
    this.name = 'InvalidContactValueError';
  }
}

export class ContactVerificationFailedError extends BusinessRuleError {
  constructor(contactId: string, reason: string) {
    super(`Contact "${contactId}" verification failed: ${reason}`,
      'CONTACT_VERIFICATION_FAILED', { contactId, reason });
    this.name = 'ContactVerificationFailedError';
  }
}

export class PrimaryContactRequiredError extends BusinessRuleError {
  constructor() {
    super('At least one primary contact is required',
      'PRIMARY_CONTACT_REQUIRED');
    this.name = 'PrimaryContactRequiredError';
  }
}
