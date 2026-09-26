import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { CohortIdVO } from '../value-objects/primitives/cohort-id.vo';
import { CohortNameVO } from '../value-objects/primitives/cohort-name.vo';
import { CohortPeriodVO } from '../value-objects/primitives/cohort-period.vo';
import {
  CohortCreatedEvent,
  CohortAnalyzedEvent,
} from '../events/cohort.events';

export interface CohortEntityProps {
  readonly name: CohortNameVO;
  readonly period: CohortPeriodVO;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly userIds: readonly string[];
}

export class CohortEntity extends AggregateRoot<CohortIdVO> {
  private readonly _name: CohortNameVO;
  private readonly _period: CohortPeriodVO;
  private readonly _startDate: Date;
  private readonly _endDate: Date;
  private readonly _userIds: readonly string[];

  private constructor(
    id: CohortIdVO,
    props: CohortEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._period = props.period;
    this._startDate = props.startDate;
    this._endDate = props.endDate;
    this._userIds = Object.freeze([...props.userIds]);
  }

  static create(props: CohortEntityProps): CohortEntity {
    if (props.endDate.getTime() < props.startDate.getTime()) {
      throw new Error('Cohort end date cannot be before start date');
    }
    const now = new Date().toISOString();
    const id = CohortIdVO.create(crypto.randomUUID());
    const entity = new CohortEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new CohortCreatedEvent(
        id.value,
        id.value,
        props.name.value,
        props.userIds.length,
        0,
      ),
    );
    return entity;
  }

  static reconstitute(
    id: CohortIdVO,
    props: CohortEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): CohortEntity {
    return new CohortEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  addUser(userId: string): CohortEntity {
    if (this._userIds.includes(userId)) {
      return this;
    }
    return new CohortEntity(
      this.id,
      { ...this._toProps(), userIds: [...this._userIds, userId] },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  markAnalyzed(): CohortEntity {
    const now = new Date().toISOString();
    const updated = new CohortEntity(
      this.id,
      this._toProps(),
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new CohortAnalyzedEvent(this.id.value, this.id.value, this._userIds.length, this.version + 1),
    );
    return updated;
  }

  get name(): CohortNameVO { return this._name; }
  get period(): CohortPeriodVO { return this._period; }
  get startDate(): Date { return this._startDate; }
  get endDate(): Date { return this._endDate; }
  get userIds(): readonly string[] { return this._userIds; }

  get size(): number { return this._userIds.length; }
  get bucketKey(): string { return this._period.bucketFor(this._startDate); }

  containsUser(userId: string): boolean {
    return this._userIds.includes(userId);
  }

  private _toProps(): CohortEntityProps {
    return {
      name: this._name,
      period: this._period,
      startDate: this._startDate,
      endDate: this._endDate,
      userIds: this._userIds,
    };
  }
}
