import { BaseValueObject } from './base.types';
import { DATE_FORMAT, TIME_FORMAT } from '@vubon/shared-constants';

export interface DateData {
  year: number;
  month: number;
  day: number;
}

export class DateVO implements BaseValueObject<Date> {
  private _value: Date;

  constructor(value: Date | string) {
    this._value = typeof value === 'string' ? new Date(value) : value;
  }

  // BaseValueObject এর জন্য value প্রপার্টি
  get value(): Date {
    return new Date(this._value);
  }

  // প্রয়োজনীয় গেটার
  get year(): number {
    return this._value.getFullYear();
  }
  get month(): number {
    return this._value.getMonth() + 1;
  }
  get day(): number {
    return this._value.getDate();
  }
  get dayOfWeek(): number {
    return this._value.getDay();
  }

  isValid(): boolean {
    return !isNaN(this._value.getTime());
  }

  equals(other: DateVO): boolean {
    return this._value.getTime() === other._value.getTime();
  }

  isBefore(other: DateVO): boolean {
    return this._value < other._value;
  }

  isAfter(other: DateVO): boolean {
    return this._value > other._value;
  }

  isSameDay(other: DateVO): boolean {
    return this.year === other.year && this.month === other.month && this.day === other.day;
  }

  diffInDays(other: DateVO): number {
    const diff = this._value.getTime() - other._value.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  // DATE_FORMAT ব্যবহার করে ফরম্যাট করা
  format(format?: string): string {
    const formatString = format || DATE_FORMAT.DEFAULT_DATE;
    // date ভেরিয়েবল ব্যবহার করা হয়েছে
    const date = this._value;
    const year = this.year;
    const month = String(this.month).padStart(2, '0');
    const day = String(this.day).padStart(2, '0');
    const monthName = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const monthFull = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // date ভেরিয়েবল ব্যবহার করে বিভিন্ন ফরম্যাট
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const ms = String(date.getMilliseconds()).padStart(3, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    const shortYear = String(year).slice(-2);

    // ISO (YYYY-MM-DD)
    if (formatString === DATE_FORMAT.ISO) {
      return `${year}-${month}-${day}`;
    }

    // US (MM/DD/YYYY)
    if (formatString === DATE_FORMAT.US) {
      return `${month}/${day}/${year}`;
    }

    // US_SHORT (MM/DD/YY)
    if (formatString === DATE_FORMAT.US_SHORT) {
      return `${month}/${day}/${shortYear}`;
    }

    // US_LONG (MMMM DD, YYYY)
    if (formatString === DATE_FORMAT.US_LONG) {
      return `${monthFull[date.getMonth()]} ${day}, ${year}`;
    }

    // UK (DD/MM/YYYY)
    if (formatString === DATE_FORMAT.UK) {
      return `${day}/${month}/${year}`;
    }

    // UK_SHORT (DD/MM/YY)
    if (formatString === DATE_FORMAT.UK_SHORT) {
      return `${day}/${month}/${shortYear}`;
    }

    // UK_LONG (DD MMMM YYYY)
    if (formatString === DATE_FORMAT.UK_LONG) {
      return `${day} ${monthFull[date.getMonth()]} ${year}`;
    }

    // BD (DD/MM/YYYY)
    if (formatString === DATE_FORMAT.BD) {
      return `${day}/${month}/${year}`;
    }

    // BD_SHORT (DD/MM/YY)
    if (formatString === DATE_FORMAT.BD_SHORT) {
      return `${day}/${month}/${shortYear}`;
    }

    // BD_LONG (DD MMMM YYYY)
    if (formatString === DATE_FORMAT.BD_LONG) {
      return `${day} ${monthFull[date.getMonth()]} ${year}`;
    }

    // DAY_MONTH (DD MMM)
    if (formatString === DATE_FORMAT.DAY_MONTH) {
      return `${day} ${monthName[date.getMonth()]}`;
    }

    // DAY_MONTH_YEAR (DD MMM YYYY)
    if (formatString === DATE_FORMAT.DAY_MONTH_YEAR) {
      return `${day} ${monthName[date.getMonth()]} ${year}`;
    }

    // MONTH_YEAR (MMM YYYY)
    if (formatString === DATE_FORMAT.MONTH_YEAR) {
      return `${monthName[date.getMonth()]} ${year}`;
    }

    // MONTH (MMMM)
    if (formatString === DATE_FORMAT.MONTH) {
      return monthFull[date.getMonth()];
    }

    // YEAR (YYYY)
    if (formatString === DATE_FORMAT.YEAR) {
      return String(year);
    }

    // DAY (dddd)
    if (formatString === DATE_FORMAT.DAY) {
      return dayNames[date.getDay()];
    }

    // DB_DATE (YYYY-MM-DD)
    if (formatString === DATE_FORMAT.DB_DATE) {
      return `${year}-${month}-${day}`;
    }

    // DEFAULT_DATE (DD/MM/YYYY)
    if (formatString === DATE_FORMAT.DEFAULT_DATE) {
      return `${day}/${month}/${year}`;
    }

    // DEFAULT_DATETIME (DD/MM/YYYY hh:mm A)
    if (formatString === DATE_FORMAT.DEFAULT_DATETIME) {
      return `${day}/${month}/${year} ${hour12}:${minutes} ${period}`;
    }

    // BD_DATETIME (DD/MM/YYYY hh:mm A)
    if (formatString === DATE_FORMAT.BD_DATETIME) {
      return `${day}/${month}/${year} ${hour12}:${minutes} ${period}`;
    }

    // US_DATETIME (MM/DD/YYYY hh:mm A)
    if (formatString === DATE_FORMAT.US_DATETIME) {
      return `${month}/${day}/${year} ${hour12}:${minutes} ${period}`;
    }

    // UK_DATETIME (DD/MM/YYYY HH:mm)
    if (formatString === DATE_FORMAT.UK_DATETIME) {
      return `${day}/${month}/${year} ${String(hours).padStart(2, '0')}:${minutes}`;
    }

    // ISO_DATETIME (YYYY-MM-DDTHH:mm:ss)
    if (formatString === DATE_FORMAT.ISO_DATETIME) {
      return `${year}-${month}-${day}T${String(hours).padStart(2, '0')}:${minutes}:${seconds}`;
    }

    // ISO_DATETIME_MS (YYYY-MM-DDTHH:mm:ss.SSS)
    if (formatString === DATE_FORMAT.ISO_DATETIME_MS) {
      return `${year}-${month}-${day}T${String(hours).padStart(2, '0')}:${minutes}:${seconds}.${ms}`;
    }

    // ISO_DATETIME_Z (YYYY-MM-DDTHH:mm:ssZ)
    if (formatString === DATE_FORMAT.ISO_DATETIME_Z) {
      return `${year}-${month}-${day}T${String(hours).padStart(2, '0')}:${minutes}:${seconds}Z`;
    }

    // ISO_TIME (HH:mm:ss)
    if (formatString === DATE_FORMAT.ISO_TIME) {
      return `${String(hours).padStart(2, '0')}:${minutes}:${seconds}`;
    }

    // TIME_12H (hh:mm A)
    if (formatString === DATE_FORMAT.TIME_12H) {
      return `${hour12}:${minutes} ${period}`;
    }

    // TIME_24H (HH:mm)
    if (formatString === DATE_FORMAT.TIME_24H) {
      return `${String(hours).padStart(2, '0')}:${minutes}`;
    }

    // TIME_WITH_SECONDS (HH:mm:ss)
    if (formatString === DATE_FORMAT.TIME_WITH_SECONDS) {
      return `${String(hours).padStart(2, '0')}:${minutes}:${seconds}`;
    }

    // DB_TIME (HH:mm:ss)
    if (formatString === DATE_FORMAT.DB_TIME) {
      return `${String(hours).padStart(2, '0')}:${minutes}:${seconds}`;
    }

    // DB_DATETIME (YYYY-MM-DD HH:mm:ss)
    if (formatString === DATE_FORMAT.DB_DATETIME) {
      return `${year}-${month}-${day} ${String(hours).padStart(2, '0')}:${minutes}:${seconds}`;
    }

    // BD_TIME (hh:mm A)
    if (formatString === DATE_FORMAT.BD_TIME) {
      return `${hour12}:${minutes} ${period}`;
    }

    // US_TIME (hh:mm A)
    if (formatString === DATE_FORMAT.US_TIME) {
      return `${hour12}:${minutes} ${period}`;
    }

    // UK_TIME (HH:mm)
    if (formatString === DATE_FORMAT.UK_TIME) {
      return `${String(hours).padStart(2, '0')}:${minutes}`;
    }

    // ডিফল্ট DEFAULT_DATE ফরম্যাট
    return `${day}/${month}/${year}`;
  }

  // DATE_FORMAT থেকে ডিফল্ট ফরম্যাট পাওয়া
  getDefaultFormat(): string {
    return DATE_FORMAT.DEFAULT_DATE;
  }

  // সব ফরম্যাট অপশন পাওয়া
  getAvailableFormats(): string[] {
    return [
      DATE_FORMAT.ISO,
      DATE_FORMAT.ISO_TIME,
      DATE_FORMAT.ISO_DATETIME,
      DATE_FORMAT.ISO_DATETIME_MS,
      DATE_FORMAT.ISO_DATETIME_Z,
      DATE_FORMAT.BD,
      DATE_FORMAT.BD_SHORT,
      DATE_FORMAT.BD_LONG,
      DATE_FORMAT.BD_TIME,
      DATE_FORMAT.BD_DATETIME,
      DATE_FORMAT.US,
      DATE_FORMAT.US_SHORT,
      DATE_FORMAT.US_LONG,
      DATE_FORMAT.US_TIME,
      DATE_FORMAT.US_DATETIME,
      DATE_FORMAT.UK,
      DATE_FORMAT.UK_SHORT,
      DATE_FORMAT.UK_LONG,
      DATE_FORMAT.UK_TIME,
      DATE_FORMAT.UK_DATETIME,
      DATE_FORMAT.DAY_MONTH,
      DATE_FORMAT.DAY_MONTH_YEAR,
      DATE_FORMAT.MONTH_YEAR,
      DATE_FORMAT.MONTH,
      DATE_FORMAT.YEAR,
      DATE_FORMAT.DAY,
      DATE_FORMAT.TIME_12H,
      DATE_FORMAT.TIME_24H,
      DATE_FORMAT.TIME_WITH_SECONDS,
      DATE_FORMAT.DB_DATE,
      DATE_FORMAT.DB_TIME,
      DATE_FORMAT.DB_DATETIME,
      DATE_FORMAT.DEFAULT_DATE,
      DATE_FORMAT.DEFAULT_TIME,
      DATE_FORMAT.DEFAULT_DATETIME,
    ];
  }

  // DATE_FORMAT এর টাইপ চেক
  isValidFormat(format: string): boolean {
    return Object.values(DATE_FORMAT).includes(
      format as (typeof DATE_FORMAT)[keyof typeof DATE_FORMAT]
    );
  }

  // TIME_FORMAT ব্যবহার করে সময় যোগ করা
  withTime(hours: number, minutes: number, seconds: number = 0): Date {
    const newDate = new Date(this._value);
    newDate.setHours(hours, minutes, seconds, 0);
    return newDate;
  }

  // TIME_FORMAT ব্যবহার করে সময় পার্স করা
  parseTime(timeString: string): Date | null {
    const formats = [
      TIME_FORMAT.TWELVE_HOUR,
      TIME_FORMAT.TWENTY_FOUR_HOUR,
      TIME_FORMAT.TWELVE_HOUR_WITH_SECONDS,
      TIME_FORMAT.TWENTY_FOUR_HOUR_WITH_SECONDS,
      TIME_FORMAT.DEFAULT,
    ];

    for (const format of formats) {
      // 24-hour format
      if (
        format === TIME_FORMAT.TWENTY_FOUR_HOUR ||
        format === TIME_FORMAT.TWENTY_FOUR_HOUR_WITH_SECONDS
      ) {
        const match = timeString.match(/(\d{1,2}):(\d{2})(?::(\d{2}))?/);
        if (match) {
          const hours = parseInt(match[1]);
          const minutes = parseInt(match[2]);
          const seconds = match[3] ? parseInt(match[3]) : 0;
          if (
            hours >= 0 &&
            hours < 24 &&
            minutes >= 0 &&
            minutes < 60 &&
            seconds >= 0 &&
            seconds < 60
          ) {
            return this.withTime(hours, minutes, seconds);
          }
        }
      }

      // 12-hour format
      if (format === TIME_FORMAT.TWELVE_HOUR || format === TIME_FORMAT.TWELVE_HOUR_WITH_SECONDS) {
        const match = timeString.match(/(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)/i);
        if (match) {
          let hours = parseInt(match[1]);
          const minutes = parseInt(match[2]);
          const seconds = match[3] ? parseInt(match[3]) : 0;
          const period = match[4].toUpperCase();

          if (period === 'PM' && hours < 12) hours += 12;
          if (period === 'AM' && hours === 12) hours = 0;

          if (
            hours >= 0 &&
            hours < 24 &&
            minutes >= 0 &&
            minutes < 60 &&
            seconds >= 0 &&
            seconds < 60
          ) {
            return this.withTime(hours, minutes, seconds);
          }
        }
      }
    }

    return null;
  }

  // DATE_FORMAT ব্যবহার করে JSON রূপান্তর
  toJSON(): {
    iso: string;
    formatted: string;
    year: number;
    month: number;
    day: number;
  } {
    return {
      iso: this._value.toISOString(),
      formatted: this.format(DATE_FORMAT.DEFAULT_DATE),
      year: this.year,
      month: this.month,
      day: this.day,
    };
  }

  toString(): string {
    return this.format(DATE_FORMAT.DEFAULT_DATE);
  }
}

export type DateString = string;

// DATE_FORMAT টাইপের জন্য হেল্পার ইউটিলিটি
export type DateFormatType = typeof DATE_FORMAT;
export type DateFormatKey = keyof typeof DATE_FORMAT;
export type DateFormatValue = (typeof DATE_FORMAT)[DateFormatKey];

// তারিখ অপশন
export interface DateOptions {
  format?: DateFormatValue | string;
  timezone?: string;
}

// তারিখ রেঞ্জ
export interface DateRange {
  start: DateVO;
  end: DateVO;
  duration(): number;
  contains(date: DateVO): boolean;
  overlaps(other: DateRange): boolean;
  eachDay(): DateVO[];
}

// তারিখ পার্সার
export interface DateParser {
  parse(value: string | Date): DateVO;
  parseString(value: string): DateVO;
  parseDate(value: Date): DateVO;
  isValidString(value: string): boolean;
}

// তারিখ ইউটিলিটি
export interface DateUtils {
  now(): DateVO;
  today(): DateVO;
  tomorrow(): DateVO;
  yesterday(): DateVO;
  addDays(date: DateVO, days: number): DateVO;
  addMonths(date: DateVO, months: number): DateVO;
  addYears(date: DateVO, years: number): DateVO;
  startOfDay(date: DateVO): DateVO;
  endOfDay(date: DateVO): DateVO;
}
