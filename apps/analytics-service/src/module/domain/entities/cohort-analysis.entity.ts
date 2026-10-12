/**
 * Cohort Analysis Entity
 * @module analytics-service/domain/entities
 *
 * Historical cohort retention analysis snapshot.
 * Business Rule:
 * - Immutable
 * - Time-series
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base';
import { CohortAnalysisVO } from '../value-objects/composites/cohort-analysis.vo.js';

export interface CohortAnalysisEntityProps {
  readonly analysis: CohortAnalysisVO;
  readonly analyzedAt: string;
}

export class CohortAnalysisEntity extends BaseEntity<string> {
  private props: CohortAnalysisEntityProps;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: CohortAnalysisEntityProps
  ) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  static create(params: {
    id: string;
    analysis: CohortAnalysisVO;
    analyzedAt: string;
    now: string;
  }): CohortAnalysisEntity {
    if (!params.analysis) {
      throw new Error('CohortAnalysisEntity requires analysis');
    }
    return new CohortAnalysisEntity(
      params.id,
      params.now,
      params.now,
      { analysis: params.analysis, analyzedAt: params.analyzedAt }
    );
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: CohortAnalysisEntityProps;
  }): CohortAnalysisEntity {
    return new CohortAnalysisEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props
    );
  }

  get analysis(): CohortAnalysisVO { return this.props.analysis; }
  get analyzedAt(): string { return this.props.analyzedAt; }

  isHealthy(): boolean {
    return this.props.analysis.retention1() >= 0.3;
  }

  ageDays(): number {
    return Math.floor(
      (Date.now() - new Date(this.props.analyzedAt).getTime()) / (24 * 60 * 60 * 1000)
    );
  }
}
