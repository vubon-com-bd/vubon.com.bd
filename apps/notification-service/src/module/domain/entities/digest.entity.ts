import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { DigestIdVO } from '../value-objects/primitives/digest-id.vo';
import { DigestStatusVO } from '../value-objects/primitives/digest-status.vo';
import { DigestTypeVO } from '../value-objects/primitives/digest-type.vo';
import { DigestPeriodVO } from '../value-objects/primitives/digest-period.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface DigestEntityProps {
  readonly userId: UserIdVO;
  readonly type: DigestTypeVO;
  readonly status: DigestStatusVO;
  readonly period: DigestPeriodVO;
  readonly scheduledAt: Date;
  readonly sentAt: Date | null;
}

export class DigestEntity extends AggregateRoot<DigestIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _type: DigestTypeVO;
  private readonly _status: DigestStatusVO;
  private readonly _period: DigestPeriodVO;
  private readonly _scheduledAt: Date;
  private readonly _sentAt: Date | null;

  private constructor(
    id: DigestIdVO,
    props: DigestEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._type = props.type;
    this._status = props.status;
    this._period = props.period;
    this._scheduledAt = props.scheduledAt;
    this._sentAt = props.sentAt;
  }

  static create(props: DigestEntityProps): DigestEntity {
    const now = new Date().toISOString();
    const id = DigestIdVO.create(crypto.randomUUID());
    return new DigestEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: DigestIdVO,
    props: DigestEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): DigestEntity {
    return new DigestEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  markAsSent(): DigestEntity {
    const now = new Date();
    return new DigestEntity(
      this.id,
      { ...this._toProps(), status: DigestStatusVO.create('sent'), sentAt: now },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
  }

  get userId(): UserIdVO { return this._userId; }
  get type(): DigestTypeVO { return this._type; }
  get status(): DigestStatusVO { return this._status; }
  get period(): DigestPeriodVO { return this._period; }
  get scheduledAt(): Date { return this._scheduledAt; }
  get sentAt(): Date | null { return this._sentAt; }

  private _toProps(): DigestEntityProps {
    return {
      userId: this._userId,
      type: this._type,
      status: this._status,
      period: this._period,
      scheduledAt: this._scheduledAt,
      sentAt: this._sentAt,
    };
  }
}
