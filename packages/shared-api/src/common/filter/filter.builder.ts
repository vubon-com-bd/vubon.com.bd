import type { FilterCondition, FilterShape, FilterSpec } from './filter.types';

/**
 * Fluent filter builder.
 * Produces a FilterShape; serialization is separate.
 */
export class FilterBuilder {
  private readonly shape: FilterShape = {};

  where(field: string, condition: FilterCondition): this {
    this.shape[field] = { ...(this.shape[field] ?? {}), ...condition };
    return this;
  }

  eq(field: string, value: FilterCondition['eq']): this {
    return this.where(field, { eq: value });
  }

  in(field: string, values: NonNullable<FilterCondition['in']>): this {
    return this.where(field, { in: values });
  }

  contains(field: string, value: string): this {
    return this.where(field, { contains: value });
  }

  build(): FilterShape {
    return { ...this.shape };
  }
}

export function createFilterBuilder(): FilterBuilder {
  return new FilterBuilder();
}

/** Convert ad-hoc specs into a FilterShape. */
export function specsToShape(specs: readonly FilterSpec[]): FilterShape {
  const shape: Record<string, FilterCondition> = {};
  for (const spec of specs) {
    const existing = shape[spec.field] ?? {};
    shape[spec.field] = { ...existing, [spec.operator]: spec.value };
  }
  return shape;
}
