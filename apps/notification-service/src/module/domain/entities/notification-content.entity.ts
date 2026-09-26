import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { NotificationIdVO } from '../value-objects/primitives/notification-id.vo';

export interface NotificationContentEntityProps {
  readonly notificationId: NotificationIdVO;
  readonly subject: string;
  readonly body: string;
  readonly bodyHtml: string | null;
  readonly variables: Readonly<Record<string, unknown>>;
}

export class NotificationContentEntity extends BaseEntity<string> {
  private readonly _notificationId: NotificationIdVO;
  private readonly _subject: string;
  private readonly _body: string;
  private readonly _bodyHtml: string | null;
  private readonly _variables: Readonly<Record<string, unknown>>;

  private constructor(
    id: string,
    props: NotificationContentEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._notificationId = props.notificationId;
    this._subject = props.subject;
    this._body = props.body;
    this._bodyHtml = props.bodyHtml;
    this._variables = Object.freeze({ ...props.variables });
  }

  static create(props: NotificationContentEntityProps): NotificationContentEntity {
    const now = new Date().toISOString();
    return new NotificationContentEntity(crypto.randomUUID(), props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: NotificationContentEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): NotificationContentEntity {
    return new NotificationContentEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get notificationId(): NotificationIdVO { return this._notificationId; }
  get subject(): string { return this._subject; }
  get body(): string { return this._body; }
  get bodyHtml(): string | null { return this._bodyHtml; }
  get variables(): Readonly<Record<string, unknown>> { return this._variables; }
}
