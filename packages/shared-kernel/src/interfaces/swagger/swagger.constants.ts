/**
 * Swagger Constants
 * @module shared-kernel/interfaces/swagger
 */
import { HTTP_STATUS } from '@vubon/shared-constants/common';

export const SWAGGER_RESPONSES = Object.freeze({
  OK: { status: HTTP_STATUS.OK, description: 'Success' },
  CREATED: { status: HTTP_STATUS.CREATED, description: 'Created' },
  BAD_REQUEST: { status: HTTP_STATUS.BAD_REQUEST, description: 'Bad request' },
  UNAUTHORIZED: { status: HTTP_STATUS.UNAUTHORIZED, description: 'Unauthorized' },
  FORBIDDEN: { status: HTTP_STATUS.FORBIDDEN, description: 'Forbidden' },
  NOT_FOUND: { status: HTTP_STATUS.NOT_FOUND, description: 'Not found' },
  UNPROCESSABLE: {
    status: HTTP_STATUS.UNPROCESSABLE_ENTITY,
    description: 'Unprocessable entity',
  },
  SERVER_ERROR: {
    status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  },
} as const);

export type SwaggerResponseKey = keyof typeof SWAGGER_RESPONSES;
