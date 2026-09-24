import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';

export class WebhookUrlVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): WebhookUrlVO {
    BaseCodeVO.validateNonEmpty(raw, 'WebhookUrl');
    const trimmed = raw.trim();
    if (!REGEX.URL.test(trimmed)) {
      throw new Error(`Invalid webhook URL: ${raw}`);
    }
    return new WebhookUrlVO(trimmed);
  }
}
