/**
 * OAuthClientEntity — AGGREGATE ROOT
 * @module identity-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { OAuthGrantTypeVO } from '../value-objects/primitives/oauth-grant-type.vo.js';

export interface OAuthClientEntityProps {
  readonly clientId: string;
  readonly clientName: string;
  readonly redirectUris: readonly string[];
  readonly scopes: readonly string[];
  readonly grantTypes: readonly OAuthGrantTypeVO[];
  readonly isPublic: boolean;
  readonly isActive: boolean;
}

export class OAuthClientEntity extends AggregateRoot<string> {
  private _isActive: boolean;

  private readonly _clientId: string;
  private readonly _clientName: string;
  private readonly _redirectUris: readonly string[];
  private readonly _scopes: readonly string[];
  private readonly _grantTypes: readonly OAuthGrantTypeVO[];
  private readonly _isPublic: boolean;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: OAuthClientEntityProps,
  ) {
    super(id, createdAt, updatedAt, null);
    this._clientId = props.clientId;
    this._clientName = props.clientName;
    this._redirectUris = props.redirectUris;
    this._scopes = props.scopes;
    this._grantTypes = props.grantTypes;
    this._isPublic = props.isPublic;
    this._isActive = props.isActive;

    if (this._redirectUris.length === 0) {
      throw new ValidationError('redirectUris cannot be empty', 'redirectUris');
    }
    if (this._grantTypes.length === 0) {
      throw new ValidationError('grantTypes cannot be empty', 'grantTypes');
    }
  }

  get clientId(): string { return this._clientId; }
  get clientName(): string { return this._clientName; }
  get redirectUris(): readonly string[] { return this._redirectUris; }
  get scopes(): readonly string[] { return this._scopes; }
  get grantTypes(): readonly OAuthGrantTypeVO[] { return this._grantTypes; }
  get isPublic(): boolean { return this._isPublic; }
  get isActive(): boolean { return this._isActive; }

  isRedirectAllowed(uri: string): boolean {
    return this._redirectUris.includes(uri);
  }

  supportsGrant(g: OAuthGrantTypeVO): boolean {
    return this._grantTypes.some((x) => x.equals(g));
  }

  hasScope(scope: string): boolean {
    return this._scopes.includes(scope);
  }

  deactivate(now: string = new Date().toISOString()): void {
    this._isActive = false;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  static create(params: {
    id: string;
    props: Omit<OAuthClientEntityProps, 'isActive'>;
    now: string;
  }): OAuthClientEntity {
    return new OAuthClientEntity(params.id, params.now, params.now, {
      ...params.props,
      isActive: true,
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: OAuthClientEntityProps;
    version?: number;
  }): OAuthClientEntity {
    const entity = new OAuthClientEntity(params.id, params.createdAt, params.updatedAt, params.props);
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
