/**
 * Attribute Application Errors
 * @module product-service/application/errors
 */
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors';
import { CommandError } from '@vubon/shared-kernel/application/errors';

export class AttributeNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(attributeId: string) {
    super('Attribute', attributeId);
    this.name = 'AttributeNotFoundApplicationError';
  }
}

export class AttributeValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'AttributeValidationError';
  }
}

export class AttributeAddError extends CommandError {
  constructor(reason: string) {
    super(`Attribute add failed: ${reason}`, 'AddAttribute');
    this.name = 'AttributeAddError';
  }
}

export class AttributeLimitExceededApplicationError extends CommandError {
  constructor(limit: number, current: number) {
    super(`Attribute limit exceeded: ${current}/${limit}`, 'AddAttribute');
    this.name = 'AttributeLimitExceededApplicationError';
  }
}
