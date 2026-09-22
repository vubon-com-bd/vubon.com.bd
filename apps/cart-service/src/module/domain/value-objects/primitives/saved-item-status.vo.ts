import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>([
  'saved',
  'moved_to_cart',
  'removed',
  'expired',
]);

export class SavedItemStatusVO extends BaseStatusVO<string> {
  static create(value: string): SavedItemStatusVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid saved item status: ${value}`);
    }
    return new SavedItemStatusVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
