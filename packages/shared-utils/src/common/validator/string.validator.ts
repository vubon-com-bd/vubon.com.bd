/**
 * String Validator.
 */
import { REGEX } from '@vubon/shared-constants/src/common/regex.constants';

export const isString = (value: unknown): value is string => typeof value === 'string';

export const isEmptyString = (value: string): boolean => value.trim().length === 0;

export const isNonEmptyString = (value: string): boolean => !isEmptyString(value);

export const isAlphanumeric = (value: string): boolean => REGEX.ALPHANUMERIC.test(value);

export const isNumeric = (value: string): boolean => REGEX.NUMERIC.test(value);

export const isBangla = (value: string): boolean => REGEX.BENGALI.test(value);
