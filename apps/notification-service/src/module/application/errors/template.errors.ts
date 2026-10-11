/**
 * Template Application Errors
 * @module notification-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';

export class TemplateNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(templateId: string) {
    super('NotificationTemplate', templateId);
    this.name = 'TemplateNotFoundApplicationError';
  }
}

export class TemplateSlugConflictError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;
  constructor(slug: string) {
    super(`Template with slug "${slug}" already exists`, { slug });
    this.name = 'TemplateSlugConflictError';
  }
}

export class TemplateRenderError extends CommandError {
  constructor(templateId: string, reason: string, missingVariables?: readonly string[]) {
    super(`Template render failed for "${templateId}": ${reason}`, 'TemplateRender', undefined);
    void missingVariables;
    this.name = 'TemplateRenderError';
  }
}

export class TemplateNotUsableError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 422;
  constructor(templateId: string, status: string) {
    super(`Template "${templateId}" is not usable (status: ${status})`, { templateId, status });
    this.name = 'TemplateNotUsableError';
  }
}

export class TemplateValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'TemplateValidationError';
  }
}
