import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ReportIdVO } from '../value-objects/primitives/report-id.vo';
import { ReportTypeVO } from '../value-objects/primitives/report-type.vo';
import { ReportFormatVO } from '../value-objects/primitives/report-format.vo';
import { ReportStatusVO } from '../value-objects/primitives/report-status.vo';
import { ReportFrequencyVO } from '../value-objects/primitives/report-frequency.vo';
import {
  ReportGeneratedEvent,
  ReportScheduledEvent,
} from '../events/report.events';

export interface ReportEntityProps {
  readonly type: ReportTypeVO;
  readonly format: ReportFormatVO;
  readonly status: ReportStatusVO;
  readonly frequency: ReportFrequencyVO | null;
  readonly ownerId: string;
  readonly generatedAt: Date | null;
  readonly nextRunAt: Date | null;
  readonly rowCount: number;
  readonly filterCount: number;
}

const MAX_ROWS = 100_000;
const MAX_FILTERS = 50;

export class ReportEntity extends AggregateRoot<ReportIdVO> {
  private readonly _type: ReportTypeVO;
  private readonly _format: ReportFormatVO;
  private readonly _status: ReportStatusVO;
  private readonly _frequency: ReportFrequencyVO | null;
  private readonly _ownerId: string;
  private readonly _generatedAt: Date | null;
  private readonly _nextRunAt: Date | null;
  private readonly _rowCount: number;
  private readonly _filterCount: number;

  private constructor(
    id: ReportIdVO,
    props: ReportEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._type = props.type;
    this._format = props.format;
    this._status = props.status;
    this._frequency = props.frequency;
    this._ownerId = props.ownerId;
    this._generatedAt = props.generatedAt;
    this._nextRunAt = props.nextRunAt;
    this._rowCount = props.rowCount;
    this._filterCount = props.filterCount;
  }

  static create(props: {
    readonly type: ReportTypeVO;
    readonly format: ReportFormatVO;
    readonly ownerId: string;
    readonly frequency?: ReportFrequencyVO | null;
  }): ReportEntity {
    if (!props.ownerId) {
      throw new Error('Report owner is required');
    }
    const now = new Date().toISOString();
    const id = ReportIdVO.create(crypto.randomUUID());
    return new ReportEntity(
      id,
      {
        type: props.type,
        format: props.format,
        status: ReportStatusVO.pending(),
        frequency: props.frequency ?? null,
        ownerId: props.ownerId,
        generatedAt: null,
        nextRunAt: null,
        rowCount: 0,
        filterCount: 0,
      },
      now,
      now,
      null,
    );
  }

  static reconstitute(
    id: ReportIdVO,
    props: ReportEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): ReportEntity {
    return new ReportEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  /**
   * Mark as generated with row count validation.
   */
  markGenerated(rowCount: number): ReportEntity {
    if (!this._status.isInProgress) {
      throw new Error(`Cannot generate report in status: ${this._status.value}`);
    }
    if (rowCount < 0) {
      throw new Error('Row count cannot be negative');
    }
    if (rowCount > MAX_ROWS) {
      throw new Error(`Row count exceeds limit: ${rowCount} > ${MAX_ROWS}`);
    }
    if (this._filterCount > MAX_FILTERS) {
      throw new Error(`Too many filters: ${this._filterCount} > ${MAX_FILTERS}`);
    }

    const now = new Date();
    const updated = new ReportEntity(
      this.id,
      {
        ...this._toProps(),
        status: ReportStatusVO.completed(),
        generatedAt: now,
        rowCount,
      },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new ReportGeneratedEvent(
        this.id.value,
        this.id.value,
        this._type.value,
        this.version + 1,
      ),
    );
    return updated;
  }

  markFailed(): ReportEntity {
    const now = new Date();
    return new ReportEntity(
      this.id,
      { ...this._toProps(), status: ReportStatusVO.failed() },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
  }

  schedule(): ReportEntity {
    if (!this._frequency || !this._frequency.isRecurring) {
      throw new Error('Cannot schedule non-recurring report');
    }
    const now = new Date();
    const next = this._frequency.nextRunAt(now);
    const updated = new ReportEntity(
      this.id,
      { ...this._toProps(), nextRunAt: next },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new ReportScheduledEvent(
        this.id.value,
        this.id.value,
        next?.toISOString() ?? '',
        this.version + 1,
      ),
    );
    return updated;
  }

  withFilters(filterCount: number): ReportEntity {
    if (filterCount < 0) throw new Error('Filter count cannot be negative');
    if (filterCount > MAX_FILTERS) {
      throw new Error(`Too many filters: ${filterCount}`);
    }
    return new ReportEntity(
      this.id,
      { ...this._toProps(), filterCount },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get type(): ReportTypeVO { return this._type; }
  get format(): ReportFormatVO { return this._format; }
  get status(): ReportStatusVO { return this._status; }
  get frequency(): ReportFrequencyVO | null { return this._frequency; }
  get ownerId(): string { return this._ownerId; }
  get generatedAt(): Date | null { return this._generatedAt; }
  get nextRunAt(): Date | null { return this._nextRunAt; }
  get rowCount(): number { return this._rowCount; }
  get filterCount(): number { return this._filterCount; }

  get isReady(): boolean {
    return this._status.value === 'completed';
  }

  isOwnedBy(userId: string): boolean {
    return this._ownerId === userId;
  }

  isStale(maxAgeMs = 7 * 24 * 60 * 60 * 1000): boolean {
    if (!this._generatedAt) return true;
    return Date.now() - this._generatedAt.getTime() > maxAgeMs;
  }

  private _toProps(): ReportEntityProps {
    return {
      type: this._type,
      format: this._format,
      status: this._status,
      frequency: this._frequency,
      ownerId: this._ownerId,
      generatedAt: this._generatedAt,
      nextRunAt: this._nextRunAt,
      rowCount: this._rowCount,
      filterCount: this._filterCount,
    };
  }
}
