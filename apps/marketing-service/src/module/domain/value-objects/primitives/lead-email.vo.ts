import { BaseEmailVO } from '@vubon/shared-kernel/domain/primitives/email.vo';
import type { Email } from '@vubon/shared-types/common';

export class LeadEmailVO extends BaseEmailVO {
  private constructor(value: Email) {
    super(value);
  }

  static create(raw: string): LeadEmailVO {
    try {
      BaseEmailVO.validate(raw);
    } catch {
      throw new Error(`Invalid LeadEmail: ${raw}`);
    }
    return new LeadEmailVO(BaseEmailVO.normalize(raw));
  }
}
