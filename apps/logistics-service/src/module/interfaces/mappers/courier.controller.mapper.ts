/**
 * CourierControllerMapper
 * @module logistics-service/interfaces/mappers
 */
import type {
  RegisterCourierRequestDTO, UpdateCourierRequestDTO, SuspendCourierRequestDTO,
  ActivateCourierRequestDTO, DeactivateCourierRequestDTO, SetCourierDefaultRequestDTO,
} from '../../application/dtos/requests/courier/courier.dto.js';
import type { CourierListOptionsDTO } from '../../application/services/interfaces/courier.service.interface.js';
import type {
  RegisterCourierHttpDTO, UpdateCourierHttpDTO, SuspendCourierHttpDTO,
  DeactivateCourierHttpDTO, SetCourierDefaultHttpDTO, ListCouriersHttpQueryDTO,
} from '../dtos/requests/courier.request.dto.js';
import type { CourierTypeValue, CourierNameValue, CourierStatusValue } from '@vubon/shared-types/logistics';

export class CourierControllerMapper {
  static toRegisterDto(dto: RegisterCourierHttpDTO): RegisterCourierRequestDTO {
    return {
      name: dto.name,
      code: dto.code as CourierNameValue,
      displayName: dto.displayName,
      type: dto.type as CourierTypeValue,
      logoUrl: dto.logoUrl,
      website: dto.website,
      contactPhone: dto.contactPhone,
      contactEmail: dto.contactEmail,
      trackingUrlTemplate: dto.trackingUrlTemplate,
      apiEnabled: dto.apiEnabled,
      coverageZones: dto.coverageZones,
      supportsCOD: dto.supportsCOD,
      supportsInsurance: dto.supportsInsurance,
      supportsInternational: dto.supportsInternational,
      averageDeliveryDays: dto.averageDeliveryDays,
      priority: dto.priority,
    };
  }
  static toUpdateDto(courierId: string, dto: UpdateCourierHttpDTO): UpdateCourierRequestDTO {
    return { courierId, displayName: dto.displayName, priority: dto.priority, coverageZones: dto.coverageZones };
  }
  static toSuspendDto(courierId: string, dto: SuspendCourierHttpDTO): SuspendCourierRequestDTO {
    return { courierId, reason: dto.reason };
  }
  static toActivateDto(courierId: string): ActivateCourierRequestDTO {
    return { courierId };
  }
  static toDeactivateDto(courierId: string, dto: DeactivateCourierHttpDTO): DeactivateCourierRequestDTO {
    return { courierId, reason: dto.reason };
  }
  static toSetDefaultDto(courierId: string, dto: SetCourierDefaultHttpDTO): SetCourierDefaultRequestDTO {
    return { courierId, isDefault: dto.isDefault };
  }
  static toListOptions(q: ListCouriersHttpQueryDTO): CourierListOptionsDTO {
    return {
      page: q.page ?? 1,
      limit: q.limit ?? 20,
      sortBy: q.sortBy as CourierListOptionsDTO['sortBy'],
      sortDir: q.sortDir,
      filter: {
        status: q.status ? (q.status as CourierStatusValue) : undefined,
        type: q.type ? (q.type as CourierTypeValue) : undefined,
        supportsCOD: q.supportsCOD,
        supportsInternational: q.supportsInternational,
        zone: q.zone,
        search: q.search,
      },
    };
  }
}
