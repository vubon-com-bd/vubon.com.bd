/**
 * HttpErrorTranslator — unit tests
 * @module payment-service/test/unit/interfaces/errors
 */
import { describe, it, expect } from '@jest/globals';
import { HttpErrorTranslator } from '@interfaces/errors/http-errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

describe('HttpErrorTranslator', () => {
  it('returns 500 for generic Error', () => {
    const res = HttpErrorTranslator.toHttp(new Error('boom'), '/path');
    expect(res.statusCode).toBe(500);
    expect(res.code).toBe(ERROR_CODE.SERVER_INTERNAL);
    expect(res.message).toBe('boom');
    expect(res.path).toBe('/path');
    expect(res.timestamp).toBeDefined();
  });

  it('returns 500 for non-Error', () => {
    const res = HttpErrorTranslator.toHttp('string error');
    expect(res.statusCode).toBe(500);
    expect(res.message).toBe('Internal server error');
  });

  it('handles null/undefined without throwing', () => {
    expect(() => HttpErrorTranslator.toHttp(null)).not.toThrow();
    expect(() => HttpErrorTranslator.toHttp(undefined)).not.toThrow();
  });

  it('produces ISO timestamp', () => {
    const res = HttpErrorTranslator.toHttp(new Error('x'));
    expect(new Date(res.timestamp).toISOString()).toBe(res.timestamp);
  });
});
