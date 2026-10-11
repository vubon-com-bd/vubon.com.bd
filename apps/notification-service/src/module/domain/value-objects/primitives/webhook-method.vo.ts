/**
 * WebhookMethod Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { WEBHOOK_METHOD } from '@vubon/shared-constants/platform/notification';
import { InvalidWebhookMethodError } from '../../errors/webhook.errors.js';

type WebhookMethodValue = (typeof WEBHOOK_METHOD)[keyof typeof WEBHOOK_METHOD];
const ALLOWED = Object.values(WEBHOOK_METHOD) as readonly string[];

export class WebhookMethodVO extends BaseTypeVO<WebhookMethodValue> {
  private constructor(value: WebhookMethodValue) {
    super(value);
  }

  static override allowedValues(): ReadonlySet<string> {
    return new Set<string>(ALLOWED);
  }

  static create(raw: string): WebhookMethodVO {
    const upper = raw.trim().toUpperCase();
    if (!ALLOWED.includes(upper)) {
      throw new InvalidWebhookMethodError(raw, ALLOWED);
    }
    return new WebhookMethodVO(upper as WebhookMethodValue);
  }

  static reconstitute(raw: string): WebhookMethodVO {
    return new WebhookMethodVO(raw as WebhookMethodValue);
  }

  static get(): WebhookMethodVO { return new WebhookMethodVO(WEBHOOK_METHOD.GET); }
  static post(): WebhookMethodVO { return new WebhookMethodVO(WEBHOOK_METHOD.POST); }
  static put(): WebhookMethodVO { return new WebhookMethodVO(WEBHOOK_METHOD.PUT); }
  static patch(): WebhookMethodVO { return new WebhookMethodVO(WEBHOOK_METHOD.PATCH); }
  static delete(): WebhookMethodVO { return new WebhookMethodVO(WEBHOOK_METHOD.DELETE); }

  isGet(): boolean { return this.value === WEBHOOK_METHOD.GET; }
  isPost(): boolean { return this.value === WEBHOOK_METHOD.POST; }
  isPut(): boolean { return this.value === WEBHOOK_METHOD.PUT; }
  isPatch(): boolean { return this.value === WEBHOOK_METHOD.PATCH; }
  isDelete(): boolean { return this.value === WEBHOOK_METHOD.DELETE; }

  hasBody(): boolean {
    return this.isPost() || this.isPut() || this.isPatch();
  }
}
