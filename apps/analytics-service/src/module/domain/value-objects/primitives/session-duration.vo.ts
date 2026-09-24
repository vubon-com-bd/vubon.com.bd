import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

export class SessionDurationVO extends BaseVO<number> {
  private static readonly MAX_SECONDS = 24 * 60 * 60; // 24h

  static create(seconds: number): SessionDurationVO {
    if (!Number.isFinite(seconds)) {
      throw new Error(`Session duration must be finite: ${seconds}`);
    }
    if (seconds < 0) {
      throw new Error(`Session duration cannot be negative: ${seconds}`);
    }
    if (seconds > SessionDurationVO.MAX_SECONDS) {
      throw new Error(`Session duration too long (max 24h): ${seconds}`);
    }
    return new SessionDurationVO(Math.round(seconds));
  }

  static fromDates(start: Date, end: Date): SessionDurationVO {
    if (end.getTime() < start.getTime()) {
      throw new Error('Session end cannot be before start');
    }
    return SessionDurationVO.create((end.getTime() - start.getTime()) / 1000);
  }

  private constructor(value: number) {
    super(value);
  }

  get seconds(): number {
    return this.value;
  }

  get minutes(): number {
    return Math.round(this.value / 60);
  }

  get hours(): number {
    return Math.round((this.value / 3600) * 100) / 100;
  }

  isBounce(thresholdSeconds = 10): boolean {
    return this.value < thresholdSeconds;
  }
}
