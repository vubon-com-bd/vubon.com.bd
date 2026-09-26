import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface DigestItemEntityProps {
  readonly digestId: string;
  readonly userId: UserIdVO;
  readonly title: string;
  readonly body: string;
  readonly actionUrl: string | null;
}

export class DigestItemEntity extends BaseEntity<string> {
  private readonly _digestId: string;
  private readonly _userId: UserIdVO;
  private readonly _title: string;
  private readonly _body: string;
  private readonly _actionUrl: string | null;

  private constructor(
    id: string,
    props: DigestItemEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._digestId = props.digestId;
    this._userId = props.userId;
    this._title = props.title;
    this._body = props.body;
    this._actionUrl = props.actionUrl;
  }

  static create(props: DigestItemEntityProps): DigestItemEntity {
    const now = new Date().toISOString();
    return new DigestItemEntity(crypto.randomUUID(), props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: DigestItemEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): DigestItemEntity {
    return new DigestItemEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get digestId(): string { return this._digestId; }
  get userId(): UserIdVO { return this._userId; }
  get title(): string { return this._title; }
  get body(): string { return this._body; }
  get actionUrl(): string | null { return this._actionUrl; }
}
