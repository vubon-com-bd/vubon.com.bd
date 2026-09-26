/**
 * TemplateTypeVO — Message template type
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseTypeVO
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SUPPORT_TEMPLATE_TYPE } from '@vubon/shared-constants/support';

export type TemplateTypeValue =
  (typeof SUPPORT_TEMPLATE_TYPE)[keyof typeof SUPPORT_TEMPLATE_TYPE];

const TYPE_SET: ReadonlySet<string> = new Set(
  Object.values(SUPPORT_TEMPLATE_TYPE),
);

const CUSTOMER_FACING: ReadonlySet<string> = new Set<string>([
  'email',
  'sms',
  'notification',
  'chat',
]);

export class TemplateTypeVO extends BaseTypeVO<TemplateTypeValue> {
  private constructor(value: TemplateTypeValue) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return TYPE_SET;
  }

  static create(raw: string): TemplateTypeVO {
    const normalized = raw.trim().toLowerCase();
    if (!TYPE_SET.has(normalized)) {
      throw new ValidationError(
        `Invalid template type: ${raw}`,
        'templateType',
      );
    }
    return new TemplateTypeVO(normalized as TemplateTypeValue);
  }

  isCustomerFacing(): boolean {
    return CUSTOMER_FACING.has(this.value);
  }
}
