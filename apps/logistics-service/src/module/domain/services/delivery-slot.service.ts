import { DeliveryWindowVO } from '../value-objects/primitives/delivery-window.vo';

export class DeliverySlotService {
  assignSlot(hour: number): DeliveryWindowVO {
    if (hour < 12) return DeliveryWindowVO.create('morning');
    if (hour < 17) return DeliveryWindowVO.create('afternoon');
    return DeliveryWindowVO.create('evening');
  }
}
