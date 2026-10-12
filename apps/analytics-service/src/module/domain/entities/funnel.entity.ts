/**
 * Funnel Entity (Aggregate Root)
 * @module analytics-service/domain/entities
 *
 * Conversion funnel definition + analysis.
 * Business Rule:
 * - Steps sequential
 * - Min 2, max 20 steps
 * - Analysis published on record
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base';
import { FunnelIdVO } from '../value-objects/primitives/funnel-id.vo.js';
import { FunnelStepVO } from '../value-objects/primitives/funnel-step.vo.js';
import { FunnelStageVO } from '../value-objects/primitives/funnel-stage.vo.js';
import { TimeRangeVO } from '../value-objects/composites/time-range.vo.js';
import { FunnelAnalysisVO } from '../value-objects/composites/funnel-analysis.vo.js';
import { FunnelCreatedEvent } from '../events/funnel.events.js';
import { FunnelAnalyzedEvent } from '../events/funnel.events.js';

export interface FunnelEntityProps {
  readonly name: string;
  readonly steps: readonly FunnelStepVO[];
  readonly range: TimeRangeVO;
  readonly stage?: FunnelStageVO;
  isActive: boolean;
  lastAnalysis?: FunnelAnalysisVO;
  lastAnalyzedAt?: string;
}

export class FunnelEntity extends AggregateRoot<string> {
  private props: FunnelEntityProps;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: FunnelEntityProps
  ) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  static create(params: {
    id: FunnelIdVO;
    name: string;
    steps: readonly FunnelStepVO[];
    range: TimeRangeVO;
    stage?: FunnelStageVO;
    now: string;
  }): FunnelEntity {
    if (!params.id || !params.name || !params.steps || !params.range) {
      throw new Error('FunnelEntity requires id, name, steps, range');
    }
    if (params.steps.length < 2 || params.steps.length > 20) {
      throw new Error('Funnel requires 2-20 steps');
    }

    const sortedSteps = [...params.steps].sort((a, b) => a.order - b.order);
    for (let i = 0; i < sortedSteps.length; i++) {
      if (sortedSteps[i].order !== i + 1) {
        throw new Error('Funnel steps must be sequential starting from 1');
      }
    }

    const trimmedName = params.name.trim();
    if (trimmedName.length === 0 || trimmedName.length > 200) {
      throw new Error('Funnel name must be 1-200 chars');
    }

    const entity = new FunnelEntity(
      params.id.value,
      params.now,
      params.now,
      {
        name: trimmedName,
        steps: Object.freeze(sortedSteps),
        range: params.range,
        stage: params.stage,
        isActive: true,
      }
    );

    entity.addDomainEvent(
      new FunnelCreatedEvent(
        params.id.value,
        trimmedName,
        sortedSteps.length,
        params.now
      )
    );
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: FunnelEntityProps;
  }): FunnelEntity {
    return new FunnelEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props
    );
  }

  get name(): string { return this.props.name; }
  get steps(): readonly FunnelStepVO[] { return this.props.steps; }
  get range(): TimeRangeVO { return this.props.range; }
  get stage(): FunnelStageVO | undefined { return this.props.stage; }
  get isActive(): boolean { return this.props.isActive; }
  get lastAnalysis(): FunnelAnalysisVO | undefined { return this.props.lastAnalysis; }
  get lastAnalyzedAt(): string | undefined { return this.props.lastAnalyzedAt; }

  stepCount(): number {
    return this.props.steps.length;
  }

  firstStep(): FunnelStepVO {
    return this.props.steps[0];
  }

  lastStep(): FunnelStepVO {
    return this.props.steps[this.props.steps.length - 1];
  }

  /**
   * Business Action: Record analysis
   */
  recordAnalysis(analysis: FunnelAnalysisVO, now: string): void {
    if (!this.props.isActive) {
      throw new Error('Cannot analyze inactive funnel');
    }
    if (!analysis) {
      throw new Error('Analysis required');
    }
    if (analysis.stepCounts.length !== this.props.steps.length) {
      throw new Error(
        `Analysis step count (${analysis.stepCounts.length}) does not match funnel steps (${this.props.steps.length})`
      );
    }

    this.props.lastAnalysis = analysis;
    this.props.lastAnalyzedAt = now;

    this.addDomainEvent(
      new FunnelAnalyzedEvent(
        this.id,
        analysis.entryCount(),
        analysis.overallConversionRate(),
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
}
