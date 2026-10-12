/**
 * SlaVO — service-level-agreement deadline + breach state
 * @module logistics-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export interface SlaValue {
  readonly dueAt: string;
  readonly startedAt: string;
  readonly breachedAt?: string;
}

export class SlaVO extends BaseVO<SlaValue> {
  private constructor(value: SlaValue) { super(value); }

  static create(startedAt: string, hoursToDeadline: number): SlaVO {
    if (!Number.isFinite(hoursToDeadline) || hoursToDeadline <= 0) {
      throw new ValidationError('SLA hours must be positive', 'hoursToDeadline');
    }
    const startMs = new Date(startedAt).getTime();
    if (Number.isNaN(startMs)) {
      throw new ValidationError('Invalid startedAt', 'startedAt');
    }
    const dueAt = new Date(startMs + hoursToDeadline * 60 * 60 * 1000).toISOString();
    return new SlaVO({ startedAt, dueAt });
  }

  static reconstitute(value: SlaValue): SlaVO {
    return new SlaVO(value);
  }

  get dueAt(): string { return this.value.dueAt; }
  get startedAt(): string { return this.value.startedAt; }
  get breachedAt(): string | undefined { return this.value.breachedAt; }

  isBreached(at: Date = new Date()): boolean {
    return at.getTime() > new Date(this.value.dueAt).getTime();
  }

  isBreachedRecorded(): boolean { return this.value.breachedAt !== undefined; }

  /** Remaining minutes (negative if breached). */
  remainingMinutes(at: Date = new Date()): number {
    return Math.round((new Date(this.value.dueAt).getTime() - at.getTime()) / 60000);
  }

  /** Percent of SLA budget consumed. */
  elapsedPercent(at: Date = new Date()): number {
    const start = new Date(this.value.startedAt).getTime();
    const due = new Date(this.value.dueAt).getTime();
    const total = due - start;
    if (total <= 0) return 100;
    const used = at.getTime() - start;
    return Math.min(100, Math.max(0, Math.round((used / total) * 100)));
  }

  withBreach(at: Date = new Date()): SlaVO {
    return SlaVO.reconstitute({ ...this.value, breachedAt: at.toISOString() });
  }
}
