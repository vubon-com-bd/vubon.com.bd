/**
 * IReturnShipmentService — contract
 * @module logistics-service/application/services/interfaces
 */
import type {
  RequestReturnRequestDTO, ApproveReturnRequestDTO, RejectReturnRequestDTO,
  ScheduleReturnPickupRequestDTO, PickupReturnRequestDTO, MarkReturnInTransitRequestDTO,
  ReceiveReturnRequestDTO, InspectReturnRequestDTO, CompleteReturnRequestDTO,
  IssueRefundRequestDTO, CancelReturnRequestDTO, MarkReturnLostRequestDTO,
  ReturnShipmentListFilterDTO,
} from '../../dtos/requests/return-shipment/return-shipment.dto.js';
import type {
  ReturnShipmentResponseDTO, ReturnShipmentListResponseDTO,
} from '../../dtos/responses/return-shipment/return-shipment-response.dto.js';

export const RETURN_SHIPMENT_SERVICE = Symbol('RETURN_SHIPMENT_SERVICE');

export interface ReturnShipmentListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'rmaNumber' | 'status';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: ReturnShipmentListFilterDTO;
}

export interface IReturnShipmentService {
  request(dto: RequestReturnRequestDTO, actorId?: string): Promise<ReturnShipmentResponseDTO>;
  approve(dto: ApproveReturnRequestDTO, actorId?: string): Promise<ReturnShipmentResponseDTO>;
  reject(dto: RejectReturnRequestDTO, actorId?: string): Promise<ReturnShipmentResponseDTO>;
  schedulePickup(dto: ScheduleReturnPickupRequestDTO, actorId?: string): Promise<ReturnShipmentResponseDTO>;
  pickup(dto: PickupReturnRequestDTO, actorId?: string): Promise<ReturnShipmentResponseDTO>;
  markInTransit(dto: MarkReturnInTransitRequestDTO, actorId?: string): Promise<ReturnShipmentResponseDTO>;
  receive(dto: ReceiveReturnRequestDTO, actorId?: string): Promise<ReturnShipmentResponseDTO>;
  inspect(dto: InspectReturnRequestDTO, actorId?: string): Promise<ReturnShipmentResponseDTO>;
  complete(dto: CompleteReturnRequestDTO, actorId?: string): Promise<ReturnShipmentResponseDTO>;
  issueRefund(dto: IssueRefundRequestDTO, actorId?: string): Promise<ReturnShipmentResponseDTO>;
  cancel(dto: CancelReturnRequestDTO, actorId?: string): Promise<ReturnShipmentResponseDTO>;
  markLost(dto: MarkReturnLostRequestDTO, actorId?: string): Promise<ReturnShipmentResponseDTO>;

  getById(returnId: string): Promise<ReturnShipmentResponseDTO>;
  getByRma(rmaNumber: string): Promise<ReturnShipmentResponseDTO>;
  list(options: ReturnShipmentListOptionsDTO): Promise<ReturnShipmentListResponseDTO>;
}
