import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { SHIPMENT_STATUS } from '@vubon/shared-constants/logistics';

const VALID = new Set<string>(Object.values(SHIPMENT_STATUS));

export class TrackingStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TrackingStatusVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid tracking status: ${raw}`);
    }
    return new TrackingStatusVO(raw);
  }
}
