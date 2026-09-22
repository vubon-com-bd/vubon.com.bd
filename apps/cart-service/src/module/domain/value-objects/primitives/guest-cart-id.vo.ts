import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class GuestCartIdVO extends BaseIdVO {
  static create(value: string): GuestCartIdVO {
    if (!value || value.trim().length < 3) {
      throw new Error('Invalid guest cart id');
    }
    return new GuestCartIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
