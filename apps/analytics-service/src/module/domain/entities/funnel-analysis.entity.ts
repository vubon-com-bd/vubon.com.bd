/**
 * Funnel Analysis Entity
 * @module analytics-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base';
import { FunnelAnalysisVO } from '../value-objects/composites/funnel-analysis.vo.js';

export interface FunnelAnalysisEntityProps {
  readonly analysis: FunnelAnalysisVO;
  readonly analyzedAt: string;
}

export class FunnelAnalysisEntity extends BaseEntity<string> {
  private props: FunnelAnalysisEntityProps;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: FunnelAnalysisEntityProps
  ) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  static create(params: {
    id: string;
    analysis: FunnelAnalysisVO;
    analyzedAt: string;
    now: string;
  }): FunnelAnalysisEntity {
    if (!params.analysis) {
      throw new Error('FunnelAnalysisEntity requires analysis');
    }
    return new FunnelAnalysisEntity(
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
    props: FunnelAnalysisEntityProps;
  }): FunnelAnalysisEntity {
    return new FunnelAnalysisEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props
    );
  }

  get analysis(): FunnelAnalysisVO { return this.props.analysis; }
  get analyzedAt(): string { return this.props.analyzedAt; }

  isHighConversion(): boolean {
    return this.props.analysis.overallConversionRate() >= 0.5;
  }

  ageDays(): number {
    return Math.floor(
      (Date.now() - new Date(this.props.analyzedAt).getTime()) / (24 * 60 * 60 * 1000)
    );
  }
}
