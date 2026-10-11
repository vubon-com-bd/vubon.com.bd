/**
 * Notification template domain errors
 * @module notification-service/domain/errors
 */
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export class TemplateNotFoundError extends NotFoundError {
  constructor(templateId: string) {
    super('NotificationTemplate', templateId);
    this.name = 'TemplateNotFoundError';
  }
}

export class TemplateSlugExistsError extends ConflictError {
  constructor(slug: string) {
    super(`Template with slug "${slug}" already exists`, 'slug');
    this.name = 'TemplateSlugExistsError';
  }
}

export class InvalidTemplateTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid template type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidTemplateTypeError';
  }
}

export class InvalidTemplateStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid template status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidTemplateStatusError';
  }
}

export class InvalidTemplateCategoryError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid template category "${value}". Allowed: ${allowed.join(', ')}`, 'category');
    this.name = 'InvalidTemplateCategoryError';
  }
}

export class TemplateBodyTooLargeError extends ValidationError {
  constructor(size: number, max: number) {
    super(`Template body exceeds max size ${max} (got ${size})`, 'body');
    this.name = 'TemplateBodyTooLargeError';
  }
}

export class TemplateVariablesMismatchError extends BusinessRuleError {
  constructor(templateId: string, missing: readonly string[]) {
    super(
      `Template "${templateId}" is missing required variables: ${missing.join(', ')}`,
      'TEMPLATE_VARIABLES_MISMATCH',
      { templateId, missing },
    );
    this.name = 'TemplateVariablesMismatchError';
  }
}

export class TemplateDeprecatedError extends BusinessRuleError {
  constructor(templateId: string) {
    super(
      `Template "${templateId}" is deprecated and cannot be used`,
      'TEMPLATE_DEPRECATED',
      { templateId },
    );
    this.name = 'TemplateDeprecatedError';
  }
}
