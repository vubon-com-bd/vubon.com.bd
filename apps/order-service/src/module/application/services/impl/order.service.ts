import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { OrderServiceInterface } from '../interfaces/order.service.interface';
import type { OrderRepository } from '../../../domain/repositories/order.repository.interface';
import { OrderEntity } from '../../../domain/entities/order.entity';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo';
import { OrderNumberVO } from '../../../domain/value-objects/primitives/order-number.vo';
import { CustomerIdVO } from '../../../domain/value-objects/primitives/customer-id.vo';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { PaymentIdVO } from '../../../domain/value-objects/primitives/payment-id.vo';
import { OrderOperationFailedError } from '../../errors/order.errors';
import type { CreateOrderRequestDTO } from '../../dtos/requests/order/create-order.dto';
import type { OrderResponseDTO } from '../../dtos/responses/order-response.dto';
import type { OrderDetailResponseDTO } from '../../dtos/responses/order-detail-response.dto';
import type { OrderListResponseDTO } from '../../dtos/responses/order-list-response.dto';
import type { OrderStatsResponseDTO } from '../../dtos/responses/order-stats-response.dto';

@Injectable()
export class OrderService
  extends BaseService<OrderEntity, string>
  implements OrderServiceInterface
{
  readonly name = 'OrderService';

  constructor(
    private readonly orderRepo: OrderRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async create(input: CreateOrderRequestDTO): Promise<OrderResponseDTO> {
    void this.orderRepo;
    void input;
    throw new OrderOperationFailedError('create not yet wired');
  }

  async findById(orderId: string): Promise<OrderDetailResponseDTO | null> {
    const entity = await this.orderRepo.findById(OrderIdVO.create(orderId));
    if (!entity) return null;
    return this.toDetailDTO(entity);
  }

  async findByNumber(orderNumber: string): Promise<OrderDetailResponseDTO | null> {
    const entity = await this.orderRepo.findByNumber(OrderNumberVO.create(orderNumber));
    if (!entity) return null;
    return this.toDetailDTO(entity);
  }

  async list(page: number, limit: number): Promise<OrderListResponseDTO> {
    const all = await this.orderRepo.findAll();
    const start = (page - 1) * limit;
    return {
      orders: all.slice(start, start + limit).map((e) => this.toDTO(e)),
      total: all.length,
      page,
      limit,
    };
  }

  async listByCustomer(customerId: string): Promise<readonly OrderResponseDTO[]> {
    const list = await this.orderRepo.findByCustomer(CustomerIdVO.create(customerId));
    return list.map((e) => this.toDTO(e));
  }

  async listByVendor(vendorId: string): Promise<readonly OrderResponseDTO[]> {
    const list = await this.orderRepo.findByVendor(VendorIdVO.create(vendorId));
    return list.map((e) => this.toDTO(e));
  }

  async confirm(orderId: string, paymentId: string): Promise<OrderResponseDTO> {
    const entity = await this.orderRepo.findById(OrderIdVO.create(orderId));
    if (!entity) throw new OrderOperationFailedError('order not found');
    const updated = entity.confirm(PaymentIdVO.create(paymentId));
    await this.orderRepo.save(updated);
    await this.publishEvents(updated);
    return this.toDTO(updated);
  }

  async hold(orderId: string, reason: string): Promise<void> {
    void reason;
    const entity = await this.orderRepo.findById(OrderIdVO.create(orderId));
    if (!entity) throw new OrderOperationFailedError('order not found');
    await this.orderRepo.save(entity);
  }

  async release(orderId: string): Promise<void> {
    const entity = await this.orderRepo.findById(OrderIdVO.create(orderId));
    if (!entity) throw new OrderOperationFailedError('order not found');
    await this.orderRepo.save(entity);
  }

  async delete(orderId: string): Promise<void> {
    await this.orderRepo.delete(OrderIdVO.create(orderId));
  }

  async getStats(): Promise<OrderStatsResponseDTO> {
    const all = await this.orderRepo.findAll();
    let revenue = 0;
    let pending = 0;
    let confirmed = 0;
    let shipped = 0;
    let delivered = 0;
    let cancelled = 0;
    for (const o of all) {
      revenue += o.total.value;
      if (o.status.value === 'pending') pending += 1;
      else if (o.status.value === 'confirmed') confirmed += 1;
      else if (o.status.value === 'shipped') shipped += 1;
      else if (o.status.value === 'delivered') delivered += 1;
      else if (o.status.value === 'cancelled') cancelled += 1;
    }
    return {
      totalOrders: all.length,
      pendingOrders: pending,
      confirmedOrders: confirmed,
      shippedOrders: shipped,
      deliveredOrders: delivered,
      cancelledOrders: cancelled,
      totalRevenue: revenue,
      currency: 'BDT',
    };
  }

  private toDTO(entity: OrderEntity): OrderResponseDTO {
    return {
      id: entity.id.value,
      orderNumber: entity.orderNumber.value,
      customerId: entity.customerId.value,
      vendorId: entity.vendorId?.value ?? null,
      status: entity.status.value,
      channel: entity.channel.value,
      source: entity.source.value,
      subtotal: entity.subtotal.value,
      discount: entity.discount.value,
      tax: entity.tax.value,
      shipping: entity.shipping.value,
      total: entity.total.value,
      currency: 'BDT',
      note: entity.note?.value ?? null,
      paymentId: entity.paymentId?.value ?? null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private toDetailDTO(entity: OrderEntity): OrderDetailResponseDTO {
    return { ...this.toDTO(entity), items: [] } as OrderDetailResponseDTO;
  }

  private async publishEvents(entity: OrderEntity): Promise<void> {
    const events = entity.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }
  }
}
