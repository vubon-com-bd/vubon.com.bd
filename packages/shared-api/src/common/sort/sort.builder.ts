import type { QueryParams } from '../request/request.types';
import type { SortDirection, SortField, SortSpec } from './sort.types';

/** Fluent sort builder. */
export class SortBuilder {
  private fields: SortField[] = [];

  by(field: string, direction: SortDirection = 'asc'): this {
    this.fields.push({ field, direction });
    return this;
  }

  asc(field: string): this {
    return this.by(field, 'asc');
  }

  desc(field: string): this {
    return this.by(field, 'desc');
  }

  build(): readonly SortField[] {
    return [...this.fields];
  }
}

export function createSortBuilder(): SortBuilder {
  return new SortBuilder();
}

/** Serialize sort spec to query params. */
export function serializeSort(spec: SortSpec | undefined): QueryParams {
  if (!spec) return {};
  const fields = Array.isArray(spec) ? spec : [spec];
  if (fields.length === 0) return {};
  return {
    sort: fields.map((f) => (f.direction === 'desc' ? `-${f.field}` : f.field)).join(','),
  };
}

/** Parse `sort=field,-other` back into SortField[]. */
export function parseSort(value: string | undefined): readonly SortField[] {
  if (!value) return [];
  return value.split(',').map((token) => {
    const trimmed = token.trim();
    if (trimmed.startsWith('-')) {
      return { field: trimmed.slice(1), direction: 'desc' as const };
    }
    return { field: trimmed, direction: 'asc' as const };
  });
}
