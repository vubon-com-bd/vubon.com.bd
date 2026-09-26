/**
 * AuthSocialEntity — Linked social identity
 * @module auth-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import type { UserId } from '@vubon/shared-types/common';
import { SocialProviderVO } from '../value-objects/primitives/social-provider.vo';
import { SocialTokenVO } from '../value-objects/primitives/social-token.vo';
import { SocialStatusVO } from '../value-objects/primitives/social-status.vo';

export interface AuthSocialEntityProps {
  readonly id: string;
  readonly userId: UserId;
  readonly provider: SocialProviderVO;
  readonly providerUserId: string;
  readonly accessToken?: SocialTokenVO;
  readonly refreshToken?: SocialTokenVO;
  readonly status: SocialStatusVO;
  readonly linkedAt: number;
  readonly unlinkedAt?: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt?: string | null;
}

export class AuthSocialEntity extends BaseEntity<string> {
  readonly userId: UserId;
  private _provider: SocialProviderVO;
  private _providerUserId: string;
  private _accessToken?: SocialTokenVO;
  private _refreshToken?: SocialTokenVO;
  private _status: SocialStatusVO;
  private _linkedAt: number;
  private _unlinkedAt?: number;

  private constructor(props: AuthSocialEntityProps) {
    super(props.id, props.createdAt, props.updatedAt, props.deletedAt ?? null);
    this.userId = props.userId;
    this._provider = props.provider;
    this._providerUserId = props.providerUserId;
    this._accessToken = props.accessToken;
    this._refreshToken = props.refreshToken;
    this._status = props.status;
    this._linkedAt = props.linkedAt;
    this._unlinkedAt = props.unlinkedAt;
  }

  static create(props: AuthSocialEntityProps): AuthSocialEntity {
    return new AuthSocialEntity(props);
  }

  get provider(): SocialProviderVO { return this._provider; }
  get providerUserId(): string { return this._providerUserId; }
  get status(): SocialStatusVO { return this._status; }
  get linkedAt(): number { return this._linkedAt; }
  get unlinkedAt(): number | undefined { return this._unlinkedAt; }
  get accessToken(): SocialTokenVO | undefined { return this._accessToken; }
  get refreshToken(): SocialTokenVO | undefined { return this._refreshToken; }

  isLinked(): boolean { return this._status.isActive(); }

  updateTokens(access?: SocialTokenVO, refresh?: SocialTokenVO): void {
    if (access) this._accessToken = access;
    if (refresh) this._refreshToken = refresh;
  }

  unlink(at: number): void {
    this._unlinkedAt = at;
    this._status = SocialStatusVO.of('revoked');
    this._accessToken = undefined;
    this._refreshToken = undefined;
  }
}
