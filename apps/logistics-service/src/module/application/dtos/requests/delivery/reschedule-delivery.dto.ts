import type { DeliveryWindowDTO } from './create-delivery.dto.js';

export interface RescheduleDeliveryRequestDTO {
  readonly deliveryId: string;
  readonly window?: DeliveryWindowDTO;
}
