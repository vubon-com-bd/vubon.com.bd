/**
 * Safe modulo (returns fallback on zero divisor)
 * @module shared-utils/common/number
 */
export function safeModulo(value: number, divisor: number, fallback = 0): number {
  if (divisor === 0) return fallback;
  return value % divisor;
}
