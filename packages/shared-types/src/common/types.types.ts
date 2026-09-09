import { TYPES } from '@vubon/shared-constants/src/common/types.constants';

/**
 * Type type
 */
export type Type = keyof typeof TYPES | string;

/**
 * Type value type
 */
export type TypeValue = (typeof TYPES)[keyof typeof TYPES] | string;

/**
 * Type object interface
 */
export interface TypeObject {
  type: string;
  value: string;
  label: string;
  description?: string;
}
