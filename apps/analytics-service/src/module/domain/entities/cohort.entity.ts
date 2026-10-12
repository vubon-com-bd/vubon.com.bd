/**
 * Cohort Entity (Aggregate Root)
 * @module analytics-service/domain/entities
 *
 * Cohort definition + analysis lifecycle.
 * Business Rule:
 * - Period + range consistency
 * - Retention analysis published
 * - Historical results tracked
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base';
import { CohortIdVO } from '../value-objects/primitives/cohort-id.vo.js';
import { CohortNameVO } from '../value-objects/primitives/cohort-name.vo.js';
import { CohortPeriodVO } from '../value-objects/primitives/cohort-period.vo.js';
import { TimeRangeVO } from '../value-objects/composites/time-range.vo.js';
import { CohortAnalysisVO } from '../value-objects/composites/cohort-analysis.vo.js';
import { CohortCreatedEvent } from '../events/cohort.events.js';
import { CohortAnalyzedEvent } from '../events/cohort.events.js';

export interface CohortEntityProps {
  readonly name: CohortNameVO;
  readonly period: CohortPeriodVO;
  readonly range: TimeRangeVO;
  readonly description?: string;
  isActive: boolean;
  lastAnalysis?: CohortAnalysisVO;
  lastAnalyzedAt?: string;
}

export class CohortEntity extends AggregateRoot<string> {
  private props: CohortEntityProps;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: CohortEntityProps
  ) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  static create(params: {
    id: CohortIdVO;
    name: CohortNameVO;
    period: CohortPeriodVO;
    range: TimeRangeVO;
    description?: string;
    now: string;
  }): CohortEntity {
    if (!params.id || !params.name || !params.period || !params.range) {
      throw new Error('CohortEntity requires id, name, period, range');
    }

    const daysPerPeriod = params.period.daysPerPeriod();
    if (params.range.spanDays() < daysPerPeriod) {
      throw new Error(
        `Cohort range (${params.range.spanDays()}d) must be at least one period (${daysPerPeriod}d)`
      );
    }

    const entity = new CohortEntity(
      params.id.value,
      params.now,
      params.now,
      {
        name: params.name,
        period: params.period,
        range: params.range,
        description: params.description?.trim(),
        isActive: true,
      }
    );

    entity.addDomainEvent(
      new CohortCreatedEvent(params.id.value, params.name.value, params.now)
    );
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: CohortEntityProps;
  }): CohortEntity {
    return new CohortEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props
    );
  }

  get name(): CohortNameVO { return this.props.name; }
  get period(): CohortPeriodVO { return this.props.period; }
  get range(): TimeRangeVO { return this.props.range; }
  get description(): string | undefined { return this.props.description; }
  get isActive(): boolean { return this.props.isActive; }
  get lastAnalysis(): CohortAnalysisVO | undefined { return this.props.lastAnalysis; }
  get lastAnalyzedAt(): string | undefined { return this.props.lastAnalyzedAt; }

  /**
   * Business Action: Record analysis result
   */
  recordAnalysis(analysis: CohortAnalysisVO, now: string): void {
    if (!this.props.isActive) {
      throw new Error('Cannot analyze inactive cohort');
    }
    if (!analysis) {
      throw new Error('Analysis required');
    }

    this.props.lastAnalysis = analysis;
    this.props.lastAnalyzedAt = now;

    this.addDomainEvent(
      new CohortAnalyzedEvent(
        this.id,
        analysis.cohortSize,
        analysis.periodCount(),
        now
      )
    );
    this.incrementVersion();
  }

  activate(): void {
    if (this.props.isActive) return;
    this.props.isActive = true;
    this.incrementVersion();
  }

  deactivate(): void {
    if (!this.props.isActive) return;
    this.props.isActive = false;
    this.incrementVersion();
  }

  bucketCount(): number {
    return Math.max(1, Math.floor(this.range.spanDays() / this.period.daysPerPeriod()));
  }

  maxRetentionPeriods(): number {
    return this.period.maxRetentionPeriods();
  }
}
