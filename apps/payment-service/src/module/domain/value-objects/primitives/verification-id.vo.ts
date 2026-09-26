import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class VerificationIdVO extends BaseIdVO {
  static create(value: string): VerificationIdVO {
    if (!value || value.trim().length < 3) {
      throw new Error('Invalid verification id');
    }
    return new VerificationIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
