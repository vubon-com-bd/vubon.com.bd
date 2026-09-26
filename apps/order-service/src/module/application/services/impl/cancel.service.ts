import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { CancelServiceInterface } from '../interfaces/cancel.service.interface';
import type { OrderCancelRepository } from '../../../domain/repositories/order-cancel.repository.interface';
import { OrderCancelEntity } from '../../../domain/entities/order-cancel.entity';
import { CancelIdVO } from '../../../domain/value-objects/primitives/cancel-id.vo';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo';
import { CancelOperationFailedError } from '../../errors/cancel.errors';
import type { CancelResponseDTO } from '../../dtos/responses/cancel-response.dto';

@Injectable()
export class CancelService
  extends BaseService<OrderCancelEntity, string>
  implements CancelServiceInterface
{
  readonly name = 'CancelService';

  constructor(
    private readonly cancelRepo: OrderCancelRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async request(orderId: string, reason: string): Promise<CancelResponseDTO> {
    void reason;
    void orderId;
    throw new CancelOperationFailedError('request not yet wired');
  }

  async approve(cancelId: string, approvedBy: string): Promise<CancelResponseDTO> {
    void approvedBy;
    const entity = await this.cancelRepo.findById(CancelIdVO.create(cancelId));
    if (!entity) throw new CancelOperationFailedError('cancel not found');
    const updated = entity.approve();
    await this.cancelRepo.save(updated);
    await this.publishEvents(updated);
    return this.toDTO(updated);
  }

  async reject(cancelId: string, reason: string): Promise<CancelResponseDTO> {
    const entity = await this.cancelRepo.findById(CancelIdVO.create(cancelId));
    if (!entity) throw new CancelOperationFailedError('cancel not found');
    const updated = entity.reject(reason);
    await this.cancelRepo.save(updated);
    await this.publishEvents(updated);
    return this.toDTO(updated);
  }

  async complete(cancelId: string): Promise<CancelResponseDTO> {
    const entity = await this.cancelRepo.findById(CancelIdVO.create(cancelId));
    if (!entity) throw new CancelOperationFailedError('cancel not found');
    const updated = entity.complete();
    await this.cancelRepo.save(updated);
    await this.publishEvents(updated);
    return this.toDTO(updated);
  }

  async findByOrder(orderId: string): Promise<CancelResponseDTO | null> {
    const entity = await this.cancelRepo.findByOrder(OrderIdVO.create(orderId));
    return entity ? this.toDTO(entity) : null;
  }

  private toDTO(entity: OrderCancelEntity): CancelResponseDTO {
    return {
      id: entity.id.value,
      orderId: entity.orderId.value,
      customerId: entity.customerId.value,
      reason: entity.reason.value,
      status: entity.status.value,
      approvedAt: entity.approvedAt?.toISOString() ?? null,
      rejectedAt: entity.rejectedAt?.toISOString() ?? null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private async publishEvents(entity: OrderCancelEntity): Promise<void> {
    const events = entity.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }
  }
}
