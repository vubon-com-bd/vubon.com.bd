import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { ActivityTypeVO } from '../value-objects/primitives/activity-type.vo';
import { ActivityTimestampVO } from '../value-objects/primitives/activity-timestamp.vo';

export interface UserActivityEntityProps {
  readonly userId: UserIdVO;
  readonly type: ActivityTypeVO;
  readonly category: string;
  readonly ip: string | null;
  readonly userAgent: string | null;
  readonly metadata: Readonly<Record<string, unknown>>;
  readonly timestamp: ActivityTimestampVO;
}

export class UserActivityEntity extends BaseEntity<string> {
  private readonly _userId: UserIdVO;
  private readonly _type: ActivityTypeVO;
  private readonly _category: string;
  private readonly _ip: string | null;
  private readonly _userAgent: string | null;
  private readonly _metadata: Readonly<Record<string, unknown>>;
  private readonly _timestamp: ActivityTimestampVO;

  private constructor(
    id: string,
    props: UserActivityEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._type = props.type;
    this._category = props.category;
    this._ip = props.ip;
    this._userAgent = props.userAgent;
    this._metadata = Object.freeze({ ...props.metadata });
    this._timestamp = props.timestamp;
  }

  static create(props: UserActivityEntityProps): UserActivityEntity {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    return new UserActivityEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: UserActivityEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): UserActivityEntity {
    return new UserActivityEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get userId(): UserIdVO { return this._userId; }
  get type(): ActivityTypeVO { return this._type; }
  get category(): string { return this._category; }
  get ip(): string | null { return this._ip; }
  get userAgent(): string | null { return this._userAgent; }
  get metadata(): Readonly<Record<string, unknown>> { return this._metadata; }
  get timestamp(): ActivityTimestampVO { return this._timestamp; }
}
