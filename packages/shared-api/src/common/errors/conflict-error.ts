import { HttpError } from './http-error';

/** 409 — conflict (duplicate, version mismatch, etc.). */
export class ConflictError extends HttpError {
  constructor(options: {
    method: string;
    url: string;
    message?: string;
    responseBody?: unknown;
    cause?: unknown;
  }) {
    super(options.message ?? 'Resource conflict', {
      code: 'CONFLICT',
      status: 409,
      method: options.method,
      url: options.url,
      responseBody: options.responseBody,
      cause: options.cause,
    });
    this.name = 'ConflictError';
  }
}
