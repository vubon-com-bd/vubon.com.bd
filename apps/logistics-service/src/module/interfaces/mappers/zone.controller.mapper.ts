import type {
  CreateZoneRequestDTO, UpdateZoneRequestDTO, ActivateZoneRequestDTO,
  InactivateZoneRequestDTO, SuspendZoneRequestDTO,
} from '../../application/dtos/requests/zone/zone.dto.js';
import type { ZoneListOptionsDTO } from '../../application/services/interfaces/zone.service.interface.js';
import type {
  CreateZoneHttpDTO, UpdateZoneHttpDTO, ZoneReasonHttpDTO, SuspendZoneHttpDTO, ListZonesHttpQueryDTO,
} from '../dtos/requests/zone.request.dto.js';
import type { ZoneTypeValue, ZonePricingTypeValue, ZoneStatusValue } from '@vubon/shared-types/logistics';

export class ZoneControllerMapper {
  static toCreateDto(dto: CreateZoneHttpDTO): CreateZoneRequestDTO {
    return {
      name: dto.name, code: dto.code,
      type: dto.type as ZoneTypeValue,
      pricingType: dto.pricingType as ZonePricingTypeValue,
      parentId: dto.parentId,
      postalCodes: dto.postalCodes, districts: dto.districts, divisions: dto.divisions,
      shippingCost: dto.shippingCost, currency: dto.currency,
      minDeliveryDays: dto.minDeliveryDays, maxDeliveryDays: dto.maxDeliveryDays,
      codEnabled: dto.codEnabled, codCharge: dto.codCharge, codMaxAmount: dto.codMaxAmount,
      isRemote: dto.isRemote,
    };
  }
  static toUpdateDto(zoneId: string, dto: UpdateZoneHttpDTO): UpdateZoneRequestDTO {
    return { zoneId, ...dto };
  }
  static toActivateDto(zoneId: string): ActivateZoneRequestDTO { return { zoneId }; }
  static toInactivateDto(zoneId: string, dto: ZoneReasonHttpDTO): InactivateZoneRequestDTO {
    return { zoneId, reason: dto.reason };
  }
  static toSuspendDto(zoneId: string, dto: SuspendZoneHttpDTO): SuspendZoneRequestDTO {
    return { zoneId, reason: dto.reason };
  }
  static toListOptions(q: ListZonesHttpQueryDTO): ZoneListOptionsDTO {
    return {
      page: q.page ?? 1, limit: q.limit ?? 20,
      filter: {
        status: q.status ? (q.status as ZoneStatusValue) : undefined,
        type: q.type ? (q.type as ZoneTypeValue) : undefined,
        parentId: q.parentId, isRemote: q.isRemote, search: q.search,
      },
    };
  }
}
