import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { TokenValueVO } from '../primitives/token-value.vo';
import { TokenTypeVO } from '../primitives/token-type.vo';
import { TokenExpiryVO } from '../primitives/token-expiry.vo';

export interface AuthTokenProps {
  readonly tokenValue: TokenValueVO;
  readonly tokenType: TokenTypeVO;
  readonly expiry: TokenExpiryVO;
  readonly userId: string;
  readonly issuedAt: Date;
  readonly revokedAt: Date | null;
}

export class AuthTokenVO extends BaseVO<AuthTokenProps> {
  private constructor(props: AuthTokenProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: AuthTokenProps): AuthTokenVO {
    return new AuthTokenVO(props);
  }

  get tokenValue(): TokenValueVO { return this.value.tokenValue; }
  get tokenType(): TokenTypeVO { return this.value.tokenType; }
  get expiry(): TokenExpiryVO { return this.value.expiry; }
  get userId(): string { return this.value.userId; }
  get issuedAt(): Date { return this.value.issuedAt; }
  get revokedAt(): Date | null { return this.value.revokedAt; }

  get isRevoked(): boolean { return this.value.revokedAt !== null; }
  get isExpired(): boolean { return this.value.expiry.isExpired(); }
  get isActive(): boolean { return !this.isRevoked && !this.isExpired; }
}
