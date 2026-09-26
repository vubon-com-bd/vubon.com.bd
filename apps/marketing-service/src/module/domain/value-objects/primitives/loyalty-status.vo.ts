import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';

const VALID = new Set<string>([
  'active', 'inactive', 'suspended', 'expired',
]);

export class LoyaltyStatusVO extends BaseStatusVO<string> {
  static create(raw: string): LoyaltyStatusVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid LoyaltyStatus: ${raw}`);
    }
    return new LoyaltyStatusVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
