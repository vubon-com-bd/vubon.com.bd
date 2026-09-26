/**
 * AutomationTypeVO — Automation trigger/action category
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseTypeVO
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SUPPORT_AUTOMATION_TYPE } from '@vubon/shared-constants/support';

export type AutomationTypeValue =
  (typeof SUPPORT_AUTOMATION_TYPE)[keyof typeof SUPPORT_AUTOMATION_TYPE];

const TYPE_SET: ReadonlySet<string> = new Set(
  Object.values(SUPPORT_AUTOMATION_TYPE),
);

const TIME_BASED: ReadonlySet<string> = new Set<string>([
  'scheduled',
  'delayed',
  'recurring',
]);

export class AutomationTypeVO extends BaseTypeVO<AutomationTypeValue> {
  private constructor(value: AutomationTypeValue) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return TYPE_SET;
  }

  static create(raw: string): AutomationTypeVO {
    const normalized = raw.trim().toLowerCase();
    if (!TYPE_SET.has(normalized)) {
      throw new ValidationError(
        `Invalid automation type: ${raw}`,
        'automationType',
      );
    }
    return new AutomationTypeVO(normalized as AutomationTypeValue);
  }

  isTimeBased(): boolean {
    return TIME_BASED.has(this.value);
  }
}
