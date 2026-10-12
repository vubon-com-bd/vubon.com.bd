/**
 * IShipmentService — contract
 * @module logistics-service/application/services/interfaces
 */
import type {
  CreateShipmentRequestDTO,
  UpdateShipmentRequestDTO,
  CancelShipmentRequestDTO,
  PickupShipmentRequestDTO,
  DeliverShipmentRequestDTO,
  FailShipmentRequestDTO,
  MarkReturnedRequestDTO,
  AssignCourierRequestDTO,
  AssignWarehouseRequestDTO,
  PutOnHoldRequestDTO,
  ReleaseShipmentRequestDTO,
  MarkDelayedRequestDTO,
  ChangePriorityRequestDTO,
  GenerateLabelRequestDTO,
} from '../../dtos/requests/shipment/shipment.dto.js';
import type {
  ShipmentResponseDTO,
  ShipmentPublicResponseDTO,
  ShipmentListResponseDTO,
  ShipmentStatsResponseDTO,
} from '../../dtos/responses/shipment/shipment-response.dto.js';

export const SHIPMENT_SERVICE = Symbol('SHIPMENT_SERVICE');

export interface ShipmentListFilterDTO {
  readonly orderId?: string;
  readonly userId?: string;
  readonly vendorId?: string;
  readonly courierId?: string;
  readonly warehouseId?: string;
  readonly status?: string;
  readonly type?: string;
  readonly priority?: string;
  readonly isCOD?: boolean;
  readonly isInsured?: boolean;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly search?: string;
}

export interface ShipmentListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'status' | 'priority' | 'estimatedDeliveryAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: ShipmentListFilterDTO;
}

export interface IShipmentService {
  // ─── Commands ───
  create(dto: CreateShipmentRequestDTO, actorId?: string): Promise<ShipmentResponseDTO>;
  confirm(shipmentId: string, actorId?: string): Promise<ShipmentResponseDTO>;
  startProcessing(shipmentId: string, actorId?: string): Promise<ShipmentResponseDTO>;
  markPacked(shipmentId: string, actorId?: string): Promise<ShipmentResponseDTO>;
  generateLabel(dto: GenerateLabelRequestDTO, actorId?: string): Promise<ShipmentResponseDTO>;
  pickup(dto: PickupShipmentRequestDTO, actorId?: string): Promise<ShipmentResponseDTO>;
  markInTransit(shipmentId: string, actorId?: string): Promise<ShipmentResponseDTO>;
  markOutForDelivery(shipmentId: string, actorId?: string): Promise<ShipmentResponseDTO>;
  deliver(dto: DeliverShipmentRequestDTO, actorId?: string): Promise<ShipmentResponseDTO>;
  fail(dto: FailShipmentRequestDTO, actorId?: string): Promise<ShipmentResponseDTO>;
  markReturned(dto: MarkReturnedRequestDTO, actorId?: string): Promise<ShipmentResponseDTO>;
  cancel(dto: CancelShipmentRequestDTO, actorId?: string): Promise<ShipmentResponseDTO>;
  putOnHold(dto: PutOnHoldRequestDTO, actorId?: string): Promise<ShipmentResponseDTO>;
  release(dto: ReleaseShipmentRequestDTO, actorId?: string): Promise<ShipmentResponseDTO>;
  markDelayed(dto: MarkDelayedRequestDTO, actorId?: string): Promise<ShipmentResponseDTO>;
  assignCourier(dto: AssignCourierRequestDTO, actorId?: string): Promise<ShipmentResponseDTO>;
  assignWarehouse(dto: AssignWarehouseRequestDTO, actorId?: string): Promise<ShipmentResponseDTO>;
  changePriority(dto: ChangePriorityRequestDTO, actorId?: string): Promise<ShipmentResponseDTO>;
  update(dto: UpdateShipmentRequestDTO, actorId?: string): Promise<ShipmentResponseDTO>;

  // ─── Queries ───
  getById(shipmentId: string): Promise<ShipmentResponseDTO>;
  getByTrackingNumber(trackingNumber: string): Promise<ShipmentResponseDTO>;
  getPublic(shipmentId: string): Promise<ShipmentPublicResponseDTO>;
  listByOrder(orderId: string): Promise<readonly ShipmentResponseDTO[]>;
  list(options: ShipmentListOptionsDTO): Promise<ShipmentListResponseDTO>;
  getStats(userId?: string, vendorId?: string): Promise<ShipmentStatsResponseDTO>;
}
