/**
 * Base Mapper
 * @module shared-kernel/application/mappers
 *
 * Pure abstraction — কোনো external import নেই।
 */
export abstract class BaseMapper<TSource, TTarget> {
  abstract toTarget(source: TSource): TTarget;
  abstract toSource(target: TTarget): TSource;

  toTargetList(sources: readonly TSource[]): readonly TTarget[] {
    return sources.map((s) => this.toTarget(s));
  }

  toSourceList(targets: readonly TTarget[]): readonly TSource[] {
    return targets.map((t) => this.toSource(t));
  }
}

export abstract class OneWayMapper<TSource, TTarget> {
  abstract map(source: TSource): TTarget;
}
