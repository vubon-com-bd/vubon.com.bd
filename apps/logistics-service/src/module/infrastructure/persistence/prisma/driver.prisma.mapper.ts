/**
 * DriverPrismaMapper
 * @module logistics-service/infrastructure/persistence/prisma
 */
import { DriverEntity } from '../../../domain/entities/driver.entity.js';
import { DriverIdVO } from '../../../domain/value-objects/primitives/driver-id.vo.js';
import { DriverStatusVO } from '../../../domain/value-objects/primitives/driver-status.vo.js';
import { DriverTypeVO } from '../../../domain/value-objects/primitives/driver-type.vo.js';
import { DriverLicenseTypeVO } from '../../../domain/value-objects/primitives/driver-license-type.vo.js';
import { VehicleIdVO } from '../../../domain/value-objects/primitives/vehicle-id.vo.js';
import { WarehouseIdVO } from '../../../domain/value-objects/primitives/warehouse-id.vo.js';
import type { Phone, Email, UserId } from '@vubon/shared-types/common';

export interface PrismaDriverRow {
  id: string; userId: string | null; name: string; phone: string; email: string | null;
  status: string; type: string; licenseNumber: string; licenseType: string; licenseExpiresAt: Date;
  dateOfBirth: Date | null; address: string | null; vehicleId: string | null; warehouseId: string | null;
  rating: unknown; totalDeliveries: number; totalDistanceKm: unknown;
  cashLimit: unknown; cashInHand: unknown; isAvailable: boolean; lastActiveAt: Date | null;
  version: number; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
}

const toNum = (v: unknown): number => {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (v && typeof v === 'object' && 'toNumber' in v && typeof (v as { toNumber: () => number }).toNumber === 'function') {
    return (v as { toNumber: () => number }).toNumber();
  }
  return Number(v);
};
const toIso = (d: Date | null): string | undefined => d ? new Date(d).toISOString() : undefined;

export class DriverPrismaMapper {
  static toDomain(raw: PrismaDriverRow): DriverEntity {
    return DriverEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        userId: raw.userId ? (raw.userId as UserId) : undefined,
        name: raw.name,
        phone: raw.phone as Phone,
        email: raw.email ? (raw.email as Email) : undefined,
        status: DriverStatusVO.reconstitute(raw.status),
        type: DriverTypeVO.reconstitute(raw.type),
        licenseNumber: raw.licenseNumber,
        licenseType: DriverLicenseTypeVO.reconstitute(raw.licenseType),
        licenseExpiresAt: new Date(raw.licenseExpiresAt).toISOString(),
        dateOfBirth: toIso(raw.dateOfBirth),
        address: raw.address ?? undefined,
        vehicleId: raw.vehicleId ? VehicleIdVO.reconstitute(raw.vehicleId) : undefined,
        warehouseId: raw.warehouseId ? WarehouseIdVO.reconstitute(raw.warehouseId) : undefined,
        rating: raw.rating !== null ? toNum(raw.rating) : undefined,
        totalDeliveries: raw.totalDeliveries,
        totalDistanceKm: toNum(raw.totalDistanceKm),
        cashLimit: toNum(raw.cashLimit),
        cashInHand: toNum(raw.cashInHand),
        isAvailable: raw.isAvailable,
        lastActiveAt: toIso(raw.lastActiveAt),
      },
    });
  }

  static toPersistence(entity: DriverEntity): Record<string, unknown> {
    return {
      id: entity.id,
      userId: entity.userId ?? null,
      name: entity.name,
      phone: entity.phone,
      email: entity.email ?? null,
      status: entity.status.value,
      type: entity.type.value,
      licenseNumber: entity.licenseNumber,
      licenseType: entity.licenseType.value,
      licenseExpiresAt: new Date(entity.licenseExpiresAt),
      dateOfBirth: entity.dateOfBirth ? new Date(entity.dateOfBirth) : null,
      address: entity.address ?? null,
      vehicleId: entity.vehicleId?.value ?? null,
      warehouseId: entity.warehouseId?.value ?? null,
      rating: entity.rating ?? null,
      totalDeliveries: entity.totalDeliveries,
      totalDistanceKm: entity.totalDistanceKm,
      cashLimit: entity.cashLimit,
      cashInHand: entity.cashInHand,
      isAvailable: entity.isAvailable,
      lastActiveAt: entity.lastActiveAt ? new Date(entity.lastActiveAt) : null,
      version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
