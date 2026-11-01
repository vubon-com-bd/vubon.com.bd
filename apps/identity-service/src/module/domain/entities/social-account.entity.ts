/**
 * SocialAccountEntity — BaseEntity
 * @module identity-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';

import { AuthIdVO } from '../value-objects/primitives/auth-id.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { SocialProviderVO } from '../value-objects/primitives/social-provider.vo.js';

export interface SocialAccountEntityProps {
  readonly authId: AuthIdVO;
  readonly userId: UserIdVO;
  readonly provider: SocialProviderVO;
  readonly providerUserId: string;
  readonly email?: string;
  readonly name?: string;
  readonly avatarUrl?: string;
  readonly lastUsedAt?: string;
  readonly isActive: boolean;
}

export class SocialAccountEntity extends BaseEntity<string> {
  private _lastUsedAt?: string;
  private _isActive: boolean;

  private readonly _authId: AuthIdVO;
  private readonly _userId: UserIdVO;
  private readonly _provider: SocialProviderVO;
  private readonly _providerUserId: string;
  private readonly _email?: string;
  private readonly _name?: string;
  private readonly _avatarUrl?: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: SocialAccountEntityProps,
  ) {
    super(id, createdAt, updatedAt, null);
    this._authId = props.authId;
    this._userId = props.userId;
    this._provider = props.provider;
    this._providerUserId = props.providerUserId;
    this._email = props.email;
    this._name = props.name;
    this._avatarUrl = props.avatarUrl;
    this._lastUsedAt = props.lastUsedAt;
    this._isActive = props.isActive;
  }

  get authId(): AuthIdVO { return this._authId; }
  get userId(): UserIdVO { return this._userId; }
  get provider(): SocialProviderVO { return this._provider; }
  get providerUserId(): string { return this._providerUserId; }
  get email(): string | undefined { return this._email; }
  get name(): string | undefined { return this._name; }
  get avatarUrl(): string | undefined { return this._avatarUrl; }
  get lastUsedAt(): string | undefined { return this._lastUsedAt; }
  get isActive(): boolean { return this._isActive; }

  markUsed(now: string = new Date().toISOString()): void {
    this._lastUsedAt = now;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  deactivate(): void {
    this._isActive = false;
  }

  static create(params: {
    id: string;
    props: Omit<SocialAccountEntityProps, 'isActive'>;
    now: string;
  }): SocialAccountEntity {
    return new SocialAccountEntity(params.id, params.now, params.now, {
      ...params.props,
      isActive: true,
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: SocialAccountEntityProps;
  }): SocialAccountEntity {
    return new SocialAccountEntity(params.id, params.createdAt, params.updatedAt, params.props);
  }
}
