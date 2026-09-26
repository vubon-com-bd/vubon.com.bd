/**
 * UserActivityVO — Aggregated activity snapshot for a user
 * @module auth-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface UserActivityVOProps {
  readonly userId: UserIdVO;
  readonly lastLoginAt?: number;
  readonly lastLoginIp?: string;
  readonly loginCount: number;
  readonly lastActiveAt?: number;
}

export class UserActivityVO extends BaseVO<UserActivityVOProps> {
  private constructor(props: UserActivityVOProps) {
    super(props);
  }

  static of(props: UserActivityVOProps): UserActivityVO {
    if (props.loginCount < 0) {
      throw new Error('loginCount cannot be negative');
    }
    return new UserActivityVO(props);
  }

  static empty(userId: UserIdVO): UserActivityVO {
    return new UserActivityVO({ userId, loginCount: 0 });
  }

  get userId(): UserIdVO { return this.value.userId; }
  get loginCount(): number { return this.value.loginCount; }

  isDormant(now: number, thresholdMs: number = 90 * 24 * 60 * 60 * 1000): boolean {
    if (!this.value.lastActiveAt) return true;
    return now - this.value.lastActiveAt > thresholdMs;
  }

  wasActiveRecently(now: number, thresholdMs: number = 24 * 60 * 60 * 1000): boolean {
    if (!this.value.lastActiveAt) return false;
    return now - this.value.lastActiveAt <= thresholdMs;
  }
}
