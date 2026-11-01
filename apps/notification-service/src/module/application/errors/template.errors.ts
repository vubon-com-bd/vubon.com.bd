/**
 * Template Application Errors
 * @module notification-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import {
  ApplicationError,
  ApplicationNotFoundError,
  ApplicationValidationError,
  CommandError,
  QueryError,
} from '@vubon/shared-kernel/application/errors';

export class TemplateNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(templateId: string) {
    super('Template', templateId);
    this.name = 'TemplateNotFoundApplicationError';
  }
}

export class TemplateValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'TemplateValidationError';
  }
}

export class TemplateCreationError extends CommandError {
  constructor(reason: string) {
    super(`Template creation failed: ${reason}`, 'CreateTemplate');
    this.name = 'TemplateCreationError';
  }
}

export class TemplateUpdateError extends CommandError {
  constructor(templateId: string, reason: string) {
    super(`Template "${templateId}" update failed: ${reason}`, 'UpdateTemplate');
    this.name = 'TemplateUpdateError';
  }
}

export class TemplateRenderApplicationError extends CommandError {
  constructor(templateId: string, reason: string) {
    super(`Template "${templateId}" render failed: ${reason}`, 'RenderTemplate');
    this.name = 'TemplateRenderApplicationError';
  }
}

export class TemplateSlugConflictError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(slug: string) {
    super(`Template slug "${slug}" already exists`, { slug });
    this.name = 'TemplateSlugConflictError';
  }
}

export class TemplateQueryError extends QueryError {
  constructor(reason: string) {
    super(`Template query failed: ${reason}`, 'TemplateQuery');
    this.name = 'TemplateQueryError';
  }
}
