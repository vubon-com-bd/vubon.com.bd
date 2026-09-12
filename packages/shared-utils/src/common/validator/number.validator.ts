/**
 * Number Validator.
 */
export const isNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);

export const isInteger = (value: unknown): value is number =>
  typeof value === 'number' && Number.isInteger(value);

export const isPositive = (value: number): boolean => value > 0;

export const isNonNegative = (value: number): boolean => value >= 0;

export const inRange = (value: number, min: number, max: number): boolean =>
  value >= min && value <= max;

export const isPercentage = (value: number): boolean => value >= 0 && value <= 100;
