import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class CampaignIdVO extends BaseIdVO {
  static create(raw: string): CampaignIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('CampaignId cannot be empty');
    }
    return new CampaignIdVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
