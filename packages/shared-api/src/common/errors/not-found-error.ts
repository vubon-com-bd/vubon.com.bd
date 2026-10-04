import { HttpError } from './http-error';

/** 404 — resource not found. */
export class NotFoundError extends HttpError {
  constructor(options: { method: string; url: string; responseBody?: unknown; cause?: unknown }) {
    super('Resource not found', {
      code: 'NOT_FOUND',
      status: 404,
      method: options.method,
      url: options.url,
      responseBody: options.responseBody,
      cause: options.cause,
    });
    this.name = 'NotFoundError';
  }
}
