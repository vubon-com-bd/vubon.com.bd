/**
 * ShippingMethodMapper
 * @module logistics-service/application/mappers
 */
import type { ShippingMethodEntity } from '../../domain/entities/shipping-method.entity.js';
import type {
  ShippingMethodResponseDTO, ShippingMethodListResponseDTO,
} from '../dtos/responses/shipping-method/shipping-method-response.dto.js';
import type { ShippingMethodStatusValue, ShippingRateTypeValue } from '@vubon/shared-types/logistics';

export class ShippingMethodMapper {
  static toResponse(e: ShippingMethodEntity): ShippingMethodResponseDTO {
    return {
      id: e.id,
      name: e.name,
      code: e.code.value,
      displayName: e.displayName,
      status: e.status.value as ShippingMethodStatusValue,
      rateType: e.rateType.value as ShippingRateTypeValue,
      baseCost: e.baseCost.amount,
      freeAbove: e.freeAbove?.amount,
      currency: e.baseCost.currency,
      minDeliveryDays: e.minDeliveryDays,
      maxDeliveryDays: e.maxDeliveryDays,
      maxWeightKg: e.maxWeightKg?.value,
      codEnabled: e.codEnabled,
      trackingEnabled: e.trackingEnabled,
      coverageZones: e.coverageZones,
      couriers: e.couriers,
      isDefault: e.isDefault,
      isActive: e.isActive,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }
  static toListResponse(items: readonly ShippingMethodEntity[], total: number, page: number, limit: number): ShippingMethodListResponseDTO {
    return { items: items.map((e) => this.toResponse(e)), total, page, limit, totalPages: Math.ceil(total / limit) };
  }
}
