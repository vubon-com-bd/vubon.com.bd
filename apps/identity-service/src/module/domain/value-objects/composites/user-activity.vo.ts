/**
 * UserActivityVO
 * @module identity-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

import { ActivityIdVO } from '../primitives/activity-id.vo.js';
import { UserIdVO } from '../primitives/user-id.vo.js';
import { ActivityTypeVO } from '../primitives/activity-type.vo.js';
import { IpAddressVO } from '../primitives/ip-address.vo.js';
import { UserAgentVO } from '../primitives/user-agent.vo.js';

export interface UserActivityVOProps {
  readonly id: ActivityIdVO;
  readonly userId: UserIdVO;
  readonly type: ActivityTypeVO;
  readonly description?: string;
  readonly ipAddress?: IpAddressVO;
  readonly userAgent?: UserAgentVO;
  readonly deviceId?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly occurredAt: string;
}

export class UserActivityVO extends BaseVO<UserActivityVOProps> {
  private constructor(props: UserActivityVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: UserActivityVOProps): UserActivityVO {
    return new UserActivityVO(props);
  }

  static reconstitute(props: UserActivityVOProps): UserActivityVO {
    return new UserActivityVO(props);
  }

  get id(): ActivityIdVO { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get type(): ActivityTypeVO { return this.value.type; }
  get description(): string | undefined { return this.value.description; }
  get ipAddress(): IpAddressVO | undefined { return this.value.ipAddress; }
  get userAgent(): UserAgentVO | undefined { return this.value.userAgent; }
  get deviceId(): string | undefined { return this.value.deviceId; }
  get metadata(): Readonly<Record<string, unknown>> | undefined { return this.value.metadata; }
  get occurredAt(): string { return this.value.occurredAt; }

  isSecurityEvent(): boolean { return this.value.type.isSecurityEvent(); }
  occurredWithinSeconds(seconds: number, nowMs: number = Date.now()): boolean {
    return nowMs - Date.parse(this.value.occurredAt) <= seconds * 1000;
  }
}
