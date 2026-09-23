import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { LeadEmailVO } from '../value-objects/primitives/lead-email.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface EmailSubscriberEntityProps {
  readonly email: LeadEmailVO;
  readonly userId: UserIdVO | null;
  readonly status: string;
  readonly subscribedAt: Date;
  readonly unsubscribedAt: Date | null;
}

export class EmailSubscriberEntity extends AggregateRoot<string> {
  private readonly _email: LeadEmailVO;
  private readonly _userId: UserIdVO | null;
  private readonly _status: string;
  private readonly _subscribedAt: Date;
  private readonly _unsubscribedAt: Date | null;

  private constructor(
    id: string,
    props: EmailSubscriberEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._email = props.email;
    this._userId = props.userId;
    this._status = props.status;
    this._subscribedAt = props.subscribedAt;
    this._unsubscribedAt = props.unsubscribedAt;
  }

  static create(props: EmailSubscriberEntityProps): EmailSubscriberEntity {
    const now = new Date().toISOString();
    return new EmailSubscriberEntity(crypto.randomUUID(), props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: EmailSubscriberEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): EmailSubscriberEntity {
    return new EmailSubscriberEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get email(): LeadEmailVO { return this._email; }
  get userId(): UserIdVO | null { return this._userId; }
  get status(): string { return this._status; }
  get subscribedAt(): Date { return this._subscribedAt; }
  get unsubscribedAt(): Date | null { return this._unsubscribedAt; }
}
