/**
 * Session Duration Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Session-এর duration (seconds)।
 * Business Rule:
 * - Non-negative integer (seconds)
 * - Max 24 hours (86400s) — analytics session 24h এর বেশি হতে পারে না
 * - < 10s = bounce
 * - 10s-30s = short
 * - 30s-3m = medium
 * - > 3m = engaged
 */
import { BaseQuantityVO } from '@vubon/shared-kernel/domain/primitives';

const MAX_SECONDS = 24 * 60 * 60; // 24 hours

export class SessionDurationVO extends BaseQuantityVO {
  private constructor(seconds: number) {
    super(seconds);
  }

  static create(seconds: number): SessionDurationVO {
    if (typeof seconds !== 'number' || !Number.isFinite(seconds)) {
      throw new Error('SessionDuration must be a finite number');
    }
    if (!Number.isInteger(seconds)) {
      throw new Error('SessionDuration must be an integer (seconds)');
    }
    if (seconds < 0) {
      throw new Error('SessionDuration cannot be negative');
    }
    if (seconds > MAX_SECONDS) {
      throw new Error(
        `SessionDuration exceeds ${MAX_SECONDS}s (24 hours) — likely invalid`
      );
    }
    return new SessionDurationVO(seconds);
  }

  static zero(): SessionDurationVO {
    return SessionDurationVO.create(0);
  }

  get seconds(): number {
    return this.value;
  }

  get minutes(): number {
    return Math.round((this.value / 60) * 100) / 100;
  }

  /** Bounce session (< 10s) */
  isBounce(): boolean {
    return this.value < 10;
  }

  /** Short session (10-30s) */
  isShort(): boolean {
    return this.value >= 10 && this.value < 30;
  }

  /** Medium session (30s - 3min) */
  isMedium(): boolean {
    return this.value >= 30 && this.value < 180;
  }

  /** Engaged session (>= 3min) */
  isEngaged(): boolean {
    return this.value >= 180;
  }

  /** Deep engagement (>= 10min) */
  isDeep(): boolean {
    return this.value >= 600;
  }

  /** Duration bucket for reporting */
  toBucket(): 'bounce' | 'short' | 'medium' | 'engaged' | 'deep' {
    if (this.isBounce()) return 'bounce';
    if (this.isShort()) return 'short';
    if (this.isMedium()) return 'medium';
    if (this.isDeep()) return 'deep';
    return 'engaged';
  }

  add(other: SessionDurationVO): SessionDurationVO {
    return SessionDurationVO.create(this.value + other.value);
  }
}
