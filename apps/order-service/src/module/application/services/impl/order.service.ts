/**
 * OrderService — orchestrates order use cases
 * @module order-service/application/services/impl
 */
import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type {
  IOrderService,
  OrderListOptionsDTO,
  OrderStatsDTO,
} from '../interfaces/order.service.interface.js';
import {
  ORDER_REPOSITORY,
  type OrderRepository,
} from '../../../domain/repositories/order.repository.interface.js';
import { OrderEntity } from '../../../domain/entities/order.entity.js';
import { OrderItemEntity } from '../../../domain/entities/order-item.entity.js';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo.js';
import { OrderNumberVO } from '../../../domain/value-objects/primitives/order-number.vo.js';
import { OrderStatusVO } from '../../../domain/value-objects/primitives/order-status.vo.js';
import { OrderTypeVO } from '../../../domain/value-objects/primitives/order-type.vo.js';
import { OrderPriorityVO } from '../../../domain/value-objects/primitives/order-priority.vo.js';
import { CustomerIdVO } from '../../../domain/value-objects/primitives/customer-id.vo.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { ProductIdVO } from '../../../domain/value-objects/primitives/product-id.vo.js';
import { VariantIdVO } from '../../../domain/value-objects/primitives/variant-id.vo.js';
import { OrderItemIdVO } from '../../../domain/value-objects/primitives/order-item-id.vo.js';
import { OrderItemQuantityVO } from '../../../domain/value-objects/primitives/order-item-quantity.vo.js';
import { OrderItemPriceVO } from '../../../domain/value-objects/primitives/order-item-price.vo.js';
import { OrderItemStatusVO } from '../../../domain/value-objects/primitives/order-item-status.vo.js';
import { OrderNoteVO } from '../../../domain/value-objects/primitives/order-note.vo.js';
import { PaymentIdVO } from '../../../domain/value-objects/primitives/payment-id.vo.js';
import { ORDER_STATUS, ORDER_PRIORITY } from '@vubon/shared-constants/business/order';
import { OrderNumberService } from '../../../domain/services/order-number.service.js';
import { OrderTotalService } from '../../../domain/services/order-total.service.js';
import { OrderMapper } from '../../mappers/order.mapper.js';
import { OrderNotFoundApplicationError } from '../../errors/order.errors.js';
import type { CreateOrderRequestDTO } from '../../dtos/requests/order/create-order.dto.js';
import type { UpdateOrderRequestDTO } from '../../dtos/requests/order/update-order.dto.js';
import type { ConfirmOrderStatusRequestDTO } from '../../dtos/requests/order/confirm-order.dto.js';
import type { HoldOrderRequestDTO } from '../../dtos/requests/order/hold-order.dto.js';
import type { ReleaseOrderRequestDTO } from '../../dtos/requests/order/release-order.dto.js';
import type { OrderResponseDTO } from '../../dtos/responses/order-response.dto.js';
import type { OrderPublicResponseDTO } from '../../dtos/responses/order-public-response.dto.js';
import type { OrderListResponseDTO } from '../../dtos/responses/order-list-response.dto.js';
import type { OrderDetailResponseDTO } from '../../dtos/responses/order-detail-response.dto.js';

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly orderRepo: OrderRepository,
  ) {}

  async create(dto: CreateOrderRequestDTO, _actorId?: string): Promise<OrderResponseDTO> {
    const now = new Date().toISOString();
    const id = randomUUID();

    const orderNumber = await this.nextOrderNumber();
    const currency = dto.currency ?? 'BDT';

    const customerId = CustomerIdVO.create(dto.customerId);

    const items: OrderItemEntity[] = dto.items.map((input) => {
      const productId = ProductIdVO.create(input.productId);
      const variantId = input.variantId ? VariantIdVO.create(input.variantId) : undefined;
      const vendorId = input.vendorId ? VendorIdVO.create(input.vendorId) : undefined;
      const unitPrice = input.unitPrice ?? 0;
      return OrderItemEntity.create({
        id: randomUUID(),
        now,
        props: {
          productId,
          variantId,
          vendorId,
          sku: `SKU-${productId.value.slice(0, 8)}`,
          name: `Product ${productId.value.slice(0, 8)}`,
          type: 'product',
          status: OrderItemStatusVO.pending(),
          quantity: OrderItemQuantityVO.create(input.quantity),
          price: OrderItemPriceVO.create(unitPrice, currency),
          discountAmount: input.discountAmount ?? 0,
          taxAmount: 0,
          shippingAmount: 0,
          notes: input.notes,
        },
      });
    });

    const totals = OrderTotalService.calculate({
      items,
      currency,
      taxRate: 0,
      shippingCost: 0,
    });

    const vendorIds = Array.from(
      new Set(items.map((i) => i.vendorId?.value).filter((v): v is string => !!v)),
    ).map((v) => VendorIdVO.create(v));

    const order = OrderEntity.create({
      id,
      now,
      items,
      props: {
        orderNumber,
        customerId,
        vendorIds,
        type: OrderTypeVO.regular(),
        status: OrderStatusVO.pending(),
        priority: OrderPriorityVO.normal(),
        currency,
        subtotal: totals.subtotal.amount,
        discountAmount: totals.discount.amount,
        taxAmount: totals.tax.amount,
        shippingAmount: totals.shipping.amount,
        total: totals.total.amount,
        notes: dto.notes ? OrderNoteVO.create(dto.notes) : undefined,
        customerNotes: dto.customerNotes ? OrderNoteVO.create(dto.customerNotes) : undefined,
      },
    });

    const saved = await this.orderRepo.save(order);
    return OrderMapper.toResponse(saved);
  }

  async update(dto: UpdateOrderRequestDTO, _actorId?: string): Promise<OrderResponseDTO> {
    const order = await this.loadOrder(dto.orderId);
    const now = new Date().toISOString();

    if (dto.notes !== undefined) order.updateNotes('notes', OrderNoteVO.create(dto.notes), now);
    if (dto.customerNotes !== undefined) {
      order.updateNotes('customerNotes', OrderNoteVO.create(dto.customerNotes), now);
    }

    const saved = await this.orderRepo.save(order);
    return OrderMapper.toResponse(saved);
  }

  async delete(orderId: string, actorId?: string): Promise<void> {
    const order = await this.loadOrder(orderId);
    await this.orderRepo.softDelete(order.id, actorId);
  }

  async confirm(dto: ConfirmOrderStatusRequestDTO, actorId?: string): Promise<OrderResponseDTO> {
    const order = await this.loadOrder(dto.orderId);
    const paymentId = dto.paymentId ? PaymentIdVO.create(dto.paymentId) : undefined;
    order.confirm(paymentId);
    const saved = await this.orderRepo.save(order);
    void actorId;
    return OrderMapper.toResponse(saved);
  }

  async hold(dto: HoldOrderRequestDTO, _actorId?: string): Promise<OrderResponseDTO> {
    const order = await this.loadOrder(dto.orderId);
    order.putOnHold(dto.reason);
    const saved = await this.orderRepo.save(order);
    return OrderMapper.toResponse(saved);
  }

  async release(dto: ReleaseOrderRequestDTO, actorId?: string): Promise<OrderResponseDTO> {
    const order = await this.loadOrder(dto.orderId);
    order.release(actorId);
    const saved = await this.orderRepo.save(order);
    return OrderMapper.toResponse(saved);
  }

  async ship(
    orderId: string,
    trackingNumber?: string,
    courierId?: string,
    _actorId?: string,
  ): Promise<OrderResponseDTO> {
    const order = await this.loadOrder(orderId);
    order.ship(trackingNumber, courierId);
    const saved = await this.orderRepo.save(order);
    return OrderMapper.toResponse(saved);
  }

  async deliver(orderId: string, receivedBy?: string, _actorId?: string): Promise<OrderResponseDTO> {
    const order = await this.loadOrder(orderId);
    order.deliver(receivedBy);
    const saved = await this.orderRepo.save(order);
    return OrderMapper.toResponse(saved);
  }

  async complete(orderId: string, _actorId?: string): Promise<OrderResponseDTO> {
    const order = await this.loadOrder(orderId);
    order.complete();
    const saved = await this.orderRepo.save(order);
    return OrderMapper.toResponse(saved);
  }

  async getById(orderId: string): Promise<OrderResponseDTO> {
    const order = await this.loadOrder(orderId);
    return OrderMapper.toResponse(order);
  }

  async getByNumber(orderNumber: string): Promise<OrderResponseDTO> {
    const vo = OrderNumberVO.create(orderNumber);
    const order = await this.orderRepo.findByNumber(vo);
    if (!order) throw new OrderNotFoundApplicationError(orderNumber);
    return OrderMapper.toResponse(order);
  }

  async getPublic(orderId: string): Promise<OrderPublicResponseDTO> {
    const order = await this.loadOrder(orderId);
    return OrderMapper.toPublicResponse(order);
  }

  async getDetail(orderId: string): Promise<OrderDetailResponseDTO> {
    const order = await this.loadOrder(orderId);
    return OrderMapper.toDetail(order);
  }

  async list(options: OrderListOptionsDTO): Promise<OrderListResponseDTO> {
    const result = await this.orderRepo.findPaginated({
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
    return this.list({
      ...options,
      filter: { ...options.filter, customerId },
    });
  }

  async listByVendor(
    vendorId: string,
    options: OrderListOptionsDTO,
  ): Promise<OrderListResponseDTO> {
    return this.list({
      ...options,
      filter: { ...options.filter, vendorId },
    });
  }

  async getStats(customerId?: string, vendorId?: string): Promise<OrderStatsDTO> {
    return this.orderRepo.getStats(customerId, vendorId);
  }

  // ─── Private helpers ───
  private async loadOrder(orderId: string): Promise<OrderEntity> {
    const order = await this.orderRepo.findById(orderId);
    if (!order) throw new OrderNotFoundApplicationError(orderId);
    return order;
  }

  private async nextOrderNumber(): Promise<OrderNumberVO> {
    // Generate a fresh number using year + timestamp-based sequence
    const year = new Date().getFullYear();
    const seq = Number(String(Date.now()).slice(-6));
    return OrderNumberService.generate(seq, year);
  }
}
