import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

const VALID = new Set<string>(['json', 'csv', 'xlsx', 'pdf', 'html']);

export class ReportFormatVO extends BaseTypeVO<string> {
  static create(raw: string): ReportFormatVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid ReportFormat: ${raw}`);
    }
    return new ReportFormatVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
