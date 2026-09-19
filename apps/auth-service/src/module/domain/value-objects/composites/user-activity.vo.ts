import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { ActivityTypeVO } from '../primitives/activity-type.vo';
import { ActivityTimestampVO } from '../primitives/activity-timestamp.vo';

export interface UserActivityProps {
  readonly userId: UserIdVO;
  readonly type: ActivityTypeVO;
  readonly category: string;
  readonly ip: string | null;
  readonly userAgent: string | null;
  readonly metadata: Readonly<Record<string, unknown>>;
  readonly timestamp: ActivityTimestampVO;
}

export class UserActivityVO extends BaseVO<UserActivityProps> {
  private constructor(props: UserActivityProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: UserActivityProps): UserActivityVO {
    return new UserActivityVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get type(): ActivityTypeVO { return this.value.type; }
  get category(): string { return this.value.category; }
  get ip(): string | null { return this.value.ip; }
  get userAgent(): string | null { return this.value.userAgent; }
  get metadata(): Readonly<Record<string, unknown>> { return this.value.metadata; }
  get timestamp(): ActivityTimestampVO { return this.value.timestamp; }
}
