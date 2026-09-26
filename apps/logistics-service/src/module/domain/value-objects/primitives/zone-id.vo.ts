import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import type { BrandedId } from '@vubon/shared-kernel/domain/primitives';

export type ZoneId = BrandedId<'ZoneId'>;

export class ZoneIdVO extends BaseVO<ZoneId> {
  private constructor(value: ZoneId) {
    super(value);
  }

  static create(raw: string): ZoneIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('ZoneId cannot be empty');
    }
    return new ZoneIdVO(raw as ZoneId);
  }
}
