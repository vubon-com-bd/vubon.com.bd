import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { KpiIdVO } from '../value-objects/primitives/kpi-id.vo';

export interface KpiResultEntityProps {
  readonly kpiId: KpiIdVO;
  readonly actual: number;
  readonly target: number;
  readonly achievementPercent: number;
  readonly status: string;
  readonly evaluatedAt: Date;
}

export class KpiResultEntity extends BaseEntity<string> {
  private readonly _kpiId: KpiIdVO;
  private readonly _actual: number;
  private readonly _target: number;
  private readonly _achievementPercent: number;
  private readonly _status: string;
  private readonly _evaluatedAt: Date;

  private constructor(
    id: string,
    props: KpiResultEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._kpiId = props.kpiId;
    this._actual = props.actual;
    this._target = props.target;
    this._achievementPercent = props.achievementPercent;
    this._status = props.status;
    this._evaluatedAt = props.evaluatedAt;
  }

  static create(props: KpiResultEntityProps): KpiResultEntity {
    const now = new Date().toISOString();
    return new KpiResultEntity(crypto.randomUUID(), props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: KpiResultEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): KpiResultEntity {
    return new KpiResultEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get kpiId(): KpiIdVO { return this._kpiId; }
  get actual(): number { return this._actual; }
  get target(): number { return this._target; }
  get achievementPercent(): number { return this._achievementPercent; }
  get status(): string { return this._status; }
  get evaluatedAt(): Date { return this._evaluatedAt; }

  get isAchieved(): boolean { return this._status === 'achieved'; }
  get variance(): number { return this._actual - this._target; }
}
