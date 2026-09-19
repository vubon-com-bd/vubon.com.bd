/**
 * Strict falsiness check (mirror of isTruthy)
 * @module shared-utils/common/boolean
 */
import { isTruthy } from './is-truthy';

export function isFalsy(value: unknown): boolean {
  return !isTruthy(value);
}
