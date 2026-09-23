import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import type { BrandedId } from '@vubon/shared-kernel/domain/primitives';

export type CourierId = BrandedId<'CourierId'>;

export class CourierIdVO extends BaseVO<CourierId> {
  private constructor(value: CourierId) {
    super(value);
  }

  static create(raw: string): CourierIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('CourierId cannot be empty');
    }
    return new CourierIdVO(raw as CourierId);
  }
}
