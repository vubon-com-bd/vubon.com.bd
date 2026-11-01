/**
 * SsoConfigVO
 * @module identity-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { SsoProviderVO } from '../primitives/sso-provider.vo.js';

export interface SsoConfigVOProps {
  readonly id: string;
  readonly name: string;
  readonly provider: SsoProviderVO;
  readonly entryPoint: string;
  readonly issuer: string;
  readonly certificate?: string;
  readonly metadataUrl?: string;
  readonly isActive: boolean;
  readonly createdAt: string;
}

export class SsoConfigVO extends BaseVO<SsoConfigVOProps> {
  private constructor(props: SsoConfigVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: SsoConfigVOProps): SsoConfigVO {
    const vo = new SsoConfigVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: SsoConfigVOProps): SsoConfigVO {
    return new SsoConfigVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!v.entryPoint.startsWith('http')) {
      throw new ValidationError('entryPoint must be a URL', 'entryPoint');
    }
    if (!v.issuer || v.issuer.trim().length === 0) {
      throw new ValidationError('issuer cannot be empty', 'issuer');
    }
    if (v.provider.isSaml() && !v.certificate) {
      throw new ValidationError(
        'SAML provider requires a certificate',
        'certificate',
      );
    }
  }

  get id(): string { return this.value.id; }
  get name(): string { return this.value.name; }
  get provider(): SsoProviderVO { return this.value.provider; }
  get entryPoint(): string { return this.value.entryPoint; }
  get issuer(): string { return this.value.issuer; }
  get certificate(): string | undefined { return this.value.certificate; }
  get metadataUrl(): string | undefined { return this.value.metadataUrl; }
  get isActive(): boolean { return this.value.isActive; }
  get createdAt(): string { return this.value.createdAt; }
}
