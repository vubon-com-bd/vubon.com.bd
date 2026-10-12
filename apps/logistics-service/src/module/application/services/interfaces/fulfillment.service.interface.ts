/**
 * IFulfillmentService — contract
 * @module logistics-service/application/services/interfaces
 */
import type {
  CreateFulfillmentRequestDTO, AssignFulfillmentRequestDTO, UpdateFulfillmentRequestDTO,
  StartProcessingRequestDTO, StartPickingRequestDTO, StartPackingRequestDTO,
  ReadyToShipRequestDTO, ShipFulfillmentRequestDTO, FulfillFulfillmentRequestDTO,
  PartialFulfillFulfillmentRequestDTO, HoldFulfillmentRequestDTO, ReleaseFulfillmentRequestDTO,
  FailFulfillmentRequestDTO, CancelFulfillmentRequestDTO,
  FulfillmentListFilterDTO,
} from '../../dtos/requests/fulfillment/fulfillment.dto.js';
import type { FulfillmentResponseDTO, FulfillmentListResponseDTO } from '../../dtos/responses/fulfillment/fulfillment-response.dto.js';

export const FULFILLMENT_SERVICE = Symbol('FULFILLMENT_SERVICE');

export interface FulfillmentListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'priority' | 'status' | 'sla';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: FulfillmentListFilterDTO;
}

export interface IFulfillmentService {
  create(dto: CreateFulfillmentRequestDTO, actorId?: string): Promise<FulfillmentResponseDTO>;
  assign(dto: AssignFulfillmentRequestDTO, actorId?: string): Promise<FulfillmentResponseDTO>;
  update(dto: UpdateFulfillmentRequestDTO, actorId?: string): Promise<FulfillmentResponseDTO>;
  startProcessing(dto: StartProcessingRequestDTO, actorId?: string): Promise<FulfillmentResponseDTO>;
  startPicking(dto: StartPickingRequestDTO, actorId?: string): Promise<FulfillmentResponseDTO>;
  startPacking(dto: StartPackingRequestDTO, actorId?: string): Promise<FulfillmentResponseDTO>;
  readyToShip(dto: ReadyToShipRequestDTO, actorId?: string): Promise<FulfillmentResponseDTO>;
  ship(dto: ShipFulfillmentRequestDTO, actorId?: string): Promise<FulfillmentResponseDTO>;
  fulfill(dto: FulfillFulfillmentRequestDTO, actorId?: string): Promise<FulfillmentResponseDTO>;
  markPartiallyFulfilled(dto: PartialFulfillFulfillmentRequestDTO, actorId?: string): Promise<FulfillmentResponseDTO>;
  putOnHold(dto: HoldFulfillmentRequestDTO, actorId?: string): Promise<FulfillmentResponseDTO>;
  release(dto: ReleaseFulfillmentRequestDTO, actorId?: string): Promise<FulfillmentResponseDTO>;
  fail(dto: FailFulfillmentRequestDTO, actorId?: string): Promise<FulfillmentResponseDTO>;
  cancel(dto: CancelFulfillmentRequestDTO, actorId?: string): Promise<FulfillmentResponseDTO>;

  getById(fulfillmentId: string): Promise<FulfillmentResponseDTO>;
  list(options: FulfillmentListOptionsDTO): Promise<FulfillmentListResponseDTO>;
}
