/**
 * Service Mappers
 * @module shared-kernel/application/services
 *
 * Pure functions — কোনো external import নেই।
 */
export function toArray<T>(value: T | readonly T[] | undefined | null): readonly T[] {
  if (value === null || value === undefined) return [];
  return Array.isArray(value) ? (value as readonly T[]) : [value as T];
}

export function toNullable<T>(value: T | undefined): T | null {
  return value ?? null;
}

export function toBoolean(value: unknown): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    return ['true', '1', 'yes', 'on'].includes(normalized);
  }
  if (typeof value === 'number') return value !== 0;
  return Boolean(value);
}
