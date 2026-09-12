/**
 * Array Validator.
 */
export const isArray = (value: unknown): value is unknown[] => Array.isArray(value);

export const isEmptyArray = (value: unknown[]): boolean => value.length === 0;

export const isNonEmptyArray = (value: unknown[]): boolean => value.length > 0;

export const hasLength = (value: unknown[], length: number): boolean => value.length === length;

export const isUnique = <T>(value: T[]): boolean => new Set(value).size === value.length;
