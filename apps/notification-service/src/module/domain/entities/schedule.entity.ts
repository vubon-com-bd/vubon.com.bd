import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ScheduleIdVO } from '../value-objects/primitives/schedule-id.vo';
import { ScheduleStatusVO } from '../value-objects/primitives/schedule-status.vo';
import { ScheduleTypeVO } from '../value-objects/primitives/schedule-type.vo';
import { ScheduleFrequencyVO } from '../value-objects/primitives/schedule-frequency.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface ScheduleEntityProps {
  readonly userId: UserIdVO;
  readonly type: ScheduleTypeVO;
  readonly status: ScheduleStatusVO;
  readonly frequency: ScheduleFrequencyVO;
  readonly nextRunAt: Date;
  readonly lastRunAt: Date | null;
  readonly payload: Readonly<Record<string, unknown>>;
}

export class ScheduleEntity extends AggregateRoot<ScheduleIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _type: ScheduleTypeVO;
  private readonly _status: ScheduleStatusVO;
  private readonly _frequency: ScheduleFrequencyVO;
  private readonly _nextRunAt: Date;
  private readonly _lastRunAt: Date | null;
  private readonly _payload: Readonly<Record<string, unknown>>;

  private constructor(
    id: ScheduleIdVO,
    props: ScheduleEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._type = props.type;
    this._status = props.status;
    this._frequency = props.frequency;
    this._nextRunAt = props.nextRunAt;
    this._lastRunAt = props.lastRunAt;
    this._payload = Object.freeze({ ...props.payload });
  }

  static create(props: ScheduleEntityProps): ScheduleEntity {
    const now = new Date().toISOString();
    const id = ScheduleIdVO.create(crypto.randomUUID());
    return new ScheduleEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: ScheduleIdVO,
    props: ScheduleEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): ScheduleEntity {
    return new ScheduleEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get userId(): UserIdVO { return this._userId; }
  get type(): ScheduleTypeVO { return this._type; }
  get status(): ScheduleStatusVO { return this._status; }
  get frequency(): ScheduleFrequencyVO { return this._frequency; }
  get nextRunAt(): Date { return this._nextRunAt; }
  get lastRunAt(): Date | null { return this._lastRunAt; }
  get payload(): Readonly<Record<string, unknown>> { return this._payload; }
  get isActive(): boolean { return this._status.isActive(); }
}
