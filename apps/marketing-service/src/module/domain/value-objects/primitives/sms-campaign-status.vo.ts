import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';

const VALID = new Set<string>([
  'draft', 'scheduled', 'sending', 'sent', 'paused', 'cancelled', 'failed',
]);

export class SmsCampaignStatusVO extends BaseStatusVO<string> {
  static create(raw: string): SmsCampaignStatusVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid SmsCampaignStatus: ${raw}`);
    }
    return new SmsCampaignStatusVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
