/**
 * LoginAttemptVO
 * @module identity-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

import { AuthIdVO } from '../primitives/auth-id.vo.js';
import { LoginAttemptStatusVO } from '../primitives/login-attempt-status.vo.js';
import { IpAddressVO } from '../primitives/ip-address.vo.js';
import { UserAgentVO } from '../primitives/user-agent.vo.js';
import { IdentifierVO } from '../primitives/identifier.vo.js';

export interface LoginAttemptVOProps {
  readonly id: string;
  readonly authId?: AuthIdVO;
  readonly identifier: IdentifierVO;
  readonly status: LoginAttemptStatusVO;
  readonly ipAddress?: IpAddressVO;
  readonly userAgent?: UserAgentVO;
  readonly deviceFingerprint?: string;
  readonly failureReason?: string;
  readonly attemptedAt: string;
}

export class LoginAttemptVO extends BaseVO<LoginAttemptVOProps> {
  private constructor(props: LoginAttemptVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: LoginAttemptVOProps): LoginAttemptVO {
    return new LoginAttemptVO(props);
  }

  static reconstitute(props: LoginAttemptVOProps): LoginAttemptVO {
    return new LoginAttemptVO(props);
  }

  get id(): string { return this.value.id; }
  get authId(): AuthIdVO | undefined { return this.value.authId; }
  get identifier(): IdentifierVO { return this.value.identifier; }
  get status(): LoginAttemptStatusVO { return this.value.status; }
  get ipAddress(): IpAddressVO | undefined { return this.value.ipAddress; }
  get userAgent(): UserAgentVO | undefined { return this.value.userAgent; }
  get deviceFingerprint(): string | undefined { return this.value.deviceFingerprint; }
  get failureReason(): string | undefined { return this.value.failureReason; }
  get attemptedAt(): string { return this.value.attemptedAt; }

  isSuccess(): boolean { return this.status.isSuccess(); }
  isFailure(): boolean { return !this.status.isSuccess(); }
}
