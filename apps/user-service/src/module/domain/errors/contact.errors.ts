/**
 * Contact domain errors
 */
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export class ContactNotFoundError extends NotFoundError {
  constructor(contactId: string) {
    super('UserContact', contactId);
    this.name = 'ContactNotFoundError';
  }
}

export class ContactLimitExceededError extends BusinessRuleError {
  constructor(current: number, max: number) {
    super(`Contact limit exceeded: ${current}/${max}`, 'CONTACT_LIMIT_EXCEEDED');
    this.name = 'ContactLimitExceededError';
  }
}

export class InvalidContactValueError extends ValidationError {
  constructor(type: string, value: string) {
    super(`Invalid ${type} contact value: "${value}"`, 'contactValue');
    this.name = 'InvalidContactValueError';
  }
}

export class ContactAlreadyVerifiedError extends BusinessRuleError {
  constructor(contactId: string) {
    super(`Contact "${contactId}" is already verified`, 'CONTACT_ALREADY_VERIFIED');
    this.name = 'ContactAlreadyVerifiedError';
  }
}
