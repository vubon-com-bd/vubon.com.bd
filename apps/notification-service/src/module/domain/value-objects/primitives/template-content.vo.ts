import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class TemplateContentVO extends BaseCodeVO {
  private static readonly MAX_LENGTH = 500_000;

  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TemplateContentVO {
    BaseCodeVO.validateNonEmpty(raw, 'TemplateContent');
    if (raw.length > TemplateContentVO.MAX_LENGTH) {
      throw new Error(
        `TemplateContent too long (max ${TemplateContentVO.MAX_LENGTH})`,
      );
    }
    return new TemplateContentVO(raw);
  }
}
