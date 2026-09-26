import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { ReturnShipmentServiceInterface } from '../interfaces/return-shipment.service.interface';
import type { ReturnShipmentRepository } from '../../../domain/repositories/return-shipment.repository.interface';
import { ReturnShipmentEntity } from '../../../domain/entities/return-shipment.entity';
import { ReturnShipmentStatusVO } from '../../../domain/value-objects/primitives/return-shipment-status.vo';
import { ReturnReasonVO } from '../../../domain/value-objects/primitives/return-reason.vo';
import { ReturnReasonTypeVO } from '../../../domain/value-objects/primitives/return-reason-type.vo';
import { ShipmentIdVO } from '../../../domain/value-objects/primitives/shipment-id.vo';
import type { RequestReturnRequestDTO } from '../../dtos/requests/return-shipment/request-return.dto';
import type { ApproveReturnRequestDTO } from '../../dtos/requests/return-shipment/approve-return.dto';
import type { PickupReturnRequestDTO } from '../../dtos/requests/return-shipment/pickup-return.dto';
import type { CompleteReturnRequestDTO } from '../../dtos/requests/return-shipment/complete-return.dto';
import type { ReturnShipmentResponseDTO } from '../../dtos/responses/return-shipment-response.dto';

@Injectable()
export class ReturnShipmentService
  extends BaseService<ReturnShipmentEntity, string>
  implements ReturnShipmentServiceInterface
{
  readonly name = 'ReturnShipmentService';

  constructor(private readonly repo: ReturnShipmentRepository) {
    super();
  }

  async request(input: RequestReturnRequestDTO): Promise<ReturnShipmentResponseDTO> {
    const placeholderShipmentId = input.orderId ?? crypto.randomUUID();
    const entity = ReturnShipmentEntity.create({
      shipmentId: ShipmentIdVO.create(placeholderShipmentId),
      reason: ReturnReasonVO.create(input.reason),
      reasonType: ReturnReasonTypeVO.create('other'),
      status: ReturnShipmentStatusVO.create('requested'),
      requestedAt: new Date(),
      approvedAt: null,
      receivedAt: null,
    });
    const saved = await this.repo.save(entity);
    return this.toDTO(saved);
  }

  async approve(input: ApproveReturnRequestDTO): Promise<ReturnShipmentResponseDTO> {
    const entity = await this.repo.findById(input.returnShipmentId);
    if (!entity) throw new Error('Return not found');
    const updated = entity.approve();
    const saved = await this.repo.save(updated);
    return this.toDTO(saved);
  }

  async pickup(input: PickupReturnRequestDTO): Promise<ReturnShipmentResponseDTO> {
    const entity = await this.repo.findById(input.returnShipmentId);
    if (!entity) throw new Error('Return not found');
    return this.toDTO(entity);
  }

  async complete(input: CompleteReturnRequestDTO): Promise<ReturnShipmentResponseDTO> {
    const entity = await this.repo.findById(input.returnShipmentId);
    if (!entity) throw new Error('Return not found');
    const updated = entity.markReceived();
    const saved = await this.repo.save(updated);
    return this.toDTO(saved);
  }

  private toDTO(entity: ReturnShipmentEntity): ReturnShipmentResponseDTO {
    return {
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as unknown as ReturnShipmentResponseDTO;
  }
}
