/**
 * AuthTokenEntity — An issued token
 * @module auth-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { TokenValueVO } from '../value-objects/primitives/token-value.vo';
import { TokenTypeVO } from '../value-objects/primitives/token-type.vo';
import { TokenExpiryVO } from '../value-objects/primitives/token-expiry.vo';

export interface AuthTokenEntityProps {
  readonly id: string;
  readonly subjectId: string;
  readonly value: TokenValueVO;
  readonly type: TokenTypeVO;
  readonly expiry: TokenExpiryVO;
  readonly revokedAt?: number;
  readonly parentTokenId?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt?: string | null;
}

export class AuthTokenEntity extends BaseEntity<string> {
  readonly subjectId: string;
  private _value: TokenValueVO;
  private _type: TokenTypeVO;
  private _expiry: TokenExpiryVO;
  private _revokedAt?: number;
  private _parentTokenId?: string;

  private constructor(props: AuthTokenEntityProps) {
    super(props.id, props.createdAt, props.updatedAt, props.deletedAt ?? null);
    this.subjectId = props.subjectId;
    this._value = props.value;
    this._type = props.type;
    this._expiry = props.expiry;
    this._revokedAt = props.revokedAt;
    this._parentTokenId = props.parentTokenId;
  }

  static create(props: AuthTokenEntityProps): AuthTokenEntity {
    return new AuthTokenEntity(props);
  }

  get value(): TokenValueVO { return this._value; }
  get type(): TokenTypeVO { return this._type; }
  get expiry(): TokenExpiryVO { return this._expiry; }
  get revokedAt(): number | undefined { return this._revokedAt; }
  get parentTokenId(): string | undefined { return this._parentTokenId; }

  isExpired(now: number): boolean { return this._expiry.isExpired(now); }
  isRevoked(): boolean { return this._revokedAt !== undefined; }
  isUsable(now: number): boolean { return !this.isExpired(now) && !this.isRevoked(); }

  revoke(at: number): void { this._revokedAt = at; }
}
