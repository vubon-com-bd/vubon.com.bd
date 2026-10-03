/**
 * OrderItemService
 */
import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { IOrderItemService } from '../interfaces/order-item.service.interface.js';
import {
  ORDER_ITEM_REPOSITORY,
  type OrderItemRepository,
} from '../../../domain/repositories/order-item.repository.interface.js';
import {
  ORDER_REPOSITORY,
  type OrderRepository,
} from '../../../domain/repositories/order.repository.interface.js';
import { OrderItemEntity } from '../../../domain/entities/order-item.entity.js';
import { OrderItemIdVO } from '../../../domain/value-objects/primitives/order-item-id.vo.js';
import { OrderItemQuantityVO } from '../../../domain/value-objects/primitives/order-item-quantity.vo.js';
import { OrderItemPriceVO } from '../../../domain/value-objects/primitives/order-item-price.vo.js';
import { OrderItemStatusVO } from '../../../domain/value-objects/primitives/order-item-status.vo.js';
import { ProductIdVO } from '../../../domain/value-objects/primitives/product-id.vo.js';
import { VariantIdVO } from '../../../domain/value-objects/primitives/variant-id.vo.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { OrderMapper } from '../../mappers/order.mapper.js';
import { OrderItemMapper } from '../../mappers/order-item.mapper.js';
import {
  OrderItemNotFoundApplicationError,
} from '../../errors/order-item.errors.js';
import { OrderNotFoundApplicationError } from '../../errors/order.errors.js';
import type { AddOrderItemRequestDTO } from '../../dtos/requests/order-item/add-order-item.dto.js';
import type { UpdateOrderItemRequestDTO } from '../../dtos/requests/order-item/update-order-item.dto.js';
import type { RemoveOrderItemRequestDTO } from '../../dtos/requests/order-item/remove-order-item.dto.js';
import type { OrderItemResponseDTO } from '../../dtos/responses/order-response.dto.js';
import type { OrderItemListResponseDTO } from '../../dtos/responses/order-item-response.dto.js';

@Injectable()
export class OrderItemService implements IOrderItemService {
  constructor(
    @Inject(ORDER_ITEM_REPOSITORY) private readonly itemRepo: OrderItemRepository,
    @Inject(ORDER_REPOSITORY) private readonly orderRepo: OrderRepository,
  ) {}

  async add(dto: AddOrderItemRequestDTO, _actorId?: string): Promise<OrderItemResponseDTO> {
    const order = await this.orderRepo.findById(dto.orderId);
    if (!order) throw new OrderNotFoundApplicationError(dto.orderId);

    const now = new Date().toISOString();
    const item = OrderItemEntity.create({
      id: randomUUID(),
      now,
      props: {
        productId: ProductIdVO.create(dto.productId),
        variantId: dto.variantId ? VariantIdVO.create(dto.variantId) : undefined,
        vendorId: dto.vendorId ? VendorIdVO.create(dto.vendorId) : undefined,
        sku: dto.sku,
        name: dto.name,
        imageUrl: dto.imageUrl,
        type: 'product',
        status: OrderItemStatusVO.pending(),
        quantity: OrderItemQuantityVO.create(dto.quantity),
        price: OrderItemPriceVO.create(dto.unitPrice, order.currency, dto.compareAtPrice),
        discountAmount: dto.discountAmount ?? 0,
        taxAmount: dto.taxAmount ?? 0,
        shippingAmount: dto.shippingAmount ?? 0,
        notes: dto.notes,
        attributes: dto.attributes,
      },
    });

    order.addItem(item, now);
    await this.orderRepo.save(order);
    const saved = await this.itemRepo.save(item);
    return OrderItemMapper.toResponse(saved);
  }

  async update(dto: UpdateOrderItemRequestDTO, _actorId?: string): Promise<OrderItemResponseDTO> {
    const item = await this.loadItem(dto.itemId);
    const now = new Date().toISOString();

    if (dto.quantity !== undefined) {
      item.changeQuantity(OrderItemQuantityVO.create(dto.quantity), now);
    }
    if (dto.discountAmount !== undefined) {
      item.applyDiscount(dto.discountAmount, now);
    }
    if (dto.notes !== undefined) {
      item.updateNotes(dto.notes, now);
    }

    const saved = await this.itemRepo.save(item);
    return OrderItemMapper.toResponse(saved);
  }

  async remove(dto: RemoveOrderItemRequestDTO, actorId?: string): Promise<void> {
    const order = await this.orderRepo.findById(dto.orderId);
    if (!order) throw new OrderNotFoundApplicationError(dto.orderId);
    order.removeItem(dto.itemId, actorId);
    await this.orderRepo.save(order);
    await this.itemRepo.delete(dto.itemId);
  }

  async getById(itemId: string): Promise<OrderItemResponseDTO> {
    const item = await this.loadItem(itemId);
    return OrderItemMapper.toResponse(item);
  }

  async listByOrder(orderId: string): Promise<OrderItemListResponseDTO> {
    const order = await this.orderRepo.findById(orderId);
    if (!order) throw new OrderNotFoundApplicationError(orderId);
    return {
      items: order.items.map((i) => OrderItemMapper.toResponse(i)),
      total: order.items.length,
    };
  }

  private async loadItem(itemId: string): Promise<OrderItemEntity> {
    const item = await this.itemRepo.findById(itemId);
    if (!item) throw new OrderItemNotFoundApplicationError(itemId);
    return item;
  }

  // re-export void
  static readonly _Mapper = OrderMapper;
  static readonly _VO = OrderItemIdVO;
}
