/**
 * Specification Interface
 * @module shared-kernel/domain/interfaces
 *
 * Pure interface — কোনো external import নেই।
 *
 * ⚠️ Note: CompositeSpecificationLike — কারণ base/specification-এ CompositeSpecification class আছে।
 */
export interface SpecificationLike<T> {
  isSatisfiedBy(candidate: T): boolean;
}

export interface QuerySpecification<T> extends SpecificationLike<T> {
  toQuery(): Readonly<Record<string, unknown>>;
}

export interface CompositeSpecificationLike<T> extends SpecificationLike<T> {
  and(other: SpecificationLike<T>): CompositeSpecificationLike<T>;
  or(other: SpecificationLike<T>): CompositeSpecificationLike<T>;
  not(): CompositeSpecificationLike<T>;
}
