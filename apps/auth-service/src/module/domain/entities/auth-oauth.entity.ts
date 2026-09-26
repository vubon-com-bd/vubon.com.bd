/**
 * AuthOAuthEntity — OAuth 2.0 binding
 * @module auth-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import type { UserId } from '@vubon/shared-types/common';
import { OAuthProviderVO } from '../value-objects/primitives/oauth-provider.vo';
import { OAuthTokenVO } from '../value-objects/primitives/oauth-token.vo';
import { OAuthStatusVO } from '../value-objects/primitives/oauth-status.vo';

export interface AuthOAuthEntityProps {
  readonly id: string;
  readonly userId: UserId;
  readonly provider: OAuthProviderVO;
  readonly providerUserId: string;
  readonly accessToken?: OAuthTokenVO;
  readonly refreshToken?: OAuthTokenVO;
  readonly scopes: readonly string[];
  readonly status: OAuthStatusVO;
  readonly linkedAt: number;
  readonly expiresAt?: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt?: string | null;
}

export class AuthOAuthEntity extends BaseEntity<string> {
  readonly userId: UserId;
  private _provider: OAuthProviderVO;
  private _providerUserId: string;
  private _accessToken?: OAuthTokenVO;
  private _refreshToken?: OAuthTokenVO;
  private _scopes: string[];
  private _status: OAuthStatusVO;
  private _linkedAt: number;
  private _expiresAt?: number;

  private constructor(props: AuthOAuthEntityProps) {
    super(props.id, props.createdAt, props.updatedAt, props.deletedAt ?? null);
    this.userId = props.userId;
    this._provider = props.provider;
    this._providerUserId = props.providerUserId;
    this._accessToken = props.accessToken;
    this._refreshToken = props.refreshToken;
    this._scopes = [...props.scopes];
    this._status = props.status;
    this._linkedAt = props.linkedAt;
    this._expiresAt = props.expiresAt;
  }

  static create(props: AuthOAuthEntityProps): AuthOAuthEntity {
    return new AuthOAuthEntity(props);
  }

  get provider(): OAuthProviderVO { return this._provider; }
  get providerUserId(): string { return this._providerUserId; }
  get scopes(): readonly string[] { return [...this._scopes]; }
  get status(): OAuthStatusVO { return this._status; }
  get expiresAt(): number | undefined { return this._expiresAt; }

  hasScope(scope: string): boolean { return this._scopes.includes(scope); }

  isActive(): boolean { return this._status.isActive(); }

  updateTokens(
    access: OAuthTokenVO,
    refresh: OAuthTokenVO | undefined,
    expiresAt: number | undefined,
  ): void {
    this._accessToken = access;
    if (refresh) this._refreshToken = refresh;
    this._expiresAt = expiresAt;
    this._status = OAuthStatusVO.of('active');
  }

  markExpired(): void { this._status = OAuthStatusVO.of('expired'); }
  revoke(): void { this._status = OAuthStatusVO.of('revoked'); }
}
