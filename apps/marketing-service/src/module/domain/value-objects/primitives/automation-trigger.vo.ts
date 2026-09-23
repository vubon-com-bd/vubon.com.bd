import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

const VALID = new Set<string>([
  'signup', 'first_purchase', 'cart_abandoned', 'inactivity', 'birthday', 'order_completed', 'custom_event',
]);

export class AutomationTriggerVO extends BaseTypeVO<string> {
  static create(raw: string): AutomationTriggerVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid AutomationTrigger: ${raw}`);
    }
    return new AutomationTriggerVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
