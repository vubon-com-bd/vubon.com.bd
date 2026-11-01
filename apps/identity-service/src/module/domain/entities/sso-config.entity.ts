/**
 * SsoConfigEntity — AGGREGATE ROOT
 * @module identity-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { SsoProviderVO } from '../value-objects/primitives/sso-provider.vo.js';

export interface SsoConfigEntityProps {
  readonly name: string;
  readonly provider: SsoProviderVO;
  readonly entryPoint: string;
  readonly issuer: string;
  readonly certificate?: string;
  readonly metadataUrl?: string;
  readonly isActive: boolean;
}

export class SsoConfigEntity extends AggregateRoot<string> {
  private _isActive: boolean;

  private readonly _name: string;
  private readonly _provider: SsoProviderVO;
  private readonly _entryPoint: string;
  private readonly _issuer: string;
  private readonly _certificate?: string;
  private readonly _metadataUrl?: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: SsoConfigEntityProps,
  ) {
    super(id, createdAt, updatedAt, null);
    this._name = props.name;
    this._provider = props.provider;
    this._entryPoint = props.entryPoint;
    this._issuer = props.issuer;
    this._certificate = props.certificate;
    this._metadataUrl = props.metadataUrl;
    this._isActive = props.isActive;

    if (!this._entryPoint.startsWith('http')) {
      throw new ValidationError('entryPoint must be a URL', 'entryPoint');
    }
    if (this._provider.isSaml() && !this._certificate) {
      throw new ValidationError('SAML requires certificate', 'certificate');
    }
  }

  get name(): string { return this._name; }
  get provider(): SsoProviderVO { return this._provider; }
  get entryPoint(): string { return this._entryPoint; }
  get issuer(): string { return this._issuer; }
  get certificate(): string | undefined { return this._certificate; }
  get metadataUrl(): string | undefined { return this._metadataUrl; }
  get isActive(): boolean { return this._isActive; }

  deactivate(now: string = new Date().toISOString()): void {
    this._isActive = false;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  static create(params: {
    id: string;
    props: Omit<SsoConfigEntityProps, 'isActive'>;
    now: string;
  }): SsoConfigEntity {
    return new SsoConfigEntity(params.id, params.now, params.now, {
      ...params.props,
      isActive: true,
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: SsoConfigEntityProps;
    version?: number;
  }): SsoConfigEntity {
    const entity = new SsoConfigEntity(params.id, params.createdAt, params.updatedAt, params.props);
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
