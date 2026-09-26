import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { InsightIdVO } from '../value-objects/primitives/insight-id.vo';
import { InsightStatusVO } from '../value-objects/primitives/insight-status.vo';
import { InsightResultVO } from '../value-objects/composites/insight-result.vo';

export interface InsightEntityProps {
  readonly type: string;
  readonly priority: string;
  readonly status: InsightStatusVO;
  readonly result: InsightResultVO;
  readonly target: string;
}

export class InsightEntity extends AggregateRoot<InsightIdVO> {
  private readonly _type: string;
  private readonly _priority: string;
  private readonly _status: InsightStatusVO;
  private readonly _result: InsightResultVO;
  private readonly _target: string;

  private constructor(
    id: InsightIdVO,
    props: InsightEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._type = props.type;
    this._priority = props.priority;
    this._status = props.status;
    this._result = props.result;
    this._target = props.target;
  }

  static create(props: InsightEntityProps): InsightEntity {
    const now = new Date().toISOString();
    const id = InsightIdVO.create(crypto.randomUUID());
    return new InsightEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: InsightIdVO,
    props: InsightEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): InsightEntity {
    return new InsightEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  dismiss(): InsightEntity {
    return new InsightEntity(
      this.id,
      { ...this._toProps(), status: InsightStatusVO.create('dismissed') },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  isDismissed(): boolean {
    return this._status.isDismissed();
  }

  isHighConfidence(): boolean {
    return this._result.isHighConfidence();
  }

  get type(): string { return this._type; }
  get priority(): string { return this._priority; }
  get status(): InsightStatusVO { return this._status; }
  get result(): InsightResultVO { return this._result; }
  get target(): string { return this._target; }

  private _toProps(): InsightEntityProps {
    return {
      type: this._type,
      priority: this._priority,
      status: this._status,
      result: this._result,
      target: this._target,
    };
  }
}
