import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

const VALID = new Set<string>([
  'email', 'sms', 'social', 'search', 'display', 'content', 'event', 'multi_channel',
]);

export class CampaignTypeVO extends BaseTypeVO<string> {
  static create(raw: string): CampaignTypeVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid CampaignType: ${raw}`);
    }
    return new CampaignTypeVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
