/**
 * Domain Error Types
 * @module shared-types/common/errors
 *
 * Business rule violation ইত্যাদির জন্য।
 */

import type { ErrorCode } from './base-error.types';

export interface DomainError {
  readonly name: 'DomainError';
  readonly code: ErrorCode | string;
  readonly message: string;
  readonly aggregateId?: string;
  readonly aggregateType?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface BusinessRuleViolation extends DomainError {
  readonly rule: string;
  readonly violatedAt: string;
}

export interface EntityNotFoundError extends DomainError {
  readonly entityType: string;
  readonly entityId: string;
}

export interface DuplicateEntityError extends DomainError {
  readonly entityType: string;
  readonly conflictingField: string;
  readonly conflictingValue: unknown;
}
