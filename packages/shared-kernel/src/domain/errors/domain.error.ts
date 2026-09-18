/**
 * Base Domain Error
 * @module shared-kernel/domain/errors
 *
 * Values আসে shared-constants/common/error.constants থেকে (type only)।
 */
import type { ErrorCodeType } from '@vubon/shared-constants/common';

export abstract class DomainError extends Error {
  abstract readonly code: ErrorCodeType;
  abstract readonly httpStatus: number;
  readonly context?: Readonly<Record<string, unknown>>;

  protected constructor(message: string, context?: Readonly<Record<string, unknown>>) {
    super(message);
    this.name = new.target.name;
    this.context = context;
    Object.setPrototypeOf(this, new.target.prototype);
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toJSON(): Readonly<Record<string, unknown>> {
    return {
      name: this.name,
      code: this.code,
      httpStatus: this.httpStatus,
      message: this.message,
      context: this.context,
    };
  }
}
