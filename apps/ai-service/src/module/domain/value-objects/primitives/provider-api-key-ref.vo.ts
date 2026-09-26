import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

/**
 * API key reference — env variable name only, never the key itself.
 */
export class ProviderApiKeyRefVO extends BaseCodeVO {
  static create(raw: string): ProviderApiKeyRefVO {
    BaseCodeVO.validateNonEmpty(raw, 'ProviderApiKeyRef');
    if (!/^[A-Z][A-Z0-9_]*$/.test(raw)) {
      throw new Error(
        `ProviderApiKeyRef must be an env var name (SCREAMING_SNAKE_CASE): ${raw}`,
      );
    }
    return new ProviderApiKeyRefVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
