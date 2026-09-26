import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { WEBHOOK_STATUS } from '@vubon/shared-constants/platform/notification';

const ALLOWED = new Set<string>(Object.values(WEBHOOK_STATUS));

export class WebhookStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return ALLOWED;
  }

  static create(raw: string): WebhookStatusVO {
    if (!ALLOWED.has(raw)) {
      throw new Error(`Invalid webhook status: ${raw}`);
    }
    return new WebhookStatusVO(raw);
  }
}
