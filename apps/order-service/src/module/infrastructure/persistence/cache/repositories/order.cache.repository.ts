/**
 * OrderCacheRepository — Redis-backed cache for OrderEntity
 * @module order-service/infrastructure/persistence/cache/repositories
 */
import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { BaseCacheRepository } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_PREFIX, CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import { OrderEntity } from '../../../../domain/entities/order.entity.js';
import { OrderNumberVO } from '../../../../domain/value-objects/primitives/order-number.vo.js';
import { OrderStatusVO } from '../../../../domain/value-objects/primitives/order-status.vo.js';
import { OrderTypeVO } from '../../../../domain/value-objects/primitives/order-type.vo.js';
import { OrderPriorityVO } from '../../../../domain/value-objects/primitives/order-priority.vo.js';
import { CustomerIdVO } from '../../../../domain/value-objects/primitives/customer-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { PaymentIdVO } from '../../../../domain/value-objects/primitives/payment-id.vo.js';
import { OrderNoteVO } from '../../../../domain/value-objects/primitives/order-note.vo.js';

interface OrderCacheSnapshot {
  id: string;
  orderNumber: string;
  customerId: string;
  vendorIds: string[];
  type: string;
  status: string;
  priority: string;
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  shippingAmount: number;
  total: number;
  currency: string;
  paymentId?: string;
  paymentStatus?: string;
  paymentMethod?: string;
  shippingMethod?: string;
  trackingNumber?: string;
  notes?: string;
  customerNotes?: string;
  confirmedAt?: string;
  shippedAt?: string;
  deliveredAt?: string;
  cancelledAt?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class OrderCacheRepository extends BaseCacheRepository<OrderEntity, string> {
  constructor(redis: RedisService) {
    super(redis, CACHE_PREFIX.ORDER.replace(/:$/, ''), CACHE_TTL.FIVE_MINUTES);
  }

  async findById(id: string): Promise<OrderEntity | null> {
    const raw = await this.redis.get<OrderCacheSnapshot>(this.keyFor(id));
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly OrderEntity[]> {
    return [];
  }

  async save(entity: OrderEntity): Promise<OrderEntity> {
    const snapshot = this.toSnapshot(entity);
    await this.redis.raw.set(
      this.keyFor(entity.id),
      JSON.stringify(snapshot),
      'EX',
      this.ttlSeconds,
    );
    return entity;
  }

  async delete(id: string): Promise<void> {
    await this.redis.raw.del(this.keyFor(id));
  }

  private toSnapshot(entity: OrderEntity): OrderCacheSnapshot {
    return {
      id: entity.id,
      orderNumber: entity.orderNumber.value,
      customerId: entity.customerId.value,
      vendorIds: entity.vendorIds.map((v) => v.value),
      type: entity.type.value,
      status: entity.status.value,
      priority: entity.priority.value,
      subtotal: entity.subtotal,
      discountAmount: entity.discountAmount,
      taxAmount: entity.taxAmount,
      shippingAmount: entity.shippingAmount,
      total: entity.total,
      currency: entity.currency,
      paymentId: entity.paymentId?.value,
      paymentStatus: entity.paymentStatus,
      paymentMethod: entity.paymentMethod,
      shippingMethod: entity.shippingMethod,
      trackingNumber: entity.trackingNumber,
      notes: entity.notes?.value,
      customerNotes: entity.customerNotes?.value,
      confirmedAt: entity.confirmedAt,
      shippedAt: entity.shippedAt,
      deliveredAt: entity.deliveredAt,
      cancelledAt: entity.cancelledAt,
      completedAt: entity.completedAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private toDomain(raw: OrderCacheSnapshot): OrderEntity {
    return OrderEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      items: [],
      props: {
        orderNumber: OrderNumberVO.reconstitute(raw.orderNumber),
        customerId: CustomerIdVO.reconstitute(raw.customerId),
        vendorIds: raw.vendorIds.map((v) => VendorIdVO.reconstitute(v)),
        type: OrderTypeVO.reconstitute(raw.type),
        status: OrderStatusVO.reconstitute(raw.status),
        priority: OrderPriorityVO.reconstitute(raw.priority),
        currency: raw.currency,
        subtotal: raw.subtotal,
        discountAmount: raw.discountAmount,
        taxAmount: raw.taxAmount,
        shippingAmount: raw.shippingAmount,
        total: raw.total,
        paymentId: raw.paymentId ? PaymentIdVO.reconstitute(raw.paymentId) : undefined,
        paymentStatus: raw.paymentStatus,
        paymentMethod: raw.paymentMethod,
        shippingMethod: raw.shippingMethod,
        trackingNumber: raw.trackingNumber,
        notes: raw.notes ? OrderNoteVO.reconstitute(raw.notes) : undefined,
        customerNotes: raw.customerNotes ? OrderNoteVO.reconstitute(raw.customerNotes) : undefined,
        confirmedAt: raw.confirmedAt,
        shippedAt: raw.shippedAt,
        deliveredAt: raw.deliveredAt,
        cancelledAt: raw.cancelledAt,
        completedAt: raw.completedAt,
      },
    });
  }
}
