import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class ReferralIdVO extends BaseIdVO {
  static create(raw: string): ReferralIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('ReferralId cannot be empty');
    }
    return new ReferralIdVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
