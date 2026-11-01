/**
 * Mapper Interface
 * @module shared-kernel/application/mappers
 *
 * Pure interface — কোনো external import নেই।
 */
export interface Mapper<TSource, TTarget> {
  toTarget(source: TSource): TTarget;
  toSource(target: TTarget): TSource;
}

export interface ListMapper<TSource, TTarget> {
  toTargetList(sources: readonly TSource[]): readonly TTarget[];
}

export interface AsyncMapper<TSource, TTarget> {
  toTarget(source: TSource): Promise<TTarget>;
  toSource(target: TTarget): Promise<TSource>;
}

export type MapperFn<TSource, TTarget> = (source: TSource) => TTarget;
