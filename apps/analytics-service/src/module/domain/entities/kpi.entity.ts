import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { KpiIdVO } from '../value-objects/primitives/kpi-id.vo';
import { KpiNameVO } from '../value-objects/primitives/kpi-name.vo';
import { KpiTargetVO } from '../value-objects/primitives/kpi-target.vo';
import { KpiThresholdVO } from '../value-objects/primitives/kpi-threshold.vo';
import {
  KpiThresholdReachedEvent,
  KpiBreachEvent,
  KpiExceededEvent,
} from '../events/kpi.events';

export type KpiTier = 'exceeded' | 'achieved' | 'near' | 'below' | 'far';

export interface KpiEvaluationResult {
  readonly status: 'achieved' | 'below' | 'at';
  readonly achievementPercent: number;
  readonly score: number;
  readonly tier: KpiTier;
}

export interface KpiEntityProps {
  readonly name: KpiNameVO;
  readonly target: KpiTargetVO;
  readonly threshold: KpiThresholdVO;
  readonly metricName: string;
}

export class KpiEntity extends AggregateRoot<KpiIdVO> {
  private readonly _name: KpiNameVO;
  private readonly _target: KpiTargetVO;
  private readonly _threshold: KpiThresholdVO;
  private readonly _metricName: string;

  // Static scoring tiers (weighted)
  private static readonly TIERS: readonly {
    readonly min: number;
    readonly score: number;
    readonly tier: KpiTier;
  }[] = [
    { min: 150, score: 100, tier: 'exceeded' },
    { min: 100, score: 90, tier: 'achieved' },
    { min: 80, score: 70, tier: 'near' },
    { min: 50, score: 40, tier: 'below' },
    { min: 0, score: 10, tier: 'far' },
  ];

  private constructor(
    id: KpiIdVO,
    props: KpiEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._target = props.target;
    this._threshold = props.threshold;
    this._metricName = props.metricName;
  }

  static create(props: KpiEntityProps): KpiEntity {
    const now = new Date().toISOString();
    const id = KpiIdVO.create(crypto.randomUUID());
    return new KpiEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: KpiIdVO,
    props: KpiEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): KpiEntity {
    return new KpiEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  /**
   * Evaluate KPI with weighted multi-tier scoring.
   * - Computes achievement %, weighted score, tier.
   * - Publishes domain events based on thresholds.
   */
  evaluate(actual: number): KpiEvaluationResult {
    const achievementPercent = this._target.getAchievementPercent(actual);
    const tierInfo = KpiEntity.TIERS.find((t) => achievementPercent >= t.min)!;
    const score = tierInfo.score;

    // Determine status
    let status: 'achieved' | 'below' | 'at';
    if (this._target.isAchieved(actual)) status = 'achieved';
    else if (this._threshold.isBelow(actual, this._target.numeric)) status = 'below';
    else status = 'at';

    const now = new Date().toISOString();

    // Multi-tier event publishing
    if (tierInfo.tier === 'exceeded') {
      const updated = this._clone(now);
      updated.addDomainEvent(
        new KpiExceededEvent(
          this.id.value,
          this.id.value,
          this._name.value,
          actual,
          this._target.numeric,
          achievementPercent,
          this.version + 1,
        ),
      );
    } else if (tierInfo.tier === 'achieved') {
      const updated = this._clone(now);
      updated.addDomainEvent(
        new KpiThresholdReachedEvent(
          this.id.value,
          this.id.value,
          this._name.value,
          actual,
          this.version + 1,
        ),
      );
    } else if (tierInfo.tier === 'far') {
      const updated = this._clone(now);
      updated.addDomainEvent(
        new KpiBreachEvent(
          this.id.value,
          this.id.value,
          this._name.value,
          actual,
          this._target.numeric,
          this.version + 1,
        ),
      );
    }

    return {
      status,
      achievementPercent,
      score,
      tier: tierInfo.tier,
    };
  }

  get name(): KpiNameVO { return this._name; }
  get target(): KpiTargetVO { return this._target; }
  get threshold(): KpiThresholdVO { return this._threshold; }
  get metricName(): string { return this._metricName; }

  updateTarget(target: KpiTargetVO): KpiEntity {
    return new KpiEntity(
      this.id,
      { ...this._toProps(), target },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  private _clone(now: string): KpiEntity {
    return new KpiEntity(
      this.id,
      this._toProps(),
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
  }

  private _toProps(): KpiEntityProps {
    return {
      name: this._name,
      target: this._target,
      threshold: this._threshold,
      metricName: this._metricName,
    };
  }
}
