import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class SplitIdVO extends BaseIdVO {
  static create(value: string): SplitIdVO {
    if (!value || value.trim().length < 3) {
      throw new Error('Invalid split id');
    }
    return new SplitIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
