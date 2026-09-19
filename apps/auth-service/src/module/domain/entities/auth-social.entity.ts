import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { SocialProviderVO } from '../value-objects/primitives/social-provider.vo';
import { SocialTokenVO } from '../value-objects/primitives/social-token.vo';
import { SocialStatusVO } from '../value-objects/primitives/social-status.vo';
import {
  SocialLinkedEvent,
  SocialUnlinkedEvent,
} from '../events/auth-social.events';

export interface AuthSocialEntityProps {
  readonly userId: UserIdVO;
  readonly provider: SocialProviderVO;
  readonly providerUserId: string;
  readonly accessToken: SocialTokenVO;
  readonly refreshToken: SocialTokenVO | null;
  readonly status: SocialStatusVO;
  readonly linkedAt: Date;
}

export class AuthSocialEntity extends BaseEntity<string> {
  private readonly _userId: UserIdVO;
  private readonly _provider: SocialProviderVO;
  private readonly _providerUserId: string;
  private readonly _accessToken: SocialTokenVO;
  private readonly _refreshToken: SocialTokenVO | null;
  private readonly _status: SocialStatusVO;
  private readonly _linkedAt: Date;

  private constructor(
    id: string,
    props: AuthSocialEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._provider = props.provider;
    this._providerUserId = props.providerUserId;
    this._accessToken = props.accessToken;
    this._refreshToken = props.refreshToken;
    this._status = props.status;
    this._linkedAt = props.linkedAt;
  }

  static create(props: AuthSocialEntityProps): AuthSocialEntity {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    return new AuthSocialEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: AuthSocialEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): AuthSocialEntity {
    return new AuthSocialEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  unlink(): AuthSocialEntity {
    const now = new Date();
    return new AuthSocialEntity(
      this.id,
      { ...this._toProps(), status: SocialStatusVO.create('unlinked') },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
  }

  get userId(): UserIdVO { return this._userId; }
  get provider(): SocialProviderVO { return this._provider; }
  get providerUserId(): string { return this._providerUserId; }
  get accessToken(): SocialTokenVO { return this._accessToken; }
  get refreshToken(): SocialTokenVO | null { return this._refreshToken; }
  get status(): SocialStatusVO { return this._status; }
  get linkedAt(): Date { return this._linkedAt; }

  get isLinked(): boolean { return this._status.value === 'linked'; }

  private _toProps(): AuthSocialEntityProps {
    return {
      userId: this._userId,
      provider: this._provider,
      providerUserId: this._providerUserId,
      accessToken: this._accessToken,
      refreshToken: this._refreshToken,
      status: this._status,
      linkedAt: this._linkedAt,
    };
  }
}
