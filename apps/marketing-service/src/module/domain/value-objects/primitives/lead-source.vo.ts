import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

const VALID = new Set<string>([
  'website', 'landing_page', 'social', 'email', 'referral', 'ads', 'organic', 'direct', 'event', 'cold_call',
]);

export class LeadSourceVO extends BaseTypeVO<string> {
  static create(raw: string): LeadSourceVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid LeadSource: ${raw}`);
    }
    return new LeadSourceVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
