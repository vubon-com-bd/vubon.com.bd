import { BaseValueObject } from './base.types';

export class Timestamp implements BaseValueObject<Date> {
  constructor(public value: Date) {}

  isValid(): boolean {
    return this.value instanceof Date && !isNaN(this.value.getTime());
  }

  equals(other: Timestamp): boolean {
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
    return this.value.toISOString();
  }
}

export type TimestampString = string;
