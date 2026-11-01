import { DriverEntity } from '@domain/entities/driver.entity';
import { DriverNameVO } from '@domain/value-objects/primitives/driver-name.vo';
import { DriverStatusVO } from '@domain/value-objects/primitives/driver-status.vo';
import { DriverTypeVO } from '@domain/value-objects/primitives/driver-type.vo';
import { DriverLicenseVO } from '@domain/value-objects/primitives/driver-license.vo';

const toNum = (v: unknown): number | undefined => {
  if (v === null || v === undefined) return undefined;
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (typeof v === 'object' && 'toNumber' in v) return (v as { toNumber: () => number }).toNumber();
  return Number(v);
};
const toIso = (d: Date | null | undefined): string | undefined => d ? new Date(d).toISOString() : undefined;

export interface LogisticsDriverRow {
  id: string; userId: string | null; name: string; phone: string; email: string | null;
  status: string; type: string; licenseNumber: string; licenseType: string; licenseExpiresAt: Date;
  dateOfBirth: Date | null; address: string | null; vehicleId: string | null; warehouseId: string | null;
  rating: unknown; totalDeliveries: number; totalDistanceKm: unknown; cashLimit: unknown; cashInHand: unknown;
  isAvailable: boolean; lastActiveAt: Date | null; version: number; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  onLeaveStartAt: Date | null; onLeaveEndAt: Date | null; suspendedAt: Date | null; suspensionReason: string | null;
  license: unknown; metadata: unknown;
}

export class DriverPrismaMapper {
  static toDomain(raw: LogisticsDriverRow): DriverEntity {
    return DriverEntity.reconstitute({
      id: raw.id, createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        userId: raw.userId ?? undefined, name: DriverNameVO.reconstitute(raw.name),
        phone: raw.phone, email: raw.email ?? undefined,
        status: DriverStatusVO.reconstitute(raw.status),
        type: DriverTypeVO.reconstitute(raw.type),
        license: DriverLicenseVO.reconstitute({
          licenseNumber: raw.licenseNumber,
          licenseType: raw.licenseType as never,
          expiresAt: new Date(raw.licenseExpiresAt).toISOString(),
        }),
        dateOfBirth: toIso(raw.dateOfBirth), address: raw.address ?? undefined,
        vehicleId: raw.vehicleId ?? undefined, warehouseId: raw.warehouseId ?? undefined,
        rating: toNum(raw.rating), totalDeliveries: raw.totalDeliveries,
        totalDistanceKm: toNum(raw.totalDistanceKm), cashLimit: toNum(raw.cashLimit), cashInHand: toNum(raw.cashInHand),
        isAvailable: raw.isAvailable, lastActiveAt: toIso(raw.lastActiveAt),
        onLeaveStartAt: toIso(raw.onLeaveStartAt), onLeaveEndAt: toIso(raw.onLeaveEndAt),
        suspendedAt: toIso(raw.suspendedAt), suspensionReason: raw.suspensionReason ?? undefined,
        metadata: raw.metadata as Readonly<Record<string, unknown>> | undefined,
      },
    });
  }
  static toPersistence(entity: DriverEntity): Record<string, unknown> {
    return {
      id: entity.id, userId: entity.userId ?? null, name: entity.name.value, phone: entity.phone,
      email: entity.email ?? null, status: entity.status.value, type: entity.type.value,
      licenseNumber: entity.license.value.licenseNumber,
      licenseType: entity.license.value.licenseType,
      licenseExpiresAt: new Date(entity.license.value.expiresAt),
      dateOfBirth: entity.dateOfBirth ? new Date(entity.dateOfBirth) : null,
      address: entity.address ?? null, vehicleId: entity.vehicleId ?? null,
      warehouseId: entity.warehouseId ?? null, rating: entity.rating ?? null,
      totalDeliveries: entity.totalDeliveries, totalDistanceKm: entity.totalDistanceKm ?? null,
      cashLimit: entity.cashLimit ?? null, cashInHand: entity.cashInHand ?? null,
      isAvailable: entity.isAvailable,
      lastActiveAt: entity.lastActiveAt ? new Date(entity.lastActiveAt) : null,
      onLeaveStartAt: entity.onLeaveStartAt ? new Date(entity.onLeaveStartAt) : null,
      onLeaveEndAt: entity.onLeaveEndAt ? new Date(entity.onLeaveEndAt) : null,
      suspendedAt: entity.suspendedAt ? new Date(entity.suspendedAt) : null,
      suspensionReason: entity.suspensionReason ?? null, metadata: entity.metadata ?? null,
      version: entity.version, updatedAt: new Date(entity.updatedAt),
    };
  }
}
