import { BaseValueObject } from './base.types';
import { TIME_FORMAT } from '@vubon/shared-constants';

export interface TimeData {
  hours: number;
  minutes: number;
  seconds: number;
}

export class TimeVO implements BaseValueObject<TimeData> {
  private _data: TimeData;

  constructor(hours: number, minutes: number, seconds: number) {
    this._data = {
      hours,
      minutes,
      seconds,
    };
  }

  // BaseValueObject এর জন্য value প্রপার্টি
  get value(): TimeData {
    return { ...this._data };
  }

  // প্রয়োজনীয় অন্যান্য গেটার
  get hours(): number {
    return this._data.hours;
  }
  get minutes(): number {
    return this._data.minutes;
  }
  get seconds(): number {
    return this._data.seconds;
  }

  isValid(): boolean {
    return (
      this._data.hours >= 0 &&
      this._data.hours < 24 &&
      this._data.minutes >= 0 &&
      this._data.minutes < 60 &&
      this._data.seconds >= 0 &&
      this._data.seconds < 60
    );
  }

  equals(other: TimeVO): boolean {
    return (
      this._data.hours === other._data.hours &&
      this._data.minutes === other._data.minutes &&
      this._data.seconds === other._data.seconds
    );
  }

  isBefore(other: TimeVO): boolean {
    return this.toSeconds() < other.toSeconds();
  }

  isAfter(other: TimeVO): boolean {
    return this.toSeconds() > other.toSeconds();
  }

  private toSeconds(): number {
    return this._data.hours * 3600 + this._data.minutes * 60 + this._data.seconds;
  }

  add(other: TimeVO): TimeVO {
    let total = this.toSeconds() + other.toSeconds();
    const hours = Math.floor(total / 3600) % 24;
    total %= 3600;
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    return new TimeVO(hours, minutes, seconds);
  }

  subtract(other: TimeVO): TimeVO {
    let total = this.toSeconds() - other.toSeconds();
    if (total < 0) total += 86400;
    const hours = Math.floor(total / 3600) % 24;
    total %= 3600;
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    return new TimeVO(hours, minutes, seconds);
  }

  // TIME_FORMAT কনস্ট্যান্ট ব্যবহার করে ফরম্যাট করা (সঠিক প্রপার্টি নাম ব্যবহার)
  format(format?: string): string {
    const formatString = format || TIME_FORMAT.DEFAULT;

    // 12-hour with seconds (hh:mm:ss A)
    if (formatString === TIME_FORMAT.TWELVE_HOUR_WITH_SECONDS) {
      const period = this._data.hours >= 12 ? 'PM' : 'AM';
      const hour12 = this._data.hours % 12 || 12;
      return `${String(hour12).padStart(2, '0')}:${String(this._data.minutes).padStart(2, '0')}:${String(this._data.seconds).padStart(2, '0')} ${period}`;
    }

    // 12-hour short (h:mm A)
    if (formatString === TIME_FORMAT.TWELVE_HOUR_SHORT) {
      const period = this._data.hours >= 12 ? 'PM' : 'AM';
      const hour12 = this._data.hours % 12 || 12;
      return `${hour12}:${String(this._data.minutes).padStart(2, '0')} ${period}`;
    }

    // 12-hour standard (hh:mm A)
    if (formatString === TIME_FORMAT.TWELVE_HOUR) {
      const period = this._data.hours >= 12 ? 'PM' : 'AM';
      const hour12 = this._data.hours % 12 || 12;
      return `${String(hour12).padStart(2, '0')}:${String(this._data.minutes).padStart(2, '0')} ${period}`;
    }

    // 24-hour standard (HH:mm)
    if (formatString === TIME_FORMAT.TWENTY_FOUR_HOUR) {
      return `${String(this._data.hours).padStart(2, '0')}:${String(this._data.minutes).padStart(2, '0')}`;
    }

    // 24-hour short (H:mm)
    if (formatString === TIME_FORMAT.TWENTY_FOUR_HOUR_SHORT) {
      return `${this._data.hours}:${String(this._data.minutes).padStart(2, '0')}`;
    }

    // 24-hour with seconds (HH:mm:ss)
    if (formatString === TIME_FORMAT.TWENTY_FOUR_HOUR_WITH_SECONDS) {
      return `${String(this._data.hours).padStart(2, '0')}:${String(this._data.minutes).padStart(2, '0')}:${String(this._data.seconds).padStart(2, '0')}`;
    }

    // ISO format (HH:mm:ss)
    if (formatString === TIME_FORMAT.ISO) {
      return `${String(this._data.hours).padStart(2, '0')}:${String(this._data.minutes).padStart(2, '0')}:${String(this._data.seconds).padStart(2, '0')}`;
    }

    // ISO short (HH:mm)
    if (formatString === TIME_FORMAT.ISO_SHORT) {
      return `${String(this._data.hours).padStart(2, '0')}:${String(this._data.minutes).padStart(2, '0')}`;
    }

    // Bangladesh format (hh:mm A)
    if (formatString === TIME_FORMAT.BD) {
      const period = this._data.hours >= 12 ? 'PM' : 'AM';
      const hour12 = this._data.hours % 12 || 12;
      return `${String(hour12).padStart(2, '0')}:${String(this._data.minutes).padStart(2, '0')} ${period}`;
    }

    // Bangladesh 24h (HH:mm)
    if (formatString === TIME_FORMAT.BD_24H) {
      return `${String(this._data.hours).padStart(2, '0')}:${String(this._data.minutes).padStart(2, '0')}`;
    }

    // ISO millis (HH:mm:ss.SSS)
    if (formatString === TIME_FORMAT.ISO_MILLIS) {
      return `${String(this._data.hours).padStart(2, '0')}:${String(this._data.minutes).padStart(2, '0')}:${String(this._data.seconds).padStart(2, '0')}.000`;
    }

    // ডিফল্ট 12-hour ফরম্যাট
    const period = this._data.hours >= 12 ? 'PM' : 'AM';
    const hour12 = this._data.hours % 12 || 12;
    return `${String(hour12).padStart(2, '0')}:${String(this._data.minutes).padStart(2, '0')} ${period}`;
  }

  // TIME_FORMAT কনস্ট্যান্ট থেকে ডিফল্ট ফরম্যাট পাওয়া
  getDefaultFormat(): string {
    return TIME_FORMAT.DEFAULT;
  }

  // সব ফরম্যাট অপশন পাওয়া (সঠিক প্রপার্টি নাম ব্যবহার)
  getAvailableFormats(): string[] {
    return [
      TIME_FORMAT.TWELVE_HOUR,
      TIME_FORMAT.TWELVE_HOUR_SHORT,
      TIME_FORMAT.TWELVE_HOUR_WITH_SECONDS,
      TIME_FORMAT.TWENTY_FOUR_HOUR,
      TIME_FORMAT.TWENTY_FOUR_HOUR_SHORT,
      TIME_FORMAT.TWENTY_FOUR_HOUR_WITH_SECONDS,
      TIME_FORMAT.BD,
      TIME_FORMAT.BD_24H,
      TIME_FORMAT.US,
      TIME_FORMAT.US_24H,
      TIME_FORMAT.UK,
      TIME_FORMAT.UK_12H,
      TIME_FORMAT.ISO,
      TIME_FORMAT.ISO_SHORT,
      TIME_FORMAT.ISO_MILLIS,
      TIME_FORMAT.TIMEZONE,
      TIME_FORMAT.TIMEZONE_ISO,
      TIME_FORMAT.DEFAULT,
    ];
  }

  // TIME_FORMAT কনস্ট্যান্টের টাইপ চেক
  isValidFormat(format: string): boolean {
    return Object.values(TIME_FORMAT).includes(
      format as (typeof TIME_FORMAT)[keyof typeof TIME_FORMAT]
    );
  }

  // সময়কে JSON এ রূপান্তর
  toJSON(): TimeData & { formatted: string } {
    return {
      ...this._data,
      formatted: this.format(TIME_FORMAT.DEFAULT),
    };
  }

  toString(): string {
    return this.format(TIME_FORMAT.DEFAULT);
  }
}

export type TimeString = string;

// TIME_FORMAT টাইপের জন্য হেল্পার ইউটিলিটি
export type TimeFormatType = typeof TIME_FORMAT;
export type TimeFormatKey = keyof typeof TIME_FORMAT;
export type TimeFormatValue = (typeof TIME_FORMAT)[TimeFormatKey];

// টাইম অপশন
export interface TimeOptions {
  format?: TimeFormatValue | string;
  period?: 'AM' | 'PM';
}

// টাইম রেঞ্জ
export interface TimeRange {
  start: TimeVO;
  end: TimeVO;
  duration(): TimeVO;
  contains(time: TimeVO): boolean;
  overlaps(other: TimeRange): boolean;
}

// টাইম পার্সার
export interface TimeParser {
  parse(value: string | TimeData): TimeVO;
  parseString(value: string): TimeVO;
  parseData(data: TimeData): TimeVO;
  isValidString(value: string): boolean;
}
