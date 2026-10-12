import type { DriverEntity } from '../../domain/entities/driver.entity.js';
import type { DriverResponseDTO, DriverListResponseDTO } from '../dtos/responses/driver/driver-response.dto.js';
import type { DriverTypeValue, DriverStatusValue, DriverLicenseTypeValue } from '@vubon/shared-types/logistics';
export class DriverMapper {
  static toResponse(e: DriverEntity): DriverResponseDTO {
    return {
      id: e.id, userId: e.userId as unknown as string | undefined,
      name: e.name, phone: e.phone as unknown as string, email: e.email as unknown as string | undefined,
      status: e.status.value as DriverStatusValue,
      type: e.type.value as DriverTypeValue,
      licenseNumber: e.licenseNumber,
      licenseType: e.licenseType.value as DriverLicenseTypeValue,
      licenseExpiresAt: e.licenseExpiresAt, dateOfBirth: e.dateOfBirth, address: e.address,
      vehicleId: e.vehicleId as unknown as string | undefined,
      warehouseId: e.warehouseId as unknown as string | undefined,
      rating: e.rating, totalDeliveries: e.totalDeliveries, totalDistanceKm: e.totalDistanceKm,
      cashLimit: e.cashLimit, cashInHand: e.cashInHand, isAvailable: e.isAvailable,
      lastActiveAt: e.lastActiveAt, createdAt: e.createdAt, updatedAt: e.updatedAt,
    };
  }
  static toListResponse(items: readonly DriverEntity[], total: number, page: number, limit: number): DriverListResponseDTO {
    return { items: items.map((e) => this.toResponse(e)), total, page, limit, totalPages: Math.ceil(total / limit) };
  }
}
