import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

const VALID = new Set<string>([
  'email', 'sms', 'facebook', 'instagram', 'twitter', 'linkedin', 'tiktok', 'google', 'youtube', 'push',
]);

export class CampaignChannelVO extends BaseTypeVO<string> {
  static create(raw: string): CampaignChannelVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid CampaignChannel: ${raw}`);
    }
    return new CampaignChannelVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
