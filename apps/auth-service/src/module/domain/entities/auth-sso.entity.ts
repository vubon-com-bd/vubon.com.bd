import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { SsoProviderVO } from '../value-objects/primitives/sso-provider.vo';
import { SsoTokenVO } from '../value-objects/primitives/sso-token.vo';
import { SsoStatusVO } from '../value-objects/primitives/sso-status.vo';

export interface AuthSsoEntityProps {
  readonly userId: UserIdVO;
  readonly provider: SsoProviderVO;
  readonly externalId: string;
  readonly sessionToken: SsoTokenVO;
  readonly status: SsoStatusVO;
  readonly linkedAt: Date;
}

export class AuthSsoEntity extends BaseEntity<string> {
  private readonly _userId: UserIdVO;
  private readonly _provider: SsoProviderVO;
  private readonly _externalId: string;
  private readonly _sessionToken: SsoTokenVO;
  private readonly _status: SsoStatusVO;
  private readonly _linkedAt: Date;

  private constructor(
    id: string,
    props: AuthSsoEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._provider = props.provider;
    this._externalId = props.externalId;
    this._sessionToken = props.sessionToken;
    this._status = props.status;
    this._linkedAt = props.linkedAt;
  }

  static create(props: AuthSsoEntityProps): AuthSsoEntity {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    return new AuthSsoEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: AuthSsoEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): AuthSsoEntity {
    return new AuthSsoEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  revoke(): AuthSsoEntity {
    const now = new Date();
    return new AuthSsoEntity(
      this.id,
      { ...this._toProps(), status: SsoStatusVO.create('revoked') },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
  }

  get userId(): UserIdVO { return this._userId; }
  get provider(): SsoProviderVO { return this._provider; }
  get externalId(): string { return this._externalId; }
  get sessionToken(): SsoTokenVO { return this._sessionToken; }
  get status(): SsoStatusVO { return this._status; }
  get linkedAt(): Date { return this._linkedAt; }

  private _toProps(): AuthSsoEntityProps {
    return {
      userId: this._userId,
      provider: this._provider,
      externalId: this._externalId,
      sessionToken: this._sessionToken,
      status: this._status,
      linkedAt: this._linkedAt,
    };
  }
}
