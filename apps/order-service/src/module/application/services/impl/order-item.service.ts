/**
 * OrderItemService
 * @module order-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import type { IOrderItemService } from '../interfaces/order-item.service.interface.js';
import {
  ORDER_ITEM_REPOSITORY,
  type OrderItemRepository,
} from '../../../domain/repositories/order-item.repository.interface.js';
import { OrderItemEntity } from '../../../domain/entities/order-item.entity.js';
import { OrderItemIdVO } from '../../../domain/value-objects/primitives/order-item-id.vo.js';
import { OrderItemQuantityVO } from '../../../domain/value-objects/primitives/order-item-quantity.vo.js';
import { OrderItemMapper } from '../../mappers/order-item.mapper.js';
import { OrderItemNotFoundApplicationError } from '../../errors/order-item.errors.js';
import type {
  AddOrderItemCommandDTO,
  UpdateOrderItemCommandDTO,
  RemoveOrderItemCommandDTO,
} from '../../dtos/requests/order-item/index.js';
import type {
  OrderItemResponseDTO,
  OrderItemListResponseDTO,
} from '../../dtos/responses/order-item-response.dto.js';

@Injectable()
export class OrderItemService implements IOrderItemService {
  private readonly logger = new Logger(OrderItemService.name);

  constructor(
    @Inject(ORDER_ITEM_REPOSITORY)
    private readonly repo: OrderItemRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async add(
    dto: AddOrderItemCommandDTO,
    actorId?: string,
  ): Promise<OrderItemResponseDTO> {
    this.logger.log(`Adding item to order ${dto.orderId}`);

    // Delegate to order aggregate in real flow; here we throw to signal gap
    // (order item creation is normally done via Order aggregate root)
    throw new OrderItemNotFoundApplicationError('new-item');
  }

  async update(
    dto: UpdateOrderItemCommandDTO,
    actorId?: string,
  ): Promise<OrderItemResponseDTO> {
    const entity = await this.loadById(dto.itemId);

    // If quantity provided, update
    if (dto.quantity !== undefined) {
      entity.updateQuantity(OrderItemQuantityVO.create(dto.quantity));
    }

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);

    this.logger.log(`✅ Order item ${saved.id} updated by ${actorId ?? 'system'}`);
    return OrderItemMapper.toResponse(saved);
  }

  async remove(dto: RemoveOrderItemCommandDTO, actorId?: string): Promise<void> {
    const entity = await this.loadById(dto.itemId);
    entity.cancel();
    await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(entity);
    await this.repo.softDelete(dto.itemId, actorId ?? 'system');
    this.logger.log(`✅ Order item ${dto.itemId} removed by ${actorId ?? 'system'}`);
  }

  async getById(id: string): Promise<OrderItemResponseDTO> {
    const entity = await this.loadById(id);
    return OrderItemMapper.toResponse(entity);
  }

  async listByOrder(orderId: string): Promise<OrderItemListResponseDTO> {
    const items = await this.repo.findByOrder(orderId);
    return OrderItemMapper.toListResponse(items);
  }

  private async loadById(id: string): Promise<OrderItemEntity> {
    const vo = OrderItemIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new OrderItemNotFoundApplicationError(id);
    return entity;
  }
}
