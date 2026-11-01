/**
 * Swagger Constants Tests
 * @module notification-service/test/unit/interfaces/swagger
 */
import { describe, expect, it } from '@jest/globals';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import {
  SWAGGER_RESPONSES,
  type SwaggerResponseKey,
} from '@interfaces/swagger/swagger.constants.js';

describe('SWAGGER_RESPONSES', () => {
  it('contains OK with status 200', () => {
    expect(SWAGGER_RESPONSES.OK.status).toBe(HTTP_STATUS.OK);
    expect(SWAGGER_RESPONSES.OK.description).toBe('Success');
  });

  it('contains CREATED with status 201', () => {
    expect(SWAGGER_RESPONSES.CREATED.status).toBe(HTTP_STATUS.CREATED);
  });

  it('contains BAD_REQUEST with status 400', () => {
    expect(SWAGGER_RESPONSES.BAD_REQUEST.status).toBe(HTTP_STATUS.BAD_REQUEST);
  });

  it('contains UNAUTHORIZED with status 401', () => {
    expect(SWAGGER_RESPONSES.UNAUTHORIZED.status).toBe(HTTP_STATUS.UNAUTHORIZED);
  });

  it('contains FORBIDDEN with status 403', () => {
    expect(SWAGGER_RESPONSES.FORBIDDEN.status).toBe(HTTP_STATUS.FORBIDDEN);
  });

  it('contains NOT_FOUND with status 404', () => {
    expect(SWAGGER_RESPONSES.NOT_FOUND.status).toBe(HTTP_STATUS.NOT_FOUND);
  });

  it('contains CONFLICT with status 409', () => {
    expect(SWAGGER_RESPONSES.CONFLICT.status).toBe(HTTP_STATUS.CONFLICT);
  });

  it('contains UNPROCESSABLE with status 422', () => {
    expect(SWAGGER_RESPONSES.UNPROCESSABLE.status).toBe(HTTP_STATUS.UNPROCESSABLE_ENTITY);
  });

  it('contains SERVER_ERROR with status 500', () => {
    expect(SWAGGER_RESPONSES.SERVER_ERROR.status).toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
  });

  it('is frozen (immutable)', () => {
    expect(Object.isFrozen(SWAGGER_RESPONSES)).toBe(true);
  });

  it('has all expected keys', () => {
    const keys: SwaggerResponseKey[] = [
      'OK', 'CREATED', 'BAD_REQUEST', 'UNAUTHORIZED', 'FORBIDDEN',
      'NOT_FOUND', 'CONFLICT', 'UNPROCESSABLE', 'SERVER_ERROR',
    ];
    for (const key of keys) {
      expect(SWAGGER_RESPONSES[key]).toBeDefined();
    }
  });
});
