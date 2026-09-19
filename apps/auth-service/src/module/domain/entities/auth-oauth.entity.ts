import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { OAuthProviderVO } from '../value-objects/primitives/oauth-provider.vo';
import { OAuthTokenVO } from '../value-objects/primitives/oauth-token.vo';
import { OAuthStatusVO } from '../value-objects/primitives/oauth-status.vo';

export interface AuthOAuthEntityProps {
  readonly userId: UserIdVO;
  readonly provider: OAuthProviderVO;
  readonly accessToken: OAuthTokenVO;
  readonly refreshToken: OAuthTokenVO | null;
  readonly scope: string;
  readonly status: OAuthStatusVO;
  readonly expiresAt: Date | null;
}

export class AuthOAuthEntity extends BaseEntity<string> {
  private readonly _userId: UserIdVO;
  private readonly _provider: OAuthProviderVO;
  private readonly _accessToken: OAuthTokenVO;
  private readonly _refreshToken: OAuthTokenVO | null;
  private readonly _scope: string;
  private readonly _status: OAuthStatusVO;
  private readonly _expiresAt: Date | null;

  private constructor(
    id: string,
    props: AuthOAuthEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._provider = props.provider;
    this._accessToken = props.accessToken;
    this._refreshToken = props.refreshToken;
    this._scope = props.scope;
    this._status = props.status;
    this._expiresAt = props.expiresAt;
  }

  static create(props: AuthOAuthEntityProps): AuthOAuthEntity {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    return new AuthOAuthEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: AuthOAuthEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): AuthOAuthEntity {
    return new AuthOAuthEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  revoke(): AuthOAuthEntity {
    const now = new Date();
    return new AuthOAuthEntity(
      this.id,
      { ...this._toProps(), status: OAuthStatusVO.create('revoked') },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
  }

  get userId(): UserIdVO { return this._userId; }
  get provider(): OAuthProviderVO { return this._provider; }
  get accessToken(): OAuthTokenVO { return this._accessToken; }
  get refreshToken(): OAuthTokenVO | null { return this._refreshToken; }
  get scope(): string { return this._scope; }
  get status(): OAuthStatusVO { return this._status; }
  get expiresAt(): Date | null { return this._expiresAt; }

  get isExpired(): boolean {
    if (!this._expiresAt) return false;
    return this._expiresAt.getTime() <= Date.now();
  }

  private _toProps(): AuthOAuthEntityProps {
    return {
      userId: this._userId,
      provider: this._provider,
      accessToken: this._accessToken,
      refreshToken: this._refreshToken,
      scope: this._scope,
      status: this._status,
      expiresAt: this._expiresAt,
    };
  }
}
