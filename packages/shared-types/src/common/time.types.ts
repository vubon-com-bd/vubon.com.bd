import { TIME_FORMAT } from '@vubon/shared-constants/src/common/time-format.constants';
import { BaseValueObject } from './base.types';

export interface TimeData {
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Time Value Object class
 */
export class TimeVO implements BaseValueObject<TimeData> {
  constructor(public value: TimeData) {}

  isValid(): boolean {
    return (
      this.value.hours >= 0 &&
      this.value.hours < 24 &&
      this.value.minutes >= 0 &&
      this.value.minutes < 60 &&
      this.value.seconds >= 0 &&
      this.value.seconds < 60
    );
  }

  equals(other: TimeVO): boolean {
    return (
      this.value.hours === other.value.hours &&
      this.value.minutes === other.value.minutes &&
      this.value.seconds === other.value.seconds
    );
  }

  private toSeconds(): number {
    return this.value.hours * 3600 + this.value.minutes * 60 + this.value.seconds;
  }

  isBefore(other: TimeVO): boolean {
    return this.toSeconds() < other.toSeconds();
  }

  isAfter(other: TimeVO): boolean {
    return this.toSeconds() > other.toSeconds();
  }

  add(other: TimeVO): TimeVO {
    let total = (this.toSeconds() + other.toSeconds()) % 86400;
    const hours = Math.floor(total / 3600);
    total %= 3600;
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    return new TimeVO({ hours, minutes, seconds });
  }

  subtract(other: TimeVO): TimeVO {
    let diff = this.toSeconds() - other.toSeconds();
    if (diff < 0) diff += 86400;
    const hours = Math.floor(diff / 3600);
    diff %= 3600;
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;
    return new TimeVO({ hours, minutes, seconds });
  }

  /**
   * Formats using a TIME_FORMAT pattern.
   * Supported tokens: HH, hh, mm, ss, A
   */
  format(format: string = TIME_FORMAT.TWENTY_FOUR_HOUR_WITH_SECONDS): string {
    const pad = (n: number) => String(n).padStart(2, '0');
    const hours12 = this.value.hours % 12 || 12;

    return format
      .replace(/HH/g, pad(this.value.hours))
      .replace(/hh/g, pad(hours12))
      .replace(/mm/g, pad(this.value.minutes))
      .replace(/ss/g, pad(this.value.seconds))
      .replace(/A/g, this.value.hours >= 12 ? 'PM' : 'AM');
  }

  toString(): string {
    return this.format();
  }
}

/**
 * Time string type
 */
export type TimeString = string;
