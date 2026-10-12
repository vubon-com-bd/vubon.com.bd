/**
 * DriverPrismaMapper — round-trip।
 */
import { describe, it, expect } from '@jest/globals';
import { DriverPrismaMapper } from '@infrastructure/persistence/prisma/driver.prisma.mapper.js';
import type { PrismaDriverRow } from '@infrastructure/persistence/prisma/driver.prisma.mapper.js';

const NOW = new Date('2026-05-01T10:00:00.000Z');

function row(): PrismaDriverRow {
  return {
    id: 'd-1', userId: null, name: 'Rahim', phone: '+8801712345678', email: null,
    status: 'available', type: 'full_time',
    licenseNumber: 'DL-123', licenseType: 'heavy',
    licenseExpiresAt: NOW, dateOfBirth: null, address: null,
    vehicleId: null, warehouseId: null, rating: null,
    totalDeliveries: 100, totalDistanceKm: 5000,
    cashLimit: 50000, cashInHand: 0,
    isAvailable: true, lastActiveAt: null,
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
  };
}

describe('DriverPrismaMapper', () => {
  it('toDomain minimal', () => {
    const e = DriverPrismaMapper.toDomain(row());
    expect(e.id).toBe('d-1');
    expect(e.name).toBe('Rahim');
    expect(e.status.value).toBe('available');
    expect(e.type.value).toBe('full_time');
    expect(e.licenseType.value).toBe('heavy');
    expect(e.totalDeliveries).toBe(100);
    expect(e.cashInHand).toBe(0);
  });

  it('toDomain with all optionals', () => {
    const r = row();
    Object.assign(r, {
      userId: '770e8400-e29b-41d4-a716-446655440000',
      email: 'r@x.com',
      dateOfBirth: NOW,
      address: '12 Main St',
      vehicleId: '990e8400-e29b-41d4-a716-446655440000',
      warehouseId: 'aa0e8400-e29b-41d4-a716-446655440000',
      rating: 4.5,
      cashInHand: 1000,
      lastActiveAt: NOW,
    });
    const e = DriverPrismaMapper.toDomain(r);
    expect(e.userId).toBe('770e8400-e29b-41d4-a716-446655440000');
    expect(e.email).toBe('r@x.com');
    expect(e.rating).toBe(4.5);
    expect(e.cashInHand).toBe(1000);
    expect(e.vehicleId?.value).toBe('990e8400-e29b-41d4-a716-446655440000');
    expect(e.lastActiveAt).toBe('2026-05-01T10:00:00.000Z');
  });

  it('toPersistence round-trip', () => {
    const e = DriverPrismaMapper.toDomain(row());
    const p = DriverPrismaMapper.toPersistence(e);
    expect(p['id']).toBe('d-1');
    expect(p['name']).toBe('Rahim');
    expect(p['licenseNumber']).toBe('DL-123');
    expect(p['totalDistanceKm']).toBe(5000);
    expect(p['cashLimit']).toBe(50000);
  });

  it('toPersistence null optionals', () => {
    const e = DriverPrismaMapper.toDomain(row());
    const p = DriverPrismaMapper.toPersistence(e);
    expect(p['userId']).toBeNull();
    expect(p['email']).toBeNull();
    expect(p['rating']).toBeNull();
    expect(p['lastActiveAt']).toBeNull();
  });
});
