/**
 * UserActivityVO — Composite VO
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ActivityIdVO } from '../primitives/activity-id.vo.js';
import { UserIdVO } from '../primitives/user-id.vo.js';
import { ActivityTypeVO } from '../primitives/activity-type.vo.js';
import { ActivityTimestampVO } from '../primitives/activity-timestamp.vo.js';

export interface UserActivityVOProps {
  readonly id: ActivityIdVO;
  readonly userId: UserIdVO;
  readonly type: ActivityTypeVO;
  readonly timestamp: ActivityTimestampVO;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class UserActivityVO extends BaseVO<UserActivityVOProps> {
  private constructor(props: UserActivityVOProps) {
    super(props);
  }

  static create(props: UserActivityVOProps): UserActivityVO {
    if (!props.id) throw new Error('UserActivityVO: id required');
    if (!props.userId) throw new Error('UserActivityVO: userId required');
    return new UserActivityVO(props);
  }

  get id(): ActivityIdVO { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get type(): ActivityTypeVO { return this.value.type; }
  get timestamp(): ActivityTimestampVO { return this.value.timestamp; }

  isAuthActivity(): boolean {
    return this.value.type.isAuthActivity();
  }

  isRecent(minutes: number): boolean {
    return this.value.timestamp.isWithinLast(minutes);
  }

  isToday(): boolean {
    return this.value.timestamp.isToday();
  }
}
