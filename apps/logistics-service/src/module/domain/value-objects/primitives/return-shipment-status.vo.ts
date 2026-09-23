import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>([
  'requested',
  'approved',
  'picked_up',
  'in_transit',
  'received',
  'rejected',
  'cancelled',
]);

export class ReturnShipmentStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ReturnShipmentStatusVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid return shipment status: ${raw}`);
    }
    return new ReturnShipmentStatusVO(raw);
  }
}
