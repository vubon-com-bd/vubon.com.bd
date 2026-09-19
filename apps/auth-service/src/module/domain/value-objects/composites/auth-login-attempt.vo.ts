import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { LoginAttemptIpVO } from '../primitives/login-attempt-ip.vo';
import { LoginAttemptStatusVO } from '../primitives/login-attempt-status.vo';

export interface AuthLoginAttemptProps {
  readonly userId: UserIdVO | null;
  readonly email: string | null;
  readonly ip: LoginAttemptIpVO;
  readonly userAgent: string;
  readonly status: LoginAttemptStatusVO;
  readonly attemptedAt: Date;
}

export class AuthLoginAttemptVO extends BaseVO<AuthLoginAttemptProps> {
  private constructor(props: AuthLoginAttemptProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: AuthLoginAttemptProps): AuthLoginAttemptVO {
    return new AuthLoginAttemptVO(props);
  }

  get userId(): UserIdVO | null { return this.value.userId; }
  get email(): string | null { return this.value.email; }
  get ip(): LoginAttemptIpVO { return this.value.ip; }
  get userAgent(): string { return this.value.userAgent; }
  get status(): LoginAttemptStatusVO { return this.value.status; }
  get attemptedAt(): Date { return this.value.attemptedAt; }

  get isSuccess(): boolean {
    return this.value.status.value === 'success';
  }
}
