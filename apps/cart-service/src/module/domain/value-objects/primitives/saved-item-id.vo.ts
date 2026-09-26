import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class SavedItemIdVO extends BaseIdVO {
  static create(value: string): SavedItemIdVO {
    if (!value || value.trim().length < 3) {
      throw new Error('Invalid saved item id');
    }
    return new SavedItemIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
