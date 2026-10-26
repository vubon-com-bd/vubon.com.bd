/**
 * ScheduleVO — Composite Value Object
 * @module notification-service/domain/value-objects/composites
 *
 * Schedule aggregate-এর immutable core state।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { ScheduleIdVO } from '@domain/primitives/schedule-id.vo.js';
import { ScheduleTypeVO } from '@domain/primitives/schedule-type.vo.js';
import { ScheduleStatusVO } from '@domain/primitives/schedule-status.vo.js';
import { ScheduleFrequencyVO } from '@domain/primitives/schedule-frequency.vo.js';
import { ScheduleTimeVO } from '@domain/primitives/schedule-time.vo.js';
import { TemplateIdVO } from '@domain/primitives/template-id.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';

export interface ScheduleVOProps {
  readonly id: ScheduleIdVO;
  readonly name: string;
  readonly type: ScheduleTypeVO;
  readonly status: ScheduleStatusVO;
  readonly frequency: ScheduleFrequencyVO;
  readonly time: ScheduleTimeVO;
  readonly templateId: TemplateIdVO;
  readonly recipientIds: readonly UserIdVO[];
  readonly cronExpression?: string;
  readonly nextRunAt?: string;
  readonly lastRunAt?: string;
  readonly runCount: number;
}

export class ScheduleVO extends BaseVO<ScheduleVOProps> {
  private constructor(props: ScheduleVOProps) {
    super(Object.freeze(props));
  }

  static create(props: ScheduleVOProps): ScheduleVO {
    const vo = new ScheduleVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: ScheduleVOProps): ScheduleVO {
    return new ScheduleVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!v.name || v.name.trim().length === 0) {
      throw new ValidationError('Schedule name cannot be empty', 'name');
    }
    if (v.runCount < 0) {
      throw new ValidationError('runCount cannot be negative', 'runCount');
    }
    // Recurring schedules require frequency != none
    if (v.type.isRecurring() && v.frequency.isNone()) {
      throw new ValidationError('Recurring schedule requires a frequency', 'frequency');
    }
    // Non-recurring cannot have frequency
    if (!v.type.isRecurring() && !v.frequency.isNone()) {
      throw new ValidationError(
        'Non-recurring schedule must have frequency "none"',
        'frequency',
      );
    }
    // Triggered schedules may omit time — but scheduled/delayed require time
    if ((v.type.isDelayed() || v.type.isRecurring()) && v.time.isPast && !v.lastRunAt) {
      throw new ValidationError(
        'First-run scheduledAt cannot be in the past',
        'scheduledAt',
      );
    }
    if (v.cronExpression !== undefined && !v.type.isRecurring()) {
      throw new ValidationError('cronExpression only allowed for recurring', 'cronExpression');
    }
    if (v.recipientIds.length === 0 && !v.cronExpression) {
      throw new ValidationError('Schedule requires at least one recipient', 'recipientIds');
    }
  }

  get id(): ScheduleIdVO { return this.value.id; }
  get name(): string { return this.value.name; }
  get type(): ScheduleTypeVO { return this.value.type; }
  get status(): ScheduleStatusVO { return this.value.status; }
  get frequency(): ScheduleFrequencyVO { return this.value.frequency; }
  get time(): ScheduleTimeVO { return this.value.time; }
  get templateId(): TemplateIdVO { return this.value.templateId; }
  get recipientIds(): readonly UserIdVO[] { return this.value.recipientIds; }
  get cronExpression(): string | undefined { return this.value.cronExpression; }
  get nextRunAt(): string | undefined { return this.value.nextRunAt; }
  get lastRunAt(): string | undefined { return this.value.lastRunAt; }
  get runCount(): number { return this.value.runCount; }

  isPending(): boolean { return this.status.isPending(); }
  isActive(): boolean { return this.status.isActive(); }
  isPaused(): boolean { return this.status.isPaused(); }
  isCompleted(): boolean { return this.status.isCompleted(); }
  isCancelled(): boolean { return this.status.isCancelled(); }
  isFailed(): boolean { return this.status.isFailed(); }
  isRunnable(): boolean { return this.status.isRunnable(); }
  isTerminal(): boolean { return this.status.isTerminal(); }

  isImmediate(): boolean { return this.type.isImmediate(); }
  isDelayed(): boolean { return this.type.isDelayed(); }
  isRecurring(): boolean { return this.type.isRecurring(); }
  isTriggered(): boolean { return this.type.isTriggered(); }

  hasRecipients(): boolean { return this.value.recipientIds.length > 0; }
  recipientCount(): number { return this.value.recipientIds.length; }

  withStatus(status: ScheduleStatusVO): ScheduleVO {
    return ScheduleVO.create({ ...this.value, status });
  }

  withNextRun(nextRunAt: string | undefined): ScheduleVO {
    return ScheduleVO.create({ ...this.value, nextRunAt });
  }

  recordRun(at: string): ScheduleVO {
    return ScheduleVO.create({
      ...this.value,
      lastRunAt: at,
      runCount: this.value.runCount + 1,
    });
  }
}
