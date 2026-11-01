import type {
  ReturnShipmentResponseDTO,
  ReturnShipmentListResponseDTO,
  ReturnShipmentStatsResponseDTO,
} from '@application/dtos/responses/return-shipment/index.js';
import type {
  CreateReturnShipmentRequestDTO,
  ReturnShipmentActionRequestDTO,
  ApproveReturnRequestDTO,
  RejectReturnRequestDTO,
  SchedulePickupRequestDTO,
  MarkReceivedRequestDTO,
  InspectReturnRequestDTO,
  CompleteReturnRequestDTO,
  CancelReturnRequestDTO,
} from '@application/dtos/requests/return-shipment/index.js';
import type { ReturnShipmentStatusValue } from '@domain/primitives/return-shipment-status.vo';

export const RETURN_SHIPMENT_SERVICE = Symbol('RETURN_SHIPMENT_SERVICE');

export interface ReturnShipmentListFilterDTO {
  readonly status?: ReturnShipmentStatusValue;
  readonly type?: string;
  readonly reason?: string;
  readonly orderId?: string;
  readonly userId?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly search?: string;
}
export interface ReturnShipmentListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'refundAmount';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: ReturnShipmentListFilterDTO;
}

export interface IReturnShipmentService {
  create(dto: CreateReturnShipmentRequestDTO, actorId: string): Promise<ReturnShipmentResponseDTO>;
  approve(dto: ApproveReturnRequestDTO, actorId: string): Promise<ReturnShipmentResponseDTO>;
  reject(dto: RejectReturnRequestDTO, actorId: string): Promise<ReturnShipmentResponseDTO>;
  schedulePickup(dto: SchedulePickupRequestDTO, actorId: string): Promise<ReturnShipmentResponseDTO>;
  markPickedUp(dto: ReturnShipmentActionRequestDTO, actorId: string): Promise<ReturnShipmentResponseDTO>;
  startTransit(dto: ReturnShipmentActionRequestDTO, actorId: string): Promise<ReturnShipmentResponseDTO>;
  markReceived(dto: MarkReceivedRequestDTO, actorId: string): Promise<ReturnShipmentResponseDTO>;
  inspect(dto: InspectReturnRequestDTO, actorId: string): Promise<ReturnShipmentResponseDTO>;
  complete(dto: CompleteReturnRequestDTO, actorId: string): Promise<ReturnShipmentResponseDTO>;
  cancel(dto: CancelReturnRequestDTO, actorId: string): Promise<ReturnShipmentResponseDTO>;
  markLost(dto: ReturnShipmentActionRequestDTO, actorId: string): Promise<ReturnShipmentResponseDTO>;

  getById(id: string): Promise<ReturnShipmentResponseDTO>;
  getByRma(rmaNumber: string): Promise<ReturnShipmentResponseDTO>;
  list(options: ReturnShipmentListOptionsDTO): Promise<ReturnShipmentListResponseDTO>;
  listByOrder(orderId: string): Promise<ReturnShipmentListResponseDTO>;
  listByUser(userId: string): Promise<ReturnShipmentListResponseDTO>;
  listPendingApproval(): Promise<ReturnShipmentListResponseDTO>;
  getStats(): Promise<ReturnShipmentStatsResponseDTO>;
}
