import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { WebhookIdVO } from '../value-objects/primitives/webhook-id.vo';
import { WebhookStatusVO } from '../value-objects/primitives/webhook-status.vo';
import { WebhookTypeVO } from '../value-objects/primitives/webhook-type.vo';
import { WebhookUrlVO } from '../value-objects/primitives/webhook-url.vo';
import { WebhookSecretVO } from '../value-objects/primitives/webhook-secret.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface WebhookEntityProps {
  readonly userId: UserIdVO;
  readonly type: WebhookTypeVO;
  readonly url: WebhookUrlVO;
  readonly secret: WebhookSecretVO;
  readonly status: WebhookStatusVO;
  readonly events: readonly string[];
}

export class WebhookEntity extends AggregateRoot<WebhookIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _type: WebhookTypeVO;
  private readonly _url: WebhookUrlVO;
  private readonly _secret: WebhookSecretVO;
  private readonly _status: WebhookStatusVO;
  private readonly _events: readonly string[];

  private constructor(
    id: WebhookIdVO,
    props: WebhookEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._type = props.type;
    this._url = props.url;
    this._secret = props.secret;
    this._status = props.status;
    this._events = Object.freeze([...props.events]);
  }

  static create(props: WebhookEntityProps): WebhookEntity {
    const now = new Date().toISOString();
    const id = WebhookIdVO.create(crypto.randomUUID());
    return new WebhookEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: WebhookIdVO,
    props: WebhookEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): WebhookEntity {
    return new WebhookEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  deactivate(): WebhookEntity {
    return new WebhookEntity(
      this.id,
      { ...this._toProps(), status: WebhookStatusVO.create('inactive') },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get userId(): UserIdVO { return this._userId; }
  get type(): WebhookTypeVO { return this._type; }
  get url(): WebhookUrlVO { return this._url; }
  get secret(): WebhookSecretVO { return this._secret; }
  get status(): WebhookStatusVO { return this._status; }
  get events(): readonly string[] { return this._events; }

  private _toProps(): WebhookEntityProps {
    return {
      userId: this._userId,
      type: this._type,
      url: this._url,
      secret: this._secret,
      status: this._status,
      events: this._events,
    };
  }
}
