import type { ZoneEntity } from '@domain/entities/zone.entity';
import type {
  ZoneResponseDTO,
  ZoneSummaryResponseDTO,
  ZoneListResponseDTO,
  ZoneStatsResponseDTO,
} from '@application/dtos/responses/zone/index.js';

export class ZoneMapper {
  static toResponse(e: ZoneEntity): ZoneResponseDTO {
    return {
      id: e.id,
      code: e.code,
      name: e.name.value,
      type: e.type.value,
      status: e.status.value,
      pricingType: e.pricingType.value,
      parentId: e.parentId,
      postalCodes: e.postalCodes,
      districts: e.districts,
      divisions: e.divisions,
      shippingCost: e.shippingCost,
      freeAbove: e.freeAbove,
      currency: e.currency,
      minDeliveryDays: e.minDeliveryDays,
      maxDeliveryDays: e.maxDeliveryDays,
      codEnabled: e.codEnabled,
      codCharge: e.codCharge,
      codMaxAmount: e.codMaxAmount,
      isRemote: e.isRemote,
      isActive: e.isActive,
      activatedAt: e.activatedAt,
      deactivatedAt: e.deactivatedAt,
      restrictedAt: e.restrictedAt,
      suspendedAt: e.suspendedAt,
      statusReason: e.statusReason,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }
  static toSummary(e: ZoneEntity): ZoneSummaryResponseDTO {
    return {
      id: e.id,
      code: e.code,
      name: e.name.value,
      type: e.type.value,
      status: e.status.value,
      shippingCost: e.shippingCost,
      currency: e.currency,
      isRemote: e.isRemote,
      createdAt: e.createdAt,
    };
  }
  static toListResponse(
    entities: readonly ZoneEntity[],
    total: number,
    page: number,
    limit: number,
  ): ZoneListResponseDTO {
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
    remoteCount: number;
  }): ZoneStatsResponseDTO {
    return { ...stats, generatedAt: new Date().toISOString() };
  }
}
