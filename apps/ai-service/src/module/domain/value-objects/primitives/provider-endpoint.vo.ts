import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

const URL_REGEX = /^https?:\/\/.+/;

export class ProviderEndpointVO extends BaseCodeVO {
  static create(raw: string): ProviderEndpointVO {
    BaseCodeVO.validateNonEmpty(raw, 'ProviderEndpoint');
    if (!URL_REGEX.test(raw)) {
      throw new Error(`Invalid URL format: ${raw}`);
    }
    return new ProviderEndpointVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }

  get isHttps(): boolean {
    return this.value.startsWith('https://');
  }
}
