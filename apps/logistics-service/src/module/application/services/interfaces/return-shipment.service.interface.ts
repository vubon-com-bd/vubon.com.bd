import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { ReturnShipmentEntity } from '../../../domain/entities/return-shipment.entity';
import type { RequestReturnRequestDTO } from '../../dtos/requests/return-shipment/request-return.dto';
import type { ApproveReturnRequestDTO } from '../../dtos/requests/return-shipment/approve-return.dto';
import type { PickupReturnRequestDTO } from '../../dtos/requests/return-shipment/pickup-return.dto';
import type { CompleteReturnRequestDTO } from '../../dtos/requests/return-shipment/complete-return.dto';
import type { ReturnShipmentResponseDTO } from '../../dtos/responses/return-shipment-response.dto';

export interface ReturnShipmentServiceInterface
  extends BaseServiceInterface<ReturnShipmentEntity, string> {
  request(input: RequestReturnRequestDTO): Promise<ReturnShipmentResponseDTO>;
  approve(input: ApproveReturnRequestDTO): Promise<ReturnShipmentResponseDTO>;
  pickup(input: PickupReturnRequestDTO): Promise<ReturnShipmentResponseDTO>;
  complete(input: CompleteReturnRequestDTO): Promise<ReturnShipmentResponseDTO>;
}
