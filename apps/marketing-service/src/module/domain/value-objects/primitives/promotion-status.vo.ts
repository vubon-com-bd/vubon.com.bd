import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';

const VALID = new Set<string>([
  'draft', 'active', 'paused', 'expired', 'exhausted', 'cancelled',
]);

export class PromotionStatusVO extends BaseStatusVO<string> {
  static create(raw: string): PromotionStatusVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid PromotionStatus: ${raw}`);
    }
    return new PromotionStatusVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
