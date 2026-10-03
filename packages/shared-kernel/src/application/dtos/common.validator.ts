/**
 * Common DTO Validators
 * @module shared-kernel/application/dtos
 *
 * Uses shared-utils validation helpers।
 */
import { isEmpty } from '@vubon/shared-utils/common';

export function requireNonEmpty(value: unknown, field: string): void {
  if (isEmpty(value)) {
    throw new Error(`${field} is required`);
  }
}

export function requireString(value: unknown, field: string): asserts value is string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`${field} must be a non-empty string`);
  }
}

export function requireNumber(value: unknown, field: string): asserts value is number {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new Error(`${field} must be a valid number`);
  }
}

export function requireInRange(value: number, min: number, max: number, field: string): void {
  if (value < min || value > max) {
    throw new Error(`${field} must be between ${min} and ${max}`);
  }
}
