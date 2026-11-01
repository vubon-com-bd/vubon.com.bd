/**
 * HttpErrorTranslator Tests
 * @module notification-service/test/unit/interfaces/errors
 */
import { describe, expect, it } from '@jest/globals';
import { ERROR_CODE, HTTP_STATUS } from '@vubon/shared-constants/common';
import {
  ApplicationError,
  ApplicationNotFoundError,
  ApplicationValidationError,
} from '@vubon/shared-kernel/application/errors';
import { HttpErrorTranslator } from '@interfaces/errors/http-errors.js';

// Concrete test subclasses
class FakeApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 400;
  constructor(message = 'app error') {
    super(message, { extra: 'info' });
  }
}

class FakeNotFound extends ApplicationNotFoundError {
  constructor(id = 'abc') {
    super('Notification', id);
  }
}

class FakeValidation extends ApplicationValidationError {
  constructor(message = 'validation failed') {
    super(message, 'email', [
      { field: 'email', message: 'invalid' },
    ]);
  }
}

describe('HttpErrorTranslator', () => {
  describe('toHttp()', () => {
    it('returns 500 for unknown error', () => {
      const result = HttpErrorTranslator.toHttp(new Error('boom'), '/test');
      expect(result.statusCode).toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
      expect(result.code).toBe(ERROR_CODE.SERVER_INTERNAL);
      expect(result.message).toBe('boom');
      expect(result.path).toBe('/test');
      expect(result.timestamp).toBeDefined();
    });

    it('returns 500 for non-Error thrown values', () => {
      const result = HttpErrorTranslator.toHttp('not-an-error');
      expect(result.statusCode).toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
      expect(result.message).toBe('Internal server error');
    });

    it('returns 422 for validation error', () => {
      const err = new FakeValidation();
      const result = HttpErrorTranslator.toHttp(err);
      expect(result.statusCode).toBe(HTTP_STATUS.UNPROCESSABLE_ENTITY);
      expect(result.code).toBe(ERROR_CODE.VAL_REQUIRED);
      expect(result.field).toBe('email');
      expect(result.details).toHaveLength(1);
    });

    it('returns 404 for not-found error', () => {
      const err = new FakeNotFound();
      const result = HttpErrorTranslator.toHttp(err, '/api/notifications/abc');
      expect(result.statusCode).toBe(HTTP_STATUS.NOT_FOUND);
      expect(result.path).toBe('/api/notifications/abc');
    });

    it('returns application-error-like shape (has httpStatus + code)', () => {
      const err = {
        httpStatus: 409,
        code: ERROR_CODE.VAL_DUPLICATE,
        message: 'conflict',
        context: { field: 'slug' },
      };
      const result = HttpErrorTranslator.toHttp(err);
      expect(result.statusCode).toBe(409);
      expect(result.code).toBe(ERROR_CODE.VAL_DUPLICATE);
      expect(result.context).toEqual({ field: 'slug' });
    });

    it('returns 400 for application-error with httpStatus', () => {
      const err = new FakeApplicationError();
      const result = HttpErrorTranslator.toHttp(err);
      expect(result.statusCode).toBe(400);
      expect(result.code).toBe(ERROR_CODE.SERVER_INTERNAL);
    });

    it('includes timestamp in every response', () => {
      const result = HttpErrorTranslator.toHttp(new Error('x'));
      expect(result.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    });

    it('handles undefined path', () => {
      const result = HttpErrorTranslator.toHttp(new Error('x'));
      expect(result.path).toBeUndefined();
    });
  });
});
