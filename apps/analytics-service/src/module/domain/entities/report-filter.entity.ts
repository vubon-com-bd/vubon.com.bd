import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ReportIdVO } from '../value-objects/primitives/report-id.vo';
import { ReportFilterVO } from '../value-objects/composites/report-filter.vo';

export interface ReportFilterEntityProps {
  readonly reportId: ReportIdVO;
  readonly filters: readonly ReportFilterVO[];
  readonly logic: 'and' | 'or';
}

export class ReportFilterEntity extends BaseEntity<string> {
  private readonly _reportId: ReportIdVO;
  private readonly _filters: readonly ReportFilterVO[];
  private readonly _logic: 'and' | 'or';

  private constructor(
    id: string,
    props: ReportFilterEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._reportId = props.reportId;
    this._filters = Object.freeze([...props.filters]);
    this._logic = props.logic;
  }

  static create(props: ReportFilterEntityProps): ReportFilterEntity {
    const now = new Date().toISOString();
    return new ReportFilterEntity(crypto.randomUUID(), props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: ReportFilterEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): ReportFilterEntity {
    return new ReportFilterEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get reportId(): ReportIdVO { return this._reportId; }
  get filters(): readonly ReportFilterVO[] { return this._filters; }
  get logic(): 'and' | 'or' { return this._logic; }

  /**
   * Evaluate filters against a record.
   * Applies AND/OR logic across all filters.
   */
  matches(record: Readonly<Record<string, unknown>>): boolean {
    if (this._filters.length === 0) return true;

    const results = this._filters.map((f) => f.matches(record[f.field]));

    return this._logic === 'and'
      ? results.every(Boolean)
      : results.some(Boolean);
  }

  isEmpty(): boolean {
    return this._filters.length === 0;
  }
}
