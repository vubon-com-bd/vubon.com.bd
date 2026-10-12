/**
 * VendorShippingService
 * @module vendor-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import {
  VENDOR_SHIPPING_REPOSITORY,
  type VendorShippingRepository,
} from '../../../domain/repositories/vendor-shipping.repository.interface.js';
import { VendorShippingEntity } from '../../../domain/entities/vendor-shipping.entity.js';
import { ShippingMethodVO } from '../../../domain/value-objects/primitives/shipping-method.vo.js';
import { ShippingZoneVO } from '../../../domain/value-objects/primitives/shipping-zone.vo.js';
import { ShippingCostVO } from '../../../domain/value-objects/primitives/shipping-cost.vo.js';
import { DeliveryDaysVO } from '../../../domain/value-objects/primitives/delivery-days.vo.js';
import { VendorIdGeneratorService } from '../../../domain/services/vendor-id-generator.service.js';
import {
  VENDOR_SHIPPING_SERVICE,
  type IVendorShippingService,
  type VendorShippingResponseDto,
  type AddShippingRateInput,
} from '../interfaces/vendor-shipping.service.interface.js';

@Injectable()
export class VendorShippingService implements IVendorShippingService {
  constructor(
    @Inject(VENDOR_SHIPPING_REPOSITORY)
    private readonly repo: VendorShippingRepository,
  ) {}

  async initialize(vendorId: string, defaultMethod: string, _actorId?: string): Promise<VendorShippingResponseDto> {
    const existing = await this.repo.findByVendorId(vendorId);
    if (existing) return this.toResponse(existing);

    const now = new Date().toISOString();
    const entity = VendorShippingEntity.create({
      id: VendorIdGeneratorService.generateUUID(),
      vendorId,
      defaultMethod: ShippingMethodVO.create(defaultMethod),
      now,
    });
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async addRate(input: AddShippingRateInput, _actorId?: string): Promise<VendorShippingResponseDto> {
    const entity = await this.requireShipping(input.vendorId);
    entity.addRate(
      {
        method: ShippingMethodVO.create(input.method),
        zone: ShippingZoneVO.create(input.zone),
        cost: ShippingCostVO.create(input.cost, input.currency),
        deliveryDays: DeliveryDaysVO.create(input.minDeliveryDays, input.maxDeliveryDays),
        isActive: true,
      },
      new Date().toISOString(),
    );
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async removeRate(vendorId: string, method: string, zone: string, _actorId?: string): Promise<VendorShippingResponseDto> {
    const entity = await this.requireShipping(vendorId);
    entity.removeRate(
      ShippingMethodVO.create(method),
      ShippingZoneVO.create(zone),
      new Date().toISOString(),
    );
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async setFreeShippingThreshold(vendorId: string, amount: number | undefined, _actorId?: string): Promise<VendorShippingResponseDto> {
    const entity = await this.requireShipping(vendorId);
    entity.setFreeShippingThreshold(amount, new Date().toISOString());
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async calculateShipping(vendorId: string, zone: string, orderTotal: number, method?: string): Promise<number> {
    const entity = await this.requireShipping(vendorId);
    return entity.calculateShipping(
      ShippingZoneVO.create(zone),
      orderTotal,
      method ? ShippingMethodVO.create(method) : undefined,
    );
  }

  async getByVendorId(vendorId: string): Promise<VendorShippingResponseDto> {
    const entity = await this.requireShipping(vendorId);
    return this.toResponse(entity);
  }

  private async requireShipping(vendorId: string): Promise<VendorShippingEntity> {
    const entity = await this.repo.findByVendorId(vendorId);
    if (!entity) {
      throw new Error(`Shipping config not found for vendor "${vendorId}"`);
    }
    return entity;
  }

  private toResponse(entity: VendorShippingEntity): VendorShippingResponseDto {
    return {
      vendorId: entity.vendorId,
      defaultMethod: entity.defaultMethod.value,
      trackingRequired: entity.trackingRequired,
      allowPickup: entity.allowPickup,
      allowCourier: entity.allowCourier,
      freeShippingThreshold: entity.freeShippingThreshold,
      rates: entity.rates.map((r) => ({
        method: r.method.value,
        zone: r.zone.value,
        cost: r.cost.amount,
        currency: r.cost.currency,
        minDeliveryDays: r.deliveryDays.min,
        maxDeliveryDays: r.deliveryDays.max,
        isActive: r.isActive,
      })),
      updatedAt: entity.updatedAt,
    };
  }
}
