/**
 * UserActivityEntity — BaseEntity
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ActivityIdVO } from '../value-objects/primitives/activity-id.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { ActivityTypeVO } from '../value-objects/primitives/activity-type.vo.js';
import { ActivityTimestampVO } from '../value-objects/primitives/activity-timestamp.vo.js';
import { UserActivityVO } from '../value-objects/composites/user-activity.vo.js';

export interface UserActivityEntityProps {
  readonly activityId: ActivityIdVO;
  readonly userId: UserIdVO;
  readonly type: ActivityTypeVO;
  readonly timestamp: ActivityTimestampVO;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class UserActivityEntity extends BaseEntity<string> {
  private readonly _type: ActivityTypeVO;
  private readonly _timestamp: ActivityTimestampVO;
  private readonly _metadata?: Readonly<Record<string, unknown>>;
  private readonly _userId: UserIdVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: UserActivityEntityProps,
    deletedAt?: string | null
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._type = props.type;
    this._timestamp = props.timestamp;
    this._metadata = props.metadata;
    this._userId = props.userId;
  }

  get type(): ActivityTypeVO { return this._type; }
  get timestamp(): ActivityTimestampVO { return this._timestamp; }
  get metadata(): Readonly<Record<string, unknown>> | undefined { return this._metadata; }
  get userId(): UserIdVO { return this._userId; }

  static record(params: {
    activityId: ActivityIdVO;
    userId: UserIdVO;
    type: ActivityTypeVO;
    metadata?: Readonly<Record<string, unknown>>;
    now: string;
  }): UserActivityEntity {
    return new UserActivityEntity(
      params.activityId.value,
      params.now,
      params.now,
      {
        activityId: params.activityId,
        userId: params.userId,
        type: params.type,
        timestamp: ActivityTimestampVO.fromEpochMs(Date.now()),
        metadata: params.metadata,
      },
      null
    );
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: UserActivityEntityProps;
  }): UserActivityEntity {
    return new UserActivityEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt
    );
  }

  isAuthActivity(): boolean {
    return this._type.isAuthActivity();
  }

  isRecent(minutes: number): boolean {
    return this._timestamp.isWithinLast(minutes);
  }

  toActivityVO(): UserActivityVO {
    return UserActivityVO.create({
      id: ActivityIdVO.create(this.id),
      userId: this._userId,
      type: this._type,
      timestamp: this._timestamp,
      metadata: this._metadata,
    });
  }
}
