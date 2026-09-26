import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { FunnelIdVO } from '../value-objects/primitives/funnel-id.vo';

export interface FunnelAnalysisEntityProps {
  readonly funnelId: FunnelIdVO;
  readonly stepCounts: readonly number[];
  readonly analyzedAt: Date;
}

export class FunnelAnalysisEntity extends BaseEntity<string> {
  private readonly _funnelId: FunnelIdVO;
  private readonly _stepCounts: readonly number[];
  private readonly _analyzedAt: Date;

  private constructor(
    id: string,
    props: FunnelAnalysisEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._funnelId = props.funnelId;
    this._stepCounts = Object.freeze([...props.stepCounts]);
    this._analyzedAt = props.analyzedAt;
  }

  static create(props: FunnelAnalysisEntityProps): FunnelAnalysisEntity {
    if (props.stepCounts.some((c) => c < 0)) {
      throw new Error('Step counts cannot be negative');
    }
    const now = new Date().toISOString();
    return new FunnelAnalysisEntity(crypto.randomUUID(), props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: FunnelAnalysisEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): FunnelAnalysisEntity {
    return new FunnelAnalysisEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get funnelId(): FunnelIdVO { return this._funnelId; }
  get stepCounts(): readonly number[] { return this._stepCounts; }
  get analyzedAt(): Date { return this._analyzedAt; }

  get initialCount(): number {
    return this._stepCounts[0] ?? 0;
  }

  get finalCount(): number {
    return this._stepCounts[this._stepCounts.length - 1] ?? 0;
  }

  get conversionRate(): number {
    if (this.initialCount === 0) return 0;
    return (this.finalCount / this.initialCount) * 100;
  }

  stepConversion(index: number): number {
    if (index <= 0) return 0;
    const prev = this._stepCounts[index - 1] ?? 0;
    const curr = this._stepCounts[index] ?? 0;
    if (prev === 0) return 0;
    return (curr / prev) * 100;
  }
}
