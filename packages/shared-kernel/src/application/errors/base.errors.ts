/**
 * Base Error
 * বেস এরর ক্লাস
 */
export class BaseError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly timestamp: string;

  constructor(message: string, code: string = 'INTERNAL_ERROR', statusCode: number = 500) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();
    Object.setPrototypeOf(this, BaseError.prototype);
  }
}

/**
 * Domain Error
 * ডোমেইন এরর
 */
export class DomainError extends BaseError {
  constructor(message: string, code: string = 'DOMAIN_ERROR', statusCode: number = 400) {
    super(message, code, statusCode);
  }
}

/**
 * Application Error
 * অ্যাপ্লিকেশন এরর
 */
export class ApplicationError extends BaseError {
  constructor(message: string, code: string = 'APPLICATION_ERROR', statusCode: number = 500) {
    super(message, code, statusCode);
  }
}

/**
 * Not Found Error
 * নট ফাউন্ড এরর
 */
export class NotFoundError extends BaseError {
  constructor(entity: string = 'Resource', id?: string) {
    const message = id ? `${entity} with id ${id} not found` : `${entity} not found`;
    super(message, 'NOT_FOUND', 404);
  }
}

/**
 * Validation Error
 * ভ্যালিডেশন এরর
 */
export class ValidationError extends BaseError {
  public readonly errors: string[];

  constructor(errors: string[] | string) {
    const errorList = Array.isArray(errors) ? errors : [errors];
    super(`Validation failed: ${errorList.join(', ')}`, 'VALIDATION_ERROR', 422);
    this.errors = errorList;
  }
}

/**
 * Unauthorized Error
 * অনঅথরাইজড এরর
 */
export class UnauthorizedError extends BaseError {
  constructor(message: string = 'Authentication required') {
    super(message, 'UNAUTHORIZED', 401);
  }
}

/**
 * Forbidden Error
 * ফরবিডেন এরর
 */
export class ForbiddenError extends BaseError {
  constructor(message: string = 'Access denied') {
    super(message, 'FORBIDDEN', 403);
  }
}

/**
 * Conflict Error
 * কনফ্লিক্ট এরর
 */
export class ConflictError extends BaseError {
  constructor(message: string = 'Resource already exists') {
    super(message, 'CONFLICT', 409);
  }
}

/**
 * Business Error
 * বিজনেস এরর
 */
export class BusinessError extends BaseError {
  constructor(message: string, code: string = 'BUSINESS_ERROR', statusCode: number = 400) {
    super(message, code, statusCode);
  }
}

/**
 * External Service Error
 * এক্সটার্নাল সার্ভিস এরর
 */
export class ExternalServiceError extends BaseError {
  constructor(service: string, message: string = 'External service error') {
    super(`${service}: ${message}`, 'EXTERNAL_SERVICE_ERROR', 503);
  }
}
