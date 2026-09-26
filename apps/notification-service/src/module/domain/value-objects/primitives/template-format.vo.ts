import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';

const ALLOWED = new Set<string>(['html', 'text', 'mjml', 'markdown', 'json']);

export class TemplateFormatVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return ALLOWED;
  }

  static create(raw: string): TemplateFormatVO {
    if (!ALLOWED.has(raw)) {
      throw new Error(`Invalid template format: ${raw}`);
    }
    return new TemplateFormatVO(raw);
  }
}
