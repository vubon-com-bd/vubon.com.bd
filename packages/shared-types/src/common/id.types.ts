import { BaseValueObject } from './base.types';

export type ID = string | number;

export class IDVO implements BaseValueObject<ID> {
  constructor(public value: ID) {}

  isValid(): boolean {
    return this.value !== null && this.value !== undefined && this.value !== '';
  }

  equals(other: IDVO): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return String(this.value);
  }
}

export const ID_TYPES = {
  UUID: 'uuid',
  NUMBER: 'number',
  STRING: 'string',
} as const;
