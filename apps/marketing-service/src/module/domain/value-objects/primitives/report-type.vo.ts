import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

const VALID = new Set<string>([
  'campaign', 'promotion', 'affiliate', 'loyalty', 'lead', 'revenue', 'roi', 'attribution', 'custom',
]);

export class ReportTypeVO extends BaseTypeVO<string> {
  static create(raw: string): ReportTypeVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid ReportType: ${raw}`);
    }
    return new ReportTypeVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
