/**
 * Base Auth error.
 * All auth errors MUST extend AuthError.
 */
export class AuthError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly authCause: unknown;
  public readonly meta: Record<string, unknown> | undefined;

  constructor(
    message: string,
    options: {
      code?: string;
      statusCode?: number;
      cause?: unknown;
      meta?: Record<string, unknown>;
    } = {}
  ) {
    super(message);
    this.name = 'AuthError';
    this.code = options.code ?? 'AUTH_ERROR';
    this.statusCode = options.statusCode ?? 401;
    this.authCause = options.cause;
    this.meta = options.meta;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      meta: this.meta,
    };
  }
}
