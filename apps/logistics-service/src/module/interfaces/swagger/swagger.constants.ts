/**
 * Swagger response constants
 * @module logistics-service/interfaces/swagger
 */
export const SWAGGER_RESPONSES = Object.freeze({
  OK: { status: 200, description: 'Success' },
  CREATED: { status: 201, description: 'Created' },
  BAD_REQUEST: { status: 400, description: 'Bad request' },
  UNAUTHORIZED: { status: 401, description: 'Unauthorized' },
  FORBIDDEN: { status: 403, description: 'Forbidden' },
  NOT_FOUND: { status: 404, description: 'Not found' },
  CONFLICT: { status: 409, description: 'Conflict' },
  UNPROCESSABLE: { status: 422, description: 'Validation failed' },
  SERVER_ERROR: { status: 500, description: 'Internal server error' },
} as const);
