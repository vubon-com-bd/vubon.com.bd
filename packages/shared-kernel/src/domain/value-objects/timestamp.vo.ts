import { ValueObject } from '../base/base.vo';

export class Timestamp extends ValueObject<Date> {
  protected validate(): void {
    if (!(this._value instanceof Date) || isNaN(this._value.getTime())) {
      throw new Error('Invalid timestamp');
    }
  }

  get epoch(): number {
    return this._value.getTime();
  }

  get iso(): string {
    return this._value.toISOString();
  }

  get date(): string {
    return this._value.toISOString().split('T')[0];
  }

  get time(): string {
    return this._value.toISOString().split('T')[1].split('.')[0];
  }

  isBefore(timestamp: Timestamp): boolean {
    return this._value < timestamp._value;
  }

  isAfter(timestamp: Timestamp): boolean {
    return this._value > timestamp._value;
  }

  isEqual(timestamp: Timestamp): boolean {
    return this._value.getTime() === timestamp._value.getTime();
  }

  isToday(): boolean {
    const today = new Date();
    return (
      this._value.getDate() === today.getDate() &&
      this._value.getMonth() === today.getMonth() &&
      this._value.getFullYear() === today.getFullYear()
    );
  }

  isFuture(): boolean {
    return this._value > new Date();
  }

  isPast(): boolean {
    return this._value < new Date();
  }

  getRelativeTime(): string {
    const diff = Date.now() - this._value.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) return `${years}y ago`;
    if (months > 0) return `${months}mo ago`;
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  }

  format(format: string = 'YYYY-MM-DD HH:mm:ss'): string {
    const d = this._value;
    const replacements: Record<string, string> = {
      YYYY: String(d.getFullYear()),
      YY: String(d.getFullYear()).slice(-2),
      MM: String(d.getMonth() + 1).padStart(2, '0'),
      M: String(d.getMonth() + 1),
      DD: String(d.getDate()).padStart(2, '0'),
      D: String(d.getDate()),
      HH: String(d.getHours()).padStart(2, '0'),
      H: String(d.getHours()),
      mm: String(d.getMinutes()).padStart(2, '0'),
      m: String(d.getMinutes()),
      ss: String(d.getSeconds()).padStart(2, '0'),
      s: String(d.getSeconds()),
    };

    let result = format;
    for (const [key, value] of Object.entries(replacements)) {
      result = result.replace(key, value);
    }
    return result;
  }

  static now(): Timestamp {
    return new Timestamp(new Date());
  }

  static fromDate(date: Date): Timestamp {
    return new Timestamp(date);
  }

  static fromISO(iso: string): Timestamp {
    return new Timestamp(new Date(iso));
  }

  static fromEpoch(epoch: number): Timestamp {
    return new Timestamp(new Date(epoch));
  }
}
