/**
 * CourierControllerMapper — HTTP DTO ↔ App DTO
 * @module logistics-service/interfaces/mappers
 */
import type {
  CreateCourierHttpDTO,
  UpdateCourierHttpDTO,
  CourierReasonHttpDTO,
  ListCouriersHttpQueryDTO,
} from '../dtos/requests/courier/courier.request.dto.js';
import type { CreateCourierRequestDTO } from '@application/dtos/requests/courier/create-courier.dto.js';
import type { UpdateCourierRequestDTO } from '@application/dtos/requests/courier/update-courier.dto.js';
import type {
  CourierResponseDTO,
  CourierPublicResponseDTO,
  CourierSummaryResponseDTO,
  CourierListResponseDTO,
  CourierStatsResponseDTO,
} from '@application/dtos/responses/courier/index.js';
import type {
  CourierHttpResponseDTO,
  CourierPublicHttpResponseDTO,
  CourierSummaryHttpResponseDTO,
  CourierListHttpResponseDTO,
  CourierStatsHttpResponseDTO,
} from '../dtos/responses/courier/courier.response.dto.js';

export class CourierControllerMapper {
  // ═══ HTTP → App ═══
  static toCreateAppDto(http: CreateCourierHttpDTO): CreateCourierRequestDTO {
    return {
      code: http.code,
      name: http.name,
      displayName: http.displayName,
      type: http.type as CreateCourierRequestDTO['type'],
      logoUrl: http.logoUrl,
      website: http.website,
      contactPhone: http.contactPhone,
      contactEmail: http.contactEmail,
      trackingUrlTemplate: http.trackingUrlTemplate,
      apiEnabled: http.apiEnabled,
      coverageZones: http.coverageZones,
      supportsCOD: http.supportsCOD,
      supportsInsurance: http.supportsInsurance,
      supportsInternational: http.supportsInternational,
      averageDeliveryDays: http.averageDeliveryDays,
      isDefault: http.isDefault,
      priority: http.priority,
    };
  }

  static toUpdateAppDto(courierId: string, http: UpdateCourierHttpDTO): UpdateCourierRequestDTO {
    return {
      courierId,
      displayName: http.displayName,
      logoUrl: http.logoUrl,
      website: http.website,
      contactPhone: http.contactPhone,
      contactEmail: http.contactEmail,
      trackingUrlTemplate: http.trackingUrlTemplate,
      apiEnabled: http.apiEnabled,
      coverageZones: http.coverageZones,
      supportsCOD: http.supportsCOD,
      supportsInsurance: http.supportsInsurance,
      supportsInternational: http.supportsInternational,
      averageDeliveryDays: http.averageDeliveryDays,
      priority: http.priority,
    } as unknown as UpdateCourierRequestDTO;
  }

  static toListOptions(http: ListCouriersHttpQueryDTO): Record<string, unknown> {
    return {
      page: http.page ?? 1,
      limit: http.limit ?? 20,
      sortBy: http.sortBy ?? 'createdAt',
      sortDir: http.sortDir ?? 'desc',
      filter: {
        status: http.status,
        type: http.type,
        apiEnabled: http.apiEnabled,
        supportsCOD: http.supportsCOD,
        search: http.search,
      },
    };
  }

  // ═══ App → HTTP ═══
  static toHttpResponse(app: CourierResponseDTO): CourierHttpResponseDTO {
    return {
      ...app,
      name: typeof app.name === 'string' ? app.name : String(app.name),
      type: typeof app.type === 'string' ? app.type : String(app.type),
      status: typeof app.status === 'string' ? app.status : String(app.status),
    } as unknown as CourierHttpResponseDTO;
  }

  static toPublicHttpResponse(app: CourierPublicResponseDTO): CourierPublicHttpResponseDTO {
    return {
      ...app,
      type: typeof app.type === 'string' ? app.type : String(app.type),
      status: typeof app.status === 'string' ? app.status : String(app.status),
    } as unknown as CourierPublicHttpResponseDTO;
  }

  static toSummaryHttp(app: CourierSummaryResponseDTO): CourierSummaryHttpResponseDTO {
    return {
      ...app,
      type: typeof app.type === 'string' ? app.type : String(app.type),
      status: typeof app.status === 'string' ? app.status : String(app.status),
    } as unknown as CourierSummaryHttpResponseDTO;
  }

  static toListHttp(app: CourierListResponseDTO): CourierListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
    };
  }

  static toStatsHttp(app: CourierStatsResponseDTO): CourierStatsHttpResponseDTO {
    return app as unknown as CourierStatsHttpResponseDTO;
  }
}
