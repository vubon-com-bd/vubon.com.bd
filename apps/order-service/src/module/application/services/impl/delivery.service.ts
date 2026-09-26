import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { DeliveryServiceInterface } from '../interfaces/delivery.service.interface';
import type { DeliveryRepository } from '../../../domain/repositories/delivery.repository.interface';
import { DeliveryEntity } from '../../../domain/entities/delivery.entity';
import { DeliveryIdVO } from '../../../domain/value-objects/primitives/delivery-id.vo';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo';
import { DeliveryOperationFailedError } from '../../errors/delivery.errors';
import type { ScheduleDeliveryRequestDTO } from '../../dtos/requests/delivery/schedule-delivery.dto';
import type { DeliveryResponseDTO } from '../../dtos/responses/delivery-response.dto';

@Injectable()
export class DeliveryService
  extends BaseService<DeliveryEntity, string>
  implements DeliveryServiceInterface
{
  readonly name = 'DeliveryService';

  constructor(
    private readonly deliveryRepo: DeliveryRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async schedule(input: ScheduleDeliveryRequestDTO): Promise<DeliveryResponseDTO> {
    void input;
    throw new DeliveryOperationFailedError('schedule not yet wired');
  }

  async reschedule(deliveryId: string, scheduledAt: Date): Promise<DeliveryResponseDTO> {
    const entity = await this.deliveryRepo.findById(DeliveryIdVO.create(deliveryId));
    if (!entity) throw new DeliveryOperationFailedError('delivery not found');
    const updated = entity.reschedule(scheduledAt);
    await this.deliveryRepo.save(updated);
    await this.publishEvents(updated);
    return this.toDTO(updated);
  }

  async confirm(deliveryId: string): Promise<DeliveryResponseDTO> {
    const entity = await this.deliveryRepo.findById(DeliveryIdVO.create(deliveryId));
    if (!entity) throw new DeliveryOperationFailedError('delivery not found');
    const updated = entity.markCompleted();
    await this.deliveryRepo.save(updated);
    await this.publishEvents(updated);
    return this.toDTO(updated);
  }

  async findByOrder(orderId: string): Promise<DeliveryResponseDTO | null> {
    const entity = await this.deliveryRepo.findByOrder(OrderIdVO.create(orderId));
    return entity ? this.toDTO(entity) : null;
  }

  private toDTO(entity: DeliveryEntity): DeliveryResponseDTO {
    return {
      id: entity.id.value,
      orderId: entity.orderId.value,
      status: entity.status.value,
      type: entity.type.value,
      methodId: entity.methodId?.value ?? null,
      scheduledAt: entity.scheduledAt?.toISOString() ?? null,
      attemptedAt: entity.attemptedAt?.toISOString() ?? null,
      deliveredAt: entity.deliveredAt?.toISOString() ?? null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private async publishEvents(entity: DeliveryEntity): Promise<void> {
    const events = entity.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }
  }
}
