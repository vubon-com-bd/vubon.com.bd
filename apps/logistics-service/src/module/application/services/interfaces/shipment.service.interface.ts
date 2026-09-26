import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { ShipmentEntity } from '../../../domain/entities/shipment.entity';
import type { CreateShipmentRequestDTO } from '../../dtos/requests/shipment/create-shipment.dto';
import type { UpdateShipmentRequestDTO } from '../../dtos/requests/shipment/update-shipment.dto';
import type { CancelShipmentRequestDTO } from '../../dtos/requests/shipment/cancel-shipment.dto';
import type { PickUpShipmentRequestDTO } from '../../dtos/requests/shipment/pick-up-shipment.dto';
import type { DeliverShipmentRequestDTO } from '../../dtos/requests/shipment/deliver-shipment.dto';
import type { ShipmentResponseDTO } from '../../dtos/responses/shipment-response.dto';

export interface ShipmentServiceInterface
  extends BaseServiceInterface<ShipmentEntity, string> {
  create(input: CreateShipmentRequestDTO): Promise<ShipmentResponseDTO>;
  update(shipmentId: string, input: UpdateShipmentRequestDTO): Promise<ShipmentResponseDTO>;
  cancel(input: CancelShipmentRequestDTO): Promise<void>;
  pickUp(input: PickUpShipmentRequestDTO): Promise<ShipmentResponseDTO>;
  deliver(input: DeliverShipmentRequestDTO): Promise<ShipmentResponseDTO>;
  findById(shipmentId: string): Promise<ShipmentResponseDTO | null>;
}
