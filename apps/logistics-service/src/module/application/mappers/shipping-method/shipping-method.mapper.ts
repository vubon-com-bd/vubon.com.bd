import type { ShippingMethodEntity } from '@domain/entities/shipping-method.entity';
import type {
  ShippingMethodResponseDTO,
  ShippingMethodSummaryResponseDTO,
  ShippingMethodListResponseDTO,
  ShippingMethodStatsResponseDTO,
} from '@application/dtos/responses/shipping-method/index.js';

export class ShippingMethodMapper {
  static toResponse(e: ShippingMethodEntity): ShippingMethodResponseDTO {
    return {
      id: e.id,
      name: e.name,
      code: e.code,
      displayName: e.displayName,
      status: e.status.value,
      type: e.type.value,
      rateType: e.rateType.value,
      baseCost: e.baseCost,
      freeAbove: e.freeAbove,
      currency: e.currency,
      minDeliveryDays: e.minDeliveryDays,
      maxDeliveryDays: e.maxDeliveryDays,
      maxWeightKg: e.maxWeightKg,
      maxDimensionsCm: e.maxDimensionsCm,
      codEnabled: e.codEnabled,
      trackingEnabled: e.trackingEnabled,
      coverageZones: e.coverageZones,
      couriers: e.couriers,
      isDefault: e.isDefault,
      isActive: e.isActive,
      activatedAt: e.activatedAt,
      deactivatedAt: e.deactivatedAt,
      suspendedAt: e.suspendedAt,
      suspendReason: e.suspendReason,
      deactivateReason: e.deactivateReason,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }
  static toSummary(e: ShippingMethodEntity): ShippingMethodSummaryResponseDTO {
    return {
      id: e.id,
      name: e.name,
      code: e.code,
      displayName: e.displayName,
      type: e.type.value,
      status: e.status.value,
      baseCost: e.baseCost,
      currency: e.currency,
      createdAt: e.createdAt,
    };
  }
  static toListResponse(
    entities: readonly ShippingMethodEntity[],
    total: number,
    page: number,
    limit: number,
  ): ShippingMethodListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
  static toStatsResponse(stats: {
    total: number;
    byStatus: Readonly<Record<string, number>>;
    byType: Readonly<Record<string, number>>;
    codEnabledCount: number;
    trackingEnabledCount: number;
  }): ShippingMethodStatsResponseDTO {
    return { ...stats, generatedAt: new Date().toISOString() };
  }
}
