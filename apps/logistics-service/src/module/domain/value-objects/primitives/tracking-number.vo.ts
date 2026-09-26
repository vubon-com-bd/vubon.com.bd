import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import { SHIPMENT } from '@vubon/shared-constants/logistics';
import { InvalidTrackingNumberError } from '../../errors/tracking.errors';

export class TrackingNumberVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TrackingNumberVO {
    BaseCodeVO.validateNonEmpty(raw, 'TrackingNumber');
    if (raw.length < 8 || raw.length > 32) {
      throw new InvalidTrackingNumberError(raw);
    }
    return new TrackingNumberVO(raw);
  }
}
