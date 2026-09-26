import {
  BaseTimestampVO,
  type TimestampValue,
} from '@vubon/shared-kernel/domain/primitives/timestamp.vo';

export class EventTimestampVO extends BaseTimestampVO {
  static create(value: Date): EventTimestampVO {
    if (!(value instanceof Date) || isNaN(value.getTime())) {
      throw new Error(`Invalid event timestamp: ${value}`);
    }
    if (value.getTime() > Date.now() + 60_000) {
      throw new Error('Event timestamp cannot be in the future');
    }
    return new EventTimestampVO(BaseTimestampVO.fromEpoch(value.getTime()));
  }

  static now(): EventTimestampVO {
    return new EventTimestampVO(BaseTimestampVO.fromEpoch(Date.now()));
  }

  private constructor(value: TimestampValue) {
    super(value);
  }

  isOlderThan(ms: number): boolean {
    return Date.now() - this.epochMs > ms;
  }

  isWithinWindow(startMs: number, endMs: number): boolean {
    return this.epochMs >= startMs && this.epochMs <= endMs;
  }

  toDate(): Date {
    return new Date(this.epochMs);
  }
}
