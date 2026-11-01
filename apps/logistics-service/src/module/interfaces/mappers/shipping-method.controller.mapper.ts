/**
 * ShippingMethodControllerMapper — HTTP DTO ↔ App DTO
 */
import type {
  CreateShippingMethodHttpDTO,
  UpdateShippingMethodHttpDTO,
  ShippingMethodReasonHttpDTO,
  ListShippingMethodsHttpQueryDTO,
} from '../dtos/requests/shipping-method/shipping-method.request.dto.js';
import type { CreateShippingMethodRequestDTO } from '@application/dtos/requests/shipping-method/create-shipping-method.dto.js';
import type {
  ShippingMethodResponseDTO,
  ShippingMethodSummaryResponseDTO,
  ShippingMethodListResponseDTO,
  ShippingMethodStatsResponseDTO,
} from '@application/dtos/responses/shipping-method/index.js';
import type {
  ShippingMethodHttpResponseDTO,
  ShippingMethodSummaryHttpResponseDTO,
  ShippingMethodListHttpResponseDTO,
  ShippingMethodStatsHttpResponseDTO,
} from '../dtos/responses/shipping-method/shipping-method.response.dto.js';

export class ShippingMethodControllerMapper {
  static toCreateAppDto(http: CreateShippingMethodHttpDTO): CreateShippingMethodRequestDTO {
    return {
      name: http.name,
      code: http.code,
      displayName: http.displayName,
      type: http.type as CreateShippingMethodRequestDTO['type'],
      rateType: http.rateType as CreateShippingMethodRequestDTO['rateType'],
      baseCost: http.baseCost,
      freeAbove: http.freeAbove,
      currency: http.currency,
      minDeliveryDays: http.minDeliveryDays,
      maxDeliveryDays: http.maxDeliveryDays,
      maxWeightKg: http.maxWeightKg,
      maxDimensionsCm: http.maxDimensionsCm,
      codEnabled: http.codEnabled,
      trackingEnabled: http.trackingEnabled,
      coverageZones: http.coverageZones,
      couriers: http.couriers,
      isDefault: http.isDefault,
    };
  }

  static toUpdateAppDto(shippingMethodId: string, http: UpdateShippingMethodHttpDTO): Record<string, unknown> {
    return { shippingMethodId, ...http };
  }

  static toReasonAppDto(shippingMethodId: string, http: ShippingMethodReasonHttpDTO): Record<string, unknown> {
    return { shippingMethodId, reason: http.reason };
  }

  static toListOptions(http: ListShippingMethodsHttpQueryDTO): Record<string, unknown> {
    return {
      page: http.page ?? 1,
      limit: http.limit ?? 20,
      sortBy: http.sortBy ?? 'createdAt',
      sortDir: http.sortDir ?? 'desc',
      filter: {
        status: http.status,
        type: http.type,
        search: http.search,
      },
    };
  }

  static toHttpResponse(app: ShippingMethodResponseDTO): ShippingMethodHttpResponseDTO {
    return {
      ...app,
      type: typeof app.type === 'string' ? app.type : String(app.type),
      status: typeof app.status === 'string' ? app.status : String(app.status),
      rateType: typeof app.rateType === 'string' ? app.rateType : String(app.rateType),
    } as unknown as ShippingMethodHttpResponseDTO;
  }

  static toSummaryHttp(app: ShippingMethodSummaryResponseDTO): ShippingMethodSummaryHttpResponseDTO {
    return {
      ...app,
      type: typeof app.type === 'string' ? app.type : String(app.type),
      status: typeof app.status === 'string' ? app.status : String(app.status),
    } as unknown as ShippingMethodSummaryHttpResponseDTO;
  }

  static toListHttp(app: ShippingMethodListResponseDTO): ShippingMethodListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
    };
  }

  static toStatsHttp(app: ShippingMethodStatsResponseDTO): ShippingMethodStatsHttpResponseDTO {
    return app as unknown as ShippingMethodStatsHttpResponseDTO;
  }
}
