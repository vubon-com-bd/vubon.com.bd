import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';

const ALLOWED = new Set<string>([
  'http',
  'slack',
  'discord',
  'telegram',
  'teams',
]);

export class WebhookTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return ALLOWED;
  }

  static create(raw: string): WebhookTypeVO {
    if (!ALLOWED.has(raw)) {
      throw new Error(`Invalid webhook type: ${raw}`);
    }
    return new WebhookTypeVO(raw);
  }
}
