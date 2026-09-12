import { DATE_FORMAT } from '@vubon/shared-constants/src/common/date-format.constants';
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

  /**
   * Formats the date using a DATE_FORMAT pattern.
   * Supported tokens: YYYY, MM, DD, HH, mm, ss, hh, A
   * Falls back to DATE_FORMAT.DEFAULT_DATETIME if format is missing.
   */
  format(format: string = DATE_FORMAT.DEFAULT_DATETIME): string {
    const d = this.value;
    const pad = (n: number) => String(n).padStart(2, '0');
    const hours12 = d.getHours() % 12 || 12;

    return format
      .replace(/YYYY/g, String(d.getFullYear()))
      .replace(/MMMM/g, d.toLocaleString('en-US', { month: 'long' }))
      .replace(/MMM/g, d.toLocaleString('en-US', { month: 'short' }))
      .replace(/MM/g, pad(d.getMonth() + 1))
      .replace(/DD/g, pad(d.getDate()))
      .replace(/HH/g, pad(d.getHours()))
      .replace(/hh/g, pad(hours12))
      .replace(/mm/g, pad(d.getMinutes()))
      .replace(/ss/g, pad(d.getSeconds()))
      .replace(/A/g, d.getHours() >= 12 ? 'PM' : 'AM');
  }

  toString(): string {
    return this.value.toISOString();
  }
}

/**
 * Date string type
 */
export type DateString = string;
