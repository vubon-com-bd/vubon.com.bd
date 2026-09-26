/**
 * AuthLoginAttemptVO — Snapshot of a single login attempt
 * @module auth-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { LoginAttemptIpVO } from '../primitives/login-attempt-ip.vo';
import { LoginAttemptStatusVO } from '../primitives/login-attempt-status.vo';

export interface AuthLoginAttemptVOProps {
  readonly attemptId: string;
  readonly userId?: string;
  readonly email?: string;
  readonly ip: LoginAttemptIpVO;
  readonly status: LoginAttemptStatusVO;
  readonly userAgent: string;
  readonly attemptedAt: number;
  readonly failureReason?: string;
}

export class AuthLoginAttemptVO extends BaseVO<AuthLoginAttemptVOProps> {
  private constructor(props: AuthLoginAttemptVOProps) {
    super(props);
  }

  static of(props: AuthLoginAttemptVOProps): AuthLoginAttemptVO {
    if (props.status.countsAsFailure() && !props.failureReason) {
      throw new Error('Failed attempt must have a failureReason');
    }
    return new AuthLoginAttemptVO(props);
  }

  get attemptId(): string { return this.value.attemptId; }
  get userId(): string | undefined { return this.value.userId; }
  get email(): string | undefined { return this.value.email; }
  get ip(): LoginAttemptIpVO { return this.value.ip; }
  get status(): LoginAttemptStatusVO { return this.value.status; }
  get userAgent(): string { return this.value.userAgent; }
  get attemptedAt(): number { return this.value.attemptedAt; }
  get failureReason(): string | undefined { return this.value.failureReason; }

  isSuccess(): boolean {
    return !this.value.status.countsAsFailure();
  }

  countsForLockout(): boolean {
    return this.value.status.countsAsFailure();
  }
}
