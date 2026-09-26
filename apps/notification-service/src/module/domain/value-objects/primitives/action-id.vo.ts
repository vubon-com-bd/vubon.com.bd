import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class ActionIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ActionIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('ActionId cannot be empty');
    }
    return new ActionIdVO(raw);
  }
}
