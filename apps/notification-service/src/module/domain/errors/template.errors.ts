/* istanbul ignore file -- pure error declarations */
/**
 * Template Domain Errors
 * @module notification-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class TemplateNotFoundError extends NotFoundError {
  constructor(templateId: string) {
    super('Template', templateId);
    this.name = 'TemplateNotFoundError';
  }
}

// ─── Conflict (409) ────────────────────────
export class TemplateNameAlreadyExistsError extends ConflictError {
  constructor(name: string) {
    super(`Template name "${name}" already exists`, 'name');
    this.name = 'TemplateNameAlreadyExistsError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidTemplateStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid template status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidTemplateStatusError';
  }
}

export class InvalidTemplateTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid template type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidTemplateTypeError';
  }
}

export class InvalidTemplateFormatError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid template format "${value}". Allowed: ${allowed.join(', ')}`, 'format');
    this.name = 'InvalidTemplateFormatError';
  }
}

export class InvalidTemplateContentError extends ValidationError {
  constructor(reason: string) {
    super(`Invalid template content: ${reason}`, 'content');
    this.name = 'InvalidTemplateContentError';
  }
}

export class InvalidTemplateVariableError extends ValidationError {
  constructor(variableName: string, reason: string) {
    super(`Invalid template variable "${variableName}": ${reason}`, 'variables');
    this.name = 'InvalidTemplateVariableError';
  }
}

// ─── Business Rule (400) ───────────────────
export class TemplateCannotBeUsedError extends BusinessRuleError {
  constructor(templateId: string, reason: string) {
    super(
      `Template "${templateId}" cannot be used: ${reason}`,
      'TEMPLATE_CANNOT_BE_USED',
      { templateId, reason },
    );
    this.name = 'TemplateCannotBeUsedError';
  }
}

export class TemplateMissingVariablesError extends BusinessRuleError {
  constructor(templateId: string, missing: readonly string[]) {
    super(
      `Template "${templateId}" missing required variables: ${missing.join(', ')}`,
      'TEMPLATE_MISSING_VARIABLES',
      { templateId, missing },
    );
    this.name = 'TemplateMissingVariablesError';
  }
}

export class TemplateRenderError extends BusinessRuleError {
  constructor(templateId: string, reason: string) {
    super(
      `Failed to render template "${templateId}": ${reason}`,
      'TEMPLATE_RENDER_FAILED',
      { templateId, reason },
    );
    this.name = 'TemplateRenderError';
  }
}
