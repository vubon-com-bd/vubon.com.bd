/**
 * Report Entity (Aggregate Root)
 * @module analytics-service/domain/entities
 *
 * Analytics report with lifecycle (pending → processing → completed/failed)।
 * Business Rule:
 * - Scheduled report needs frequency != once
 * - One-time report cannot have nextRunAt
 * - Status transitions validated
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base';
import { ReportIdVO } from '../value-objects/primitives/report-id.vo.js';
import { ReportTypeVO } from '../value-objects/primitives/report-type.vo.js';
import { ReportFormatVO } from '../value-objects/primitives/report-format.vo.js';
import { ReportStatusVO } from '../value-objects/primitives/report-status.vo.js';
import { ReportFrequencyVO } from '../value-objects/primitives/report-frequency.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { TimeRangeVO } from '../value-objects/composites/time-range.vo.js';
import { ReportGeneratedEvent } from '../events/report.events.js';
import { ReportScheduledEvent } from '../events/report.events.js';

export interface ReportEntityProps {
  readonly name: string;
  readonly type: ReportTypeVO;
  readonly format: ReportFormatVO;
  status: ReportStatusVO;
  readonly frequency: ReportFrequencyVO;
  readonly range: TimeRangeVO;
  readonly ownerId: UserIdVO;
  nextRunAt?: string | null;
  lastRunAt?: string | null;
  outputUrl?: string | null;
  rowCount?: number;
  failureReason?: string | null;
}

export class ReportEntity extends AggregateRoot<string> {
  private props: ReportEntityProps;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: ReportEntityProps
  ) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  static create(params: {
    id: ReportIdVO;
    name: string;
    type: ReportTypeVO;
    format: ReportFormatVO;
    frequency: ReportFrequencyVO;
    range: TimeRangeVO;
    ownerId: UserIdVO;
    now: string;
  }): ReportEntity {
    if (!params.id || !params.name || !params.type || !params.format || !params.frequency || !params.range || !params.ownerId) {
      throw new Error('ReportEntity requires all core fields');
    }
    const trimmedName = params.name.trim();
    if (trimmedName.length === 0 || trimmedName.length > 200) {
      throw new Error('Report name must be 1-200 chars');
    }

    const nextRunAt = params.frequency.isRecurring()
      ? new Date(Date.now() + 60000).toISOString()
      : null;

    const entity = new ReportEntity(
      params.id.value,
      params.now,
      params.now,
      {
        name: trimmedName,
        type: params.type,
        format: params.format,
        status: ReportStatusVO.pending(),
        frequency: params.frequency,
        range: params.range,
        ownerId: params.ownerId,
        nextRunAt,
        lastRunAt: null,
        outputUrl: null,
        rowCount: 0,
        failureReason: null,
      }
    );

    if (params.frequency.isRecurring() && nextRunAt) {
      entity.addDomainEvent(
        new ReportScheduledEvent(
          params.id.value,
          params.frequency.value,
          nextRunAt,
          params.now
        )
      );
    }

    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: ReportEntityProps;
  }): ReportEntity {
    return new ReportEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props
    );
  }

  get name(): string { return this.props.name; }
  get type(): ReportTypeVO { return this.props.type; }
  get format(): ReportFormatVO { return this.props.format; }
  get status(): ReportStatusVO { return this.props.status; }
  get frequency(): ReportFrequencyVO { return this.props.frequency; }
  get range(): TimeRangeVO { return this.props.range; }
  get ownerId(): UserIdVO { return this.props.ownerId; }
  get nextRunAt(): string | null | undefined { return this.props.nextRunAt; }
  get lastRunAt(): string | null | undefined { return this.props.lastRunAt; }
  get outputUrl(): string | null | undefined { return this.props.outputUrl; }
  get rowCount(): number | undefined { return this.props.rowCount; }
  get failureReason(): string | null | undefined { return this.props.failureReason; }

  startProcessing(now: string): void {
    if (!this.props.status.isPending()) {
      throw new Error(`Cannot start processing from "${this.props.status.value}"`);
    }
    this.props.status = ReportStatusVO.processing();
    this.incrementVersion();
  }

  complete(params: {
    outputUrl: string;
    rowCount: number;
    now: string;
  }): void {
    if (!this.props.status.isProcessing()) {
      throw new Error('Cannot complete — report not processing');
    }
    if (!params.outputUrl || params.outputUrl.trim().length === 0) {
      throw new Error('Output URL required');
    }
    if (params.rowCount < 0) {
      throw new Error('rowCount cannot be negative');
    }

    this.props.status = ReportStatusVO.completed();
    this.props.outputUrl = params.outputUrl;
    this.props.rowCount = params.rowCount;
    this.props.lastRunAt = params.now;

    // Schedule next run for recurring
    if (this.props.frequency.isRecurring()) {
      const intervalMs = this.props.frequency.intervalDays() * 24 * 60 * 60 * 1000;
      this.props.nextRunAt = new Date(Date.now() + intervalMs).toISOString();
    } else {
      this.props.nextRunAt = null;
    }

    this.addDomainEvent(
      new ReportGeneratedEvent(
        this.id,
        this.props.format.value,
        params.rowCount,
        params.now
      )
    );
    this.incrementVersion();
  }

  fail(reason: string, now: string): void {
    if (this.props.status.isTerminal()) {
      throw new Error(`Cannot fail from "${this.props.status.value}"`);
    }
    if (!reason || reason.trim().length === 0) {
      throw new Error('Failure reason required');
    }
    this.props.status = ReportStatusVO.failed();
    this.props.failureReason = reason.trim();
    this.props.lastRunAt = now;
    this.incrementVersion();
  }

  isScheduled(): boolean {
    return this.props.frequency.isRecurring();
  }

  isPending(): boolean {
    return this.props.status.isPending();
  }

  isProcessing(): boolean {
    return this.props.status.isProcessing();
  }

  isCompleted(): boolean {
    return this.props.status.isCompleted();
  }

  isFailed(): boolean {
    return this.props.status.isFailed();
  }

  canBeTriggered(): boolean {
    return (
      this.props.status.isPending() &&
      this.props.frequency.isOnce() &&
      this.props.lastRunAt === null
    );
  }

  isOwnedBy(userId: UserIdVO): boolean {
    return this.props.ownerId.equals(userId);
  }
}
