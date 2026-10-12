/**
 * Swagger Response Constants
 * @module identity-service/interfaces/swagger
 */
import { HttpStatus } from '@nestjs/common';

export const SWAGGER_RESPONSES = Object.freeze({
  OK: { status: HttpStatus.OK, description: 'Success' },
  CREATED: { status: HttpStatus.CREATED, description: 'Created' },
  NO_CONTENT: { status: HttpStatus.NO_CONTENT, description: 'No content' },
  BAD_REQUEST: { status: HttpStatus.BAD_REQUEST, description: 'Bad request' },
  UNAUTHORIZED: { status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' },
  FORBIDDEN: { status: HttpStatus.FORBIDDEN, description: 'Forbidden' },
  NOT_FOUND: { status: HttpStatus.NOT_FOUND, description: 'Not found' },
  CONFLICT: { status: HttpStatus.CONFLICT, description: 'Conflict' },
  UNPROCESSABLE: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Validation failed',
  },
  TOO_MANY: {
    status: HttpStatus.TOO_MANY_REQUESTS,
    description: 'Too many requests',
  },
  LOCKED: { status: HttpStatus.LOCKED, description: 'Account locked' },
  SERVER_ERROR: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  },
} as const);
