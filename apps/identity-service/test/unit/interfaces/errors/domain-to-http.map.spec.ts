/**
 * AUTH_ERROR_HTTP_MAP tests
 */
import { describe, it, expect } from '@jest/globals';
import { HttpStatus } from '@nestjs/common';
import {
  AUTH_ERROR_HTTP_MAP,
  httpStatusForError,
} from '@interfaces/errors/domain-to-http.map.js';

describe('AUTH_ERROR_HTTP_MAP', () => {
  it('should have mapped auth errors', () => {
    expect(AUTH_ERROR_HTTP_MAP['AuthNotFoundError']).toBe(HttpStatus.NOT_FOUND);
    expect(AUTH_ERROR_HTTP_MAP['InvalidAuthTypeError']).toBe(
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
    expect(AUTH_ERROR_HTTP_MAP['MfaMaxAttemptsError']).toBe(
      HttpStatus.TOO_MANY_REQUESTS,
    );
  });

  it('should be frozen', () => {
    expect(Object.isFrozen(AUTH_ERROR_HTTP_MAP)).toBe(true);
  });
});

describe('httpStatusForError()', () => {
  it('should return 404 for known NotFound errors', () => {
    expect(httpStatusForError('AuthNotFoundError')).toBe(HttpStatus.NOT_FOUND);
  });

  it('should return 422 for known Validation errors', () => {
    expect(httpStatusForError('InvalidAuthTypeError')).toBe(
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  });

  it('should return 500 for unknown errors', () => {
    expect(httpStatusForError('UnknownError')).toBe(
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  });
});
