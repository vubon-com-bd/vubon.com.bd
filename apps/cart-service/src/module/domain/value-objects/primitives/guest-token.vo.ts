import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class GuestTokenVO extends BaseCodeVO {
  static create(value: string): GuestTokenVO {
    if (!value || value.length < 16 || value.length > 128) {
      throw new Error('Guest token must be 16–128 chars');
    }
    return new GuestTokenVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
