/**
 * HttpErrorTranslator tests
 * @module identity-service/test/unit/interfaces/errors
 */
import { describe, it, expect } from '@jest/globals';
import { HttpStatus, HttpException } from '@nestjs/common';
import {
  HttpErrorTranslator,
  type HttpErrorResponse,
} from '@interfaces/errors/http-errors.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

describe('HttpErrorTranslator', () => {
  describe('toResponse()', () => {
    it('should map ValidationError → 422', () => {
      const err = new ValidationError('Invalid email', 'email');
      const r = HttpErrorTranslator.toResponse(err, '/test');

      expect(r.success).toBe(false);
      expect(r.statusCode).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
      expect(r.message).toBe('Invalid email');
      expect(r.field).toBe('email');
      expect(r.path).toBe('/test');
      expect(r.timestamp).toBeDefined();
    });

    it('should map NotFoundError → 404', () => {
      const err = new NotFoundError('Auth', 'abc');
      const r = HttpErrorTranslator.toResponse(err);
      expect(r.statusCode).toBe(HttpStatus.NOT_FOUND);
    });

    it('should map ConflictError → 409', () => {
      const err = new ConflictError('Already exists', 'email');
      const r = HttpErrorTranslator.toResponse(err);
      expect(r.statusCode).toBe(HttpStatus.CONFLICT);
      expect(r.field).toBe('email');
    });

    it('should map BusinessRuleError → 400', () => {
      const err = new BusinessRuleError('Invalid transition', 'RULE_X');
      const r = HttpErrorTranslator.toResponse(err);
      expect(r.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('should map HttpException', () => {
      const err = new HttpException('Custom', HttpStatus.I_AM_A_TEAPOT);
      const r = HttpErrorTranslator.toResponse(err);
      expect(r.statusCode).toBe(HttpStatus.I_AM_A_TEAPOT);
      expect(r.code).toBe('HTTP_418');
    });

    it('should map unknown error → 500', () => {
      const r = HttpErrorTranslator.toResponse(new Error('Boom'));
      expect(r.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(r.code).toBe('SERVER_INTERNAL');
      expect(r.message).toBe('Internal server error');
    });

    it('should map non-Error throw → 500', () => {
      const r = HttpErrorTranslator.toResponse('raw string');
      expect(r.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    });
  });

  describe('toException()', () => {
    it('should wrap response in HttpException', () => {
      const err = new ValidationError('Bad', 'x');
      const ex = HttpErrorTranslator.toException(err);
      expect(ex).toBeInstanceOf(HttpException);
      expect(ex.getStatus()).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
    });
  });

  describe('isSafeToExpose()', () => {
    it('should return true for domain errors', () => {
      expect(HttpErrorTranslator.isSafeToExpose(new ValidationError('x'))).toBe(true);
      expect(HttpErrorTranslator.isSafeToExpose(new NotFoundError('X'))).toBe(true);
    });

    it('should return true for HttpException', () => {
      expect(HttpErrorTranslator.isSafeToExpose(new HttpException('x', 400))).toBe(true);
    });

    it('should return false for generic Error', () => {
      expect(HttpErrorTranslator.isSafeToExpose(new Error('boom'))).toBe(false);
    });
  });
});
