import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>([
  'active',
  'merged',
  'expired',
  'abandoned',
  'converted',
]);

export class GuestCartStatusVO extends BaseStatusVO<string> {
  static create(value: string): GuestCartStatusVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid guest cart status: ${value}`);
    }
    return new GuestCartStatusVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
