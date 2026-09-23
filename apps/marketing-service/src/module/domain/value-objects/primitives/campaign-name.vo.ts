import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives/name.vo';
import { VALIDATION } from '@vubon/shared-constants/common';

export class CampaignNameVO extends BaseNameVO {
  static create(raw: string): CampaignNameVO {
    const trimmed = raw.trim();
    if (trimmed.length < 1) {
      throw new Error('CampaignName cannot be empty');
    }
    if (trimmed.length > VALIDATION.NAME_MAX_LENGTH) {
      throw new Error(`CampaignName exceeds ${VALIDATION.NAME_MAX_LENGTH} chars`);
    }
    return new CampaignNameVO(trimmed);
  }

  private constructor(value: string) {
    super(value);
  }
}
