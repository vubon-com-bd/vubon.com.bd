import { BaseValueObject } from './base.types';

/**
 * Time Value Object class
 */
export class TimeVO implements BaseValueObject<{
  hours: number;
  minutes: number;
  seconds: number;
}> {
  constructor(public value: { hours: number; minutes: number; seconds: number }) {}

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

  isBefore(other: TimeVO): boolean {
    const thisSeconds = this.value.hours * 3600 + this.value.minutes * 60 + this.value.seconds;
    const otherSeconds = other.value.hours * 3600 + other.value.minutes * 60 + other.value.seconds;
    return thisSeconds < otherSeconds;
  }

  isAfter(other: TimeVO): boolean {
    const thisSeconds = this.value.hours * 3600 + this.value.minutes * 60 + this.value.seconds;
    const otherSeconds = other.value.hours * 3600 + other.value.minutes * 60 + other.value.seconds;
    return thisSeconds > otherSeconds;
  }

  add(other: TimeVO): TimeVO {
    let totalSeconds =
      this.value.hours * 3600 +
      this.value.minutes * 60 +
      this.value.seconds +
      other.value.hours * 3600 +
      other.value.minutes * 60 +
      other.value.seconds;

    const hours = Math.floor(totalSeconds / 3600) % 24;
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return new TimeVO({ hours, minutes, seconds });
  }

  subtract(other: TimeVO): TimeVO {
    let thisSeconds = this.value.hours * 3600 + this.value.minutes * 60 + this.value.seconds;
    const otherSeconds = other.value.hours * 3600 + other.value.minutes * 60 + other.value.seconds;
    let diffSeconds = thisSeconds - otherSeconds;

    if (diffSeconds < 0) diffSeconds += 24 * 3600;

    const hours = Math.floor(diffSeconds / 3600);
    diffSeconds %= 3600;
    const minutes = Math.floor(diffSeconds / 60);
    const seconds = diffSeconds % 60;

    return new TimeVO({ hours, minutes, seconds });
  }

  format(_format?: string): string {
    const h = String(this.value.hours).padStart(2, '0');
    const m = String(this.value.minutes).padStart(2, '0');
    const s = String(this.value.seconds).padStart(2, '0');
    return `${h}:${m}:${s}`;
  }

  toString(): string {
    return this.format();
  }
}

/**
 * Time string type
 */
export type TimeString = string;
