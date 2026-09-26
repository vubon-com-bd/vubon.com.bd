import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ActivityIdVO } from '../primitives/activity-id.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { ActivityTypeVO } from '../primitives/activity-type.vo';
import { ActivityTimestampVO } from '../primitives/activity-timestamp.vo';

export interface UserActivityProps {
  readonly id: ActivityIdVO;
  readonly userId: UserIdVO;
  readonly type: ActivityTypeVO;
  readonly timestamp: ActivityTimestampVO;
  readonly metadata: Readonly<Record<string, unknown>>;
}

export class UserActivityVO extends BaseVO<UserActivityProps> {
  private constructor(props: UserActivityProps) {
    super(Object.freeze({
      ...props,
      metadata: Object.freeze({ ...props.metadata }),
    }));
  }

  static create(props: UserActivityProps): UserActivityVO {
    return new UserActivityVO(props);
  }

  get id(): ActivityIdVO { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get type(): ActivityTypeVO { return this.value.type; }
  get timestamp(): ActivityTimestampVO { return this.value.timestamp; }
  get metadata(): Readonly<Record<string, unknown>> { return this.value.metadata; }
}
