/**
 * WebhookStatus Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { WEBHOOK_STATUS } from '@vubon/shared-constants/platform';
import { InvalidWebhookStatusError } from '@domain/errors/webhook.errors.js';

export type WebhookStatusValue = (typeof WEBHOOK_STATUS)[keyof typeof WEBHOOK_STATUS];

const ALLOWED = Object.values(WEBHOOK_STATUS) as readonly string[];

const VALID_TRANSITIONS: Readonly<Record<string, readonly string[]>> = {
  active: ['inactive', 'paused', 'failed', 'disabled'],
  inactive: ['active', 'disabled'],
  paused: ['active', 'disabled'],
  failed: ['active', 'inactive', 'disabled'],
  disabled: [],
};

export class WebhookStatusVO extends BaseStatusVO<WebhookStatusValue> {
  private constructor(value: WebhookStatusValue) {
    super(value);
  }

  static create(raw: string): WebhookStatusVO {
    if (typeof raw !== 'string') {
      throw new InvalidWebhookStatusError(String(raw), ALLOWED);
    }
    const normalized = raw.trim().toLowerCase();
    if (!ALLOWED.includes(normalized)) {
      throw new InvalidWebhookStatusError(normalized, ALLOWED);
    }
    return new WebhookStatusVO(normalized as WebhookStatusValue);
  }

  static reconstitute(raw: string): WebhookStatusVO {
    return new WebhookStatusVO(raw as WebhookStatusValue);
  }

  static active(): WebhookStatusVO { return new WebhookStatusVO(WEBHOOK_STATUS.ACTIVE); }
  static inactive(): WebhookStatusVO { return new WebhookStatusVO(WEBHOOK_STATUS.INACTIVE); }
  static paused(): WebhookStatusVO { return new WebhookStatusVO(WEBHOOK_STATUS.PAUSED); }
  static failed(): WebhookStatusVO { return new WebhookStatusVO(WEBHOOK_STATUS.FAILED); }
  static disabled(): WebhookStatusVO { return new WebhookStatusVO(WEBHOOK_STATUS.DISABLED); }

  isActive(): boolean { return this.value === WEBHOOK_STATUS.ACTIVE; }
  isInactive(): boolean { return this.value === WEBHOOK_STATUS.INACTIVE; }
  isPaused(): boolean { return this.value === WEBHOOK_STATUS.PAUSED; }
  isFailed(): boolean { return this.value === WEBHOOK_STATUS.FAILED; }
  isDisabled(): boolean { return this.value === WEBHOOK_STATUS.DISABLED; }

  canDeliver(): boolean { return this.isActive(); }

  isTerminal(): boolean { return this.isDisabled(); }

  canTransitionTo(target: string): boolean {
    return (VALID_TRANSITIONS[this.value] ?? []).includes(target);
  }
}
