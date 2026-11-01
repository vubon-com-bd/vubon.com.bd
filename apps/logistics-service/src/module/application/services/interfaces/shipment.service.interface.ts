/**
 * IShipmentService — Application Service Contract
 * @module logistics-service/application/services/interfaces
 */
import type {
  ShipmentResponseDTO,
  ShipmentPublicResponseDTO,
  ShipmentListResponseDTO,
  ShipmentTimelineResponseDTO,
  ShipmentStatsResponseDTO,
} from '@application/dtos/responses/shipment/index.js';
import type {
  CreateShipmentRequestDTO,
  UpdateShipmentRequestDTO,
  CancelShipmentRequestDTO,
  ConfirmShipmentRequestDTO,
  StartProcessingRequestDTO,
  PackShipmentRequestDTO,
  PickUpShipmentRequestDTO,
  StartTransitRequestDTO,
  OutForDeliveryRequestDTO,
  DeliverShipmentRequestDTO,
  FailShipmentRequestDTO,
  ReturnShipmentRequestDTO,
  PutOnHoldRequestDTO,
  MarkDelayedRequestDTO,
  ResumeFromHoldRequestDTO,
  AssignCourierRequestDTO,
  AssignWarehouseRequestDTO,
} from '@application/dtos/requests/shipment/index.js';
import type { ShipmentStatusValue } from '@domain/primitives/shipment-status.vo';

// ═══════════════════════════════════════
// ─── DI Token ──────────────────────────
// ═══════════════════════════════════════
export const SHIPMENT_SERVICE = Symbol('SHIPMENT_SERVICE');

// ═══════════════════════════════════════
// ─── Filter / Options ──────────────────
// ═══════════════════════════════════════
export interface ShipmentListFilterDTO {
  readonly status?: ShipmentStatusValue;
  readonly type?: string;
  readonly priority?: string;
  readonly orderId?: string;
  readonly userId?: string;
  readonly vendorId?: string;
  readonly warehouseId?: string;
  readonly courierId?: string;
  readonly isCOD?: boolean;
  readonly isInsured?: boolean;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly minWeightKg?: number;
  readonly maxWeightKg?: number;
  readonly search?: string;
}

export interface ShipmentListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'estimatedDeliveryAt' | 'priority';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: ShipmentListFilterDTO;
}

// ═══════════════════════════════════════
// ─── Service Contract ──────────────────
// ═══════════════════════════════════════
export interface IShipmentService {
  // ─── Commands (17) ─────────────────
  create(dto: CreateShipmentRequestDTO, actorId: string): Promise<ShipmentResponseDTO>;
  update(dto: UpdateShipmentRequestDTO, actorId: string): Promise<ShipmentResponseDTO>;
  cancel(dto: CancelShipmentRequestDTO, actorId: string): Promise<ShipmentResponseDTO>;
  confirm(dto: ConfirmShipmentRequestDTO, actorId: string): Promise<ShipmentResponseDTO>;
  startProcessing(dto: StartProcessingRequestDTO, actorId: string): Promise<ShipmentResponseDTO>;
  pack(dto: PackShipmentRequestDTO, actorId: string): Promise<ShipmentResponseDTO>;
  pickUp(dto: PickUpShipmentRequestDTO, actorId: string): Promise<ShipmentResponseDTO>;
  startTransit(dto: StartTransitRequestDTO, actorId: string): Promise<ShipmentResponseDTO>;
  outForDelivery(dto: OutForDeliveryRequestDTO, actorId: string): Promise<ShipmentResponseDTO>;
  deliver(dto: DeliverShipmentRequestDTO, actorId: string): Promise<ShipmentResponseDTO>;
  fail(dto: FailShipmentRequestDTO, actorId: string): Promise<ShipmentResponseDTO>;
  returnShipment(dto: ReturnShipmentRequestDTO, actorId: string): Promise<ShipmentResponseDTO>;
  putOnHold(dto: PutOnHoldRequestDTO, actorId: string): Promise<ShipmentResponseDTO>;
  markDelayed(dto: MarkDelayedRequestDTO, actorId: string): Promise<ShipmentResponseDTO>;
  resumeFromHold(dto: ResumeFromHoldRequestDTO, actorId: string): Promise<ShipmentResponseDTO>;
  assignCourier(dto: AssignCourierRequestDTO, actorId: string): Promise<ShipmentResponseDTO>;
  assignWarehouse(dto: AssignWarehouseRequestDTO, actorId: string): Promise<ShipmentResponseDTO>;

  // ─── Queries (12) ──────────────────
  getById(id: string): Promise<ShipmentResponseDTO>;
  getPublicById(id: string): Promise<ShipmentPublicResponseDTO>;
  getByNumber(shipmentNumber: string): Promise<ShipmentResponseDTO>;
  getByTracking(trackingNumber: string): Promise<ShipmentPublicResponseDTO>;
  list(options: ShipmentListOptionsDTO): Promise<ShipmentListResponseDTO>;
  listByOrder(orderId: string): Promise<ShipmentListResponseDTO>;
  listByUser(userId: string, options: ShipmentListOptionsDTO): Promise<ShipmentListResponseDTO>;
  listByVendor(vendorId: string, options: ShipmentListOptionsDTO): Promise<ShipmentListResponseDTO>;
  search(query: string, options: ShipmentListOptionsDTO): Promise<ShipmentListResponseDTO>;
  getStats(fromDate?: string, toDate?: string, warehouseId?: string): Promise<ShipmentStatsResponseDTO>;
  getTimeline(shipmentId: string): Promise<ShipmentTimelineResponseDTO>;
  getSummary(shipmentId: string): Promise<ShipmentResponseDTO>;
}
