import { BaseValueObject } from './base.types';

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
    const diff = this.value.getTime() - other.value.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  format(format?: string): string {
    const defaultFormat = format || 'YYYY-MM-DD';
    const year = this.value.getFullYear();
    const month = String(this.value.getMonth() + 1).padStart(2, '0');
    const day = String(this.value.getDate()).padStart(2, '0');
    return defaultFormat.replace('YYYY', String(year)).replace('MM', month).replace('DD', day);
  }

  toString(): string {
    return this.format();
  }
}

export type DateString = string;
