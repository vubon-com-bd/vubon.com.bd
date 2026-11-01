import type { DeliveryWindowDTO } from './create-delivery.dto.js';

export interface ScheduleDeliveryRequestDTO {
  readonly deliveryId: string;
  readonly window?: DeliveryWindowDTO;
  readonly scheduledAt?: string;
}
