/**
 * TemplateCategory Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_TEMPLATE_CATEGORY } from '@vubon/shared-constants/platform/notification';
import { InvalidTemplateCategoryError } from '../../errors/template.errors.js';

type TemplateCategoryValue =
  (typeof NOTIFICATION_TEMPLATE_CATEGORY)[keyof typeof NOTIFICATION_TEMPLATE_CATEGORY];
const ALLOWED = Object.values(NOTIFICATION_TEMPLATE_CATEGORY) as readonly string[];

export class TemplateCategoryVO extends BaseTypeVO<TemplateCategoryValue> {
  private constructor(value: TemplateCategoryValue) {
    super(value);
  }

  static override allowedValues(): ReadonlySet<string> {
    return new Set<string>(ALLOWED);
  }

  static create(raw: string): TemplateCategoryVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidTemplateCategoryError(raw, ALLOWED);
    }
    return new TemplateCategoryVO(raw as TemplateCategoryValue);
  }

  static reconstitute(raw: string): TemplateCategoryVO {
    return new TemplateCategoryVO(raw as TemplateCategoryValue);
  }

  static auth(): TemplateCategoryVO { return new TemplateCategoryVO(NOTIFICATION_TEMPLATE_CATEGORY.AUTH); }
  static order(): TemplateCategoryVO { return new TemplateCategoryVO(NOTIFICATION_TEMPLATE_CATEGORY.ORDER); }
  static payment(): TemplateCategoryVO { return new TemplateCategoryVO(NOTIFICATION_TEMPLATE_CATEGORY.PAYMENT); }
  static shipping(): TemplateCategoryVO { return new TemplateCategoryVO(NOTIFICATION_TEMPLATE_CATEGORY.SHIPPING); }
  static marketing(): TemplateCategoryVO { return new TemplateCategoryVO(NOTIFICATION_TEMPLATE_CATEGORY.MARKETING); }
  static support(): TemplateCategoryVO { return new TemplateCategoryVO(NOTIFICATION_TEMPLATE_CATEGORY.SUPPORT); }
  static system(): TemplateCategoryVO { return new TemplateCategoryVO(NOTIFICATION_TEMPLATE_CATEGORY.SYSTEM); }
  static security(): TemplateCategoryVO { return new TemplateCategoryVO(NOTIFICATION_TEMPLATE_CATEGORY.SECURITY); }
}
