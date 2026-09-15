/**
 * Base API error.
 * All errors thrown by the API layer MUST extend ApiError.
 */
export class ApiError extends Error {
  public readonly code: string;
  public readonly status: number | undefined;
  public readonly apiCause: unknown;
  public readonly meta: Record<string, unknown> | undefined;

  constructor(
    message: string,
    options: {
      code?: string;
      status?: number;
      cause?: unknown;
      meta?: Record<string, unknown>;
    } = {}
  ) {
    super(message);
    this.name = 'ApiError';
    this.code = options.code ?? 'API_ERROR';
    this.status = options.status;
    this.apiCause = options.cause;
    this.meta = options.meta;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      status: this.status,
      meta: this.meta,
    };
  }
}
