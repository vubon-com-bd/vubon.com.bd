/**
 * IDeliveryService — contract
 * @module logistics-service/application/services/interfaces
 */
import type {
  ScheduleDeliveryRequestDTO, AssignDeliveryDriverRequestDTO, AddDeliveryAttemptRequestDTO,
  CompleteDeliveryRequestDTO, FailDeliveryRequestDTO, RescheduleDeliveryRequestDTO,
  CancelDeliveryRequestDTO, DeliveryListFilterDTO,
} from '../../dtos/requests/delivery/delivery.dto.js';
import type { DeliveryResponseDTO, DeliveryListResponseDTO } from '../../dtos/responses/delivery/delivery-response.dto.js';

export const DELIVERY_SERVICE = Symbol('DELIVERY_SERVICE');

export interface DeliveryListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'scheduledAt' | 'deliveredAt' | 'status';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: DeliveryListFilterDTO;
}

export interface IDeliveryService {
  schedule(dto: ScheduleDeliveryRequestDTO, actorId?: string): Promise<DeliveryResponseDTO>;
  assignDriver(dto: AssignDeliveryDriverRequestDTO, actorId?: string): Promise<DeliveryResponseDTO>;
  addAttempt(dto: AddDeliveryAttemptRequestDTO, actorId?: string): Promise<DeliveryResponseDTO>;
  complete(dto: CompleteDeliveryRequestDTO, actorId?: string): Promise<DeliveryResponseDTO>;
  fail(dto: FailDeliveryRequestDTO, actorId?: string): Promise<DeliveryResponseDTO>;
  reschedule(dto: RescheduleDeliveryRequestDTO, actorId?: string): Promise<DeliveryResponseDTO>;
  cancel(dto: CancelDeliveryRequestDTO, actorId?: string): Promise<DeliveryResponseDTO>;

  getById(deliveryId: string): Promise<DeliveryResponseDTO>;
  getByShipmentId(shipmentId: string): Promise<DeliveryResponseDTO | null>;
  list(options: DeliveryListOptionsDTO): Promise<DeliveryListResponseDTO>;
}
