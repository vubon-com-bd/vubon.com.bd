/**
 * Event Timestamp Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Analytics event-এর time of occurrence।
 * Business Rule:
 * - UTC timezone based
 * - Future timestamp allowed না (max 5 min clock skew)
 * - Very old timestamp (> 2 years) allowed না
 * - Millisecond precision
 */
import { BaseTimestampVO } from '@vubon/shared-kernel/domain/primitives';
import type { TimezoneValue } from '@vubon/shared-kernel/domain/primitives';
import { TIMEZONE } from '@vubon/shared-constants/common';

const MAX_FUTURE_SKEW_MS = 5 * 60 * 1000; // 5 minutes
const MAX_AGE_MS = 2 * 365 * 24 * 60 * 60 * 1000; // 2 years

export class EventTimestampVO extends BaseTimestampVO {
  private constructor(value: { epochMs: number; timezone: TimezoneValue }) {
    super(value);
  }

  /**
   * Current timestamp থেকে তৈরি
   */
  static now(timezone: TimezoneValue = TIMEZONE.UTC): EventTimestampVO {
    return EventTimestampVO.fromDate(new Date(), timezone);
  }

  /**
   * Date object থেকে তৈরি
   */
  static fromDate(date: Date, timezone: TimezoneValue = TIMEZONE.UTC): EventTimestampVO {
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
      throw new Error('EventTimestamp requires a valid Date');
    }

    const epochMs = date.getTime();
    const nowMs = Date.now();

    if (epochMs > nowMs + MAX_FUTURE_SKEW_MS) {
      throw new Error(
        `Event timestamp is in the future (max ${MAX_FUTURE_SKEW_MS / 1000}s skew)`
      );
    }

    if (epochMs < nowMs - MAX_AGE_MS) {
      throw new Error('Event timestamp is too old (max 2 years)');
    }

    return new EventTimestampVO({ epochMs, timezone });
  }

  /**
   * Epoch milliseconds থেকে তৈরি
   */
  static fromEpochMs(
    epochMs: number,
    timezone: TimezoneValue = TIMEZONE.UTC
  ): EventTimestampVO {
    if (!Number.isFinite(epochMs)) {
      throw new Error('EventTimestamp epochMs must be a finite number');
    }
    return EventTimestampVO.fromDate(new Date(epochMs), timezone);
  }

  /**
   * ISO 8601 string থেকে তৈরি
   */
  static fromIso(iso: string, timezone: TimezoneValue = TIMEZONE.UTC): EventTimestampVO {
    if (typeof iso !== 'string') {
      throw new Error('EventTimestamp ISO must be a string');
    }
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) {
      throw new Error(`Invalid ISO timestamp: ${iso}`);
    }
    return EventTimestampVO.fromDate(date, timezone);
  }

  /**
   * Relative age in milliseconds
   */
  ageMs(): number {
    return Date.now() - this.value.epochMs;
  }

  /**
   * Relative age in seconds
   */
  ageSeconds(): number {
    return Math.floor(this.ageMs() / 1000);
  }

  /**
   * Real-time event কিনা (last 5 minutes)
   */
  isRealTime(): boolean {
    return this.ageMs() <= 5 * 60 * 1000;
  }

  /**
   * Same day কিনা (UTC)
   */
  isSameDayAs(other: EventTimestampVO): boolean {
    const a = new Date(this.value.epochMs);
    const b = new Date(other.value.epochMs);
    return (
      a.getUTCFullYear() === b.getUTCFullYear() &&
      a.getUTCMonth() === b.getUTCMonth() &&
      a.getUTCDate() === b.getUTCDate()
    );
  }

  /**
   * Analytics query-র জন্য date bucket (hour granularity)
   */
  toHourBucket(): string {
    const d = new Date(this.value.epochMs);
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    const h = String(d.getUTCHours()).padStart(2, '0');
    return `${y}-${m}-${day}T${h}:00:00Z`;
  }

  /**
   * Analytics query-র জন্য date bucket (day granularity)
   */
  toDayBucket(): string {
    const d = new Date(this.value.epochMs);
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
}
