import { BaseValueObject } from './base.types';

/**
 * ID type — prefer UUID for new entities.
 */
export type ID = string | number;

/**
 * ID Value Object class
 */
export class IDVO implements BaseValueObject<ID> {
  constructor(public value: ID) {}

  isValid(): boolean {
    if (this.value === undefined || this.value === null) return false;
    if (typeof this.value === 'string') return this.value.trim().length > 0;
    if (typeof this.value === 'number') return Number.isFinite(this.value) && this.value >= 0;
    return false;
  }

  equals(other: IDVO): boolean {
    return String(this.value) === String(other.value);
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
