/**
 * AuthSsoEntity — Enterprise SSO binding
 * @module auth-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import type { UserId } from '@vubon/shared-types/common';
import { SsoProviderVO } from '../value-objects/primitives/sso-provider.vo';
import { SsoTokenVO } from '../value-objects/primitives/sso-token.vo';
import { SsoStatusVO } from '../value-objects/primitives/sso-status.vo';

export interface AuthSsoEntityProps {
  readonly id: string;
  readonly userId: UserId;
  readonly provider: SsoProviderVO;
  readonly tenantId: string;
  readonly providerUserId: string;
  readonly assertion?: SsoTokenVO;
  readonly status: SsoStatusVO;
  readonly linkedAt: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt?: string | null;
}

export class AuthSsoEntity extends BaseEntity<string> {
  readonly userId: UserId;
  private _provider: SsoProviderVO;
  private _tenantId: string;
  private _providerUserId: string;
  private _assertion?: SsoTokenVO;
  private _status: SsoStatusVO;
  private _linkedAt: number;

  private constructor(props: AuthSsoEntityProps) {
    super(props.id, props.createdAt, props.updatedAt, props.deletedAt ?? null);
    this.userId = props.userId;
    this._provider = props.provider;
    this._tenantId = props.tenantId;
    this._providerUserId = props.providerUserId;
    this._assertion = props.assertion;
    this._status = props.status;
    this._linkedAt = props.linkedAt;
  }

  static create(props: AuthSsoEntityProps): AuthSsoEntity {
    return new AuthSsoEntity(props);
  }

  get provider(): SsoProviderVO { return this._provider; }
  get tenantId(): string { return this._tenantId; }
  get providerUserId(): string { return this._providerUserId; }
  get status(): SsoStatusVO { return this._status; }
  get linkedAt(): number { return this._linkedAt; }
  get assertion(): SsoTokenVO | undefined { return this._assertion; }

  isActive(): boolean { return this._status.isActive(); }

  refreshAssertion(assertion: SsoTokenVO): void {
    this._assertion = assertion;
    this._status = SsoStatusVO.of('active');
  }

  revoke(): void { this._status = SsoStatusVO.of('revoked'); }
}
