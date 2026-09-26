import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { ReturnServiceInterface } from '../interfaces/return.service.interface';
import type { OrderReturnRepository } from '../../../domain/repositories/order-return.repository.interface';
import { OrderReturnEntity } from '../../../domain/entities/order-return.entity';
import { ReturnIdVO } from '../../../domain/value-objects/primitives/return-id.vo';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo';
import { ReturnOperationFailedError } from '../../errors/return.errors';
import type { ReturnResponseDTO } from '../../dtos/responses/return-response.dto';

@Injectable()
export class ReturnService
  extends BaseService<OrderReturnEntity, string>
  implements ReturnServiceInterface
{
  readonly name = 'ReturnService';

  constructor(
    private readonly returnRepo: OrderReturnRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async request(orderId: string, reason: string): Promise<ReturnResponseDTO> {
    void orderId;
    void reason;
    throw new ReturnOperationFailedError('request not yet wired');
  }

  async approve(returnId: string, approvedBy: string): Promise<ReturnResponseDTO> {
    void approvedBy;
    const entity = await this.returnRepo.findById(ReturnIdVO.create(returnId));
    if (!entity) throw new ReturnOperationFailedError('return not found');
    const updated = entity.approve();
    await this.returnRepo.save(updated);
    await this.publishEvents(updated);
    return this.toDTO(updated);
  }

  async reject(returnId: string, reason: string): Promise<ReturnResponseDTO> {
    const entity = await this.returnRepo.findById(ReturnIdVO.create(returnId));
    if (!entity) throw new ReturnOperationFailedError('return not found');
    const updated = entity.reject(reason);
    await this.returnRepo.save(updated);
    await this.publishEvents(updated);
    return this.toDTO(updated);
  }

  async receive(returnId: string, receivedBy: string): Promise<ReturnResponseDTO> {
    void receivedBy;
    const entity = await this.returnRepo.findById(ReturnIdVO.create(returnId));
    if (!entity) throw new ReturnOperationFailedError('return not found');
    return this.toDTO(entity);
  }

  async complete(returnId: string): Promise<ReturnResponseDTO> {
    const entity = await this.returnRepo.findById(ReturnIdVO.create(returnId));
    if (!entity) throw new ReturnOperationFailedError('return not found');
    const updated = entity.complete();
    await this.returnRepo.save(updated);
    await this.publishEvents(updated);
    return this.toDTO(updated);
  }

  async findByOrder(orderId: string): Promise<ReturnResponseDTO | null> {
    const entity = await this.returnRepo.findByOrder(OrderIdVO.create(orderId));
    return entity ? this.toDTO(entity) : null;
  }

  private toDTO(entity: OrderReturnEntity): ReturnResponseDTO {
    return {
      id: entity.id.value,
      orderId: entity.orderId.value,
      customerId: entity.customerId.value,
      reason: entity.reason.value,
      status: entity.status.value,
      approvedAt: entity.approvedAt?.toISOString() ?? null,
      rejectedAt: entity.rejectedAt?.toISOString() ?? null,
      completedAt: entity.completedAt?.toISOString() ?? null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private async publishEvents(entity: OrderReturnEntity): Promise<void> {
    const events = entity.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }
  }
}
