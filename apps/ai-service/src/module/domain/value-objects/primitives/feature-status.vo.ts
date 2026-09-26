import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { AI_FEATURE_STATUS } from '@vubon/shared-constants/ai';

const VALID_STATUSES = new Set<string>(Object.values(AI_FEATURE_STATUS));

export class FeatureStatusVO extends BaseStatusVO<string> {
  static create(raw: string): FeatureStatusVO {
    if (!VALID_STATUSES.has(raw)) {
      throw new Error(`Invalid feature status: ${raw}`);
    }
    return new FeatureStatusVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }

  isEnabled(): boolean { return this.value === AI_FEATURE_STATUS.ENABLED; }
  isDisabled(): boolean { return this.value === AI_FEATURE_STATUS.DISABLED; }
}
