import type { QueryParams } from '../request/request.types';
import type { FilterCondition, FilterShape } from './filter.types';

/**
 * Serialize a FilterShape into query params using `field[op]=value` syntax.
 * Arrays are joined by comma.
 */
export function serializeFilters(shape: FilterShape | undefined): QueryParams {
  if (!shape) return {};
  const out: QueryParams = {};
  for (const [field, condition] of Object.entries(shape)) {
    for (const [op, value] of Object.entries(condition) as [
      keyof FilterCondition,
      FilterCondition[keyof FilterCondition],
    ][]) {
      if (value === undefined || value === null) continue;
      const key = op === 'eq' ? field : `${field}[${op}]`;
      out[key] = Array.isArray(value) ? value.join(',') : (value as string | number | boolean);
    }
  }
  return out;
}

/** Deserialize `field[op]=value` back into a FilterShape (best-effort). */
export function deserializeFilters(params: QueryParams): FilterShape {
  const shape: Record<string, FilterCondition> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    const m = /^([^\[]+)(?:\[([^\]]+)\])?$/.exec(key);
    if (!m || !m[1]) continue;
    const field = m[1];
    const op = (m[2] ?? 'eq') as keyof FilterCondition;
    const existing = shape[field] ?? {};
    (existing as Record<string, unknown>)[op] = value;
    shape[field] = existing;
  }
  return shape;
}
