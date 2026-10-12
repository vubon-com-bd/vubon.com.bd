/**
 * ShipmentPrismaMapper — round-trip Row ↔ Entity।
 */
import { describe, it, expect } from '@jest/globals';
import { ShipmentPrismaMapper } from '@infrastructure/persistence/prisma/shipment.prisma.mapper.js';
import type { PrismaShipmentRowWithPackages } from '@infrastructure/persistence/prisma/shipment.prisma.mapper.js';

const ISO = '2026-05-01T10:00:00.000Z';
const NOW = new Date(ISO);

function baseRow(): PrismaShipmentRowWithPackages {
  return {
    id: '550e8400-e29b-41d4-a716-446655440000',
    trackingNumber: 'SHTEST00000001',
    orderId: '660e8400-e29b-41d4-a716-446655440000',
    userId: '770e8400-e29b-41d4-a716-446655440000',
    vendorId: null,
    warehouseId: null,
    courierId: null,
    type: 'standard',
    priority: 'normal',
    status: 'pending',
    shippingLine1: '12 Main St',
    shippingLine2: null,
    shippingCity: 'Dhaka',
    shippingState: null,
    shippingDistrict: null,
    shippingDivision: null,
    shippingPostalCode: '1207',
    shippingCountry: 'BD',
    shippingLandmark: null,
    shippingLatitude: null,
    shippingLongitude: null,
    pickupLine1: null,
    pickupLine2: null,
    pickupCity: null,
    pickupState: null,
    pickupDistrict: null,
    pickupDivision: null,
    pickupPostalCode: null,
    pickupCountry: null,
    pickupLandmark: null,
    customerName: null,
    customerPhone: null,
    customerEmail: null,
    actualWeightKg: 2,
    volumetricWeightKg: null,
    lengthCm: null,
    widthCm: null,
    heightCm: null,
    itemCount: 2,
    isCOD: false,
    codAmount: null,
    isInsured: false,
    declaredValue: null,
    shippingCost: null,
    currency: 'BDT',
    courierTrackingNumber: null,
    labelUrl: null,
    estimatedDeliveryAt: null,
    pickedUpAt: null,
    deliveredAt: null,
    returnedAt: null,
    cancelledAt: null,
    failureReason: null,
    notes: null,
    version: 0,
    createdAt: NOW,
    updatedAt: NOW,
    deletedAt: null,
    packages: [{
      id: 'p1', shipmentId: '550e8400-e29b-41d4-a716-446655440000',
      orderItemId: 'oi1', productId: 'prod-1', variantId: null,
      sku: 'SKU-1', name: 'Item 1', quantity: 2, sortOrder: 0, createdAt: NOW,
    }],
  };
}

describe('ShipmentPrismaMapper.toDomain()', () => {
  it('minimal row → entity', () => {
    const e = ShipmentPrismaMapper.toDomain(baseRow());
    expect(e.id).toBe('550e8400-e29b-41d4-a716-446655440000');
    expect(e.trackingNumber.value).toBe('SHTEST00000001');
    expect(e.status.value).toBe('pending');
    expect(e.type.value).toBe('standard');
    expect(e.priority.value).toBe('normal');
    expect(e.packages.length).toBe(1);
    expect(e.packages[0].quantity).toBe(2);
    expect(e.shippingAddress.toAddress().city).toBe('Dhaka');
  });

  it('full row with all optional fields', () => {
    const row = baseRow();
    Object.assign(row, {
      vendorId: '880e8400-e29b-41d4-a716-446655440000',
      warehouseId: '990e8400-e29b-41d4-a716-446655440000',
      courierId: 'aa0e8400-e29b-41d4-a716-446655440000',
      shippingLine2: 'Apt 2',
      shippingState: 'Dhaka',
      shippingDistrict: 'Dhaka',
      shippingDivision: 'Dhaka',
      shippingLandmark: 'Near Park',
      shippingLatitude: 23.8, shippingLongitude: 90.4,
      pickupLine1: '99 Office St', pickupCity: 'Dhaka', pickupCountry: 'BD',
      customerName: 'Rahim', customerPhone: '+8801712345678', customerEmail: 'r@x.com',
      volumetricWeightKg: 5, lengthCm: 50, widthCm: 40, heightCm: 30,
      isCOD: true, codAmount: 500,
      isInsured: true, declaredValue: 2000,
      shippingCost: 100,
      courierTrackingNumber: 'CT-1', labelUrl: 'https://label/x.pdf',
      estimatedDeliveryAt: new Date('2026-05-03T10:00:00Z'),
      pickedUpAt: NOW, deliveredAt: NOW, returnedAt: NOW, cancelledAt: NOW,
      failureReason: 'x', notes: 'priority note',
    });
    const e = ShipmentPrismaMapper.toDomain(row);
    expect(e.vendorId?.value).toBe('880e8400-e29b-41d4-a716-446655440000');
    expect(e.warehouseId?.value).toBe('990e8400-e29b-41d4-a716-446655440000');
    expect(e.courierId?.value).toBe('aa0e8400-e29b-41d4-a716-446655440000');
    expect(e.customer?.name).toBe('Rahim');
    expect(e.dimensions.dimensions).toBeDefined();
    expect(e.codAmount?.amount).toBe(500);
    expect(e.declaredValue?.amount).toBe(2000);
    expect(e.shippingCost?.amount).toBe(100);
    expect(e.labelUrl).toBe('https://label/x.pdf');
    expect(e.pickedUpAt).toBe(ISO);
    expect(e.notes?.value).toBe('priority note');
    expect(e.pickupAddress).toBeDefined();
  });

  it('multi packages sorted by sortOrder', () => {
    const row = baseRow();
    row.packages = [
      { ...row.packages[0], id: 'p2', quantity: 1, sortOrder: 2, sku: 'B' },
      { ...row.packages[0], id: 'p1', quantity: 3, sortOrder: 0, sku: 'A' },
    ];
    // itemCount must equal sum of package quantities (1 + 3 = 4)
    row.itemCount = 4;
    const e = ShipmentPrismaMapper.toDomain(row);
    expect(e.packages[0].sku).toBe('A');
    expect(e.packages[1].sku).toBe('B');
    expect(e.itemCount).toBe(4);
  });
});

describe('ShipmentPrismaMapper.toPersistence()', () => {
  it('round-trip preserves key fields', () => {
    const row = baseRow();
    const e = ShipmentPrismaMapper.toDomain(row);
    const p = ShipmentPrismaMapper.toPersistence(e);
    expect(p['id']).toBe(row.id);
    expect(p['trackingNumber']).toBe(row.trackingNumber);
    expect(p['status']).toBe('pending');
    expect(p['shippingLine1']).toBe('12 Main St');
    expect(p['shippingCity']).toBe('Dhaka');
    expect(p['shippingCountry']).toBe('BD');
    expect(p['packages']).toHaveProperty('create');
  });

  it('handles nullables', () => {
    const row = baseRow();
    const e = ShipmentPrismaMapper.toDomain(row);
    const p = ShipmentPrismaMapper.toPersistence(e);
    expect(p['userId']).toBe(row.userId);
    expect(p['vendorId']).toBeNull();
    expect(p['pickupLine1']).toBeNull();
    expect(p['notes']).toBeNull();
  });
});
