import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import type { BrandedId } from '@vubon/shared-kernel/domain/primitives';

export type LocationId = BrandedId<'LocationId'>;

export class LocationIdVO extends BaseVO<LocationId> {
  private constructor(value: LocationId) {
    super(value);
  }

  static create(raw: string): LocationIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('LocationId cannot be empty');
    }
    return new LocationIdVO(raw as LocationId);
  }
}
