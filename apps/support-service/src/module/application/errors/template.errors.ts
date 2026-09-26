/**
 * Template application errors
 * @module support-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class TemplateNotFoundException extends ApplicationError {
  readonly code = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(public readonly templateId: string) {
    super(`Template not found: ${templateId}`, { templateId });
    this.name = 'TemplateNotFoundException';
  }
}

export class TemplateRenderException extends ApplicationError {
  readonly code = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 422;

  constructor(public readonly templateId: string, public readonly reason: string) {
    super(`Template render failed: ${reason}`, { templateId, reason });
    this.name = 'TemplateRenderException';
  }
}
