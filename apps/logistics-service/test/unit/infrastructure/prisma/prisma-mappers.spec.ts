/**
 * Prisma mappers — round-trip tests (row → domain → row).
 */
import { describe, it, expect } from '@jest/globals';

import { ShipmentPrismaMapper } from '@infrastructure/persistence/prisma/shipment.prisma.mapper.js';
import { CourierPrismaMapper } from '@infrastructure/persistence/prisma/courier.prisma.mapper.js';
import { WarehousePrismaMapper } from '@infrastructure/persistence/prisma/warehouse.prisma.mapper.js';
import { VehiclePrismaMapper } from '@infrastructure/persistence/prisma/vehicle.prisma.mapper.js';
import { DriverPrismaMapper } from '@infrastructure/persistence/prisma/driver.prisma.mapper.js';
import { ZonePrismaMapper } from '@infrastructure/persistence/prisma/zone.prisma.mapper.js';
import { ShippingMethodPrismaMapper } from '@infrastructure/persistence/prisma/shipping-method.prisma.mapper.js';
import { PackagingPrismaMapper } from '@infrastructure/persistence/prisma/packaging.prisma.mapper.js';
import { DeliveryPrismaMapper } from '@infrastructure/persistence/prisma/delivery.prisma.mapper.js';
import { TrackingPrismaMapper } from '@infrastructure/persistence/prisma/tracking.prisma.mapper.js';

const NOW = new Date('2026-01-15T10:00:00.000Z');
const UUID = '550e8400-e29b-41d4-a716-446655440000';
const UUID2 = '550e8400-e29b-41d4-a716-446655440001';

// ═══════════════════════════════════════════════════════════════
// SHIPMENT
// ═══════════════════════════════════════════════════════════════
const shipmentRow = () => ({
  id: UUID, trackingNumber: 'SHTEST12345678',
  orderId: UUID2, userId: UUID, vendorId: null, warehouseId: UUID2, courierId: UUID,
  type: 'standard', priority: 'normal', status: 'pending',
  shippingLine1: '12 Main St', shippingLine2: null,
  shippingCity: 'Dhaka', shippingState: null,
  shippingDistrict: 'Dhaka', shippingDivision: 'Dhaka',
  shippingPostalCode: '1200', shippingCountry: 'BD',
  shippingLandmark: null,
  shippingLatitude: 23.8, shippingLongitude: 90.4,
  pickupLine1: '1 Warehouse Rd', pickupLine2: null,
  pickupCity: 'Dhaka', pickupState: null, pickupDistrict: null, pickupDivision: null,
  pickupPostalCode: null, pickupCountry: 'BD', pickupLandmark: null,
  customerName: 'Rahim', customerPhone: '+8801712345678', customerEmail: null,
  actualWeightKg: 5, volumetricWeightKg: 3, lengthCm: 10, widthCm: 10, heightCm: 10,
  itemCount: 2, isCOD: false, codAmount: null, isInsured: false, declaredValue: null,
  shippingCost: 100, currency: 'BDT', courierTrackingNumber: null, labelUrl: null,
  estimatedDeliveryAt: null, pickedUpAt: null, deliveredAt: null,
  returnedAt: null, cancelledAt: null, failureReason: null, notes: null,
  version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
});

describe('ShipmentPrismaMapper', () => {
  describe('toDomain', () => {
    it('maps a full row with packages', () => {
      const row = {
        ...shipmentRow(),
        packages: [
          { id: UUID, shipmentId: UUID, orderItemId: UUID2, productId: null, variantId: null,
            sku: 'SKU-1', name: 'Item', quantity: 2, sortOrder: 0, createdAt: NOW },
        ],
      };
      const e = ShipmentPrismaMapper.toDomain(row as never);
      expect(e.id).toBe(UUID);
      expect(e.trackingNumber.value).toBe('SHTEST12345678');
      expect(e.orderId.value).toBe(UUID2);
      expect(e.userId?.value).toBe(UUID);
      expect(e.status.value).toBe('pending');
      expect(e.packages.length).toBe(1);
      expect(e.itemCount).toBe(2);
      expect(e.isCOD).toBe(false);
      expect(e.shippingAddress.toAddress().city).toBe('Dhaka');
      expect(e.pickupAddress?.toAddress().line1).toBe('1 Warehouse Rd');
    });

    it('handles null optional fields (no pickup, no customer, no cod)', () => {
      const row = {
        ...shipmentRow(),
        userId: null, warehouseId: null, courierId: null,
        pickupLine1: null, pickupCity: null, pickupCountry: null,
        customerName: null, customerPhone: null, customerEmail: null,
        shippingLatitude: null, shippingLongitude: null,
        lengthCm: null, widthCm: null, heightCm: null,
        volumetricWeightKg: null, codAmount: null,
        declaredValue: null, shippingCost: null,
        packages: [{ id: UUID, shipmentId: UUID, orderItemId: UUID2, productId: null, variantId: null,
          sku: null, name: null, quantity: 2, sortOrder: 0, createdAt: NOW }],
      };
      const e = ShipmentPrismaMapper.toDomain(row as never);
      expect(e.userId).toBeUndefined();
      expect(e.pickupAddress).toBeUndefined();
      expect(e.customer).toBeUndefined();
      expect(e.codAmount).toBeUndefined();
    });

    it('handles COD + insured shipment', () => {
      const row = {
        ...shipmentRow(),
        isCOD: true, codAmount: 500, isInsured: true, declaredValue: 5000,
        shippingCost: 150,
        packages: [{ id: UUID, shipmentId: UUID, orderItemId: UUID2, productId: null, variantId: null,
          sku: null, name: null, quantity: 2, sortOrder: 0, createdAt: NOW }],
      };
      const e = ShipmentPrismaMapper.toDomain(row as never);
      expect(e.isCOD).toBe(true);
      expect(e.codAmount?.amount).toBe(500);
      expect(e.isInsured).toBe(true);
      expect(e.declaredValue?.amount).toBe(5000);
    });

    it('handles Decimal-like objects (toNumber method)', () => {
      const row = {
        ...shipmentRow(),
        actualWeightKg: { toNumber: () => 5.5 },
        volumetricWeightKg: null, lengthCm: null, widthCm: null, heightCm: null,
        codAmount: null, declaredValue: null, shippingCost: { toNumber: () => 99.99 },
        packages: [{ id: UUID, shipmentId: UUID, orderItemId: UUID2, productId: null, variantId: null,
          sku: null, name: null, quantity: 2, sortOrder: 0, createdAt: NOW }],
      };
      const e = ShipmentPrismaMapper.toDomain(row as never);
      expect(e.dimensions.actualWeightKg.value).toBe(5.5);
    });

    it('handles Date → ISO conversion for timestamps', () => {
      const row = {
        ...shipmentRow(),
        deliveredAt: NOW, pickedUpAt: NOW,
        packages: [{ id: UUID, shipmentId: UUID, orderItemId: UUID2, productId: null, variantId: null,
          sku: null, name: null, quantity: 2, sortOrder: 0, createdAt: NOW }],
      };
      const e = ShipmentPrismaMapper.toDomain(row as never);
      expect(e.deliveredAt).toBeDefined();
      expect(e.pickedUpAt).toBeDefined();
    });

    it('sorts packages by sortOrder', () => {
      const row = {
        ...shipmentRow(),
        packages: [
          { id: UUID, shipmentId: UUID, orderItemId: 'b', productId: null, variantId: null,
            sku: null, name: null, quantity: 1, sortOrder: 1, createdAt: NOW },
          { id: UUID2, shipmentId: UUID, orderItemId: 'a', productId: null, variantId: null,
            sku: null, name: null, quantity: 1, sortOrder: 0, createdAt: NOW },
        ],
      };
      const e = ShipmentPrismaMapper.toDomain(row as never);
      expect(e.packages[0]!.orderItemId).toBe('a');
    });
  });

  describe('toPersistence', () => {
    it('maps a domain entity back to a persistence row', () => {
      const row = { ...shipmentRow(), packages: [
        { id: UUID, shipmentId: UUID, orderItemId: UUID2, productId: null, variantId: null,
          sku: 'S1', name: 'N', quantity: 2, sortOrder: 0, createdAt: NOW },
      ]};
      const e = ShipmentPrismaMapper.toDomain(row as never);
      const p = ShipmentPrismaMapper.toPersistence(e) as Record<string, unknown>;
      expect(p['id']).toBe(UUID);
      expect(p['trackingNumber']).toBe('SHTEST12345678');
      expect(p['type']).toBe('standard');
      expect(p['status']).toBe('pending');
      expect(p['shippingLine1']).toBe('12 Main St');
      expect(p['currency']).toBe('BDT');
      expect((p['packages'] as Record<string, unknown>)['create']).toBeDefined();
    });

    it('handles optional null fields', () => {
      const row = { ...shipmentRow(),
        packages: [{ id: UUID, shipmentId: UUID, orderItemId: UUID2, productId: null, variantId: null,
          sku: null, name: null, quantity: 2, sortOrder: 0, createdAt: NOW }],
      };
      const e = ShipmentPrismaMapper.toDomain(row as never);
      const p = ShipmentPrismaMapper.toPersistence(e) as Record<string, unknown>;
      expect(p['userId']).toBe(UUID);
      expect(p['vendorId']).toBeNull();
    });
  });
});

// ═══════════════════════════════════════════════════════════════
// COURIER
// ═══════════════════════════════════════════════════════════════
const courierRow = () => ({
  id: UUID, code: 'pathao', name: 'Pathao', displayName: 'Pathao Courier',
  type: 'local', status: 'active',
  logoUrl: null, website: null, contactPhone: null, contactEmail: null,
  trackingUrlTemplate: null, apiEnabled: true,
  apiBaseUrl: 'https://api.pathao.com', apiKeyName: 'PATHAO_KEY',
  webhookSecretName: null, apiTimeoutMs: 30000, retryAttempts: 3,
  coverageZones: ['dhaka'], supportsCOD: true, supportsInsurance: false,
  supportsInternational: false, averageDeliveryDays: 3,
  isDefault: true, priority: 50, version: 0,
  createdAt: NOW, updatedAt: NOW, deletedAt: null,
});

describe('CourierPrismaMapper', () => {
  it('toDomain — full row with config', () => {
    const e = CourierPrismaMapper.toDomain(courierRow() as never);
    expect(e.id).toBe(UUID);
    expect(e.code.value).toBe('pathao');
    expect(e.name).toBe('Pathao');
    expect(e.status.value).toBe('active');
    expect(e.isDefault).toBe(true);
    expect(e.supportsCOD).toBe(true);
    expect(e.apiEnabled).toBe(true);
    expect(e.config?.baseUrl).toBe('https://api.pathao.com');
  });

  it('toDomain — no config when no baseUrl', () => {
    const row = { ...courierRow(), apiEnabled: false, apiBaseUrl: null, apiKeyName: null };
    const e = CourierPrismaMapper.toDomain(row as never);
    expect(e.config).toBeUndefined();
  });

  it('toPersistence — full round-trip', () => {
    const e = CourierPrismaMapper.toDomain(courierRow() as never);
    const p = CourierPrismaMapper.toPersistence(e) as Record<string, unknown>;
    expect(p['code']).toBe('pathao');
    expect(p['apiBaseUrl']).toBe('https://api.pathao.com');
    expect(p['isDefault']).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════
// WAREHOUSE
// ═══════════════════════════════════════════════════════════════
const warehouseRow = () => ({
  id: UUID, code: 'WH-01', name: 'Main Warehouse', type: 'main', status: 'active',
  zone: 'dhaka',
  addressLine1: '1 Warehouse Rd', addressLine2: null,
  addressCity: 'Dhaka', addressState: null,
  addressDistrict: null, addressDivision: null,
  addressPostalCode: null, addressCountry: 'BD',
  latitude: 23.8, longitude: 90.4,
  contactName: 'Manager', contactPhone: null, contactEmail: null,
  managerId: null,
  capacityM3: 1000, usedM3: 300, capacityKg: 10000, usedKg: 3000,
  maxSkus: 100, operatingHoursStart: 8, operatingHoursEnd: 22,
  timezone: 'Asia/Dhaka', isDefault: true, version: 0,
  createdAt: NOW, updatedAt: NOW, deletedAt: null,
});

describe('WarehousePrismaMapper', () => {
  it('toDomain', () => {
    const e = WarehousePrismaMapper.toDomain(warehouseRow() as never);
    expect(e.id).toBe(UUID);
    expect(e.code.value).toBe('WH-01');
    expect(e.name).toBe('Main Warehouse');
    expect(e.status.value).toBe('active');
    expect(e.capacity.capacityM3).toBe(1000);
    expect(e.capacity.usedM3).toBe(300);
    expect(e.capacity.availableM3).toBe(700);
    expect(e.address.toAddress().city).toBe('Dhaka');
    expect(e.isDefault).toBe(true);
  });

  it('toDomain — Decimal objects', () => {
    const row = {
      ...warehouseRow(),
      capacityM3: { toNumber: () => 2000 },
      usedM3: { toNumber: () => 500 },
    };
    const e = WarehousePrismaMapper.toDomain(row as never);
    expect(e.capacity.capacityM3).toBe(2000);
  });

  it('toPersistence', () => {
    const e = WarehousePrismaMapper.toDomain(warehouseRow() as never);
    const p = WarehousePrismaMapper.toPersistence(e) as Record<string, unknown>;
    expect(p['code']).toBe('WH-01');
    expect(p['capacityM3']).toBe(1000);
    expect(p['isDefault']).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════
// VEHICLE
// ═══════════════════════════════════════════════════════════════
const vehicleRow = () => ({
  id: UUID, registrationNumber: 'DHK-1234', type: 'motorcycle', status: 'available',
  fuelType: 'petrol', make: 'Honda', model: 'CB', year: 2024, color: 'Red',
  maxWeightKg: 100, maxVolumeM3: 1, capacity: 2, mileageKm: 5000,
  lastServiceAt: NOW, nextServiceAt: NOW,
  insuranceExpiresAt: NOW, registrationExpiresAt: NOW,
  assignedDriverId: null, isActive: true, version: 0,
  createdAt: NOW, updatedAt: NOW, deletedAt: null,
});

describe('VehiclePrismaMapper', () => {
  it('toDomain', () => {
    const e = VehiclePrismaMapper.toDomain(vehicleRow() as never);
    expect(e.registrationNumber).toBe('DHK-1234');
    expect(e.type.value).toBe('motorcycle');
    expect(e.maxWeightKg).toBe(100);
    expect(e.isActive).toBe(true);
  });

  it('toDomain — assigned driver', () => {
    const row = { ...vehicleRow(), assignedDriverId: UUID };
    const e = VehiclePrismaMapper.toDomain(row as never);
    expect(e.assignedDriverId?.value).toBe(UUID);
  });

  it('toPersistence', () => {
    const e = VehiclePrismaMapper.toDomain(vehicleRow() as never);
    const p = VehiclePrismaMapper.toPersistence(e) as Record<string, unknown>;
    expect(p['registrationNumber']).toBe('DHK-1234');
    expect(p['maxWeightKg']).toBe(100);
  });
});

// ═══════════════════════════════════════════════════════════════
// DRIVER
// ═══════════════════════════════════════════════════════════════
const driverRow = () => ({
  id: UUID, userId: UUID2, name: 'Karim', phone: '+8801712345678', email: null,
  status: 'available', type: 'full_time',
  licenseNumber: 'L-12345', licenseType: 'motorcycle',
  licenseExpiresAt: NOW, dateOfBirth: null, address: null,
  vehicleId: null, warehouseId: null, rating: 4.5,
  totalDeliveries: 100, totalDistanceKm: 5000,
  cashLimit: 10000, cashInHand: 500, isAvailable: true,
  lastActiveAt: NOW, version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
});

describe('DriverPrismaMapper', () => {
  it('toDomain', () => {
    const e = DriverPrismaMapper.toDomain(driverRow() as never);
    expect(e.name).toBe('Karim');
    expect(e.status.value).toBe('available');
    expect(e.rating).toBe(4.5);
    expect(e.totalDeliveries).toBe(100);
    expect(e.cashInHand).toBe(500);
  });

  it('toDomain — Decimal rating', () => {
    const row = { ...driverRow(), rating: { toNumber: () => 4.7 }, cashLimit: { toNumber: () => 20000 } };
    const e = DriverPrismaMapper.toDomain(row as never);
    expect(e.rating).toBe(4.7);
  });

  it('toPersistence', () => {
    const e = DriverPrismaMapper.toDomain(driverRow() as never);
    const p = DriverPrismaMapper.toPersistence(e) as Record<string, unknown>;
    expect(p['name']).toBe('Karim');
    expect(p['licenseNumber']).toBe('L-12345');
  });
});

// ═══════════════════════════════════════════════════════════════
// ZONE
// ═══════════════════════════════════════════════════════════════
const zoneRow = () => ({
  id: UUID, name: 'Dhaka', code: 'DHK', type: 'district', status: 'active',
  pricingType: 'flat', parentId: null,
  postalCodes: ['1200'], districts: ['Dhaka'], divisions: ['Dhaka'],
  shippingCost: 60, currency: 'BDT', minDeliveryDays: 1, maxDeliveryDays: 3,
  codEnabled: true, codCharge: 20, codMaxAmount: 50000,
  isRemote: false, isActive: true, version: 0,
  createdAt: NOW, updatedAt: NOW, deletedAt: null,
});

describe('ZonePrismaMapper', () => {
  it('toDomain', () => {
    const e = ZonePrismaMapper.toDomain(zoneRow() as never);
    expect(e.name).toBe('Dhaka');
    expect(e.code).toBe('DHK');
    expect(e.shippingCost.amount).toBe(60);
    expect(e.codEnabled).toBe(true);
    expect(e.postalCodes).toEqual(['1200']);
  });

  it('toPersistence', () => {
    const e = ZonePrismaMapper.toDomain(zoneRow() as never);
    const p = ZonePrismaMapper.toPersistence(e) as Record<string, unknown>;
    expect(p['name']).toBe('Dhaka');
    expect(p['shippingCost']).toBe(60);
  });
});

// ═══════════════════════════════════════════════════════════════
// SHIPPING METHOD
// ═══════════════════════════════════════════════════════════════
const smRow = () => ({
  id: UUID, name: 'Standard', code: 'standard', displayName: 'Standard Delivery',
  status: 'active', rateType: 'flat', baseCost: 60, freeAbove: 1000, currency: 'BDT',
  minDeliveryDays: 1, maxDeliveryDays: 3, maxWeightKg: 500, maxDimensionsCm: 300,
  codEnabled: true, trackingEnabled: true,
  coverageZones: ['dhaka'], couriers: ['pathao'],
  isDefault: true, isActive: true, version: 0,
  createdAt: NOW, updatedAt: NOW, deletedAt: null,
});

describe('ShippingMethodPrismaMapper', () => {
  it('toDomain', () => {
    const e = ShippingMethodPrismaMapper.toDomain(smRow() as never);
    expect(e.name).toBe('Standard');
    expect(e.baseCost.amount).toBe(60);
    expect(e.freeAbove?.amount).toBe(1000);
    expect(e.codEnabled).toBe(true);
    expect(e.isDefault).toBe(true);
  });

  it('toDomain — no freeAbove', () => {
    const row = { ...smRow(), freeAbove: null, maxWeightKg: null };
    const e = ShippingMethodPrismaMapper.toDomain(row as never);
    expect(e.freeAbove).toBeUndefined();
    expect(e.maxWeightKg).toBeUndefined();
  });

  it('toPersistence', () => {
    const e = ShippingMethodPrismaMapper.toDomain(smRow() as never);
    const p = ShippingMethodPrismaMapper.toPersistence(e) as Record<string, unknown>;
    expect(p['code']).toBe('standard');
    expect(p['baseCost']).toBe(60);
  });
});

// ═══════════════════════════════════════════════════════════════
// PACKAGING
// ═══════════════════════════════════════════════════════════════
const pkgRow = () => ({
  id: UUID, name: 'Small Box', code: 'BOX-S', type: 'box', material: 'cardboard',
  status: 'active', lengthCm: 10, widthCm: 10, heightCm: 10, maxWeightKg: 5,
  cost: 20, currency: 'BDT', imageUrl: null,
  isFragile: false, isTemperatureControlled: false, isRecyclable: true,
  stock: 100, isDefault: true, version: 0,
  createdAt: NOW, updatedAt: NOW, deletedAt: null,
});

describe('PackagingPrismaMapper', () => {
  it('toDomain', () => {
    const e = PackagingPrismaMapper.toDomain(pkgRow() as never);
    expect(e.name).toBe('Small Box');
    expect(e.type.value).toBe('box');
    expect(e.material.value).toBe('cardboard');
    expect(e.dimensions.lengthCm).toBe(10);
    expect(e.stock).toBe(100);
    expect(e.cost?.amount).toBe(20);
  });

  it('toDomain — no cost', () => {
    const row = { ...pkgRow(), cost: null, currency: null };
    const e = PackagingPrismaMapper.toDomain(row as never);
    expect(e.cost).toBeUndefined();
  });

  it('toPersistence', () => {
    const e = PackagingPrismaMapper.toDomain(pkgRow() as never);
    const p = PackagingPrismaMapper.toPersistence(e) as Record<string, unknown>;
    expect(p['code']).toBe('BOX-S');
    expect(p['lengthCm']).toBe(10);
  });
});

// ═══════════════════════════════════════════════════════════════
// DELIVERY
// ═══════════════════════════════════════════════════════════════
const deliveryRow = () => ({
  id: UUID, shipmentId: UUID2, orderId: UUID, userId: null,
  status: 'scheduled', type: 'standard',
  driverId: null, vehicleId: null, routeId: null,
  recipientName: 'Rahim', recipientPhone: '+8801712345678',
  deliveryLine1: '12 Main', deliveryLine2: null,
  deliveryCity: 'Dhaka', deliveryState: null,
  deliveryDistrict: null, deliveryDivision: null,
  deliveryPostalCode: null, deliveryCountry: 'BD', deliveryLandmark: null,
  latitude: 23.8, longitude: 90.4,
  scheduledAt: NOW, pickedUpAt: null, arrivedAt: null,
  deliveredAt: null, failedAt: null, cancelledAt: null,
  proofType: null, proofSignatureUrl: null, proofPhotoUrl: null,
  proofOtp: null, proofIdNumber: null, proofRecipientName: null,
  proofCapturedAt: null, notes: null, version: 0,
  createdAt: NOW, updatedAt: NOW, deletedAt: null,
  attempts: [] as readonly never[],
});

describe('DeliveryPrismaMapper', () => {
  it('toDomain — minimal', () => {
    const e = DeliveryPrismaMapper.toDomain(deliveryRow() as never);
    expect(e.shipmentId.value).toBe(UUID2);
    expect(e.status.value).toBe('scheduled');
    expect(e.attemptCount).toBe(0);
    expect(e.recipientName).toBe('Rahim');
  });

  it('toDomain — with attempts (sorted)', () => {
    const row = {
      ...deliveryRow(),
      status: 'failed',
      attempts: [
        { id: UUID, deliveryId: UUID, attemptNumber: 2, status: 'failed', reason: 'x',
          driverId: null, location: null, latitude: null, longitude: null,
          images: [], notes: null, attemptedAt: NOW, createdAt: NOW },
        { id: UUID2, deliveryId: UUID, attemptNumber: 1, status: 'failed', reason: 'y',
          driverId: null, location: null, latitude: null, longitude: null,
          images: [], notes: null, attemptedAt: NOW, createdAt: NOW },
      ],
    };
    const e = DeliveryPrismaMapper.toDomain(row as never);
    expect(e.attemptCount).toBe(2);
    expect(e.attempts[0]!.attemptNumber.value).toBe(1);
  });

  it('toDomain — with proof', () => {
    const row = {
      ...deliveryRow(),
      status: 'delivered',
      deliveredAt: NOW,
      proofType: 'signature', proofSignatureUrl: 'http://sig.png', proofCapturedAt: NOW,
    };
    const e = DeliveryPrismaMapper.toDomain(row as never);
    expect(e.proofOfDelivery).toBeDefined();
    expect(e.proofOfDelivery?.type).toBe('signature');
  });

  it('toPersistence', () => {
    const e = DeliveryPrismaMapper.toDomain(deliveryRow() as never);
    const p = DeliveryPrismaMapper.toPersistence(e) as Record<string, unknown>;
    expect(p['shipmentId']).toBe(UUID2);
    expect(p['status']).toBe('scheduled');
    expect(p['deliveryLine1']).toBe('12 Main');
  });
});

// ═══════════════════════════════════════════════════════════════
// TRACKING
// ═══════════════════════════════════════════════════════════════
const trackingRow = () => ({
  id: UUID, trackingNumber: 'SHTEST12345678',
  shipmentId: UUID2, orderId: UUID, courierCode: 'pathao',
  status: 'active', currentLocation: 'Dhaka',
  estimatedDeliveryAt: NOW, publicAccess: true, lastUpdatedAt: NOW,
  version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
  events: [] as readonly never[],
});

describe('TrackingPrismaMapper', () => {
  it('toDomain — minimal', () => {
    const e = TrackingPrismaMapper.toDomain(trackingRow() as never);
    expect(e.trackingNumber.value).toBe('SHTEST12345678');
    expect(e.status.value).toBe('active');
    expect(e.publicAccess).toBe(true);
    expect(e.eventCount).toBe(0);
  });

  it('toDomain — with events', () => {
    const row = {
      ...trackingRow(),
      events: [
        { id: UUID, trackingId: UUID, shipmentId: null, orderId: null,
          event: 'picked_up', status: 'active', source: 'internal',
          message: 'Picked up', location: 'Dhaka', latitude: null, longitude: null,
          occurredAt: NOW, receivedAt: NOW, metadata: null, createdAt: NOW },
      ],
    };
    const e = TrackingPrismaMapper.toDomain(row as never);
    expect(e.eventCount).toBe(1);
    expect(e.currentEvent?.event.value).toBe('picked_up');
  });

  it('toDomain — with metadata', () => {
    const row = {
      ...trackingRow(),
      events: [
        { id: UUID, trackingId: UUID, shipmentId: null, orderId: null,
          event: 'in_transit', status: 'active', source: 'webhook',
          message: 'Moved', location: null, latitude: null, longitude: null,
          occurredAt: NOW, receivedAt: NOW, metadata: { key: 'value' }, createdAt: NOW },
      ],
    };
    const e = TrackingPrismaMapper.toDomain(row as never);
    expect(e.eventCount).toBe(1);
  });

  it('toPersistence', () => {
    const e = TrackingPrismaMapper.toDomain(trackingRow() as never);
    const p = TrackingPrismaMapper.toPersistence(e) as Record<string, unknown>;
    expect(p['trackingNumber']).toBe('SHTEST12345678');
    expect(p['status']).toBe('active');
  });
});
