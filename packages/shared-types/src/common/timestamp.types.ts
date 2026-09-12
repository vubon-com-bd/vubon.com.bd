import { BaseValueObject } from './base.types';

/**
 * Timestamp Value Object class
 */
export class TimestampVO implements BaseValueObject<Date> {
  constructor(public value: Date) {}

  isValid(): boolean {
    return this.value instanceof Date && !isNaN(this.value.getTime());
  }

  equals(other: TimestampVO): boolean {
    return this.value.getTime() === other.value.getTime();
  }

  getUnixTimestamp(): number {
    return Math.floor(this.value.getTime() / 1000);
  }

  getISOString(): string {
    return this.value.toISOString();
  }

  getTimezone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  toString(): string {
    return this.getISOString();
  }
}

/**
 * Timestamp string type
 */
export type TimestampString = string;
