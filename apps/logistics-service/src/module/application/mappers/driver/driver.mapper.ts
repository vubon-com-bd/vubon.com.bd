import type { DriverEntity } from '@domain/entities/driver.entity';
import type {
  DriverResponseDTO,
  DriverSummaryResponseDTO,
  DriverListResponseDTO,
  DriverStatsResponseDTO,
} from '@application/dtos/responses/driver/index.js';

export class DriverMapper {
  static toResponse(e: DriverEntity): DriverResponseDTO {
    return {
      id: e.id,
      userId: e.userId,
      name: e.name.value,
      phone: e.phone,
      email: e.email,
      status: e.status.value,
      type: e.type.value,
      licenseNumber: e.license.licenseNumber,
      licenseType: e.license.licenseType,
      licenseExpiresAt: e.license.expiresAt,
      dateOfBirth: e.dateOfBirth,
      address: e.address,
      vehicleId: e.vehicleId,
      warehouseId: e.warehouseId,
      rating: e.rating,
      totalDeliveries: e.totalDeliveries,
      totalDistanceKm: e.totalDistanceKm,
      cashLimit: e.cashLimit,
      cashInHand: e.cashInHand,
      isAvailable: e.isAvailable,
      lastActiveAt: e.lastActiveAt,
      onLeaveStartAt: e.onLeaveStartAt,
      onLeaveEndAt: e.onLeaveEndAt,
      suspendedAt: e.suspendedAt,
      suspensionReason: e.suspensionReason,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }
  static toSummary(e: DriverEntity): DriverSummaryResponseDTO {
    return {
      id: e.id,
      name: e.name.value,
      phone: e.phone,
      status: e.status.value,
      type: e.type.value,
      rating: e.rating,
      totalDeliveries: e.totalDeliveries,
      isAvailable: e.isAvailable,
      createdAt: e.createdAt,
    };
  }
  static toListResponse(
    entities: readonly DriverEntity[],
    total: number,
    page: number,
    limit: number,
  ): DriverListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
  static toStatsResponse(stats: {
    total: number;
    byStatus: Readonly<Record<string, number>>;
    byType: Readonly<Record<string, number>>;
    availableCount: number;
    onDutyCount: number;
    averageRating: number;
    totalCashInHand: number;
  }): DriverStatsResponseDTO {
    return { ...stats, generatedAt: new Date().toISOString() };
  }
}
