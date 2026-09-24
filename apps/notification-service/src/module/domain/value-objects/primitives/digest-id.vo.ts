import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class DigestIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DigestIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('DigestId cannot be empty');
    }
    return new DigestIdVO(raw);
  }
}
