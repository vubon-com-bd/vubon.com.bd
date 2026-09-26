import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';

const VALID = new Set<string>([
  'draft', 'scheduled', 'sending', 'sent', 'paused', 'cancelled', 'failed',
]);

export class EmailCampaignStatusVO extends BaseStatusVO<string> {
  static create(raw: string): EmailCampaignStatusVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid EmailCampaignStatus: ${raw}`);
    }
    return new EmailCampaignStatusVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
