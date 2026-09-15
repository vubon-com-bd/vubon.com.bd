import { HttpError } from './http-error';

/** 5xx — server-side failure. */
export class ServerError extends HttpError {
  constructor(options: {
    method: string;
    url: string;
    status: number;
    responseBody?: unknown;
    cause?: unknown;
  }) {
    super(`Server error (${options.status})`, {
      code: 'SERVER_ERROR',
      status: options.status,
      method: options.method,
      url: options.url,
      responseBody: options.responseBody,
      cause: options.cause,
    });
    this.name = 'ServerError';
  }
}
