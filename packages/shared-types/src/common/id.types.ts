import { BaseValueObject } from './base.types';

/**
 * ID type
 */
export type ID = string | number;

/**
 * ID Value Object class
 */
export class IDVO implements BaseValueObject<ID> {
  constructor(public value: ID) {}

  isValid(): boolean {
    return this.value !== undefined && this.value !== null && this.value !== '';
  }

  equals(other: IDVO): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return String(this.value);
  }
}

/**
 * ID types constants
 */
export const ID_TYPES = {
  UUID: 'uuid',
  NUMBER: 'number',
  STRING: 'string',
} as const;

export type IDType = (typeof ID_TYPES)[keyof typeof ID_TYPES];
