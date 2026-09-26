import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';

const VALID = new Set<string>([
  'pending', 'active', 'suspended', 'rejected', 'inactive',
]);

export class AffiliateStatusVO extends BaseStatusVO<string> {
  static create(raw: string): AffiliateStatusVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid AffiliateStatus: ${raw}`);
    }
    return new AffiliateStatusVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
