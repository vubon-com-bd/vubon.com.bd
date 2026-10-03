/**
 * IDeliveryService
 */
import type { ScheduleDeliveryRequestDTO } from '../../dtos/requests/delivery/schedule-delivery.dto.js';
import type { RescheduleDeliveryRequestDTO } from '../../dtos/requests/delivery/reschedule-delivery.dto.js';
import type { ConfirmDeliveryRequestDTO } from '../../dtos/requests/delivery/confirm-delivery.dto.js';
import type { DeliveryResponseDTO } from '../../dtos/responses/delivery-response.dto.js';

export const DELIVERY_SERVICE = Symbol('DELIVERY_SERVICE');

export interface IDeliveryService {
  schedule(dto: ScheduleDeliveryRequestDTO, actorId?: string): Promise<DeliveryResponseDTO>;
  reschedule(dto: RescheduleDeliveryRequestDTO, actorId?: string): Promise<DeliveryResponseDTO>;
  confirm(dto: ConfirmDeliveryRequestDTO, actorId?: string): Promise<DeliveryResponseDTO>;
  getById(deliveryId: string): Promise<DeliveryResponseDTO>;
  listByOrder(orderId: string): Promise<readonly DeliveryResponseDTO[]>;
  listByStatus(status: string): Promise<readonly DeliveryResponseDTO[]>;
}
