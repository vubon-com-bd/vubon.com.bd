/**
 * Merge Domain Errors
 * @module cart-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';

export class MergeSourceNotFoundError extends BusinessRuleError {
  constructor(sourceCartId: string) {
    super(`Merge source cart "${sourceCartId}" not found`, 'MERGE_SOURCE_NOT_FOUND', {
      sourceCartId,
    });
    this.name = 'MergeSourceNotFoundError';
  }
}

export class MergeTargetNotFoundError extends BusinessRuleError {
  constructor(targetCartId: string) {
    super(`Merge target cart "${targetCartId}" not found`, 'MERGE_TARGET_NOT_FOUND', {
      targetCartId,
    });
    this.name = 'MergeTargetNotFoundError';
  }
}

export class MergeSameCartError extends BusinessRuleError {
  constructor(cartId: string) {
    super(`Cannot merge cart "${cartId}" with itself`, 'MERGE_SAME_CART', { cartId });
    this.name = 'MergeSameCartError';
  }
}

export class MergeConflictError extends ConflictError {
  constructor(productId: string, sourceQty: number, targetQty: number) {
    super(
      `Merge conflict for "${productId}": source qty ${sourceQty}, target qty ${targetQty}`,
      'productId',
    );
    this.name = 'MergeConflictError';
  }
}

export class InvalidMergeStrategyError extends BusinessRuleError {
  constructor(strategy: string, allowed: readonly string[]) {
    super(
      `Invalid merge strategy "${strategy}". Allowed: ${allowed.join(', ')}`,
      'INVALID_MERGE_STRATEGY',
      { strategy, allowed },
    );
    this.name = 'InvalidMergeStrategyError';
  }
}

export class MergeLimitExceededError extends BusinessRuleError {
  constructor(conflicts: number, max: number) {
    super(
      `Merge conflicts ${conflicts} exceed max ${max}`,
      'MERGE_LIMIT_EXCEEDED',
      { conflicts, max },
    );
    this.name = 'MergeLimitExceededError';
  }
}
