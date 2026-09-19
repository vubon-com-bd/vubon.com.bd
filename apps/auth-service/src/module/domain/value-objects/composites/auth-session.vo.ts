import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { SessionTokenVO } from '../primitives/session-token.vo';
import { SessionExpiryVO } from '../primitives/session-expiry.vo';

export interface AuthSessionProps {
  readonly userId: UserIdVO;
  readonly token: SessionTokenVO;
  readonly expiry: SessionExpiryVO;
  readonly ip: string;
  readonly userAgent: string;
  readonly deviceId: string | null;
  readonly createdAt: Date;
  readonly revokedAt: Date | null;
}

export class AuthSessionVO extends BaseVO<AuthSessionProps> {
  private constructor(props: AuthSessionProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: AuthSessionProps): AuthSessionVO {
    return new AuthSessionVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get token(): SessionTokenVO { return this.value.token; }
  get expiry(): SessionExpiryVO { return this.value.expiry; }
  get ip(): string { return this.value.ip; }
  get userAgent(): string { return this.value.userAgent; }
  get deviceId(): string | null { return this.value.deviceId; }
  get createdAt(): Date { return this.value.createdAt; }
  get revokedAt(): Date | null { return this.value.revokedAt; }

  get isRevoked(): boolean {
    return this.value.revokedAt !== null;
  }

  get isExpired(): boolean {
    return this.value.expiry.isExpired();
  }

  get isActive(): boolean {
    return !this.isRevoked && !this.isExpired;
  }
}
