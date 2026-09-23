import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { LeadIdVO } from '../value-objects/primitives/lead-id.vo';
import { LeadNameVO } from '../value-objects/primitives/lead-name.vo';
import { LeadEmailVO } from '../value-objects/primitives/lead-email.vo';
import { LeadStatusVO } from '../value-objects/primitives/lead-status.vo';
import { LeadSourceVO } from '../value-objects/primitives/lead-source.vo';
import { LeadScoreVO } from '../value-objects/primitives/lead-score.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import {
  LeadCreatedEvent,
  LeadQualifiedEvent,
  LeadConvertedEvent,
  LeadLostEvent,
} from '../events/lead.events';

export interface LeadEntityProps {
  readonly name: LeadNameVO;
  readonly email: LeadEmailVO;
  readonly status: LeadStatusVO;
  readonly source: LeadSourceVO;
  readonly score: LeadScoreVO;
  readonly assignedTo: UserIdVO | null;
}

export class LeadEntity extends AggregateRoot<LeadIdVO> {
  private readonly _name: LeadNameVO;
  private readonly _email: LeadEmailVO;
  private readonly _status: LeadStatusVO;
  private readonly _source: LeadSourceVO;
  private readonly _score: LeadScoreVO;
  private readonly _assignedTo: UserIdVO | null;

  private constructor(
    id: LeadIdVO,
    props: LeadEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._email = props.email;
    this._status = props.status;
    this._source = props.source;
    this._score = props.score;
    this._assignedTo = props.assignedTo;
  }

  static create(props: LeadEntityProps): LeadEntity {
    const now = new Date().toISOString();
    const id = LeadIdVO.create(crypto.randomUUID());
    const entity = new LeadEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new LeadCreatedEvent(id.value, props.email.value, 0),
    );
    return entity;
  }

  static reconstitute(
    id: LeadIdVO,
    props: LeadEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): LeadEntity {
    return new LeadEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  qualify(): LeadEntity {
    const now = new Date();
    const updated = new LeadEntity(
      this.id,
      { ...this._toProps(), status: LeadStatusVO.create('qualified') },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new LeadQualifiedEvent(this.id.value, this._score.value, this.version + 1),
    );
    return updated;
  }

  convert(userId: UserIdVO): LeadEntity {
    const now = new Date();
    const updated = new LeadEntity(
      this.id,
      { ...this._toProps(), status: LeadStatusVO.create('converted') },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new LeadConvertedEvent(this.id.value, userId.value, this.version + 1),
    );
    return updated;
  }

  lose(reason: string): LeadEntity {
    const now = new Date();
    const updated = new LeadEntity(
      this.id,
      { ...this._toProps(), status: LeadStatusVO.create('lost') },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new LeadLostEvent(this.id.value, reason, this.version + 1),
    );
    return updated;
  }

  get name(): LeadNameVO { return this._name; }
  get email(): LeadEmailVO { return this._email; }
  get status(): LeadStatusVO { return this._status; }
  get source(): LeadSourceVO { return this._source; }
  get score(): LeadScoreVO { return this._score; }
  get assignedTo(): UserIdVO | null { return this._assignedTo; }

  private _toProps(): LeadEntityProps {
    return {
      name: this._name,
      email: this._email,
      status: this._status,
      source: this._source,
      score: this._score,
      assignedTo: this._assignedTo,
    };
  }
}
