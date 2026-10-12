import type {
  CreateShippingMethodRequestDTO, UpdateShippingMethodRequestDTO,
  ActivateShippingMethodRequestDTO, DeactivateShippingMethodRequestDTO,
  SuspendShippingMethodRequestDTO, CalculateShippingRequestDTO,
} from '../../application/dtos/requests/shipping-method/shipping-method.dto.js';
import type { ShippingMethodListOptionsDTO } from '../../application/services/interfaces/shipping-method.service.interface.js';
import type {
  CreateShippingMethodHttpDTO, UpdateShippingMethodHttpDTO, ShippingMethodReasonHttpDTO,
  SuspendReasonHttpDTO, CalculateShippingHttpDTO, ListShippingMethodsHttpQueryDTO,
} from '../dtos/requests/shipping-method.request.dto.js';
import type { ShippingMethodValue, ShippingRateTypeValue, ShippingMethodStatusValue } from '@vubon/shared-types/logistics';

export class ShippingMethodControllerMapper {
  static toCreateDto(dto: CreateShippingMethodHttpDTO): CreateShippingMethodRequestDTO {
    return {
      name: dto.name, code: dto.code as ShippingMethodValue, displayName: dto.displayName,
      rateType: dto.rateType as ShippingRateTypeValue,
      baseCost: dto.baseCost, freeAbove: dto.freeAbove, currency: dto.currency,
      minDeliveryDays: dto.minDeliveryDays, maxDeliveryDays: dto.maxDeliveryDays,
      maxWeightKg: dto.maxWeightKg, maxDimensionsCm: dto.maxDimensionsCm,
      codEnabled: dto.codEnabled, trackingEnabled: dto.trackingEnabled,
      coverageZones: dto.coverageZones, couriers: dto.couriers, isDefault: dto.isDefault,
    };
  }
  static toUpdateDto(id: string, dto: UpdateShippingMethodHttpDTO): UpdateShippingMethodRequestDTO {
    return { methodId: id, ...dto };
  }
  static toActivateDto(id: string): ActivateShippingMethodRequestDTO { return { methodId: id }; }
  static toDeactivateDto(id: string, dto: ShippingMethodReasonHttpDTO): DeactivateShippingMethodRequestDTO {
    return { methodId: id, reason: dto.reason };
  }
  static toSuspendDto(id: string, dto: SuspendReasonHttpDTO): SuspendShippingMethodRequestDTO {
    return { methodId: id, reason: dto.reason };
  }
  static toCalculateDto(id: string, dto: CalculateShippingHttpDTO): CalculateShippingRequestDTO {
    return { methodId: id, orderValue: dto.orderValue, weightKg: dto.weightKg };
  }
  static toListOptions(q: ListShippingMethodsHttpQueryDTO): ShippingMethodListOptionsDTO {
    return {
      page: q.page ?? 1, limit: q.limit ?? 20,
      filter: {
        status: q.status ? (q.status as ShippingMethodStatusValue) : undefined,
        code: q.code, zoneId: q.zoneId, codEnabled: q.codEnabled, search: q.search,
      },
    };
  }
}
