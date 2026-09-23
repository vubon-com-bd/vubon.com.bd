import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import type { BrandedId } from '@vubon/shared-kernel/domain/primitives';

export type DriverId = BrandedId<'DriverId'>;

export class DriverIdVO extends BaseVO<DriverId> {
  private constructor(value: DriverId) {
    super(value);
  }

  static create(raw: string): DriverIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('DriverId cannot be empty');
    }
    return new DriverIdVO(raw as DriverId);
  }
}
