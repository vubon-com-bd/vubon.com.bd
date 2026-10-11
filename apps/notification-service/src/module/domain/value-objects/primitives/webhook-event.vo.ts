/**
 * WebhookEvent Value Object — event name that triggers the webhook
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { WEBHOOK_EVENT } from '@vubon/shared-constants/platform/notification';
import { InvalidWebhookEventError } from '../../errors/webhook.errors.js';

type WebhookEventValue = (typeof WEBHOOK_EVENT)[keyof typeof WEBHOOK_EVENT];
const ALLOWED = Object.values(WEBHOOK_EVENT) as readonly string[];

export class WebhookEventVO extends BaseTypeVO<WebhookEventValue> {
  private constructor(value: WebhookEventValue) {
    super(value);
  }

  static override allowedValues(): ReadonlySet<string> {
    return new Set<string>(ALLOWED);
  }

  static create(raw: string): WebhookEventVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidWebhookEventError(raw, ALLOWED);
    }
    return new WebhookEventVO(raw as WebhookEventValue);
  }

  static reconstitute(raw: string): WebhookEventVO {
    return new WebhookEventVO(raw as WebhookEventValue);
  }

  static orderCreated(): WebhookEventVO { return new WebhookEventVO(WEBHOOK_EVENT.ORDER_CREATED); }
  static orderUpdated(): WebhookEventVO { return new WebhookEventVO(WEBHOOK_EVENT.ORDER_UPDATED); }
  static orderCancelled(): WebhookEventVO { return new WebhookEventVO(WEBHOOK_EVENT.ORDER_CANCELLED); }
  static orderDelivered(): WebhookEventVO { return new WebhookEventVO(WEBHOOK_EVENT.ORDER_DELIVERED); }
  static paymentSucceeded(): WebhookEventVO { return new WebhookEventVO(WEBHOOK_EVENT.PAYMENT_SUCCEEDED); }
  static paymentFailed(): WebhookEventVO { return new WebhookEventVO(WEBHOOK_EVENT.PAYMENT_FAILED); }
  static paymentRefunded(): WebhookEventVO { return new WebhookEventVO(WEBHOOK_EVENT.PAYMENT_REFUNDED); }
  static userCreated(): WebhookEventVO { return new WebhookEventVO(WEBHOOK_EVENT.USER_CREATED); }
  static userUpdated(): WebhookEventVO { return new WebhookEventVO(WEBHOOK_EVENT.USER_UPDATED); }
  static userDeleted(): WebhookEventVO { return new WebhookEventVO(WEBHOOK_EVENT.USER_DELETED); }
  static productCreated(): WebhookEventVO { return new WebhookEventVO(WEBHOOK_EVENT.PRODUCT_CREATED); }
  static productUpdated(): WebhookEventVO { return new WebhookEventVO(WEBHOOK_EVENT.PRODUCT_UPDATED); }
  static productDeleted(): WebhookEventVO { return new WebhookEventVO(WEBHOOK_EVENT.PRODUCT_DELETED); }
  static vendorApproved(): WebhookEventVO { return new WebhookEventVO(WEBHOOK_EVENT.VENDOR_APPROVED); }
  static vendorRejected(): WebhookEventVO { return new WebhookEventVO(WEBHOOK_EVENT.VENDOR_REJECTED); }
  static shipmentCreated(): WebhookEventVO { return new WebhookEventVO(WEBHOOK_EVENT.SHIPMENT_CREATED); }
  static shipmentDelivered(): WebhookEventVO { return new WebhookEventVO(WEBHOOK_EVENT.SHIPMENT_DELIVERED); }

  get eventDomain(): string {
    return this.value.split('.')[0] ?? '';
  }

  get eventAction(): string {
    return this.value.split('.')[1] ?? '';
  }
}
