/**
 * VehiclePrismaMapper
 * @module logistics-service/infrastructure/persistence/prisma
 */
import { VehicleEntity } from '../../../domain/entities/vehicle.entity.js';
import { VehicleIdVO } from '../../../domain/value-objects/primitives/vehicle-id.vo.js';
import { VehicleStatusVO } from '../../../domain/value-objects/primitives/vehicle-status.vo.js';
import { VehicleTypeVO } from '../../../domain/value-objects/primitives/vehicle-type.vo.js';
import { VehicleFuelTypeVO } from '../../../domain/value-objects/primitives/vehicle-fuel-type.vo.js';
import { DriverIdVO } from '../../../domain/value-objects/primitives/driver-id.vo.js';

export interface PrismaVehicleRow {
  id: string; registrationNumber: string; type: string; status: string; fuelType: string;
  make: string; model: string; year: number; color: string | null;
  maxWeightKg: unknown; maxVolumeM3: unknown; capacity: number | null; mileageKm: unknown;
  lastServiceAt: Date | null; nextServiceAt: Date | null;
  insuranceExpiresAt: Date | null; registrationExpiresAt: Date | null;
  assignedDriverId: string | null; isActive: boolean; version: number;
  createdAt: Date; updatedAt: Date; deletedAt: Date | null;
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

export class VehiclePrismaMapper {
  static toDomain(raw: PrismaVehicleRow): VehicleEntity {
    return VehicleEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        registrationNumber: raw.registrationNumber,
        type: VehicleTypeVO.reconstitute(raw.type),
        status: VehicleStatusVO.reconstitute(raw.status),
        fuelType: VehicleFuelTypeVO.reconstitute(raw.fuelType),
        make: raw.make, model: raw.model, year: raw.year,
        color: raw.color ?? undefined,
        maxWeightKg: toNum(raw.maxWeightKg),
        maxVolumeM3: raw.maxVolumeM3 !== null ? toNum(raw.maxVolumeM3) : undefined,
        capacity: raw.capacity ?? undefined,
        mileageKm: toNum(raw.mileageKm),
        lastServiceAt: toIso(raw.lastServiceAt),
        nextServiceAt: toIso(raw.nextServiceAt),
        insuranceExpiresAt: toIso(raw.insuranceExpiresAt),
        registrationExpiresAt: toIso(raw.registrationExpiresAt),
        assignedDriverId: raw.assignedDriverId ? DriverIdVO.reconstitute(raw.assignedDriverId) : undefined,
        isActive: raw.isActive,
      },
    });
  }

  static toPersistence(entity: VehicleEntity): Record<string, unknown> {
    return {
      id: entity.id,
      registrationNumber: entity.registrationNumber,
      type: entity.type.value,
      status: entity.status.value,
      fuelType: entity.fuelType.value,
      make: entity.make, model: entity.model, year: entity.year,
      color: entity.color ?? null,
      maxWeightKg: entity.maxWeightKg,
      maxVolumeM3: entity.maxVolumeM3 ?? null,
      capacity: entity.capacity ?? null,
      mileageKm: entity.mileageKm,
      lastServiceAt: entity.lastServiceAt ? new Date(entity.lastServiceAt) : null,
      nextServiceAt: entity.nextServiceAt ? new Date(entity.nextServiceAt) : null,
      insuranceExpiresAt: entity.insuranceExpiresAt ? new Date(entity.insuranceExpiresAt) : null,
      registrationExpiresAt: entity.registrationExpiresAt ? new Date(entity.registrationExpiresAt) : null,
      assignedDriverId: entity.assignedDriverId?.value ?? null,
      isActive: entity.isActive,
      version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
