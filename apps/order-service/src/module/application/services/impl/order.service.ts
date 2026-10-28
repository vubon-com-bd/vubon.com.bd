/**
 * OrderService — orchestrates order use cases
 * @module order-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import type {
  IOrderService,
  OrderListOptionsDTO,
} from '../interfaces/order.service.interface.js';
import {
  ORDER_REPOSITORY,
  type OrderRepository,
} from '../../../domain/repositories/order.repository.interface.js';
import { OrderEntity } from '../../../domain/entities/order.entity.js';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo.js';
import { OrderMapper } from '../../mappers/order.mapper.js';
import {
  OrderNotFoundApplicationError,
  OrderNumberNotFoundApplicationError,
  OrderInitiationError,
} from '../../errors/order.errors.js';
import type {
  CreateOrderCommandDTO,
  UpdateOrderCommandDTO,
  DeleteOrderCommandDTO,
  ConfirmOrderCommandDTO,
  HoldOrderCommandDTO,
  ReleaseOrderCommandDTO,
} from '../../dtos/requests/order/index.js';
import type {
  OrderResponseDTO,
  OrderPublicResponseDTO,
  OrderListResponseDTO,
  OrderDetailResponseDTO,
  OrderStatsResponseDTO,
  OrderCreateResponseDTO,
} from '../../dtos/responses/order-response.dto.js';

import { randomUUID } from 'node:crypto';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { OrderVO } from '../../../domain/value-objects/composites/order.vo.js';
import { OrderItemVO } from '../../../domain/value-objects/composites/order-item.vo.js';
import { ShippingAddressVO } from '../../../domain/value-objects/composites/shipping-address.vo.js';
import { OrderNumberVO } from '../../../domain/value-objects/primitives/order-number.vo.js';
import { OrderStatusVO } from '../../../domain/value-objects/primitives/order-status.vo.js';
import { OrderSubtotalVO } from '../../../domain/value-objects/primitives/order-subtotal.vo.js';
import { OrderDiscountVO } from '../../../domain/value-objects/primitives/order-discount.vo.js';
import { OrderTaxVO } from '../../../domain/value-objects/primitives/order-tax.vo.js';
import { OrderShippingVO } from '../../../domain/value-objects/primitives/order-shipping.vo.js';
import { OrderTotalVO } from '../../../domain/value-objects/primitives/order-total.vo.js';
import { OrderChannelVO } from '../../../domain/value-objects/primitives/order-channel.vo.js';
import { OrderSourceVO } from '../../../domain/value-objects/primitives/order-source.vo.js';
import { OrderNoteVO } from '../../../domain/value-objects/primitives/order-note.vo.js';
import { OrderItemIdVO } from '../../../domain/value-objects/primitives/order-item-id.vo.js';
import { OrderItemQuantityVO } from '../../../domain/value-objects/primitives/order-item-quantity.vo.js';
import { OrderItemPriceVO } from '../../../domain/value-objects/primitives/order-item-price.vo.js';
import { OrderItemStatusVO } from '../../../domain/value-objects/primitives/order-item-status.vo.js';
import { ProductIdVO } from '../../../domain/value-objects/primitives/product-id.vo.js';
import { VariantIdVO } from '../../../domain/value-objects/primitives/variant-id.vo.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { ShippingAddressIdVO } from '../../../domain/value-objects/primitives/shipping-address-id.vo.js';
import { CustomerIdVO } from '../../../domain/value-objects/primitives/customer-id.vo.js';

@Injectable()
export class OrderService implements IOrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly repo: OrderRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  // ═══════════════ COMMANDS ═══════════════
  async create(
    dto: CreateOrderCommandDTO,
    userId: string,
  ): Promise<OrderCreateResponseDTO> {
    try {
      this.logger.log(
        `Order create request for user=${userId} items=${dto.items?.length ?? 0}`,
      );

      const now = new Date().toISOString();
      const currency = dto.currency ?? 'BDT';

      // ─── 1. Generate Order ID + Order Number ───
      const orderIdStr = randomUUID();
      const orderId = OrderIdVO.create(orderIdStr);

      const year = new Date().getFullYear();
      const sequence = Date.now() % 1_000_000;
      const orderNumber = OrderNumberVO.fromParts(year, sequence);

      // ─── 2. Compute subtotal from items ───
      let subtotalAmount = 0;
      for (const item of dto.items) {
        subtotalAmount += (item.unitPrice ?? 0) * item.quantity;
      }
      const subtotal = OrderSubtotalVO.create(
        Math.round(subtotalAmount * 100) / 100,
        currency,
      );

      // ─── 3. Defaults (no discount/tax, free shipping) ───
      const discount = OrderDiscountVO.none(currency);
      const tax = OrderTaxVO.none(currency);
      const shipping = OrderShippingVO.free(currency);
      const total = OrderTotalVO.create(subtotalAmount, currency);

      // ─── 4. Build OrderVO ───
      const orderVO = OrderVO.create({
        id: orderId,
        orderNumber,
        customerId: CustomerIdVO.create(dto.customerId),
        status: OrderStatusVO.pending(),
        channel: OrderChannelVO.create('web'),
        source: OrderSourceVO.create('customer'),
        subtotal,
        discount,
        tax,
        shipping,
        total,
        note: dto.notes ? OrderNoteVO.create(dto.notes) : undefined,
      });

      // ─── 5. Build OrderItems ───
      const items: OrderItemVO[] = [];
      for (const item of dto.items) {
        const itemIdStr = randomUUID();
        const itemVO = OrderItemVO.create({
          id: OrderItemIdVO.create(itemIdStr),
          orderId,
          productId: ProductIdVO.create(item.productId),
          variantId: item.variantId ? VariantIdVO.create(item.variantId) : undefined,
          vendorId: item.vendorId ? VendorIdVO.create(item.vendorId) : undefined,
          name: (item as unknown as { name?: string }).name ?? 'Product',
          sku: (item as unknown as { sku?: string }).sku ?? 'SKU-PLACEHOLDER',
          quantity: OrderItemQuantityVO.create(item.quantity),
          unitPrice: OrderItemPriceVO.create(item.unitPrice ?? 0, currency),
          status: OrderItemStatusVO.pending(),
        });
        items.push(itemVO);
      }

      // ─── 6. Build Shipping Address ───
      const addr = dto.shippingAddress as Record<string, unknown>;
      const shippingAddress = ShippingAddressVO.create({
        id: ShippingAddressIdVO.create(randomUUID()),
        recipientName: (addr['recipientName'] as string) ?? 'Recipient',
        phone: (addr['phone'] as string) ?? '0000000000',
        line1: (addr['line1'] as string) ?? 'Address',
        line2: addr['line2'] as string | undefined,
        city: (addr['city'] as string) ?? 'Dhaka',
        district: addr['district'] as string | undefined,
        division: addr['division'] as string | undefined,
        postalCode: addr['postalCode'] as string | undefined,
        country: (addr['country'] as string) ?? 'BD',
      });

      // ─── 7. Create OrderEntity ───
      const entity = OrderEntity.create({
        id: orderIdStr,
        vo: orderVO,
        items,
        shippingAddress,
        now,
      });

      // ─── 8. Save to repository ───
      const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
      this.logger.log(
        `Order ${saved.id} created (${saved.orderNumber.value})`,
      );

      // ─── 9. Return response ───
      return {
        success: true,
        orderId: saved.id,
        orderNumber: saved.orderNumber.value,
        status: saved.status.value,
      };
    } catch (e) {
      if (e instanceof OrderInitiationError) throw e;
      const msg = e instanceof Error ? e.message : 'Unknown error';
      this.logger.error(`Order creation failed: ${msg}`);
      throw new OrderInitiationError(msg);
    }
  }

  async update(
    dto: UpdateOrderCommandDTO,
    _actorId?: string,
  ): Promise<OrderResponseDTO> {
    const entity = await this.loadById(dto.orderId);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return OrderMapper.toResponse(saved);
  }

  async delete(dto: DeleteOrderCommandDTO, actorId?: string): Promise<void> {
    const entity = await this.loadById(dto.orderId);
    if (dto.reason) {
      this.logger.log(`Deleting order ${entity.id}: ${dto.reason}`);
    }
    await this.repo.softDelete(dto.orderId, actorId);
  }

  async confirm(
    dto: ConfirmOrderCommandDTO,
    actorId?: string,
  ): Promise<OrderResponseDTO> {
    const entity = await this.loadById(dto.orderId);
    entity.confirm(actorId);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Order ${saved.id} confirmed by ${actorId ?? 'system'}`);
    return OrderMapper.toResponse(saved);
  }

  async hold(
    dto: HoldOrderCommandDTO,
    _actorId?: string,
  ): Promise<OrderResponseDTO> {
    const entity = await this.loadById(dto.orderId);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Order ${saved.id} put on hold`);
    return OrderMapper.toResponse(saved);
  }

  async release(
    dto: ReleaseOrderCommandDTO,
    _actorId?: string,
  ): Promise<OrderResponseDTO> {
    const entity = await this.loadById(dto.orderId);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Order ${saved.id} released`);
    return OrderMapper.toResponse(saved);
  }

  // ═══════════════ QUERIES ═══════════════
  async getById(id: string): Promise<OrderResponseDTO> {
    const entity = await this.loadById(id);
    return OrderMapper.toResponse(entity);
  }

  async getByNumber(orderNumber: string): Promise<OrderResponseDTO> {
    const entity = await this.repo.findByOrderNumber(orderNumber);
    if (!entity) throw new OrderNumberNotFoundApplicationError(orderNumber);
    return OrderMapper.toResponse(entity);
  }

  async getPublic(id: string): Promise<OrderPublicResponseDTO> {
    const entity = await this.loadById(id);
    return OrderMapper.toPublicResponse(entity);
  }

  async getDetail(id: string): Promise<OrderDetailResponseDTO> {
    const entity = await this.loadById(id);
    return OrderMapper.toDetail(entity);
  }

  async list(options: OrderListOptionsDTO): Promise<OrderListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter,
    });
    return OrderMapper.toListResponse(
      result.items,
      result.total,
      result.page,
      result.limit,
    );
  }

  async listByCustomer(
    customerId: string,
    options: OrderListOptionsDTO,
  ): Promise<OrderListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: { ...options.filter, customerId },
    });
    return OrderMapper.toListResponse(
      result.items,
      result.total,
      result.page,
      result.limit,
    );
  }

  async listByVendor(
    vendorId: string,
    options: OrderListOptionsDTO,
  ): Promise<OrderListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: { ...options.filter, vendorId },
    });
    return OrderMapper.toListResponse(
      result.items,
      result.total,
      result.page,
      result.limit,
    );
  }

  async getStats(customerId?: string): Promise<OrderStatsResponseDTO> {
    const stats = await this.repo.getStats(customerId);
    return {
      totalOrders: stats.total,
      totalRevenue: stats.totalRevenue,
      averageOrderValue: stats.averageOrderValue,
      currency: stats.currency,
      byStatus: stats.byStatus,
    };
  }

  // ═══════════════ HELPERS ═══════════════
  private async loadById(id: string): Promise<OrderEntity> {
    const vo = OrderIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new OrderNotFoundApplicationError(id);
    return entity;
  }
}
