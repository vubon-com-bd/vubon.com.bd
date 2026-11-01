import { ApiError } from './api-error';

/**
 * HTTP-level error (4xx / 5xx).
 * Used when a response came back but with a non-2xx status.
 */
export class HttpError extends ApiError {
  public readonly method: string;
  public readonly url: string;
  public readonly responseBody: unknown;

  constructor(
    message: string,
    options: {
      code?: string;
      status: number;
      method: string;
      url: string;
      responseBody?: unknown;
      cause?: unknown;
    }
  ) {
    super(message, {
      code: options.code ?? `HTTP_${options.status}`,
      status: options.status,
      cause: options.cause,
    });
    this.name = 'HttpError';
    this.method = options.method;
    this.url = options.url;
    this.responseBody = options.responseBody;
  }
}
