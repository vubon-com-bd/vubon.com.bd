import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { DeliveryEntity } from '../../../domain/entities/delivery.entity';
import type { ScheduleDeliveryRequestDTO } from '../../dtos/requests/delivery/schedule-delivery.dto';
import type { DeliveryResponseDTO } from '../../dtos/responses/delivery-response.dto';

export interface DeliveryServiceInterface
  extends BaseServiceInterface<DeliveryEntity, string> {
  schedule(input: ScheduleDeliveryRequestDTO): Promise<DeliveryResponseDTO>;
  reschedule(deliveryId: string, scheduledAt: Date): Promise<DeliveryResponseDTO>;
  confirm(deliveryId: string): Promise<DeliveryResponseDTO>;
  findByOrder(orderId: string): Promise<DeliveryResponseDTO | null>;
}
