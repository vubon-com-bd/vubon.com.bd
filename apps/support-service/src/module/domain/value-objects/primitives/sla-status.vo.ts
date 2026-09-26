/**
 * SlaStatusVO — SLA tracking status for a ticket
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseStatusVO
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SUPPORT_SLA_STATUS } from '@vubon/shared-constants/support';

export type SlaStatusValue =
  (typeof SUPPORT_SLA_STATUS)[keyof typeof SUPPORT_SLA_STATUS];

const STATUS_SET: ReadonlySet<string> = new Set(
  Object.values(SUPPORT_SLA_STATUS),
);

const SUCCESS_STATUSES: ReadonlySet<string> = new Set<string>(['met', 'achieved']);
const FAILURE_STATUSES: ReadonlySet<string> = new Set<string>(['breached', 'violated']);

export class SlaStatusVO extends BaseStatusVO<SlaStatusValue> {
  private constructor(value: SlaStatusValue) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return STATUS_SET;
  }

  static create(raw: string): SlaStatusVO {
    const normalized = raw.trim().toLowerCase();
    if (!STATUS_SET.has(normalized)) {
      throw new ValidationError(
        `Invalid SLA status: ${raw}`,
        'slaStatus',
      );
    }
    return new SlaStatusVO(normalized as SlaStatusValue);
  }

  isMet(): boolean {
    return SUCCESS_STATUSES.has(this.value);
  }

  isBreached(): boolean {
    return FAILURE_STATUSES.has(this.value);
  }

  isTerminal(): boolean {
    return this.isMet() || this.isBreached();
  }
}
