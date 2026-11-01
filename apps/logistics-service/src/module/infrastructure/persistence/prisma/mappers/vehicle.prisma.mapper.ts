import { VehicleEntity } from '@domain/entities/vehicle.entity';
import { VehicleNumberVO } from '@domain/value-objects/primitives/vehicle-number.vo';
import { VehicleTypeVO } from '@domain/value-objects/primitives/vehicle-type.vo';
import { VehicleStatusVO } from '@domain/value-objects/primitives/vehicle-status.vo';
import { VehicleFuelTypeVO } from '@domain/value-objects/primitives/vehicle-fuel-type.vo';

const toNum = (v: unknown): number | undefined => {
  if (v === null || v === undefined) return undefined;
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (typeof v === 'object' && 'toNumber' in v) return (v as { toNumber: () => number }).toNumber();
  return Number(v);
};
const toIso = (d: Date | null | undefined): string | undefined => d ? new Date(d).toISOString() : undefined;

export interface LogisticsVehicleRow {
  id: string; registrationNumber: string; type: string; status: string; fuelType: string;
  make: string; model: string; year: number; color: string | null;
  maxWeightKg: unknown; maxVolumeM3: unknown; capacity: number | null; mileageKm: unknown;
  lastServiceAt: Date | null; nextServiceAt: Date | null;
  insuranceExpiresAt: Date | null; registrationExpiresAt: Date | null;
  assignedDriverId: string | null; isActive: boolean;
  version: number; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  warehouseId: string | null; maintenanceStartedAt: Date | null; maintenanceCompletedAt: Date | null;
  retiredAt: Date | null; maintenanceReason: string | null; retirementReason: string | null;
  maxVolumeM: unknown; metadata: unknown;
}

export class VehiclePrismaMapper {
  static toDomain(raw: LogisticsVehicleRow): VehicleEntity {
    return VehicleEntity.reconstitute({
      id: raw.id, createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        registrationNumber: VehicleNumberVO.reconstitute(raw.registrationNumber),
        type: VehicleTypeVO.reconstitute(raw.type),
        status: VehicleStatusVO.reconstitute(raw.status),
        fuelType: VehicleFuelTypeVO.reconstitute(raw.fuelType),
        make: raw.make, model: raw.model, year: raw.year, color: raw.color ?? undefined,
        maxWeightKg: toNum(raw.maxWeightKg) ?? 0,
        maxVolumeM3: toNum(raw.maxVolumeM3) ?? toNum(raw.maxVolumeM),
        capacity: raw.capacity ?? undefined, mileageKm: toNum(raw.mileageKm),
        lastServiceAt: toIso(raw.lastServiceAt), nextServiceAt: toIso(raw.nextServiceAt),
        insuranceExpiresAt: toIso(raw.insuranceExpiresAt),
        registrationExpiresAt: toIso(raw.registrationExpiresAt),
        assignedDriverId: raw.assignedDriverId ?? undefined, warehouseId: raw.warehouseId ?? undefined,
        isActive: raw.isActive,
        maintenanceStartedAt: toIso(raw.maintenanceStartedAt),
        maintenanceCompletedAt: toIso(raw.maintenanceCompletedAt),
        retiredAt: toIso(raw.retiredAt),
        maintenanceReason: raw.maintenanceReason ?? undefined,
        retirementReason: raw.retirementReason ?? undefined,
        metadata: raw.metadata as Readonly<Record<string, unknown>> | undefined,
      },
    });
  }
  static toPersistence(entity: VehicleEntity): Record<string, unknown> {
    return {
      id: entity.id, registrationNumber: entity.registrationNumber.value,
      type: entity.type.value, status: entity.status.value, fuelType: entity.fuelType.value,
      make: entity.make, model: entity.model, year: entity.year, color: entity.color ?? null,
      maxWeightKg: entity.maxWeightKg, maxVolumeM3: entity.maxVolumeM3 ?? null,
      capacity: entity.capacity ?? null, mileageKm: entity.mileageKm ?? null,
      lastServiceAt: entity.lastServiceAt ? new Date(entity.lastServiceAt) : null,
      nextServiceAt: entity.nextServiceAt ? new Date(entity.nextServiceAt) : null,
      insuranceExpiresAt: entity.insuranceExpiresAt ? new Date(entity.insuranceExpiresAt) : null,
      registrationExpiresAt: entity.registrationExpiresAt ? new Date(entity.registrationExpiresAt) : null,
      assignedDriverId: entity.assignedDriverId ?? null, warehouseId: entity.warehouseId ?? null,
      isActive: entity.isActive,
      maintenanceStartedAt: entity.maintenanceStartedAt ? new Date(entity.maintenanceStartedAt) : null,
      maintenanceCompletedAt: entity.maintenanceCompletedAt ? new Date(entity.maintenanceCompletedAt) : null,
      retiredAt: entity.retiredAt ? new Date(entity.retiredAt) : null,
      maintenanceReason: entity.maintenanceReason ?? null,
      retirementReason: entity.retirementReason ?? null,
      metadata: entity.metadata ?? null, version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
