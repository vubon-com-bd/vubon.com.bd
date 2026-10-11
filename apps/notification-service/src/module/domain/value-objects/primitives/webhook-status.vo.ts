/**
 * WebhookStatus Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { WEBHOOK_STATUS } from '@vubon/shared-constants/platform/notification';
import { InvalidWebhookStatusError } from '../../errors/webhook.errors.js';

const ALLOWED = Object.values(WEBHOOK_STATUS) as readonly string[];

export class WebhookStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): WebhookStatusVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidWebhookStatusError(raw, ALLOWED);
    }
    return new WebhookStatusVO(raw);
  }

  static reconstitute(raw: string): WebhookStatusVO {
    return new WebhookStatusVO(raw);
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

  /** Whether the webhook should fire on events. */
  canDeliver(): boolean {
    return this.isActive();
  }

  isFinal(): boolean {
    return this.isDisabled();
  }
}
