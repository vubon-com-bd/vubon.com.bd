/**
 * Report Value Object (Composite)
 * @module analytics-service/domain/value-objects/composites
 *
 * Complete report definition।
 * Business Rule:
 * - type + format + range + frequency
 * - Scheduled report needs frequency != once
 * - Owner required
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base';
import { ReportIdVO } from '../primitives/report-id.vo.js';
import { ReportTypeVO } from '../primitives/report-type.vo.js';
import { ReportFormatVO } from '../primitives/report-format.vo.js';
import { ReportStatusVO } from '../primitives/report-status.vo.js';
import { ReportFrequencyVO } from '../primitives/report-frequency.vo.js';
import { UserIdVO } from '../primitives/user-id.vo.js';
import { EventTimestampVO } from '../primitives/event-timestamp.vo.js';
import { TimeRangeVO } from './time-range.vo.js';

export interface ReportVOProps {
  readonly id: ReportIdVO;
  readonly name: string;
  readonly type: ReportTypeVO;
  readonly format: ReportFormatVO;
  readonly status: ReportStatusVO;
  readonly frequency: ReportFrequencyVO;
  readonly range: TimeRangeVO;
  readonly ownerId: UserIdVO;
  readonly createdAt: EventTimestampVO;
  readonly nextRunAt?: EventTimestampVO;
  readonly lastRunAt?: EventTimestampVO;
}

export class ReportVO extends BaseVO<ReportVOProps> {
  private constructor(props: ReportVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: ReportVOProps): ReportVO {
    if (!props.id || !props.name || !props.type || !props.format || !props.status || !props.frequency || !props.range || !props.ownerId || !props.createdAt) {
      throw new Error('ReportVO requires all core fields');
    }

    if (props.name.trim().length === 0 || props.name.length > 200) {
      throw new Error('ReportVO name must be 1-200 chars');
    }

    // Scheduled → nextRunAt required
    if (props.frequency.isRecurring() && !props.nextRunAt) {
      throw new Error('Recurring report requires nextRunAt');
    }

    // Non-scheduled → nextRunAt should not be set
    if (props.frequency.isOnce() && props.nextRunAt) {
      throw new Error('One-time report should not have nextRunAt');
    }

    return new ReportVO(props);
  }

  get id(): ReportIdVO {
    return this.value.id;
  }

  get name(): string {
    return this.value.name;
  }

  get type(): ReportTypeVO {
    return this.value.type;
  }

  get format(): ReportFormatVO {
    return this.value.format;
  }

  get status(): ReportStatusVO {
    return this.value.status;
  }

  get frequency(): ReportFrequencyVO {
    return this.value.frequency;
  }

  get range(): TimeRangeVO {
    return this.value.range;
  }

  get ownerId(): UserIdVO {
    return this.value.ownerId;
  }

  get createdAt(): EventTimestampVO {
    return this.value.createdAt;
  }

  get nextRunAt(): EventTimestampVO | undefined {
    return this.value.nextRunAt;
  }

  get lastRunAt(): EventTimestampVO | undefined {
    return this.value.lastRunAt;
  }

  isScheduled(): boolean {
    return this.frequency.isRecurring();
  }

  isPending(): boolean {
    return this.status.isPending();
  }

  isProcessing(): boolean {
    return this.status.isProcessing();
  }

  isCompleted(): boolean {
    return this.status.isCompleted();
  }

  isFailed(): boolean {
    return this.status.isFailed();
  }

  canBeTriggered(): boolean {
    return (
      this.status.isPending() &&
      this.frequency.isOnce() &&
      this.lastRunAt === undefined
    );
  }

  canBeScheduled(): boolean {
    return this.frequency.isRecurring() && this.nextRunAt !== undefined;
  }

  /** Owned by user */
  isOwnedBy(userId: UserIdVO): boolean {
    return this.ownerId.equals(userId);
  }
}
