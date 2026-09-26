import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { AI_INSIGHT_STATUS } from '@vubon/shared-constants/ai';

const VALID = new Set<string>(Object.values(AI_INSIGHT_STATUS));

export class InsightStatusVO extends BaseStatusVO<string> {
  static create(raw: string): InsightStatusVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid insight status: ${raw}`);
    }
    return new InsightStatusVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }

  isDismissed(): boolean { return this.value === 'dismissed'; }
  isVisible(): boolean { return this.value === 'active'; }
}
