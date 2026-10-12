/**
 * VehiclePrismaMapper — round-trip।
 */
import { describe, it, expect } from '@jest/globals';
import { VehiclePrismaMapper } from '@infrastructure/persistence/prisma/vehicle.prisma.mapper.js';
import type { PrismaVehicleRow } from '@infrastructure/persistence/prisma/vehicle.prisma.mapper.js';

const NOW = new Date('2026-05-01T10:00:00.000Z');

function row(): PrismaVehicleRow {
  return {
    id: 'v-1', registrationNumber: 'DHK-1234', type: 'truck_small', status: 'available',
    fuelType: 'diesel', make: 'Toyota', model: 'Hilux', year: 2020, color: null,
    maxWeightKg: 1500, maxVolumeM3: 10, capacity: 5, mileageKm: 50000,
    lastServiceAt: null, nextServiceAt: null,
    insuranceExpiresAt: null, registrationExpiresAt: null,
    assignedDriverId: null, isActive: true,
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
  };
}

describe('VehiclePrismaMapper', () => {
  it('toDomain minimal', () => {
    const e = VehiclePrismaMapper.toDomain(row());
    expect(e.id).toBe('v-1');
    expect(e.registrationNumber).toBe('DHK-1234');
    expect(e.type.value).toBe('truck_small');
    expect(e.status.value).toBe('available');
    expect(e.fuelType.value).toBe('diesel');
    expect(e.maxWeightKg).toBe(1500);
    expect(e.mileageKm).toBe(50000);
  });

  it('toDomain full optional', () => {
    const r = row();
    Object.assign(r, {
      color: 'White',
      lastServiceAt: NOW, nextServiceAt: NOW,
      insuranceExpiresAt: NOW, registrationExpiresAt: NOW,
      assignedDriverId: '880e8400-e29b-41d4-a716-446655440000',
    });
    const e = VehiclePrismaMapper.toDomain(r);
    expect(e.color).toBe('White');
    expect(e.lastServiceAt).toBe('2026-05-01T10:00:00.000Z');
    expect(e.assignedDriverId?.value).toBe('880e8400-e29b-41d4-a716-446655440000');
  });

  it('toPersistence round-trip', () => {
    const e = VehiclePrismaMapper.toDomain(row());
    const p = VehiclePrismaMapper.toPersistence(e);
    expect(p['id']).toBe('v-1');
    expect(p['registrationNumber']).toBe('DHK-1234');
    expect(p['maxWeightKg']).toBe(1500);
    expect(p['mileageKm']).toBe(50000);
    expect(p['type']).toBe('truck_small');
  });

  it('toPersistence null optionals', () => {
    const e = VehiclePrismaMapper.toDomain(row());
    const p = VehiclePrismaMapper.toPersistence(e);
    expect(p['color']).toBeNull();
    expect(p['assignedDriverId']).toBeNull();
    expect(p['lastServiceAt']).toBeNull();
  });
});
