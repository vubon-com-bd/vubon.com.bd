import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class UtmCampaignVO extends BaseCodeVO {
  private static readonly MAX_LENGTH = 300;

  static create(raw: string): UtmCampaignVO {
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
      throw new Error('UtmCampaign cannot be empty');
    }
    if (trimmed.length > UtmCampaignVO.MAX_LENGTH) {
      throw new Error(`UtmCampaign too long: ${trimmed.length}`);
    }
    return new UtmCampaignVO(trimmed);
  }

  private constructor(value: string) {
    super(value);
  }

  get slug(): string {
    return this.value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  get year(): string | null {
    const match = this.value.match(/(20\d{2})/);
    return match ? match[1]! : null;
  }
}
