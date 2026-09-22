import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ActivityIdVO } from '../value-objects/primitives/activity-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { ActivityTypeVO } from '../value-objects/primitives/activity-type.vo';
import { ActivityTimestampVO } from '../value-objects/primitives/activity-timestamp.vo';

export interface UserActivityEntityProps {
  readonly userId: UserIdVO;
  readonly type: ActivityTypeVO;
  readonly timestamp: ActivityTimestampVO;
  readonly metadata: Readonly<Record<string, unknown>>;
}

export class UserActivityEntity extends BaseEntity<ActivityIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _type: ActivityTypeVO;
  private readonly _timestamp: ActivityTimestampVO;
  private readonly _metadata: Readonly<Record<string, unknown>>;

  private constructor(
    id: ActivityIdVO,
    props: UserActivityEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._type = props.type;
    this._timestamp = props.timestamp;
    this._metadata = Object.freeze({ ...props.metadata });
  }

  static create(props: UserActivityEntityProps): UserActivityEntity {
    const now = new Date().toISOString();
    const id = ActivityIdVO.create(crypto.randomUUID());
    return new UserActivityEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: ActivityIdVO,
    props: UserActivityEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): UserActivityEntity {
    return new UserActivityEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get userId(): UserIdVO { return this._userId; }
  get type(): ActivityTypeVO { return this._type; }
  get timestamp(): ActivityTimestampVO { return this._timestamp; }
  get metadata(): Readonly<Record<string, unknown>> { return this._metadata; }
}
