/**
 * WarehousePrismaMapper — round-trip।
 */
import { describe, it, expect } from '@jest/globals';
import { WarehousePrismaMapper } from '@infrastructure/persistence/prisma/warehouse.prisma.mapper.js';
import type { PrismaWarehouseRow } from '@infrastructure/persistence/prisma/warehouse.prisma.mapper.js';

const NOW = new Date('2026-05-01T10:00:00.000Z');

function row(): PrismaWarehouseRow {
  return {
    id: 'w-1', code: 'WH-01', name: 'Main Warehouse', type: 'main', status: 'active',
    zone: 'z1',
    addressLine1: '12 Depot Rd', addressLine2: null, addressCity: 'Dhaka',
    addressState: null, addressDistrict: null, addressDivision: null,
    addressPostalCode: '1207', addressCountry: 'BD',
    latitude: null, longitude: null,
    contactName: null, contactPhone: null, contactEmail: null,
    managerId: null,
    capacityM3: 1000, usedM3: 300, capacityKg: 10000, usedKg: 2000,
    maxSkus: 5000,
    operatingHoursStart: 8, operatingHoursEnd: 20,
    timezone: 'Asia/Dhaka', isDefault: false,
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
  };
}

describe('WarehousePrismaMapper', () => {
  it('toDomain minimal', () => {
    const e = WarehousePrismaMapper.toDomain(row());
    expect(e.id).toBe('w-1');
    expect(e.code.value).toBe('WH-01');
    expect(e.type.value).toBe('main');
    expect(e.status.value).toBe('active');
    expect(e.capacity.capacityM3).toBe(1000);
    expect(e.capacity.usedM3).toBe(300);
    // utilizationPercent = weight-based (usedKg / capacityKg = 2000/10000 = 20)
    expect(e.utilizationPercent.value).toBe(20);
    expect(e.address.toAddress().city).toBe('Dhaka');
  });

  it('toDomain full optional', () => {
    const r = row();
    Object.assign(r, {
      addressLine2: 'Apt A', addressState: 'Dhaka', addressDistrict: 'Dhaka',
      addressDivision: 'Dhaka',
      latitude: 23.8, longitude: 90.4,
      contactName: 'Rahim', contactPhone: '+8801712345678', contactEmail: 'r@x.com',
      managerId: '880e8400-e29b-41d4-a716-446655440000',
      isDefault: true,
    });
    const e = WarehousePrismaMapper.toDomain(r);
    expect(e.contactName).toBe('Rahim');
    expect(e.managerId).toBeDefined();
    expect(e.isDefault).toBe(true);
    expect(e.address.hasGeoCoordinates()).toBe(true);
  });

  it('toPersistence round-trip', () => {
    const e = WarehousePrismaMapper.toDomain(row());
    const p = WarehousePrismaMapper.toPersistence(e);
    expect(p['id']).toBe('w-1');
    expect(p['code']).toBe('WH-01');
    expect(p['capacityM3']).toBe(1000);
    expect(p['usedM3']).toBe(300);
    expect(p['addressLine1']).toBe('12 Depot Rd');
    expect(p['addressCountry']).toBe('BD');
  });

  it('toPersistence nullable fields', () => {
    const e = WarehousePrismaMapper.toDomain(row());
    const p = WarehousePrismaMapper.toPersistence(e);
    expect(p['contactName']).toBeNull();
    expect(p['latitude']).toBeNull();
    expect(p['managerId']).toBeNull();
  });
});
