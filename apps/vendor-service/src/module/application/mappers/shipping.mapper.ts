/**
 * ShippingMapper
 * @module vendor-service/application/mappers
 */
import type { VendorShippingEntity } from '../../domain/entities/vendor-shipping.entity.js';
import type { ShippingConfigDTO } from '../services/interfaces/vendor-shipping.service.interface.js';

export class ShippingMapper {
  static toConfig(entity: VendorShippingEntity): ShippingConfigDTO {
    return {
      vendorId: entity.vendorId.value,
      methods: entity.methods.map((m) => m.value),
      zones: entity.zones.map((z) => ({
        zone: z.zone,
        cost: z.cost,
        minDays: z.minDays,
        maxDays: z.maxDays,
        isActive: z.isActive,
      })),
      freeShippingThreshold: entity.freeShippingThreshold,
      defaultShippingCost: entity.defaultShippingCost,
      maxShippingCost: entity.maxShippingCost,
      allowsPickup: entity.allowsPickup,
      allowsCourier: entity.allowsCourier,
      trackingRequired: entity.trackingRequired,
      processingDays: entity.processingDays,
    };
  }
}
