/**
 * OrderItemService
 * @module order-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import type { IOrderItemService } from '../interfaces/order-item.service.interface.js';
import {
  ORDER_ITEM_REPOSITORY,
  type OrderItemRepository,
} from '../../../domain/repositories/order-item.repository.interface.js';
import type { OrderItemEntity } from '../../../domain/entities/order-item.entity.js';
import { OrderItemIdVO } from '../../../domain/value-objects/primitives/order-item-id.vo.js';
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
  ) {}

  async add(
    dto: AddOrderItemCommandDTO,
    _actorId?: string,
  ): Promise<OrderItemResponseDTO> {
    this.logger.log(`Adding item to order ${dto.orderId}`);
    // Domain factory creates OrderItemVO + OrderItemEntity — next batch wires
    const items = await this.repo.findByOrder(dto.orderId);
    const last = items[0];
    if (!last) {
      throw new OrderItemNotFoundApplicationError('new-item');
    }
    return OrderItemMapper.toResponse(last);
  }

  async update(
    dto: UpdateOrderItemCommandDTO,
    _actorId?: string,
  ): Promise<OrderItemResponseDTO> {
    const entity = await this.loadById(dto.itemId);
    const saved = await this.repo.save(entity);
    return OrderItemMapper.toResponse(saved);
  }

  async remove(dto: RemoveOrderItemCommandDTO, actorId?: string): Promise<void> {
    await this.repo.softDelete(dto.itemId, actorId);
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
