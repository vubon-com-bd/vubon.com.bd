import type { ZoneEntity } from '../../domain/entities/zone.entity.js';
import type { ZoneResponseDTO, ZoneListResponseDTO } from '../dtos/responses/zone/zone-response.dto.js';
import type { ZoneTypeValue, ZonePricingTypeValue, ZoneStatusValue } from '@vubon/shared-types/logistics';
export class ZoneMapper {
  static toResponse(e: ZoneEntity): ZoneResponseDTO {
    return {
      id: e.id, name: e.name, code: e.code,
      type: e.type.value as ZoneTypeValue,
      status: e.status.value as ZoneStatusValue,
      pricingType: e.pricingType.value as ZonePricingTypeValue,
      parentId: e.parentId as unknown as string | undefined,
      postalCodes: e.postalCodes, districts: e.districts, divisions: e.divisions,
      shippingCost: e.shippingCost.amount, currency: e.shippingCost.currency,
      minDeliveryDays: e.minDeliveryDays, maxDeliveryDays: e.maxDeliveryDays,
      codEnabled: e.codEnabled, codCharge: e.codCharge, codMaxAmount: e.codMaxAmount,
      isRemote: e.isRemote, isActive: e.isActive,
      createdAt: e.createdAt, updatedAt: e.updatedAt,
    };
  }
  static toListResponse(items: readonly ZoneEntity[], total: number, page: number, limit: number): ZoneListResponseDTO {
    return { items: items.map((e) => this.toResponse(e)), total, page, limit, totalPages: Math.ceil(total / limit) };
  }
}
