import type {
  FulfillmentResponseDTO,
  FulfillmentListResponseDTO,
  FulfillmentStatsResponseDTO,
} from '@application/dtos/responses/fulfillment/index.js';
import type {
  CreateFulfillmentRequestDTO,
  StartFulfillmentRequestDTO,
  BeginPickingRequestDTO,
  BeginPackingRequestDTO,
  MarkReadyToShipRequestDTO,
  ShipFulfillmentRequestDTO,
  FulfillRequestDTO,
  PartiallyFulfillRequestDTO,
  CancelFulfillmentRequestDTO,
  FailFulfillmentRequestDTO,
  PutFulfillmentOnHoldRequestDTO,
  ResumeFulfillmentFromHoldRequestDTO,
} from '@application/dtos/requests/fulfillment/index.js';
import type { FulfillmentStatusValue } from '@domain/primitives/fulfillment-status.vo';

export const FULFILLMENT_SERVICE = Symbol('FULFILLMENT_SERVICE');

export interface FulfillmentListFilterDTO {
  readonly status?: FulfillmentStatusValue;
  readonly type?: string;
  readonly priority?: string;
  readonly orderId?: string;
  readonly vendorId?: string;
  readonly warehouseId?: string;
  readonly assignedTo?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly slaBreached?: boolean;
  readonly search?: string;
}
export interface FulfillmentListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'slaDueAt' | 'priority';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: FulfillmentListFilterDTO;
}

export interface IFulfillmentService {
  create(dto: CreateFulfillmentRequestDTO, actorId: string): Promise<FulfillmentResponseDTO>;
  start(dto: StartFulfillmentRequestDTO, actorId: string): Promise<FulfillmentResponseDTO>;
  beginPicking(dto: BeginPickingRequestDTO, actorId: string): Promise<FulfillmentResponseDTO>;
  beginPacking(dto: BeginPackingRequestDTO, actorId: string): Promise<FulfillmentResponseDTO>;
  markReadyToShip(dto: MarkReadyToShipRequestDTO, actorId: string): Promise<FulfillmentResponseDTO>;
  ship(dto: ShipFulfillmentRequestDTO, actorId: string): Promise<FulfillmentResponseDTO>;
  fulfill(dto: FulfillRequestDTO, actorId: string): Promise<FulfillmentResponseDTO>;
  partiallyFulfill(dto: PartiallyFulfillRequestDTO, actorId: string): Promise<FulfillmentResponseDTO>;
  cancel(dto: CancelFulfillmentRequestDTO, actorId: string): Promise<FulfillmentResponseDTO>;
  fail(dto: FailFulfillmentRequestDTO, actorId: string): Promise<FulfillmentResponseDTO>;
  putOnHold(dto: PutFulfillmentOnHoldRequestDTO, actorId: string): Promise<FulfillmentResponseDTO>;
  resumeFromHold(dto: ResumeFulfillmentFromHoldRequestDTO, actorId: string): Promise<FulfillmentResponseDTO>;

  getById(id: string): Promise<FulfillmentResponseDTO>;
  list(options: FulfillmentListOptionsDTO): Promise<FulfillmentListResponseDTO>;
  listByOrder(orderId: string): Promise<FulfillmentListResponseDTO>;
  listByVendor(vendorId: string): Promise<FulfillmentListResponseDTO>;
  listByWarehouse(warehouseId: string): Promise<FulfillmentListResponseDTO>;
  listPending(): Promise<FulfillmentListResponseDTO>;
  listSlaBreached(): Promise<FulfillmentListResponseDTO>;
  getStats(): Promise<FulfillmentStatsResponseDTO>;
}
