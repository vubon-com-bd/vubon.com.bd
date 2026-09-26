/**
 * AutomationStatusVO — Automation execution status
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseStatusVO
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SUPPORT_AUTOMATION_STATUS } from '@vubon/shared-constants/support';

export type AutomationStatusValue =
  (typeof SUPPORT_AUTOMATION_STATUS)[keyof typeof SUPPORT_AUTOMATION_STATUS];

const STATUS_SET: ReadonlySet<string> = new Set(
  Object.values(SUPPORT_AUTOMATION_STATUS),
);

const ENABLED: ReadonlySet<string> = new Set<string>(['active', 'enabled', 'running']);
const DISABLED: ReadonlySet<string> = new Set<string>(['inactive', 'disabled', 'paused']);

export class AutomationStatusVO extends BaseStatusVO<AutomationStatusValue> {
  private constructor(value: AutomationStatusValue) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return STATUS_SET;
  }

  static create(raw: string): AutomationStatusVO {
    const normalized = raw.trim().toLowerCase();
    if (!STATUS_SET.has(normalized)) {
      throw new ValidationError(
        `Invalid automation status: ${raw}`,
        'automationStatus',
      );
    }
    return new AutomationStatusVO(normalized as AutomationStatusValue);
  }

  isEnabled(): boolean {
    return ENABLED.has(this.value);
  }

  isDisabled(): boolean {
    return DISABLED.has(this.value);
  }
}
