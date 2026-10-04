/**
 * Service Helpers
 * @module shared-kernel/application/services
 *
 * Uses shared-utils string helpers.
 */
import { camelCase, slugify } from '@vubon/shared-utils/common';

export function toCamelName(value: string): string {
  return camelCase(value);
}

export function toSlug(value: string): string {
  return slugify(value);
}

export function maskSensitive(value: string, visible = 4): string {
  if (value.length <= visible) return value;
  return '*'.repeat(value.length - visible) + value.slice(-visible);
}

export function buildCacheKey(...segments: readonly string[]): string {
  return segments
    .filter(Boolean)
    .map((s) => s.trim().toLowerCase())
    .join(':');
}
