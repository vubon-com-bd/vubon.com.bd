import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { DeliveryServiceInterface } from '../interfaces/delivery.service.interface';
import type { DeliveryRepository } from '../../../domain/repositories/delivery.repository.interface';
import { DeliveryEntity } from '../../../domain/entities/delivery.entity';
import { DeliveryIdVO } from '../../../domain/value-objects/primitives/delivery-id.vo';
import { DeliveryStatusVO } from '../../../domain/value-objects/primitives/delivery-status.vo';
import { DeliveryTypeVO } from '../../../domain/value-objects/primitives/delivery-type.vo';
import { ShipmentIdVO } from '../../../domain/value-objects/primitives/shipment-id.vo';
import { DeliveryOperationFailedError } from '../../errors/delivery.errors';
import type { ScheduleDeliveryRequestDTO } from '../../dtos/requests/delivery/schedule-delivery.dto';
import type { RescheduleDeliveryRequestDTO } from '../../dtos/requests/delivery/reschedule-delivery.dto';
import type { AttemptDeliveryRequestDTO } from '../../dtos/requests/delivery/attempt-delivery.dto';
import type { CompleteDeliveryRequestDTO } from '../../dtos/requests/delivery/complete-delivery.dto';
import type { FailDeliveryRequestDTO } from '../../dtos/requests/delivery/fail-delivery.dto';
import type { DeliveryResponseDTO } from '../../dtos/responses/delivery-response.dto';

@Injectable()
export class DeliveryService
  extends BaseService<DeliveryEntity, string>
  implements DeliveryServiceInterface
{
  readonly name = 'DeliveryService';

  constructor(private readonly repo: DeliveryRepository) {
    super();
  }

  async schedule(input: ScheduleDeliveryRequestDTO): Promise<DeliveryResponseDTO> {
    const entity = DeliveryEntity.create({
      shipmentId: ShipmentIdVO.create(input.shipmentId),
      status: DeliveryStatusVO.create('scheduled'),
      type: DeliveryTypeVO.create('standard'),
      scheduledAt: input.scheduledAt ? new Date(input.scheduledAt) : null,
      deliveredAt: null,
      attempts: 0,
      maxAttempts: 3,
      note: null,
    });
    const saved = await this.repo.save(entity);
    return this.toDTO(saved);
  }

  async reschedule(input: RescheduleDeliveryRequestDTO): Promise<DeliveryResponseDTO> {
    const entity = await this.repo.findById(DeliveryIdVO.create(input.deliveryId));
    if (!entity) throw new DeliveryOperationFailedError('not found');
    return this.toDTO(entity);
  }

  async attempt(input: AttemptDeliveryRequestDTO): Promise<DeliveryResponseDTO> {
    const entity = await this.repo.findById(DeliveryIdVO.create(input.deliveryId));
    if (!entity) throw new DeliveryOperationFailedError('not found');
    const updated = entity.recordAttempt(input.status);
    const saved = await this.repo.save(updated);
    return this.toDTO(saved);
  }

  async complete(input: CompleteDeliveryRequestDTO): Promise<DeliveryResponseDTO> {
    const entity = await this.repo.findById(DeliveryIdVO.create(input.deliveryId));
    if (!entity) throw new DeliveryOperationFailedError('not found');
    const updated = entity.complete();
    const saved = await this.repo.save(updated);
    return this.toDTO(saved);
  }

  async fail(input: FailDeliveryRequestDTO): Promise<DeliveryResponseDTO> {
    const entity = await this.repo.findById(DeliveryIdVO.create(input.deliveryId));
    if (!entity) throw new DeliveryOperationFailedError('not found');
    const updated = entity.fail(input.reason);
    const saved = await this.repo.save(updated);
    return this.toDTO(saved);
  }

  async findById(deliveryId: string): Promise<DeliveryResponseDTO | null> {
    const entity = await this.repo.findById(DeliveryIdVO.create(deliveryId));
    return entity ? this.toDTO(entity) : null;
  }

  private toDTO(entity: DeliveryEntity): DeliveryResponseDTO {
    return {
      id: entity.id.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as unknown as DeliveryResponseDTO;
  }
}
