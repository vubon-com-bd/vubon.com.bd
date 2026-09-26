import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { FulfillmentServiceInterface } from '../interfaces/fulfillment.service.interface';
import type { OrderFulfillmentRepository } from '../../../domain/repositories/order-fulfillment.repository.interface';
import { OrderFulfillmentEntity } from '../../../domain/entities/order-fulfillment.entity';
import { FulfillmentIdVO } from '../../../domain/value-objects/primitives/fulfillment-id.vo';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo';
import { FulfillmentOperationFailedError } from '../../errors/fulfillment.errors';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment-response.dto';

@Injectable()
export class FulfillmentService
  extends BaseService<OrderFulfillmentEntity, string>
  implements FulfillmentServiceInterface
{
  readonly name = 'FulfillmentService';

  constructor(
    private readonly fulfillmentRepo: OrderFulfillmentRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async start(orderId: string, vendorId?: string): Promise<FulfillmentResponseDTO> {
    void orderId;
    void vendorId;
    throw new FulfillmentOperationFailedError('start not yet wired');
  }

  async pack(fulfillmentId: string, packedBy: string): Promise<FulfillmentResponseDTO> {
    void packedBy;
    const entity = await this.fulfillmentRepo.findById(FulfillmentIdVO.create(fulfillmentId));
    if (!entity) throw new FulfillmentOperationFailedError('fulfillment not found');
    const updated = entity.markPacked();
    await this.fulfillmentRepo.save(updated);
    await this.publishEvents(updated);
    return this.toDTO(updated);
  }

  async ship(fulfillmentId: string, trackingNumber?: string): Promise<FulfillmentResponseDTO> {
    void trackingNumber;
    const entity = await this.fulfillmentRepo.findById(FulfillmentIdVO.create(fulfillmentId));
    if (!entity) throw new FulfillmentOperationFailedError('fulfillment not found');
    const updated = entity.markShipped();
    await this.fulfillmentRepo.save(updated);
    await this.publishEvents(updated);
    return this.toDTO(updated);
  }

  async complete(fulfillmentId: string): Promise<FulfillmentResponseDTO> {
    const entity = await this.fulfillmentRepo.findById(FulfillmentIdVO.create(fulfillmentId));
    if (!entity) throw new FulfillmentOperationFailedError('fulfillment not found');
    const updated = entity.complete();
    await this.fulfillmentRepo.save(updated);
    await this.publishEvents(updated);
    return this.toDTO(updated);
  }

  async findByOrder(orderId: string): Promise<FulfillmentResponseDTO | null> {
    const entity = await this.fulfillmentRepo.findByOrder(OrderIdVO.create(orderId));
    return entity ? this.toDTO(entity) : null;
  }

  private toDTO(entity: OrderFulfillmentEntity): FulfillmentResponseDTO {
    return {
      id: entity.id.value,
      orderId: entity.orderId.value,
      vendorId: entity.vendorId?.value ?? null,
      status: entity.status.value,
      startedAt: entity.startedAt?.toISOString() ?? null,
      packedAt: entity.packedAt?.toISOString() ?? null,
      shippedAt: entity.shippedAt?.toISOString() ?? null,
      completedAt: entity.completedAt?.toISOString() ?? null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private async publishEvents(entity: OrderFulfillmentEntity): Promise<void> {
    const events = entity.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }
  }
}
