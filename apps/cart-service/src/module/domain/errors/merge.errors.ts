/**
 * Cart merge domain errors
 * @module cart-service/domain/errors
 */
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class MergeConflictError extends ConflictError {
  constructor(sourceCartId: string, targetCartId: string) {
    super(
      `Merge conflict between carts "${sourceCartId}" and "${targetCartId}"`,
      'merge',
    );
    this.name = 'MergeConflictError';
  }
}

export class InvalidMergeStrategyError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid merge strategy "${value}". Allowed: ${allowed.join(', ')}`, 'strategy');
    this.name = 'InvalidMergeStrategyError';
  }
}
