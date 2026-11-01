/**
 * CourierMapper — Entity → Response DTO
 * @module logistics-service/application/mappers/courier
 */
import type { CourierEntity } from '@domain/entities/courier.entity';
import type {
  CourierResponseDTO,
  CourierPublicResponseDTO,
  CourierSummaryResponseDTO,
  CourierListResponseDTO,
  CourierStatsResponseDTO,
} from '@application/dtos/responses/courier/index.js';

export class CourierMapper {
  static toResponse(e: CourierEntity): CourierResponseDTO {
    return {
      id: e.id,
      code: e.code,
      name: e.name.value,
      displayName: e.displayName,
      type: e.type.value,
      status: e.status.value,
      logoUrl: e.logoUrl,
      website: e.website,
      contactPhone: e.contactPhone,
      contactEmail: e.contactEmail,
      trackingUrlTemplate: e.trackingUrlTemplate,
      apiEnabled: e.apiEnabled,
      coverageZones: e.coverageZones,
      supportsCOD: e.supportsCOD,
      supportsInsurance: e.supportsInsurance,
      supportsInternational: e.supportsInternational,
      averageDeliveryDays: e.averageDeliveryDays,
      isDefault: e.isDefault,
      priority: e.priority,
      activatedAt: e.activatedAt,
      deactivatedAt: e.deactivatedAt,
      suspendedAt: e.suspendedAt,
      terminatedAt: e.terminatedAt,
      suspendReason: e.suspendReason,
      terminateReason: e.terminateReason,
      deactivateReason: e.deactivateReason,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }

  static toPublicResponse(e: CourierEntity): CourierPublicResponseDTO {
    return {
      id: e.id,
      displayName: e.displayName,
      type: e.type.value,
      status: e.status.value,
      logoUrl: e.logoUrl,
      supportsCOD: e.supportsCOD,
      averageDeliveryDays: e.averageDeliveryDays,
    };
  }

  static toSummary(e: CourierEntity): CourierSummaryResponseDTO {
    return {
      id: e.id,
      code: e.code,
      displayName: e.displayName,
      type: e.type.value,
      status: e.status.value,
      priority: e.priority,
      createdAt: e.createdAt,
    };
  }

  static toListResponse(
    entities: readonly CourierEntity[],
    total: number,
    page: number,
    limit: number,
  ): CourierListResponseDTO {
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
    codEnabled: number;
    insuranceEnabled: number;
    internationalEnabled: number;
    apiEnabledCount: number;
  }): CourierStatsResponseDTO {
    return { ...stats, generatedAt: new Date().toISOString() };
  }
}
