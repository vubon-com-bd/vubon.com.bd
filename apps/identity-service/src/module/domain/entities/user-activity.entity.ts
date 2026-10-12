/**
 * UserActivityEntity — BaseEntity
 * @module identity-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ActivityIdVO } from '../value-objects/primitives/activity-id.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { ActivityTypeVO } from '../value-objects/primitives/activity-type.vo.js';
import { IpAddressVO } from '../value-objects/primitives/ip-address.vo.js';
import { UserAgentVO } from '../value-objects/primitives/user-agent.vo.js';

export interface UserActivityEntityProps {
  readonly userId: UserIdVO;
  readonly type: ActivityTypeVO;
  readonly description?: string;
  readonly ipAddress?: IpAddressVO;
  readonly userAgent?: UserAgentVO;
  readonly deviceId?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly occurredAt: string;
}

export class UserActivityEntity extends BaseEntity<string> {
  private props: UserActivityEntityProps;

  private constructor(id: string, createdAt: string, updatedAt: string, props: UserActivityEntityProps) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  get activityId(): ActivityIdVO { return ActivityIdVO.reconstitute(this.id); }
  get userId(): UserIdVO { return this.props.userId; }
  get type(): ActivityTypeVO { return this.props.type; }
  get description(): string | undefined { return this.props.description; }
  get ipAddress(): IpAddressVO | undefined { return this.props.ipAddress; }
  get userAgent(): UserAgentVO | undefined { return this.props.userAgent; }
  get deviceId(): string | undefined { return this.props.deviceId; }
  get metadata(): Readonly<Record<string, unknown>> | undefined { return this.props.metadata; }
  get occurredAt(): string { return this.props.occurredAt; }

  isSecurityEvent(): boolean { return this.props.type.isSecurityEvent(); }

  static create(params: {
    id: string;
    props: UserActivityEntityProps;
    now: string;
  }): UserActivityEntity {
    return new UserActivityEntity(params.id, params.now, params.now, params.props);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: UserActivityEntityProps;
  }): UserActivityEntity {
    return new UserActivityEntity(params.id, params.createdAt, params.updatedAt, params.props);
  }
}
