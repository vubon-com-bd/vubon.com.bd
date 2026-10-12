/**
 * WarehouseMapper
 * @module logistics-service/application/mappers
 */
import type { WarehouseEntity } from '../../domain/entities/warehouse.entity.js';
import type { WarehouseResponseDTO, WarehouseListResponseDTO } from '../dtos/responses/warehouse/warehouse-response.dto.js';
import type { WarehouseTypeValue, WarehouseStatusValue } from '@vubon/shared-types/logistics';

export class WarehouseMapper {
  static toResponse(e: WarehouseEntity): WarehouseResponseDTO {
    return {
      id: e.id,
      code: e.code.value,
      name: e.name,
      type: e.type.value as WarehouseTypeValue,
      status: e.status.value as WarehouseStatusValue,
      address: e.address.toAddress(),
      contactName: e.contactName,
      contactPhone: e.contactPhone as unknown as string | undefined,
      contactEmail: e.contactEmail as unknown as string | undefined,
      managerId: e.managerId as unknown as string | undefined,
      capacityM3: e.capacity.capacityM3,
      usedCapacityM3: e.capacity.usedM3,
      availableM3: e.capacity.availableM3,
      capacityKg: e.capacity.capacityKg,
      usedCapacityKg: e.capacity.usedKg,
      availableKg: e.capacity.availableKg,
      utilizationPercent: e.utilizationPercent.value,
      maxSkus: e.maxSkus,
      zone: e.zone,
      operatingHoursStart: e.operatingHoursStart,
      operatingHoursEnd: e.operatingHoursEnd,
      timezone: e.timezone,
      isDefault: e.isDefault,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }

  static toListResponse(items: readonly WarehouseEntity[], total: number, page: number, limit: number): WarehouseListResponseDTO {
    return { items: items.map((e) => this.toResponse(e)), total, page, limit, totalPages: Math.ceil(total / limit) };
  }
}
