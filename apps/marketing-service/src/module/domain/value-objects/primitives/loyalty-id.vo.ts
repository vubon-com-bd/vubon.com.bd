import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class LoyaltyIdVO extends BaseIdVO {
  static create(raw: string): LoyaltyIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('LoyaltyId cannot be empty');
    }
    return new LoyaltyIdVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
