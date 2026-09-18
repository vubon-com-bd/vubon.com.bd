import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { TokenValueVO } from '../value-objects/primitives/token-value.vo';
import { TokenTypeVO } from '../value-objects/primitives/token-type.vo';
import { TokenExpiryVO } from '../value-objects/primitives/token-expiry.vo';

export interface AuthTokenEntityProps {
  readonly userId: UserIdVO;
  readonly tokenValue: TokenValueVO;
  readonly tokenType: TokenTypeVO;
  readonly expiry: TokenExpiryVO;
  readonly issuedAt: Date;
  readonly revokedAt: Date | null;
}

export class AuthTokenEntity extends BaseEntity<string> {
  private readonly _userId: UserIdVO;
  private readonly _tokenValue: TokenValueVO;
  private readonly _tokenType: TokenTypeVO;
  private readonly _expiry: TokenExpiryVO;
  private readonly _issuedAt: Date;
  private readonly _revokedAt: Date | null;

  private constructor(
    id: string,
    props: AuthTokenEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._tokenValue = props.tokenValue;
    this._tokenType = props.tokenType;
    this._expiry = props.expiry;
    this._issuedAt = props.issuedAt;
    this._revokedAt = props.revokedAt;
  }

  static create(props: AuthTokenEntityProps): AuthTokenEntity {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    return new AuthTokenEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: AuthTokenEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): AuthTokenEntity {
    return new AuthTokenEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  revoke(): AuthTokenEntity {
    const now = new Date();
    return new AuthTokenEntity(
      this.id,
      { ...this._toProps(), revokedAt: now },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
  }

  get userId(): UserIdVO { return this._userId; }
  get tokenValue(): TokenValueVO { return this._tokenValue; }
  get tokenType(): TokenTypeVO { return this._tokenType; }
  get expiry(): TokenExpiryVO { return this._expiry; }
  get issuedAt(): Date { return this._issuedAt; }
  get revokedAt(): Date | null { return this._revokedAt; }

  get isRevoked(): boolean { return this._revokedAt !== null; }
  get isExpired(): boolean { return this._expiry.isExpired(); }
  get isActive(): boolean { return !this.isRevoked && !this.isExpired; }

  private _toProps(): AuthTokenEntityProps {
    return {
      userId: this._userId,
      tokenValue: this._tokenValue,
      tokenType: this._tokenType,
      expiry: this._expiry,
      issuedAt: this._issuedAt,
      revokedAt: this._revokedAt,
    };
  }
}
