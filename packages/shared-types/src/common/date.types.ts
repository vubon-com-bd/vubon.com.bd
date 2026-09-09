import { BaseValueObject } from './base.types';

/**
 * Date Value Object class
 */
export class DateVO implements BaseValueObject<Date> {
  constructor(public value: Date) {}

  isValid(): boolean {
    return this.value instanceof Date && !isNaN(this.value.getTime());
  }

  equals(other: DateVO): boolean {
    return this.value.getTime() === other.value.getTime();
  }

  isBefore(other: DateVO): boolean {
    return this.value.getTime() < other.value.getTime();
  }

  isAfter(other: DateVO): boolean {
    return this.value.getTime() > other.value.getTime();
  }

  diffInDays(other: DateVO): number {
    const diffMs = this.value.getTime() - other.value.getTime();
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  }

  format(_format?: string): string {
    const date = this.value;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  toString(): string {
    return this.format();
  }
}

/**
 * Date string type
 */
export type DateString = string;
