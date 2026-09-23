import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';

const VALID = new Set<string>([
  'draft', 'active', 'paused', 'scheduled', 'running', 'completed', 'archived', 'cancelled',
]);

export class CampaignStatusVO extends BaseStatusVO<string> {
  static create(raw: string): CampaignStatusVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid CampaignStatus: ${raw}`);
    }
    return new CampaignStatusVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
