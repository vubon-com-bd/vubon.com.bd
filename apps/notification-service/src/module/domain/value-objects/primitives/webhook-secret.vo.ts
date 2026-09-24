import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class WebhookSecretVO extends BaseCodeVO {
  private static readonly MIN_LENGTH = 16;

  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): WebhookSecretVO {
    BaseCodeVO.validateNonEmpty(raw, 'WebhookSecret');
    if (raw.length < WebhookSecretVO.MIN_LENGTH) {
      throw new Error(
        `WebhookSecret too short (min ${WebhookSecretVO.MIN_LENGTH})`,
      );
    }
    return new WebhookSecretVO(raw);
  }

  reveal(): string {
    return this.value;
  }

  mask(): string {
    return '*'.repeat(Math.min(this.value.length, 20));
  }
}
