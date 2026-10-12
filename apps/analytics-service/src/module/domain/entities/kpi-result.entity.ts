/**
 * KPI Result Entity
 * @module analytics-service/domain/entities
 *
 * Historical KPI evaluation result।
 * Business Rule:
 * - Immutable
 * - Time-series snapshot
 * - Retention: 2 years
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base';
import { KpiResultVO } from '../value-objects/composites/kpi-result.vo.js';

export interface KpiResultEntityProps {
  readonly result: KpiResultVO;
  readonly evaluatedAt: string;
}

export class KpiResultEntity extends BaseEntity<string> {
  private props: KpiResultEntityProps;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: KpiResultEntityProps
  ) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  static create(params: {
    id: string;
    result: KpiResultVO;
    evaluatedAt: string;
    now: string;
  }): KpiResultEntity {
    if (!params.result) {
      throw new Error('KpiResultEntity requires result');
    }
    return new KpiResultEntity(
      params.id,
      params.now,
      params.now,
      {
        result: params.result,
        evaluatedAt: params.evaluatedAt,
      }
    );
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: KpiResultEntityProps;
  }): KpiResultEntity {
    return new KpiResultEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props
    );
  }

  get result(): KpiResultVO { return this.props.result; }
  get evaluatedAt(): string { return this.props.evaluatedAt; }

  isBreached(): boolean { return this.props.result.isBreached(); }
  isAchieved(): boolean { return this.props.result.isAchieved(); }

  /** Age in days */
  ageDays(): number {
    return Math.floor(
      (Date.now() - new Date(this.props.evaluatedAt).getTime()) /
        (24 * 60 * 60 * 1000)
    );
  }
}
