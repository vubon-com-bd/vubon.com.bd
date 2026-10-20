/**
 * HttpErrorTranslator Tests
 * @module order-service/test/unit/interfaces/errors
 */
import { HttpErrorTranslator } from '@interfaces/errors/http-errors.js';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { AuthorizationError } from '@vubon/shared-kernel/application/errors/authorization.error';

describe('HttpErrorTranslator', () => {
  describe('toHttp', () => {
    it('should translate ApplicationValidationError to 422', () => {
      const err = new ApplicationValidationError('Invalid email', 'email');
      const result = HttpErrorTranslator.toHttp(err, '/orders');
      expect(result.statusCode).toBe(422);
      expect(result.message).toBe('Invalid email');
      expect(result.field).toBe('email');
      expect(result.path).toBe('/orders');
      expect(result.timestamp).toBeDefined();
    });

    it('should translate ApplicationNotFoundError to 404', () => {
      const err = new ApplicationNotFoundError('Order', 'order-123');
      const result = HttpErrorTranslator.toHttp(err, '/orders/order-123');
      expect(result.statusCode).toBe(404);
      expect(result.message).toContain('Order');
      expect(result.path).toBe('/orders/order-123');
    });

    it('should translate AuthorizationError to 403', () => {
      const err = new AuthorizationError('Access denied', 'order:view');
      const result = HttpErrorTranslator.toHttp(err);
      expect(result.statusCode).toBe(403);
      expect(result.message).toBe('Access denied');
    });

    it('should handle generic Error as 500', () => {
      const err = new Error('Something failed');
      const result = HttpErrorTranslator.toHttp(err, '/orders');
      expect(result.statusCode).toBe(500);
      expect(result.message).toBe('Internal server error');
      expect(result.path).toBe('/orders');
    });

    it('should handle unknown (non-Error) as 500', () => {
      const result = HttpErrorTranslator.toHttp('weird');
      expect(result.statusCode).toBe(500);
      expect(result.message).toBe('Internal server error');
    });

    it('should include ISO timestamp', () => {
      const err = new Error('test');
      const result = HttpErrorTranslator.toHttp(err);
      expect(() => new Date(result.timestamp)).not.toThrow();
      expect(result.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    });

    it('should include error code in response', () => {
      const err = new ApplicationValidationError('Test', 'field');
      const result = HttpErrorTranslator.toHttp(err);
      expect(result.code).toBeDefined();
      expect(typeof result.code).toBe('string');
      expect(result.code.length).toBeGreaterThan(0);
    });

    it('should propagate details array when present', () => {
      const err = new ApplicationValidationError('Multiple errors', undefined, [
        { field: 'email', message: 'Invalid' },
        { field: 'phone', message: 'Invalid' },
      ]);
      const result = HttpErrorTranslator.toHttp(err);
      expect(result.details).toBeDefined();
      expect(result.details?.length).toBe(2);
    });
  });
});
