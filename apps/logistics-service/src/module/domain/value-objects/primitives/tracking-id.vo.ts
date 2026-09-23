import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import type { BrandedId } from '@vubon/shared-kernel/domain/primitives';

export type TrackingId = BrandedId<'TrackingId'>;

export class TrackingIdVO extends BaseVO<TrackingId> {
  private constructor(value: TrackingId) {
    super(value);
  }

  static create(raw: string): TrackingIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('TrackingId cannot be empty');
    }
    return new TrackingIdVO(raw as TrackingId);
  }
}
