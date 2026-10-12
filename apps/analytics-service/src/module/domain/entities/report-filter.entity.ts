/**
 * Report Filter Entity
 * @module analytics-service/domain/entities
 *
 * Filter conditions attached to a report.
 * Business Rule:
 * - 1:N with Report
 * - Immutable after creation
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base';
import { ReportIdVO } from '../value-objects/primitives/report-id.vo.js';
import { ReportFilterVO } from '../value-objects/composites/report-filter.vo.js';

export interface ReportFilterEntityProps {
  readonly reportId: ReportIdVO;
  readonly filter: ReportFilterVO;
}

export class ReportFilterEntity extends BaseEntity<string> {
  private props: ReportFilterEntityProps;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: ReportFilterEntityProps
  ) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  static create(params: {
    id: string;
    reportId: ReportIdVO;
    filter: ReportFilterVO;
    now: string;
  }): ReportFilterEntity {
    if (!params.reportId || !params.filter) {
      throw new Error('ReportFilterEntity requires reportId, filter');
    }
    return new ReportFilterEntity(
      params.id,
      params.now,
      params.now,
      { reportId: params.reportId, filter: params.filter }
    );
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: ReportFilterEntityProps;
  }): ReportFilterEntity {
    return new ReportFilterEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props
    );
  }

  get reportId(): ReportIdVO { return this.props.reportId; }
  get filter(): ReportFilterVO { return this.props.filter; }

  conditionCount(): number {
    return this.props.filter.count();
  }

  isEmpty(): boolean {
    return this.props.filter.isEmpty();
  }
}
