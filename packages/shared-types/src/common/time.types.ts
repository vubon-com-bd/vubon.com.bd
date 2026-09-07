import { BaseValueObject } from './base.types';

export class TimeVO implements BaseValueObject<{
  hours: number;
  minutes: number;
  seconds: number;
}> {
  constructor(public value: { hours: number; minutes: number; seconds: number }) {}

  isValid(): boolean {
    const { hours, minutes, seconds } = this.value;
    return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60 && seconds >= 0 && seconds < 60;
  }

  equals(other: TimeVO): boolean {
    return (
      this.value.hours === other.value.hours &&
      this.value.minutes === other.value.minutes &&
      this.value.seconds === other.value.seconds
    );
  }

  isBefore(other: TimeVO): boolean {
    const thisTotal = this.value.hours * 3600 + this.value.minutes * 60 + this.value.seconds;
    const otherTotal = other.value.hours * 3600 + other.value.minutes * 60 + other.value.seconds;
    return thisTotal < otherTotal;
  }

  isAfter(other: TimeVO): boolean {
    const thisTotal = this.value.hours * 3600 + this.value.minutes * 60 + this.value.seconds;
    const otherTotal = other.value.hours * 3600 + other.value.minutes * 60 + other.value.seconds;
    return thisTotal > otherTotal;
  }

  add(other: TimeVO): TimeVO {
    let totalSeconds =
      this.value.hours * 3600 +
      this.value.minutes * 60 +
      this.value.seconds +
      other.value.hours * 3600 +
      other.value.minutes * 60 +
      other.value.seconds;
    totalSeconds = totalSeconds % (24 * 3600);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return new TimeVO({ hours, minutes, seconds });
  }

  subtract(other: TimeVO): TimeVO {
    let totalSeconds =
      this.value.hours * 3600 +
      this.value.minutes * 60 +
      this.value.seconds -
      other.value.hours * 3600 -
      other.value.minutes * 60 -
      other.value.seconds;
    if (totalSeconds < 0) totalSeconds += 24 * 3600;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return new TimeVO({ hours, minutes, seconds });
  }

  format(format?: string): string {
    const defaultFormat = format || 'HH:MM:SS';
    const hours = String(this.value.hours).padStart(2, '0');
    const minutes = String(this.value.minutes).padStart(2, '0');
    const seconds = String(this.value.seconds).padStart(2, '0');
    return defaultFormat.replace('HH', hours).replace('MM', minutes).replace('SS', seconds);
  }

  toString(): string {
    return this.format();
  }
}

export type TimeString = string;
