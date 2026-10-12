/**
 * Round-trip tests for remaining 10 Prisma mappers.
 * Two variants per mapper: full-row + nullable-row → covers optional branches.
 */
import { describe, it, expect } from '@jest/globals';

import { ZonePrismaMapper } from '@infrastructure/persistence/prisma/zone.prisma.mapper.js';
import { ShippingMethodPrismaMapper } from '@infrastructure/persistence/prisma/shipping-method.prisma.mapper.js';
import { PackagingPrismaMapper } from '@infrastructure/persistence/prisma/packaging.prisma.mapper.js';
import { DeliveryPrismaMapper } from '@infrastructure/persistence/prisma/delivery.prisma.mapper.js';
import { TrackingPrismaMapper } from '@infrastructure/persistence/prisma/tracking.prisma.mapper.js';
import { RoutePrismaMapper } from '@infrastructure/persistence/prisma/route.prisma.mapper.js';
import { FulfillmentPrismaMapper } from '@infrastructure/persistence/prisma/fulfillment.prisma.mapper.js';
import { DispatchPrismaMapper } from '@infrastructure/persistence/prisma/dispatch.prisma.mapper.js';
import { ReturnShipmentPrismaMapper } from '@infrastructure/persistence/prisma/return-shipment.prisma.mapper.js';
import { InsurancePrismaMapper } from '@infrastructure/persistence/prisma/insurance.prisma.mapper.js';

import type { PrismaZoneRow } from '@infrastructure/persistence/prisma/zone.prisma.mapper.js';
import type { PrismaShippingMethodRow } from '@infrastructure/persistence/prisma/shipping-method.prisma.mapper.js';
import type { PrismaPackagingRow } from '@infrastructure/persistence/prisma/packaging.prisma.mapper.js';
import type { PrismaDeliveryRowWithAttempts } from '@infrastructure/persistence/prisma/delivery.prisma.mapper.js';
import type { PrismaTrackingRowWithEvents } from '@infrastructure/persistence/prisma/tracking.prisma.mapper.js';
import type { PrismaRouteRow } from '@infrastructure/persistence/prisma/route.prisma.mapper.js';
import type { PrismaFulfillmentRow } from '@infrastructure/persistence/prisma/fulfillment.prisma.mapper.js';
import type { PrismaDispatchRow } from '@infrastructure/persistence/prisma/dispatch.prisma.mapper.js';
import type { PrismaReturnShipmentRow } from '@infrastructure/persistence/prisma/return-shipment.prisma.mapper.js';
import type { PrismaInsuranceRow } from '@infrastructure/persistence/prisma/insurance.prisma.mapper.js';

const NOW = new Date('2026-05-01T10:00:00.000Z');
const UUID = '550e8400-e29b-41d4-a716-446655440000';
const ISO = '2026-05-01T10:00:00.000Z';

// ═══ ZONE ═══
function zoneRow(overrides: Partial<PrismaZoneRow> = {}): PrismaZoneRow {
  return {
    id: 'z1', name: 'Dhaka Zone', code: 'Z-DHK', type: 'district', status: 'active',
    pricingType: 'flat', parentId: null,
    postalCodes: ['1207'], districts: ['Dhaka'], divisions: ['Dhaka'],
    shippingCost: 60, currency: 'BDT',
    minDeliveryDays: 1, maxDeliveryDays: 3,
    codEnabled: true, codCharge: 20, codMaxAmount: 50000,
    isRemote: false, isActive: true, version: 0,
    createdAt: NOW, updatedAt: NOW, deletedAt: null,
    ...overrides,
  };
}
describe('ZonePrismaMapper', () => {
  it('full row', () => {
    const e = ZonePrismaMapper.toDomain(zoneRow());
    expect(e.name).toBe('Dhaka Zone');
    expect(e.shippingCost.amount).toBe(60);
    expect(e.codCharge).toBe(20);
    expect(e.codMaxAmount).toBe(50000);
    expect(e.postalCodes).toEqual(['1207']);
  });
  it('null cod fields + null parent', () => {
    const e = ZonePrismaMapper.toDomain(zoneRow({ codCharge: null, codMaxAmount: null }));
    expect(e.codCharge).toBeUndefined();
    expect(e.codMaxAmount).toBeUndefined();
    expect(e.parentId).toBeUndefined();
  });
  it('with parentId', () => {
    const e = ZonePrismaMapper.toDomain(zoneRow({ parentId: UUID }));
    expect(e.parentId?.value).toBe(UUID);
  });
  it('toPersistence round-trip', () => {
    const e = ZonePrismaMapper.toDomain(zoneRow());
    const p = ZonePrismaMapper.toPersistence(e);
    expect(p['id']).toBe('z1');
    expect(p['shippingCost']).toBe(60);
    expect(p['currency']).toBe('BDT');
  });
});

// ═══ SHIPPING METHOD ═══
function methodRow(overrides: Partial<PrismaShippingMethodRow> = {}): PrismaShippingMethodRow {
  return {
    id: 'm1', name: 'Standard', code: 'standard', displayName: 'Standard Shipping',
    status: 'active', rateType: 'flat',
    baseCost: 60, freeAbove: 1000, currency: 'BDT',
    minDeliveryDays: 1, maxDeliveryDays: 5, maxWeightKg: 30, maxDimensionsCm: 100,
    codEnabled: true, trackingEnabled: true,
    coverageZones: ['z1'], couriers: ['pathao'],
    isDefault: true, isActive: true, version: 0,
    createdAt: NOW, updatedAt: NOW, deletedAt: null,
    ...overrides,
  };
}
describe('ShippingMethodPrismaMapper', () => {
  it('full row', () => {
    const e = ShippingMethodPrismaMapper.toDomain(methodRow());
    expect(e.baseCost.amount).toBe(60);
    expect(e.freeAbove?.amount).toBe(1000);
    expect(e.maxWeightKg?.value).toBe(30);
  });
  it('null freeAbove + maxWeightKg + maxDimensionsCm', () => {
    const e = ShippingMethodPrismaMapper.toDomain(methodRow({
      freeAbove: null, maxWeightKg: null, maxDimensionsCm: null,
    }));
    expect(e.freeAbove).toBeUndefined();
    expect(e.maxWeightKg).toBeUndefined();
    expect(e.maxDimensionsCm).toBeUndefined();
  });
  it('toPersistence round-trip', () => {
    const e = ShippingMethodPrismaMapper.toDomain(methodRow());
    const p = ShippingMethodPrismaMapper.toPersistence(e);
    expect(p['code']).toBe('standard');
    expect(p['baseCost']).toBe(60);
    expect(p['freeAbove']).toBe(1000);
  });
});

// ═══ PACKAGING ═══
function packagingRow(overrides: Partial<PrismaPackagingRow> = {}): PrismaPackagingRow {
  return {
    id: 'pk1', name: 'Small Box', code: 'BOX-S', type: 'box', material: 'cardboard',
    status: 'active',
    lengthCm: 20, widthCm: 15, heightCm: 10, maxWeightKg: 5,
    cost: 30, currency: 'BDT', imageUrl: null,
    isFragile: false, isTemperatureControlled: false, isRecyclable: true,
    stock: 100, isDefault: true, version: 0,
    createdAt: NOW, updatedAt: NOW, deletedAt: null,
    ...overrides,
  };
}
describe('PackagingPrismaMapper', () => {
  it('full row', () => {
    const e = PackagingPrismaMapper.toDomain(packagingRow());
    expect(e.dimensions.lengthCm).toBe(20);
    expect(e.maxWeightKg.value).toBe(5);
    expect(e.cost?.amount).toBe(30);
  });
  it('null cost + null currency', () => {
    const e = PackagingPrismaMapper.toDomain(packagingRow({ cost: null, currency: null }));
    expect(e.cost).toBeUndefined();
  });
  it('with imageUrl', () => {
    const e = PackagingPrismaMapper.toDomain(packagingRow({ imageUrl: 'https://x.png' }));
    expect(e.imageUrl).toBe('https://x.png');
  });
  it('toPersistence round-trip', () => {
    const e = PackagingPrismaMapper.toDomain(packagingRow());
    const p = PackagingPrismaMapper.toPersistence(e);
    expect(p['id']).toBe('pk1');
    expect(p['lengthCm']).toBe(20);
    expect(p['cost']).toBe(30);
  });
});

// ═══ DELIVERY ═══
function deliveryRow(overrides: Partial<PrismaDeliveryRowWithAttempts> = {}): PrismaDeliveryRowWithAttempts {
  return {
    id: 'd1', shipmentId: 's1', orderId: 'o1', userId: null,
    status: 'scheduled', type: 'standard',
    driverId: null, vehicleId: null, routeId: null,
    recipientName: null, recipientPhone: null,
    deliveryLine1: '12 Main St', deliveryLine2: null, deliveryCity: 'Dhaka',
    deliveryState: null, deliveryDistrict: null, deliveryDivision: null,
    deliveryPostalCode: null, deliveryCountry: 'BD', deliveryLandmark: null,
    latitude: null, longitude: null,
    scheduledAt: NOW, pickedUpAt: null, arrivedAt: null,
    deliveredAt: null, failedAt: null, cancelledAt: null,
    proofType: null, proofSignatureUrl: null, proofPhotoUrl: null,
    proofOtp: null, proofIdNumber: null, proofRecipientName: null,
    proofCapturedAt: null, notes: null,
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
    attempts: [],
    ...overrides,
  };
}
describe('DeliveryPrismaMapper', () => {
  it('minimal row no attempts no proof', () => {
    const e = DeliveryPrismaMapper.toDomain(deliveryRow());
    expect(e.status.value).toBe('scheduled');
    expect(e.attempts.length).toBe(0);
    expect(e.proofOfDelivery).toBeUndefined();
  });
  it('row with attempts', () => {
    const e = DeliveryPrismaMapper.toDomain(deliveryRow({
      attempts: [
        { id: 'a1', deliveryId: 'd1', attemptNumber: 1, status: 'failed', reason: 'not_home',
          driverId: null, location: null, latitude: null, longitude: null,
          images: [], notes: null, attemptedAt: NOW, createdAt: NOW },
        { id: 'a2', deliveryId: 'd1', attemptNumber: 2, status: 'success', reason: null,
          driverId: UUID, location: 'door', latitude: 23.8, longitude: 90.4,
          images: ['https://x.jpg'], notes: 'ok', attemptedAt: NOW, createdAt: NOW },
      ],
    }));
    expect(e.attempts.length).toBe(2);
    expect(e.attempts[0].status.value).toBe('failed');
    expect(e.attempts[1].status.value).toBe('success');
  });
  it('row with proof of delivery (signature)', () => {
    const e = DeliveryPrismaMapper.toDomain(deliveryRow({
      status: 'delivered', deliveredAt: NOW,
      proofType: 'signature', proofSignatureUrl: 'https://sig.png',
      proofCapturedAt: NOW, proofRecipientName: 'Rahim',
    }));
    expect(e.proofOfDelivery?.type).toBe('signature');
  });
  it('toPersistence round-trip', () => {
    const e = DeliveryPrismaMapper.toDomain(deliveryRow());
    const p = DeliveryPrismaMapper.toPersistence(e);
    expect(p['shipmentId']).toBe('s1');
    expect(p['deliveryCity']).toBe('Dhaka');
  });
});

// ═══ TRACKING ═══
function trackingRow(overrides: Partial<PrismaTrackingRowWithEvents> = {}): PrismaTrackingRowWithEvents {
  return {
    id: 't1', trackingNumber: 'SH-TRK-1',
    shipmentId: null, orderId: null, courierCode: null,
    status: 'pending', currentLocation: null,
    estimatedDeliveryAt: null, publicAccess: true,
    lastUpdatedAt: NOW, version: 0,
    createdAt: NOW, updatedAt: NOW, deletedAt: null,
    events: [],
    ...overrides,
  };
}
describe('TrackingPrismaMapper', () => {
  it('minimal row no events', () => {
    const e = TrackingPrismaMapper.toDomain(trackingRow());
    expect(e.trackingNumber.value).toBe('SH-TRK-1');
    expect(e.events.length).toBe(0);
  });
  it('row with events', () => {
    const e = TrackingPrismaMapper.toDomain(trackingRow({
      events: [
        { id: 'e1', trackingId: 't1', shipmentId: null, orderId: null,
          event: 'picked_up', status: 'active', source: 'internal',
          message: 'Picked', location: 'hub', latitude: 23.8, longitude: 90.4,
          occurredAt: NOW, receivedAt: NOW, metadata: null, createdAt: NOW },
      ],
    }));
    expect(e.events.length).toBe(1);
    expect(e.events[0].event.value).toBe('picked_up');
  });
  it('toPersistence round-trip', () => {
    const e = TrackingPrismaMapper.toDomain(trackingRow());
    const p = TrackingPrismaMapper.toPersistence(e);
    expect(p['trackingNumber']).toBe('SH-TRK-1');
    expect(p['events']).toHaveProperty('create');
  });
});

// ═══ ROUTE ═══
function routeRow(overrides: Partial<PrismaRouteRow> = {}): PrismaRouteRow {
  return {
    id: 'r1', name: 'Morning Route', code: 'RT-01',
    type: 'delivery', status: 'draft', optimization: 'balanced',
    totalDistanceKm: null, totalDurationMinutes: null,
    warehouseId: null, vehicleId: null, driverId: null,
    scheduledDate: NOW, startedAt: null, completedAt: null,
    isOptimized: false, isRecurring: false, recurrenceRule: null,
    stops: [],
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
    ...overrides,
  };
}
describe('RoutePrismaMapper', () => {
  it('minimal row no stops', () => {
    const e = RoutePrismaMapper.toDomain(routeRow());
    expect(e.stops.length).toBe(0);
    expect(e.totalDistanceKm).toBeUndefined();
  });
  it('row with stops JSON', () => {
    const e = RoutePrismaMapper.toDomain(routeRow({
      stops: [{
        id: 'st1', order: 0, location: 'Area A', address: '12 Main St',
        latitude: 23.8, longitude: 90.4, shipmentIds: ['s1'],
        estimatedArrivalAt: ISO, actualArrivalAt: null, completed: false, notes: null,
      }],
      totalDistanceKm: 15.5, totalDurationMinutes: 45,
    }));
    expect(e.stops.length).toBe(1);
    expect(e.stops[0].location).toBe('Area A');
    expect(e.totalDistanceKm?.value).toBe(15.5);
  });
  it('toPersistence round-trip', () => {
    const e = RoutePrismaMapper.toDomain(routeRow());
    const p = RoutePrismaMapper.toPersistence(e);
    expect(p['id']).toBe('r1');
    expect(p['code']).toBe('RT-01');
    expect(Array.isArray(p['stops'])).toBe(true);
  });
});

// ═══ FULFILLMENT ═══
function fulfillmentRow(overrides: Partial<PrismaFulfillmentRow> = {}): PrismaFulfillmentRow {
  return {
    id: 'f1', orderId: 'o1', vendorId: null, warehouseId: null,
    status: 'pending', type: 'standard', priority: 'normal',
    assignedTo: null, itemIds: ['i1', 'i2'],
    pickedAt: null, packedAt: null, shippedAt: null, cancelledAt: null,
    notes: null, slaDueAt: null, slaBreachedAt: null,
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
    ...overrides,
  };
}
describe('FulfillmentPrismaMapper', () => {
  it('minimal row', () => {
    const e = FulfillmentPrismaMapper.toDomain(fulfillmentRow());
    expect(e.itemIds.length).toBe(2);
    expect(e.sla).toBeUndefined();
  });
  it('row with SLA', () => {
    const e = FulfillmentPrismaMapper.toDomain(fulfillmentRow({
      slaDueAt: NOW, slaBreachedAt: NOW,
    }));
    expect(e.sla).toBeDefined();
    expect(e.sla?.breachedAt).toBe(ISO);
  });
  it('row with assignedTo', () => {
    const e = FulfillmentPrismaMapper.toDomain(fulfillmentRow({ assignedTo: UUID }));
    expect(e.assignedTo).toBe(UUID);
  });
  it('toPersistence round-trip', () => {
    const e = FulfillmentPrismaMapper.toDomain(fulfillmentRow());
    const p = FulfillmentPrismaMapper.toPersistence(e);
    expect(p['orderId']).toBe('o1');
    expect(p['itemIds']).toEqual(['i1', 'i2']);
  });
});

// ═══ DISPATCH ═══
function dispatchRow(overrides: Partial<PrismaDispatchRow> = {}): PrismaDispatchRow {
  return {
    id: 'dp1', dispatchNumber: 'DSP-20260501-0001',
    status: 'pending', type: 'batch',
    shipmentIds: ['s1', 's2'],
    courierId: null, vehicleId: null, driverId: null, warehouseId: null,
    manifestUrl: null, itemCount: 2, totalWeight: null,
    dispatchedAt: null, estimatedArrivalAt: null,
    deliveredAt: null, cancelledAt: null, notes: null,
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
    ...overrides,
  };
}
describe('DispatchPrismaMapper', () => {
  it('minimal row', () => {
    const e = DispatchPrismaMapper.toDomain(dispatchRow());
    expect(e.shipmentIds.length).toBe(2);
    expect(e.totalWeight).toBeUndefined();
  });
  it('row with all fields', () => {
    const e = DispatchPrismaMapper.toDomain(dispatchRow({
      courierId: UUID, vehicleId: UUID, driverId: UUID, warehouseId: UUID,
      manifestUrl: 'https://x/manifest.pdf', totalWeight: 25.5,
      dispatchedAt: NOW, estimatedArrivalAt: NOW, deliveredAt: NOW,
    }));
    expect(e.courierId?.value).toBe(UUID);
    expect(e.totalWeight?.value).toBe(25.5);
    expect(e.manifestUrl).toBe('https://x/manifest.pdf');
  });
  it('toPersistence round-trip', () => {
    const e = DispatchPrismaMapper.toDomain(dispatchRow());
    const p = DispatchPrismaMapper.toPersistence(e);
    expect(p['dispatchNumber']).toBe('DSP-20260501-0001');
    expect(p['shipmentIds']).toEqual(['s1', 's2']);
  });
});

// ═══ RETURN SHIPMENT ═══
function returnRow(overrides: Partial<PrismaReturnShipmentRow> = {}): PrismaReturnShipmentRow {
  return {
    id: 'rs1', rmaNumber: 'RMA-2026-000001', orderId: 'o1', originalShipmentId: null,
    userId: UUID, status: 'requested', type: 'customer_return', reason: 'changed_mind',
    description: null, images: [], itemIds: ['i1'],
    pickupLine1: '12 Main St', pickupLine2: null, pickupCity: 'Dhaka',
    pickupState: null, pickupDistrict: null, pickupDivision: null,
    pickupPostalCode: null, pickupCountry: 'BD',
    pickupScheduledAt: null, pickedUpAt: null, receivedAt: null,
    inspectedAt: null, inspectedBy: null, restockable: false,
    refundAmount: null, refundCurrency: null, restockFeeAmount: null,
    trackingNumber: null, notes: null,
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
    ...overrides,
  };
}
describe('ReturnShipmentPrismaMapper', () => {
  it('minimal row', () => {
    const e = ReturnShipmentPrismaMapper.toDomain(returnRow());
    expect(e.rmaNumber.value).toBe('RMA-2026-000001');
    expect(e.refundAmount).toBeUndefined();
  });
  it('row with refund', () => {
    const e = ReturnShipmentPrismaMapper.toDomain(returnRow({
      refundAmount: 500, refundCurrency: 'BDT', restockFeeAmount: 50,
      inspectedAt: NOW, inspectedBy: UUID, restockable: true,
    }));
    expect(e.refundAmount?.amount).toBe(500);
    expect(e.restockFeeAmount).toBe(50);
    expect(e.inspectedBy?.value).toBe(UUID);
  });
  it('row with original shipment + tracking', () => {
    const e = ReturnShipmentPrismaMapper.toDomain(returnRow({
      originalShipmentId: UUID, trackingNumber: 'SH-RET-1',
    }));
    expect(e.originalShipmentId?.value).toBe(UUID);
    expect(e.trackingNumber).toBe('SH-RET-1');
  });
  it('toPersistence round-trip', () => {
    const e = ReturnShipmentPrismaMapper.toDomain(returnRow());
    const p = ReturnShipmentPrismaMapper.toPersistence(e);
    expect(p['rmaNumber']).toBe('RMA-2026-000001');
    expect(p['pickupLine1']).toBe('12 Main St');
  });
});

// ═══ INSURANCE ═══
function insuranceRow(overrides: Partial<PrismaInsuranceRow> = {}): PrismaInsuranceRow {
  return {
    id: 'in1', policyNumber: 'POL-2026-000001',
    shipmentId: null, orderId: null, userId: null,
    status: 'active', type: 'standard', coverages: ['loss', 'damage'],
    declaredValue: 5000, premium: 50, currency: 'BDT',
    startsAt: NOW, expiresAt: new Date('2027-05-01T10:00:00.000Z'),
    isClaimed: false,
    claimId: null, claimNumber: null, claimStatus: null,
    claimReason: null, claimDescription: null, claimImages: [],
    claimAmount: null, claimApprovedAmount: null,
    claimSubmittedAt: null, claimReviewedAt: null, claimApprovedAt: null,
    claimRejectedAt: null, claimRejectionReason: null, claimPaidAt: null,
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
    ...overrides,
  };
}
describe('InsurancePrismaMapper', () => {
  it('minimal row no claim', () => {
    const e = InsurancePrismaMapper.toDomain(insuranceRow());
    expect(e.policyNumber.value).toBe('POL-2026-000001');
    expect(e.coverages.length).toBe(2);
    expect(e.claim).toBeUndefined();
  });
  it('row with claim', () => {
    const e = InsurancePrismaMapper.toDomain(insuranceRow({
      isClaimed: true,
      claimId: UUID, claimNumber: 'CLM-001', claimStatus: 'approved',
      claimReason: 'damage', claimDescription: 'Broken', claimImages: ['https://x.jpg'],
      claimAmount: 2000, claimApprovedAmount: 1800,
      claimSubmittedAt: NOW, claimReviewedAt: NOW, claimApprovedAt: NOW,
    }));
    expect(e.claim).toBeDefined();
    expect(e.claim?.status.value).toBe('approved');
    expect(e.claim?.approvedAmount).toBe(1800);
  });
  it('row with shipment+order+user ids', () => {
    const e = InsurancePrismaMapper.toDomain(insuranceRow({
      shipmentId: UUID, orderId: UUID, userId: UUID,
    }));
    expect(e.shipmentId?.value).toBe(UUID);
    expect(e.orderId?.value).toBe(UUID);
    expect(e.userId?.value).toBe(UUID);
  });
  it('toPersistence round-trip with claim', () => {
    const e = InsurancePrismaMapper.toDomain(insuranceRow({
      isClaimed: true,
      claimId: UUID, claimNumber: 'CLM-001', claimStatus: 'approved',
      claimReason: 'damage', claimAmount: 2000, claimSubmittedAt: NOW,
    }));
    const p = InsurancePrismaMapper.toPersistence(e);
    expect(p['policyNumber']).toBe('POL-2026-000001');
    expect(p['claimId']).toBe(UUID);
  });
});
