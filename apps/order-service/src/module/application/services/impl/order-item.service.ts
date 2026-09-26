import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { OrderItemServiceInterface } from '../interfaces/order-item.service.interface';
import type { OrderItemRepository } from '../../../domain/repositories/order-item.repository.interface';
import { OrderItemEntity } from '../../../domain/entities/order-item.entity';
import { OrderItemIdVO } from '../../../domain/value-objects/primitives/order-item-id.vo';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo';
import { OrderItemOperationFailedError } from '../../errors/order-item.errors';
import type { AddOrderItemRequestDTO } from '../../dtos/requests/order-item/add-order-item.dto';
import type { UpdateOrderItemRequestDTO } from '../../dtos/requests/order-item/update-order-item.dto';
import type { OrderItemResponseDTO } from '../../dtos/responses/order-item-response.dto';

@Injectable()
export class OrderItemService
  extends BaseService<OrderItemEntity, string>
  implements OrderItemServiceInterface
{
  readonly name = 'OrderItemService';

  constructor(
    private readonly itemRepo: OrderItemRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async add(input: AddOrderItemRequestDTO): Promise<OrderItemResponseDTO> {
    void input;
    throw new OrderItemOperationFailedError('add not yet wired');
  }

  async update(input: UpdateOrderItemRequestDTO): Promise<OrderItemResponseDTO> {
    const entity = await this.itemRepo.findById(OrderItemIdVO.create(input.itemId));
    if (!entity) throw new OrderItemOperationFailedError('item not found');
    await this.itemRepo.save(entity);
    return this.toDTO(entity);
  }

  async remove(itemId: string): Promise<void> {
    await this.itemRepo.delete(OrderItemIdVO.create(itemId));
  }

  async listByOrder(orderId: string): Promise<readonly OrderItemResponseDTO[]> {
    const list = await this.itemRepo.findByOrder(OrderIdVO.create(orderId));
    return list.map((e) => this.toDTO(e));
  }

  private toDTO(entity: OrderItemEntity): OrderItemResponseDTO {
    return {
      id: entity.id.value,
      orderId: '',
      productId: entity.productId.value,
      variantId: entity.variantId?.value ?? null,
      productName: entity.productName,
      quantity: entity.quantity.value,
      priceAtPurchase: entity.priceAtPurchase.value,
      currency: 'BDT',
      status: entity.status.value,
      lineTotal: entity.lineTotal,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
