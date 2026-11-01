import { HttpError } from './http-error';

/** 401 / 403 — authentication or authorization failure. */
export class AuthError extends HttpError {
  constructor(
    message: string,
    options: {
      status: 401 | 403;
      method: string;
      url: string;
      responseBody?: unknown;
      cause?: unknown;
    }
  ) {
    super(message, {
      code: options.status === 401 ? 'UNAUTHORIZED' : 'FORBIDDEN',
      status: options.status,
      method: options.method,
      url: options.url,
      responseBody: options.responseBody,
      cause: options.cause,
    });
    this.name = 'AuthError';
  }
}
