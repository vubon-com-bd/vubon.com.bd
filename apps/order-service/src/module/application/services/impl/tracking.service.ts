import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { TrackingServiceInterface } from '../interfaces/tracking.service.interface';
import type { OrderTrackingRepository } from '../../../domain/repositories/order-tracking.repository.interface';
import { OrderTrackingEntity } from '../../../domain/entities/order-tracking.entity';
import { TrackingIdVO } from '../../../domain/value-objects/primitives/tracking-id.vo';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo';
import { TrackingStatusVO } from '../../../domain/value-objects/primitives/tracking-status.vo';
import { TrackingOperationFailedError } from '../../errors/tracking.errors';
import type { TrackingResponseDTO } from '../../dtos/responses/tracking-response.dto';

@Injectable()
export class TrackingService
  extends BaseService<OrderTrackingEntity, string>
  implements TrackingServiceInterface
{
  readonly name = 'TrackingService';

  constructor(
    private readonly trackingRepo: OrderTrackingRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async add(orderId: string, trackingNumber: string, carrier: string): Promise<TrackingResponseDTO> {
    void orderId;
    void trackingNumber;
    void carrier;
    throw new TrackingOperationFailedError('add not yet wired');
  }

  async update(trackingId: string, status: string): Promise<TrackingResponseDTO> {
    const entity = await this.trackingRepo.findById(TrackingIdVO.create(trackingId));
    if (!entity) throw new TrackingOperationFailedError('tracking not found');
    const updated = entity.changeStatus(TrackingStatusVO.create(status));
    await this.trackingRepo.save(updated);
    return this.toDTO(updated);
  }

  async remove(trackingId: string): Promise<void> {
    await this.trackingRepo.delete(TrackingIdVO.create(trackingId));
  }

  async findByOrder(orderId: string): Promise<readonly TrackingResponseDTO[]> {
    const list = await this.trackingRepo.findByOrder(OrderIdVO.create(orderId));
    return list.map((e) => this.toDTO(e));
  }

  private toDTO(entity: OrderTrackingEntity): TrackingResponseDTO {
    return {
      id: entity.id.value,
      orderId: entity.orderId.value,
      status: entity.status.value,
      trackingNumber: entity.trackingNumber?.value ?? null,
      carrier: entity.carrier,
      events: [...entity.events] as Record<string, unknown>[],
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
