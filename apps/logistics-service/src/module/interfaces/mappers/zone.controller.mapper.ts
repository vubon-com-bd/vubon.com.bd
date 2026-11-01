/**
 * ZoneControllerMapper — HTTP DTO ↔ App DTO
 * @module logistics-service/interfaces/mappers
 */
import type {
  CreateZoneHttpDTO,
  UpdateZoneHttpDTO,
  ZoneReasonHttpDTO,
  ListZonesHttpQueryDTO,
} from '../dtos/requests/zone/zone.request.dto.js';
import type { CreateZoneRequestDTO } from '@application/dtos/requests/zone/create-zone.dto.js';
import type {
  ZoneResponseDTO,
  ZoneSummaryResponseDTO,
  ZoneListResponseDTO,
  ZoneStatsResponseDTO,
} from '@application/dtos/responses/zone/index.js';
import type {
  ZoneHttpResponseDTO,
  ZoneSummaryHttpResponseDTO,
  ZoneListHttpResponseDTO,
  ZoneStatsHttpResponseDTO,
} from '../dtos/responses/zone/zone.response.dto.js';

export class ZoneControllerMapper {
  static toCreateAppDto(http: CreateZoneHttpDTO): CreateZoneRequestDTO {
    return {
      code: http.code,
      name: http.name,
      type: http.type as CreateZoneRequestDTO['type'],
      pricingType: http.pricingType as CreateZoneRequestDTO['pricingType'],
      parentId: http.parentId,
      postalCodes: http.postalCodes,
      districts: http.districts,
      divisions: http.divisions,
      shippingCost: http.shippingCost,
      freeAbove: http.freeAbove,
      currency: http.currency,
      minDeliveryDays: http.minDeliveryDays,
      maxDeliveryDays: http.maxDeliveryDays,
      codEnabled: http.codEnabled,
      codCharge: http.codCharge,
      codMaxAmount: http.codMaxAmount,
      isRemote: http.isRemote,
    };
  }

  static toUpdateAppDto(zoneId: string, http: UpdateZoneHttpDTO): Record<string, unknown> {
    return { zoneId, ...http };
  }

  static toReasonAppDto(zoneId: string, http: ZoneReasonHttpDTO): Record<string, unknown> {
    return { zoneId, reason: http.reason };
  }

  static toListOptions(http: ListZonesHttpQueryDTO): Record<string, unknown> {
    return {
      page: http.page ?? 1,
      limit: http.limit ?? 20,
      sortBy: http.sortBy ?? 'createdAt',
      sortDir: http.sortDir ?? 'desc',
      filter: {
        status: http.status,
        type: http.type,
        parentId: http.parentId,
        search: http.search,
      },
    };
  }

  static toHttpResponse(app: ZoneResponseDTO): ZoneHttpResponseDTO {
    return {
      ...app,
      type: typeof app.type === 'string' ? app.type : String(app.type),
      status: typeof app.status === 'string' ? app.status : String(app.status),
      pricingType: typeof app.pricingType === 'string' ? app.pricingType : String(app.pricingType),
    } as unknown as ZoneHttpResponseDTO;
  }

  static toSummaryHttp(app: ZoneSummaryResponseDTO): ZoneSummaryHttpResponseDTO {
    return {
      ...app,
      type: typeof app.type === 'string' ? app.type : String(app.type),
      status: typeof app.status === 'string' ? app.status : String(app.status),
    } as unknown as ZoneSummaryHttpResponseDTO;
  }

  static toListHttp(app: ZoneListResponseDTO): ZoneListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
    };
  }

  static toStatsHttp(app: ZoneStatsResponseDTO): ZoneStatsHttpResponseDTO {
    return app as unknown as ZoneStatsHttpResponseDTO;
  }
}
