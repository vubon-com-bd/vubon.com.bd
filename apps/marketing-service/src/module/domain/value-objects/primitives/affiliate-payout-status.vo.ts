import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';

const VALID = new Set<string>([
  'pending', 'approved', 'processing', 'completed', 'failed', 'cancelled',
]);

export class AffiliatePayoutStatusVO extends BaseStatusVO<string> {
  static create(raw: string): AffiliatePayoutStatusVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid AffiliatePayoutStatus: ${raw}`);
    }
    return new AffiliatePayoutStatusVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
