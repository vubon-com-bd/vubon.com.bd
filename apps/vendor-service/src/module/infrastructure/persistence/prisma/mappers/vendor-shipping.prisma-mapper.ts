/**
 * VendorShippingPrismaMapper
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import type { VendorShipping as PrismaVendorShipping } from '@prisma/client';
import { VendorShippingEntity } from '../../../../domain/entities/vendor-shipping.entity.js';
import type { ShippingRateProps } from '../../../../domain/entities/vendor-shipping.entity.js';
import { ShippingMethodVO } from '../../../../domain/value-objects/primitives/shipping-method.vo.js';
import { ShippingZoneVO } from '../../../../domain/value-objects/primitives/shipping-zone.vo.js';
import { ShippingCostVO } from '../../../../domain/value-objects/primitives/shipping-cost.vo.js';
import { DeliveryDaysVO } from '../../../../domain/value-objects/primitives/delivery-days.vo.js';

interface RawRate {
  method: string;
  zone: string;
  cost: number;
  currency: string;
  freeAbove?: number;
  minDeliveryDays: number;
  maxDeliveryDays: number;
  isActive: boolean;
}

export class VendorShippingPrismaMapper {
  static toDomain(row: PrismaVendorShipping): VendorShippingEntity {
    const rawRates = (row.rates as unknown as RawRate[]) ?? [];
    const rates: ShippingRateProps[] = rawRates.map((r) => ({
      method: ShippingMethodVO.create(r.method),
      zone: ShippingZoneVO.create(r.zone),
      cost: ShippingCostVO.create(r.cost, r.currency, r.freeAbove),
      deliveryDays: DeliveryDaysVO.create(r.minDeliveryDays, r.maxDeliveryDays),
      isActive: r.isActive,
    }));

    return VendorShippingEntity.reconstitute({
      id: row.id,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
      deletedAt: row.deletedAt?.toISOString() ?? null,
      props: {
        vendorId: row.vendorId,
        defaultMethod: ShippingMethodVO.create(row.defaultMethod),
        trackingRequired: row.trackingRequired,
        allowPickup: row.allowPickup,
        allowCourier: row.allowCourier,
        freeShippingThreshold: row.freeShippingThreshold !== null ? Number(row.freeShippingThreshold) : undefined,
        rates,
      },
    });
  }

  static toPersistence(entity: VendorShippingEntity): Record<string, unknown> {
    const rates: RawRate[] = entity.rates.map((r) => ({
      method: r.method.value,
      zone: r.zone.value,
      cost: r.cost.amount,
      currency: r.cost.currency,
      freeAbove: r.cost.value.freeAbove,
      minDeliveryDays: r.deliveryDays.min,
      maxDeliveryDays: r.deliveryDays.max,
      isActive: r.isActive,
    }));

    return {
      id: entity.id,
      vendorId: entity.vendorId,
      defaultMethod: entity.defaultMethod.value,
      trackingRequired: entity.trackingRequired,
      allowPickup: entity.allowPickup,
      allowCourier: entity.allowCourier,
      freeShippingThreshold: entity.freeShippingThreshold ?? null,
      rates,
      createdAt: new Date(entity.createdAt),
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
