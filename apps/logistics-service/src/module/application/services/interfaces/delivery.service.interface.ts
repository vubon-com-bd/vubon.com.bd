/**
 * IDeliveryService
 */
import type {
  DeliveryResponseDTO,
  DeliveryPublicResponseDTO,
  DeliveryListResponseDTO,
  DeliveryStatsResponseDTO,
} from '@application/dtos/responses/delivery/index.js';
import type {
  CreateDeliveryRequestDTO,
  ScheduleDeliveryRequestDTO,
  AssignDeliveryRequestDTO,
  PickUpDeliveryRequestDTO,
  DeliveryStartTransitRequestDTO,
  DeliveryOutForDeliveryRequestDTO,
  ArriveDeliveryRequestDTO,
  CompleteDeliveryRequestDTO,
  FailDeliveryRequestDTO,
  RescheduleDeliveryRequestDTO,
  CancelDeliveryRequestDTO,
  RefuseDeliveryRequestDTO,
} from '@application/dtos/requests/delivery/index.js';
import type { DeliveryStatusValue } from '@domain/primitives/delivery-status.vo';

export const DELIVERY_SERVICE = Symbol('DELIVERY_SERVICE');

export interface DeliveryListFilterDTO {
  readonly status?: DeliveryStatusValue;
  readonly type?: string;
  readonly shipmentId?: string;
  readonly orderId?: string;
  readonly userId?: string;
  readonly driverId?: string;
  readonly vehicleId?: string;
  readonly routeId?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly search?: string;
}

export interface DeliveryListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'scheduledAt' | 'deliveredAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: DeliveryListFilterDTO;
}

export interface IDeliveryService {
  // Commands
  create(dto: CreateDeliveryRequestDTO, actorId: string): Promise<DeliveryResponseDTO>;
  schedule(dto: ScheduleDeliveryRequestDTO, actorId: string): Promise<DeliveryResponseDTO>;
  assign(dto: AssignDeliveryRequestDTO, actorId: string): Promise<DeliveryResponseDTO>;
  pickUp(dto: PickUpDeliveryRequestDTO, actorId: string): Promise<DeliveryResponseDTO>;
  startTransit(dto: DeliveryStartTransitRequestDTO, actorId: string): Promise<DeliveryResponseDTO>;
  outForDelivery(dto: DeliveryOutForDeliveryRequestDTO, actorId: string): Promise<DeliveryResponseDTO>;
  arrive(dto: ArriveDeliveryRequestDTO, actorId: string): Promise<DeliveryResponseDTO>;
  complete(dto: CompleteDeliveryRequestDTO, actorId: string): Promise<DeliveryResponseDTO>;
  fail(dto: FailDeliveryRequestDTO, actorId: string): Promise<DeliveryResponseDTO>;
  reschedule(dto: RescheduleDeliveryRequestDTO, actorId: string): Promise<DeliveryResponseDTO>;
  cancel(dto: CancelDeliveryRequestDTO, actorId: string): Promise<DeliveryResponseDTO>;
  refuse(dto: RefuseDeliveryRequestDTO, actorId: string): Promise<DeliveryResponseDTO>;

  // Queries
  getById(id: string): Promise<DeliveryResponseDTO>;
  getPublicById(id: string): Promise<DeliveryPublicResponseDTO>;
  getByShipmentId(shipmentId: string): Promise<DeliveryResponseDTO>;
  list(options: DeliveryListOptionsDTO): Promise<DeliveryListResponseDTO>;
  listByOrder(orderId: string): Promise<DeliveryListResponseDTO>;
  listByDriver(driverId: string): Promise<DeliveryListResponseDTO>;
  listInTransit(): Promise<DeliveryListResponseDTO>;
  listScheduled(): Promise<DeliveryListResponseDTO>;
  getStats(driverId?: string, fromDate?: string, toDate?: string): Promise<DeliveryStatsResponseDTO>;
}
