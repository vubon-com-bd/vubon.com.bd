import { BaseValueObject } from './base.types';
import { TIMESTAMP } from '@vubon/shared-constants';

export class Timestamp implements BaseValueObject<Date> {
  private _value: Date;

  constructor(value: Date | string | number) {
    this._value = new Date(value);
  }

  // BaseValueObject এর জন্য value প্রপার্টি
  get value(): Date {
    return new Date(this._value);
  }

  isValid(): boolean {
    return !isNaN(this._value.getTime());
  }

  equals(other: Timestamp): boolean {
    return this._value.getTime() === other._value.getTime();
  }

  getUnixTimestamp(): number {
    return Math.floor(this._value.getTime() / 1000);
  }

  getISOString(): string {
    return this._value.toISOString();
  }

  getTimezone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  // TIMESTAMP কনস্ট্যান্ট ব্যবহার করে ফরম্যাট করা
  format(format?: string): string {
    const formatString = format || TIMESTAMP.FORMAT;
    const date = this._value;

    // ISO ফরম্যাটের জন্য
    if (formatString === TIMESTAMP.FORMAT) {
      return this.getISOString();
    }

    // কাস্টম ফরম্যাটিং (YYYY-MM-DD HH:mm:ss)
    if (formatString === 'YYYY-MM-DD HH:mm:ss') {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    // YYYY-MM-DD ফরম্যাটের জন্য
    if (formatString === 'YYYY-MM-DD') {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    // ডিফল্ট ISO ফরম্যাট
    return this.getISOString();
  }

  // TIMESTAMP কনস্ট্যান্ট থেকে সময় অঞ্চল পাওয়া
  getDefaultTimezone(): string {
    return TIMESTAMP.TIMEZONE;
  }

  // TIMESTAMP কনস্ট্যান্ট থেকে নির্ভুলতা পাওয়া
  getPrecision(): string {
    return TIMESTAMP.PRECISION;
  }

  // টাইমস্ট্যাম্পের বিভিন্ন রিপ্রেজেন্টেশন
  toJSON(): {
    isoString: string;
    unix: number;
    timezone: string;
    format: string;
  } {
    return {
      isoString: this.getISOString(),
      unix: this.getUnixTimestamp(),
      timezone: this.getTimezone(),
      format: this.format(TIMESTAMP.FORMAT),
    };
  }

  toString(): string {
    return this.format(TIMESTAMP.FORMAT);
  }
}

export type TimestampString = string;

// TIMESTAMP টাইপের জন্য হেল্পার ইউটিলিটি
export type TimestampFormat = typeof TIMESTAMP.FORMAT;
export type TimestampPrecision = typeof TIMESTAMP.PRECISION;
export type TimestampTimezone = typeof TIMESTAMP.TIMEZONE;

// টাইমস্ট্যাম্প অপশন
export interface TimestampOptions {
  format?: TimestampFormat | string;
  timezone?: TimestampTimezone | string;
  precision?: TimestampPrecision | string;
}

// টাইমস্ট্যাম্প ফ্যাক্টরি
export interface TimestampFactory {
  now(): Timestamp;
  fromDate(date: Date): Timestamp;
  fromString(date: string): Timestamp;
  fromUnix(unix: number): Timestamp;
  parse(value: Date | string | number): Timestamp;
}

// টাইমস্ট্যাম্প রেঞ্জ
export interface TimestampRange {
  start: Timestamp;
  end: Timestamp;
  contains(timestamp: Timestamp): boolean;
  overlaps(other: TimestampRange): boolean;
}
