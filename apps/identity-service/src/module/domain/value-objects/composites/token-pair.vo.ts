/**
 * TokenPairVO — Access + Refresh token pair
 * @module identity-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { TokenValueVO } from '../primitives/token-value.vo.js';
import { TokenExpiryVO } from '../primitives/token-expiry.vo.js';
import { SessionIdVO } from '../primitives/session-id.vo.js';
import { UserIdVO } from '../primitives/user-id.vo.js';

export interface TokenPairVOProps {
  readonly accessToken: TokenValueVO;
  readonly refreshToken: TokenValueVO;
  readonly accessExpiry: TokenExpiryVO;
  readonly refreshExpiry: TokenExpiryVO;
  readonly userId: UserIdVO;
  readonly sessionId: SessionIdVO;
  readonly tokenType: 'Bearer';
  readonly scope?: readonly string[];
}

export class TokenPairVO extends BaseVO<TokenPairVOProps> {
  private constructor(props: TokenPairVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: TokenPairVOProps): TokenPairVO {
    const vo = new TokenPairVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: TokenPairVOProps): TokenPairVO {
    return new TokenPairVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.accessExpiry.expiresAt >= v.refreshExpiry.expiresAt) {
      throw new ValidationError(
        'accessExpiry must be earlier than refreshExpiry',
        'accessExpiry',
      );
    }
    if (v.tokenType !== 'Bearer') {
      throw new ValidationError('tokenType must be Bearer', 'tokenType');
    }
  }

  get accessToken(): TokenValueVO { return this.value.accessToken; }
  get refreshToken(): TokenValueVO { return this.value.refreshToken; }
  get accessExpiry(): TokenExpiryVO { return this.value.accessExpiry; }
  get refreshExpiry(): TokenExpiryVO { return this.value.refreshExpiry; }
  get userId(): UserIdVO { return this.value.userId; }
  get sessionId(): SessionIdVO { return this.value.sessionId; }
  get tokenType(): 'Bearer' { return this.value.tokenType; }
  get scope(): readonly string[] { return this.value.scope ?? []; }

  isAccessExpired(nowMs: number = Date.now()): boolean {
    return this.accessExpiry.isExpired(nowMs);
  }
  isRefreshExpired(nowMs: number = Date.now()): boolean {
    return this.refreshExpiry.isExpired(nowMs);
  }
  hasScope(scope: string): boolean {
    return this.scope.includes(scope);
  }
}
