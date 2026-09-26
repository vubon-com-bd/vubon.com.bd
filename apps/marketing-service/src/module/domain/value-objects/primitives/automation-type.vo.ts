import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

const VALID = new Set<string>([
  'email_sequence', 'abandoned_cart', 'welcome_series', 'birthday', 're_engagement', 'post_purchase', 'win_back',
]);

export class AutomationTypeVO extends BaseTypeVO<string> {
  static create(raw: string): AutomationTypeVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid AutomationType: ${raw}`);
    }
    return new AutomationTypeVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
