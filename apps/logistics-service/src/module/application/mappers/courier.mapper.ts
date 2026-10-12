/**
 * CourierMapper
 * @module logistics-service/application/mappers
 */
import type { CourierEntity } from '../../domain/entities/courier.entity.js';
import type {
  CourierResponseDTO,
  CourierPublicResponseDTO,
  CourierListResponseDTO,
} from '../dtos/responses/courier/courier-response.dto.js';
import type { CourierTypeValue, CourierStatusValue } from '@vubon/shared-types/logistics';

export class CourierMapper {
  static toResponse(e: CourierEntity): CourierResponseDTO {
    return {
      id: e.id,
      name: e.name,
      code: e.code.value,
      displayName: e.displayName,
      type: e.type.value as CourierTypeValue,
      status: e.status.value as CourierStatusValue,
      logoUrl: e.logoUrl as unknown as string | undefined,
      website: e.website as unknown as string | undefined,
      contactPhone: e.contactPhone as unknown as string | undefined,
      contactEmail: e.contactEmail as unknown as string | undefined,
      trackingUrlTemplate: e.trackingUrlTemplate,
      apiEnabled: e.apiEnabled,
      coverageZones: e.coverageZones,
      supportsCOD: e.supportsCOD,
      supportsInsurance: e.supportsInsurance,
      supportsInternational: e.supportsInternational,
      averageDeliveryDays: e.averageDeliveryDays,
      isDefault: e.isDefault,
      priority: e.priority,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }

  static toPublicResponse(e: CourierEntity): CourierPublicResponseDTO {
    return {
      id: e.id,
      name: e.name,
      displayName: e.displayName,
      type: e.type.value as CourierTypeValue,
      status: e.status.value as CourierStatusValue,
      logoUrl: e.logoUrl as unknown as string | undefined,
      supportsCOD: e.supportsCOD,
    };
  }

  static toListResponse(
    items: readonly CourierEntity[],
    total: number,
    page: number,
    limit: number,
  ): CourierListResponseDTO {
    return {
      items: items.map((e) => this.toResponse(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
