import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';

const VALID = new Set<string>([
  'pending', 'registered', 'converted', 'rewarded', 'expired', 'cancelled',
]);

export class ReferralStatusVO extends BaseStatusVO<string> {
  static create(raw: string): ReferralStatusVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid ReferralStatus: ${raw}`);
    }
    return new ReferralStatusVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
