import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class WidgetIdVO extends BaseIdVO {
  static create(raw: string): WidgetIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('WidgetId cannot be empty');
    }
    return new WidgetIdVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
