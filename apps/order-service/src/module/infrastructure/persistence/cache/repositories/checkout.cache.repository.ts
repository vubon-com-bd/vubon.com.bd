/**
 * CheckoutCacheRepository
 */
import { Injectable } from '@nestjs/common';
import { RedisService, BaseCacheRepository } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import { CheckoutEntity } from '../../../../domain/entities/checkout.entity.js';
import { CheckoutStatusVO } from '../../../../domain/value-objects/primitives/checkout-status.vo.js';
import { CheckoutStepVO } from '../../../../domain/value-objects/primitives/checkout-step.vo.js';
import { CustomerIdVO } from '../../../../domain/value-objects/primitives/customer-id.vo.js';

interface Snapshot {
  id: string;
  customerId: string;
  cartId?: string;
  status: string;
  step: string;
  type: string;
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  shippingAmount: number;
  total: number;
  currency: string;
  shippingMethodId?: string;
  paymentMethod?: string;
  orderId?: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class CheckoutCacheRepository extends BaseCacheRepository<CheckoutEntity, string> {
  constructor(redis: RedisService) {
    super(redis, 'checkout', CACHE_TTL.ONE_MINUTE);
  }

  async findById(id: string): Promise<CheckoutEntity | null> {
    const raw = await this.redis.get<Snapshot>(this.keyFor(id));
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly CheckoutEntity[]> {
    return [];
  }

  async save(entity: CheckoutEntity): Promise<CheckoutEntity> {
    const snap = this.toSnapshot(entity);
    await this.redis.raw.set(this.keyFor(entity.id), JSON.stringify(snap), 'EX', this.ttlSeconds);
    return entity;
  }

  async delete(id: string): Promise<void> {
    await this.redis.raw.del(this.keyFor(id));
  }

  private toSnapshot(entity: CheckoutEntity): Snapshot {
    return {
      id: entity.id,
      customerId: entity.customerId.value,
      cartId: entity.cartId,
      status: entity.status.value,
      step: entity.currentStep.value,
      type: entity.type,
      subtotal: entity.subtotal,
      discountAmount: entity.discountAmount,
      taxAmount: entity.taxAmount,
      shippingAmount: entity.shippingAmount,
      total: entity.total,
      currency: entity.currency,
      shippingMethodId: entity.shippingMethodId,
      paymentMethod: entity.paymentMethod,
      orderId: entity.orderId,
      expiresAt: entity.expiresAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private toDomain(raw: Snapshot): CheckoutEntity {
    return CheckoutEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      props: {
        customerId: CustomerIdVO.reconstitute(raw.customerId),
        cartId: raw.cartId,
        status: CheckoutStatusVO.reconstitute(raw.status),
        currentStep: CheckoutStepVO.reconstitute(raw.step),
        type: raw.type,
        currency: raw.currency,
        subtotal: raw.subtotal,
        discountAmount: raw.discountAmount,
        taxAmount: raw.taxAmount,
        shippingAmount: raw.shippingAmount,
        total: raw.total,
        shippingMethodId: raw.shippingMethodId,
        paymentMethod: raw.paymentMethod,
        orderId: raw.orderId,
        expiresAt: raw.expiresAt,
      },
    });
  }
}
