/**
 * OAuthClientVO
 * @module identity-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { OAuthGrantTypeVO } from '../primitives/oauth-grant-type.vo.js';

export interface OAuthClientVOProps {
  readonly clientId: string;
  readonly clientName: string;
  readonly redirectUris: readonly string[];
  readonly scopes: readonly string[];
  readonly grantTypes: readonly OAuthGrantTypeVO[];
  readonly isPublic: boolean;
  readonly isActive: boolean;
  readonly createdAt: string;
}

export class OAuthClientVO extends BaseVO<OAuthClientVOProps> {
  private constructor(props: OAuthClientVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: OAuthClientVOProps): OAuthClientVO {
    const vo = new OAuthClientVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: OAuthClientVOProps): OAuthClientVO {
    return new OAuthClientVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.redirectUris.length === 0) {
      throw new ValidationError('redirectUris cannot be empty', 'redirectUris');
    }
    if (v.grantTypes.length === 0) {
      throw new ValidationError('grantTypes cannot be empty', 'grantTypes');
    }
  }

  get clientId(): string { return this.value.clientId; }
  get clientName(): string { return this.value.clientName; }
  get redirectUris(): readonly string[] { return this.value.redirectUris; }
  get scopes(): readonly string[] { return this.value.scopes; }
  get grantTypes(): readonly OAuthGrantTypeVO[] { return this.value.grantTypes; }
  get isPublic(): boolean { return this.value.isPublic; }
  get isActive(): boolean { return this.value.isActive; }
  get createdAt(): string { return this.value.createdAt; }

  isRedirectAllowed(uri: string): boolean {
    return this.value.redirectUris.includes(uri);
  }
  supportsGrant(g: OAuthGrantTypeVO): boolean {
    return this.value.grantTypes.some((x) => x.equals(g));
  }
}
