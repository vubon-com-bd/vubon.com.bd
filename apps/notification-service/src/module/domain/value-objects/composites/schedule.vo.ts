/**
 * ScheduleVO — scheduled/recurring notification snapshot
 * @module notification-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ScheduleIdVO } from '../primitives/schedule-id.vo.js';
import { ScheduleTypeVO } from '../primitives/schedule-type.vo.js';
import { ScheduleStatusVO } from '../primitives/schedule-status.vo.js';
import { ScheduleRecurrenceVO } from '../primitives/schedule-recurrence.vo.js';

export interface ScheduleVOProps {
  readonly id: ScheduleIdVO;
  readonly type: ScheduleTypeVO;
  readonly status: ScheduleStatusVO;
  readonly recurrence: ScheduleRecurrenceVO;
  readonly scheduledAt: string;
  readonly timezone: string;
  readonly nextOccurrenceAt?: string;
  readonly occurrenceCount: number;
  readonly notificationTemplateId?: string;
  readonly userId?: string;
  readonly createdBy: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class ScheduleVO extends BaseVO<ScheduleVOProps> {
  private constructor(props: ScheduleVOProps) {
    super(props);
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
    if (v.type.requiresRecurrence() && v.recurrence.isNone()) {
      throw new ValidationError(
        'Recurring schedule requires a recurrence pattern',
        'recurrence',
      );
    }
    if (v.occurrenceCount < 0) {
      throw new ValidationError('Occurrence count cannot be negative', 'occurrenceCount');
    }
  }

  get id(): ScheduleIdVO { return this.value.id; }
  get type(): ScheduleTypeVO { return this.value.type; }
  get status(): ScheduleStatusVO { return this.value.status; }
  get recurrence(): ScheduleRecurrenceVO { return this.value.recurrence; }
  get scheduledAt(): string { return this.value.scheduledAt; }
  get timezone(): string { return this.value.timezone; }
  get nextOccurrenceAt(): string | undefined { return this.value.nextOccurrenceAt; }
  get occurrenceCount(): number { return this.value.occurrenceCount; }
  get notificationTemplateId(): string | undefined { return this.value.notificationTemplateId; }
  get userId(): string | undefined { return this.value.userId; }
  get createdBy(): string { return this.value.createdBy; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isRecurring(): boolean { return this.value.type.isRecurring(); }
  isActive(): boolean { return this.value.status.isActive(); }
}
