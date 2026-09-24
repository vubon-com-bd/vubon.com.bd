import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { CohortIdVO } from '../value-objects/primitives/cohort-id.vo';

export interface CohortAnalysisEntityProps {
  readonly cohortId: CohortIdVO;
  readonly initialSize: number;
  readonly retainedAtDay: readonly number[];
  readonly analyzedAt: Date;
}

export class CohortAnalysisEntity extends BaseEntity<string> {
  private readonly _cohortId: CohortIdVO;
  private readonly _initialSize: number;
  private readonly _retainedAtDay: readonly number[];
  private readonly _analyzedAt: Date;

  private constructor(
    id: string,
    props: CohortAnalysisEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._cohortId = props.cohortId;
    this._initialSize = props.initialSize;
    this._retainedAtDay = Object.freeze([...props.retainedAtDay]);
    this._analyzedAt = props.analyzedAt;
  }

  static create(props: CohortAnalysisEntityProps): CohortAnalysisEntity {
    if (props.initialSize < 0) {
      throw new Error('Initial size cannot be negative');
    }
    if (props.retainedAtDay.some((r) => r < 0 || r > props.initialSize)) {
      throw new Error('Retained values must be between 0 and initial size');
    }
    const now = new Date().toISOString();
    return new CohortAnalysisEntity(crypto.randomUUID(), props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: CohortAnalysisEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): CohortAnalysisEntity {
    return new CohortAnalysisEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get cohortId(): CohortIdVO { return this._cohortId; }
  get initialSize(): number { return this._initialSize; }
  get retainedAtDay(): readonly number[] { return this._retainedAtDay; }
  get analyzedAt(): Date { return this._analyzedAt; }

  rateAt(day: number): number {
    if (this._initialSize === 0) return 0;
    const r = this._retainedAtDay[day] ?? 0;
    return (r / this._initialSize) * 100;
  }
}
