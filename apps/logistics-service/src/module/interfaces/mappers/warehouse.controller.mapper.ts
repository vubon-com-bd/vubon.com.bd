/**
 * WarehouseControllerMapper
 * @module logistics-service/interfaces/mappers
 */
import type {
  CreateWarehouseRequestDTO, UpdateWarehouseRequestDTO,
  ActivateWarehouseRequestDTO, DeactivateWarehouseRequestDTO,
  StartMaintenanceRequestDTO, CompleteMaintenanceRequestDTO,
} from '../../application/dtos/requests/warehouse/warehouse.dto.js';
import type { WarehouseListOptionsDTO } from '../../application/services/interfaces/warehouse.service.interface.js';
import type {
  CreateWarehouseHttpDTO, UpdateWarehouseHttpDTO, DeactivateWarehouseHttpDTO,
  MaintenanceWarehouseHttpDTO, ListWarehousesHttpQueryDTO,
} from '../dtos/requests/warehouse.request.dto.js';
import type { WarehouseTypeValue, WarehouseStatusValue } from '@vubon/shared-types/logistics';
import type { Address } from '@vubon/shared-types/common';

export class WarehouseControllerMapper {
  static toCreateDto(dto: CreateWarehouseHttpDTO): CreateWarehouseRequestDTO {
    return {
      name: dto.name, code: dto.code,
      type: dto.type as WarehouseTypeValue,
      address: dto.address as unknown as Address,
      contactName: dto.contactName, contactPhone: dto.contactPhone, contactEmail: dto.contactEmail,
      capacityM3: dto.capacityM3, capacityKg: dto.capacityKg, maxSkus: dto.maxSkus,
      zone: dto.zone,
      operatingHoursStart: dto.operatingHoursStart, operatingHoursEnd: dto.operatingHoursEnd,
      timezone: dto.timezone, isDefault: dto.isDefault,
    };
  }
  static toUpdateDto(warehouseId: string, dto: UpdateWarehouseHttpDTO): UpdateWarehouseRequestDTO {
    return { warehouseId, ...dto };
  }
  static toActivateDto(warehouseId: string): ActivateWarehouseRequestDTO {
    return { warehouseId };
  }
  static toDeactivateDto(warehouseId: string, dto: DeactivateWarehouseHttpDTO): DeactivateWarehouseRequestDTO {
    return { warehouseId, reason: dto.reason };
  }
  static toStartMaintenanceDto(warehouseId: string, dto: MaintenanceWarehouseHttpDTO): StartMaintenanceRequestDTO {
    return { warehouseId, reason: dto.reason };
  }
  static toCompleteMaintenanceDto(warehouseId: string): CompleteMaintenanceRequestDTO {
    return { warehouseId };
  }
  static toListOptions(q: ListWarehousesHttpQueryDTO): WarehouseListOptionsDTO {
    return {
      page: q.page ?? 1, limit: q.limit ?? 20,
      sortBy: q.sortBy as WarehouseListOptionsDTO['sortBy'],
      sortDir: q.sortDir,
      filter: {
        status: q.status ? (q.status as WarehouseStatusValue) : undefined,
        type: q.type ? (q.type as WarehouseTypeValue) : undefined,
        zone: q.zone, hasCapacity: q.hasCapacity, search: q.search,
      },
    };
  }
}
