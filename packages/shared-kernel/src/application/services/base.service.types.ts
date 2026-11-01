/**
 * Base Service Types
 * @module shared-kernel/application/services
 *
 * Pure types — কোনো external import নেই।
 */
export interface ServiceContext {
  readonly userId?: string;
  readonly tenantId?: string;
  readonly correlationId?: string;
  readonly requestId?: string;
}

export interface ServiceResult<TOutput = unknown> {
  readonly success: boolean;
  readonly data?: TOutput;
  readonly error?: string;
}

export type ServiceMethod = (...args: readonly unknown[]) => unknown;
