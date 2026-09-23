import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';

const VALID = new Set<string>([
  'new', 'contacted', 'qualified', 'converted', 'lost', 'disqualified',
]);

export class LeadStatusVO extends BaseStatusVO<string> {
  static create(raw: string): LeadStatusVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid LeadStatus: ${raw}`);
    }
    return new LeadStatusVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
