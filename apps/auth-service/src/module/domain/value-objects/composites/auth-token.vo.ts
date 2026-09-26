/**
 * AuthTokenVO — Snapshot of an issued token
 * @module auth-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { TokenValueVO } from '../primitives/token-value.vo';
import { TokenTypeVO } from '../primitives/token-type.vo';

export interface AuthTokenVOProps {
  readonly tokenId: string;
  readonly value: TokenValueVO;
  readonly type: TokenTypeVO;
  readonly subjectId: string;
  readonly issuedAt: number;
  readonly expiresAt: number;
  readonly revokedAt?: number;
}

export class AuthTokenVO extends BaseVO<AuthTokenVOProps> {
  private constructor(props: AuthTokenVOProps) {
    super(props);
  }

  static of(props: AuthTokenVOProps): AuthTokenVO {
    if (props.expiresAt <= props.issuedAt) {
      throw new Error('Token expiry must be after issuance');
    }
    return new AuthTokenVO(props);
  }

  get tokenId(): string { return this.value.tokenId; }
  get type(): TokenTypeVO { return this.value.type; }
  get expiresAt(): number { return this.value.expiresAt; }

  isExpired(now: number): boolean { return this.value.expiresAt <= now; }
  isRevoked(): boolean { return this.value.revokedAt !== undefined; }
  isUsable(now: number): boolean { return !this.isExpired(now) && !this.isRevoked(); }
}
