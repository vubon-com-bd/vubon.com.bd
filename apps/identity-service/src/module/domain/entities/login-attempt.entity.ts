/**
 * LoginAttemptEntity — BaseEntity
 * @module identity-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';

import { AuthIdVO } from '../value-objects/primitives/auth-id.vo.js';
import { LoginAttemptStatusVO } from '../value-objects/primitives/login-attempt-status.vo.js';
import { IdentifierVO } from '../value-objects/primitives/identifier.vo.js';
import { IpAddressVO } from '../value-objects/primitives/ip-address.vo.js';
import { UserAgentVO } from '../value-objects/primitives/user-agent.vo.js';
import { DeviceFingerprintVO } from '../value-objects/primitives/device-fingerprint.vo.js';

export interface LoginAttemptEntityProps {
  readonly authId?: AuthIdVO;
  readonly identifier: IdentifierVO;
  readonly status: LoginAttemptStatusVO;
  readonly ipAddress?: IpAddressVO;
  readonly userAgent?: UserAgentVO;
  readonly deviceFingerprint?: DeviceFingerprintVO;
  readonly failureReason?: string;
  readonly attemptedAt: string;
}

export class LoginAttemptEntity extends BaseEntity<string> {
  private props: LoginAttemptEntityProps;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: LoginAttemptEntityProps,
  ) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  get authId(): AuthIdVO | undefined { return this.props.authId; }
  get identifier(): IdentifierVO { return this.props.identifier; }
  get status(): LoginAttemptStatusVO { return this.props.status; }
  get ipAddress(): IpAddressVO | undefined { return this.props.ipAddress; }
  get userAgent(): UserAgentVO | undefined { return this.props.userAgent; }
  get deviceFingerprint(): DeviceFingerprintVO | undefined { return this.props.deviceFingerprint; }
  get failureReason(): string | undefined { return this.props.failureReason; }
  get attemptedAt(): string { return this.props.attemptedAt; }

  isSuccess(): boolean { return this.status.isSuccess(); }
  isFailure(): boolean { return !this.status.isSuccess(); }

  static create(params: {
    id: string;
    props: LoginAttemptEntityProps;
    now: string;
  }): LoginAttemptEntity {
    return new LoginAttemptEntity(params.id, params.now, params.now, params.props);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: LoginAttemptEntityProps;
  }): LoginAttemptEntity {
    return new LoginAttemptEntity(params.id, params.createdAt, params.updatedAt, params.props);
  }
}
