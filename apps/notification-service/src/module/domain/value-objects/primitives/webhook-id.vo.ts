import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class WebhookIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): WebhookIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('WebhookId cannot be empty');
    }
    return new WebhookIdVO(raw);
  }
}
