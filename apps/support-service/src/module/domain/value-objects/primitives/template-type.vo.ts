import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { SUPPORT_TEMPLATE_TYPE } from '@vubon/shared-constants/support';

const VALID = new Set<string>(Object.values(SUPPORT_TEMPLATE_TYPE));

export class TemplateTypeVO extends BaseTypeVO<string> {
  static create(value: string): TemplateTypeVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid template type: ${value}`);
    }
    return new TemplateTypeVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
