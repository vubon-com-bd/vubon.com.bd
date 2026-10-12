/**
 * Controller mappers — full branch coverage for list-filter mappings.
 */
import { describe, it, expect } from '@jest/globals';

import { ShipmentControllerMapper } from '@interfaces/mappers/shipment.controller.mapper.js';
import { CourierControllerMapper } from '@interfaces/mappers/courier.controller.mapper.js';
import { WarehouseControllerMapper } from '@interfaces/mappers/warehouse.controller.mapper.js';
import { VehicleControllerMapper } from '@interfaces/mappers/vehicle.controller.mapper.js';
import { DriverControllerMapper } from '@interfaces/mappers/driver.controller.mapper.js';
import { ZoneControllerMapper } from '@interfaces/mappers/zone.controller.mapper.js';
import { ShippingMethodControllerMapper } from '@interfaces/mappers/shipping-method.controller.mapper.js';
import { PackagingControllerMapper } from '@interfaces/mappers/packaging.controller.mapper.js';
import { DeliveryControllerMapper } from '@interfaces/mappers/delivery.controller.mapper.js';
import { TrackingControllerMapper } from '@interfaces/mappers/tracking.controller.mapper.js';
import { RouteControllerMapper } from '@interfaces/mappers/route.controller.mapper.js';
import { FulfillmentControllerMapper } from '@interfaces/mappers/fulfillment.controller.mapper.js';
import { DispatchControllerMapper } from '@interfaces/mappers/dispatch.controller.mapper.js';
import { ReturnShipmentControllerMapper } from '@interfaces/mappers/return-shipment.controller.mapper.js';
import { InsuranceControllerMapper } from '@interfaces/mappers/insurance.controller.mapper.js';

const UUID = '550e8400-e29b-41d4-a716-446655440000';
const UUID2 = '550e8400-e29b-41d4-a716-446655440001';
const NOW = new Date().toISOString();
const ADDR = { line1: '12 Main', city: 'Dhaka', country: 'BD' };

// ═══ SHIPMENT — list options full branches ═══
describe('ShipmentControllerMapper — list options branches', () => {
  it('empty query → defaults', () => {
    const o = ShipmentControllerMapper.toListOptions({} as never);
    expect(o.page).toBe(1);
    expect(o.limit).toBe(20);
    expect(o.filter?.orderId).toBeUndefined();
  });
  it('all filter fields populated', () => {
    const o = ShipmentControllerMapper.toListOptions({
      orderId: UUID, userId: UUID2, vendorId: UUID, courierId: UUID2, warehouseId: UUID,
      status: 'pending', type: 'standard', priority: 'high',
      isCOD: true, isInsured: false, fromDate: NOW, toDate: NOW, search: 'x',
      page: 2, limit: 10, sortBy: 'createdAt', sortDir: 'desc',
    } as never);
    expect(o.page).toBe(2);
    expect(o.limit).toBe(10);
    expect(o.filter?.status).toBe('pending');
    expect(o.filter?.isCOD).toBe(true);
    expect(o.filter?.isInsured).toBe(false);
  });
  it('create DTO full mapping', () => {
    const d = ShipmentControllerMapper.toCreateDto({
      orderId: UUID, type: 'standard', shippingAddress: ADDR,
      packages: [{ orderItemId: 'oi', quantity: 1 }], weightKg: 5,
      userId: UUID2, vendorId: UUID, warehouseId: UUID2, courierId: UUID,
      priority: 'high', isCOD: true, codAmount: 500,
      isInsured: true, declaredValue: 5000, currency: 'BDT',
      shippingCost: 100, volumeM3: 2, notes: 'urgent', idempotencyKey: 'key',
      pickupAddress: ADDR,
      dimensions: { lengthCm: 10, widthCm: 10, heightCm: 10 },
    } as never);
    expect(d.orderId).toBe(UUID);
    expect(d.isCOD).toBe(true);
    expect(d.codAmount).toBe(500);
    expect(d.idempotencyKey).toBe('key');
  });
  it('create DTO minimal', () => {
    const d = ShipmentControllerMapper.toCreateDto({
      orderId: UUID, type: 'standard', shippingAddress: ADDR,
      packages: [{ orderItemId: 'oi', quantity: 1 }], weightKg: 5,
    } as never);
    expect(d.userId).toBeUndefined();
    expect(d.isCOD).toBeUndefined();
  });
  it('all tiny mappers', () => {
    expect(ShipmentControllerMapper.toUpdateDto(UUID, { notes: 'n' } as never).notes).toBe('n');
    expect(ShipmentControllerMapper.toCancelDto(UUID, { reason: 'x' } as never).reason).toBe('x');
    expect(ShipmentControllerMapper.toPickupDto(UUID, { courierTrackingNumber: 'T' } as never).courierTrackingNumber).toBe('T');
    expect(ShipmentControllerMapper.toDeliverDto(UUID, { receivedBy: 'R' } as never).receivedBy).toBe('R');
    expect(ShipmentControllerMapper.toFailDto(UUID, { reason: 'x' } as never).reason).toBe('x');
    expect(ShipmentControllerMapper.toMarkReturnedDto(UUID, { reason: 'x' } as never).reason).toBe('x');
    expect(ShipmentControllerMapper.toAssignCourierDto(UUID, { courierId: UUID2 } as never).courierId).toBe(UUID2);
    expect(ShipmentControllerMapper.toAssignWarehouseDto(UUID, { warehouseId: UUID2 } as never).warehouseId).toBe(UUID2);
    expect(ShipmentControllerMapper.toPutOnHoldDto(UUID, { reason: 'x' } as never).reason).toBe('x');
    expect(ShipmentControllerMapper.toReleaseDto(UUID).shipmentId).toBe(UUID);
    expect(ShipmentControllerMapper.toMarkDelayedDto(UUID, { reason: 'x' } as never).reason).toBe('x');
    expect(ShipmentControllerMapper.toChangePriorityDto(UUID, { priority: 'high' } as never).priority).toBe('high');
    expect(ShipmentControllerMapper.toGenerateLabelDto(UUID, { labelUrl: 'http://x' } as never).labelUrl).toBe('http://x');
  });
});

// ═══ COURIER ═══
describe('CourierControllerMapper — branches', () => {
  it('register full', () => {
    const d = CourierControllerMapper.toRegisterDto({
      name: 'Pathao', code: 'pathao', displayName: 'Pathao', type: 'local',
      supportsCOD: true, supportsInsurance: true, supportsInternational: true,
      averageDeliveryDays: 3, priority: 80, apiEnabled: true,
      logoUrl: 'http://l.png', website: 'http://w.com',
      contactPhone: '+8801712345678', contactEmail: 'x@x.com',
      trackingUrlTemplate: 'http://t', coverageZones: ['dhaka'],
    } as never);
    expect(d.name).toBe('Pathao');
    expect(d.priority).toBe(80);
    expect(d.apiEnabled).toBe(true);
    expect(d.logoUrl).toBe('http://l.png');
  });
  it('register minimal', () => {
    const d = CourierControllerMapper.toRegisterDto({
      name: 'P', code: 'p', displayName: 'P', type: 'local',
      supportsCOD: false, supportsInsurance: false, supportsInternational: false,
      averageDeliveryDays: 3,
    } as never);
    expect(d.priority).toBeUndefined();
    expect(d.apiEnabled).toBeUndefined();
  });
  it('list options with filters', () => {
    const o = CourierControllerMapper.toListOptions({
      status: 'active', type: 'local', supportsCOD: true,
      supportsInternational: false, zone: 'dhaka', search: 'x',
      page: 3, limit: 5, sortBy: 'priority', sortDir: 'desc',
    } as never);
    expect(o.page).toBe(3);
    expect(o.filter?.status).toBe('active');
    expect(o.filter?.zone).toBe('dhaka');
  });
  it('list options empty', () => {
    const o = CourierControllerMapper.toListOptions({} as never);
    expect(o.page).toBe(1);
    expect(o.filter?.status).toBeUndefined();
  });
  it('tiny mappers', () => {
    expect(CourierControllerMapper.toUpdateDto(UUID, {} as never).courierId).toBe(UUID);
    expect(CourierControllerMapper.toSuspendDto(UUID, { reason: 'x' } as never).reason).toBe('x');
    expect(CourierControllerMapper.toActivateDto(UUID).courierId).toBe(UUID);
    expect(CourierControllerMapper.toDeactivateDto(UUID, { reason: 'x' } as never).reason).toBe('x');
    expect(CourierControllerMapper.toSetDefaultDto(UUID, { isDefault: true } as never).isDefault).toBe(true);
  });
});

// ═══ WAREHOUSE ═══
describe('WarehouseControllerMapper — branches', () => {
  it('create full', () => {
    const d = WarehouseControllerMapper.toCreateDto({
      name: 'WH', code: 'WH-01', type: 'main', address: ADDR,
      capacityM3: 100, capacityKg: 1000, zone: 'dhaka',
      contactName: 'M', contactPhone: '+8801712345678', contactEmail: 'x@x.com',
      maxSkus: 100, operatingHoursStart: 8, operatingHoursEnd: 22,
      timezone: 'Asia/Dhaka', isDefault: true,
    } as never);
    expect(d.name).toBe('WH');
    expect(d.maxSkus).toBe(100);
    expect(d.isDefault).toBe(true);
  });
  it('create minimal', () => {
    const d = WarehouseControllerMapper.toCreateDto({
      name: 'WH', code: 'WH-01', type: 'main', address: ADDR,
      capacityM3: 100, capacityKg: 1000, zone: 'dhaka',
    } as never);
    expect(d.contactName).toBeUndefined();
  });
  it('list options all branches', () => {
    const o = WarehouseControllerMapper.toListOptions({
      status: 'active', type: 'main', zone: 'dhaka',
      hasCapacity: true, search: 'x', page: 2, limit: 10,
      sortBy: 'name', sortDir: 'asc',
    } as never);
    expect(o.page).toBe(2);
    expect(o.filter?.status).toBe('active');
    expect(o.filter?.hasCapacity).toBe(true);
  });
  it('list options empty', () => {
    const o = WarehouseControllerMapper.toListOptions({} as never);
    expect(o.page).toBe(1);
  });
  it('tiny mappers', () => {
    expect(WarehouseControllerMapper.toUpdateDto(UUID, {} as never).warehouseId).toBe(UUID);
    expect(WarehouseControllerMapper.toActivateDto(UUID).warehouseId).toBe(UUID);
    expect(WarehouseControllerMapper.toDeactivateDto(UUID, {} as never).warehouseId).toBe(UUID);
    expect(WarehouseControllerMapper.toStartMaintenanceDto(UUID, {} as never).warehouseId).toBe(UUID);
    expect(WarehouseControllerMapper.toCompleteMaintenanceDto(UUID).warehouseId).toBe(UUID);
  });
});

// ═══ VEHICLE ═══
describe('VehicleControllerMapper — branches', () => {
  it('register full', () => {
    const d = VehicleControllerMapper.toRegisterDto({
      registrationNumber: 'DHK-1', type: 'motorcycle', fuelType: 'petrol',
      make: 'H', model: 'CB', year: 2024, color: 'R',
      maxWeightKg: 100, maxVolumeM3: 1, capacity: 2, mileageKm: 5000,
      insuranceExpiresAt: NOW, registrationExpiresAt: NOW,
    } as never);
    expect(d.registrationNumber).toBe('DHK-1');
    expect(d.color).toBe('R');
    expect(d.maxVolumeM3).toBe(1);
  });
  it('register minimal', () => {
    const d = VehicleControllerMapper.toRegisterDto({
      registrationNumber: 'DHK-1', type: 'motorcycle', fuelType: 'petrol',
      make: 'H', model: 'CB', year: 2024, maxWeightKg: 100,
    } as never);
    expect(d.color).toBeUndefined();
  });
  it('list options all', () => {
    const o = VehicleControllerMapper.toListOptions({
      status: 'available', type: 'motorcycle', fuelType: 'petrol',
      hasDriver: false, minCapacityKg: 50, search: 'x',
      page: 2, limit: 10,
    } as never);
    expect(o.filter?.status).toBe('available');
    expect(o.filter?.type).toBe('motorcycle');
    expect(o.filter?.fuelType).toBe('petrol');
    expect(o.page).toBe(2);
    expect(o.limit).toBe(10);
  });
  it('list options empty', () => {
    const o = VehicleControllerMapper.toListOptions({} as never);
    expect(o.page).toBe(1);
    expect(o.filter?.status).toBeUndefined();
  });
  it('tiny', () => {
    expect(VehicleControllerMapper.toUpdateDto(UUID, {} as never).vehicleId).toBe(UUID);
    expect(VehicleControllerMapper.toSetStatusDto(UUID, { status: 'available' } as never).vehicleId).toBe(UUID);
    expect(VehicleControllerMapper.toAssignDriverDto(UUID, { driverId: UUID2 } as never).driverId).toBe(UUID2);
    expect(VehicleControllerMapper.toUpdateMileageDto(UUID, { mileageKm: 100 } as never).mileageKm).toBe(100);
  });
});

// ═══ DRIVER ═══
describe('DriverControllerMapper — branches', () => {
  it('register full', () => {
    const d = DriverControllerMapper.toRegisterDto({
      name: 'K', phone: '+8801712345678', email: 'x@x.com', type: 'full_time',
      licenseNumber: 'L1', licenseType: 'light', licenseExpiresAt: NOW,
      userId: UUID, dateOfBirth: '1990-01-01', address: 'A',
      warehouseId: UUID2, cashLimit: 10000,
    } as never);
    expect(d.name).toBe('K');
    expect(d.userId).toBe(UUID);
    expect(d.cashLimit).toBe(10000);
  });
  it('register minimal', () => {
    const d = DriverControllerMapper.toRegisterDto({
      name: 'K', phone: '+8801712345678', type: 'full_time',
      licenseNumber: 'L1', licenseType: 'light', licenseExpiresAt: NOW,
    } as never);
    expect(d.userId).toBeUndefined();
  });
  it('list options', () => {
    const o = DriverControllerMapper.toListOptions({
      status: 'available', type: 'full_time', warehouseId: UUID,
      vehicleId: UUID2, page: 2, limit: 10,
    } as never);
    expect(o.filter?.status).toBe('available');
    expect(o.filter?.warehouseId).toBe(UUID);
  });
  it('list empty', () => {
    const o = DriverControllerMapper.toListOptions({} as never);
    expect(o.page).toBe(1);
  });
  it('tiny', () => {
    expect(DriverControllerMapper.toUpdateDto(UUID, {} as never).driverId).toBe(UUID);
    expect(DriverControllerMapper.toSetStatusDto(UUID, { status: 'available' } as never).driverId).toBe(UUID);
    expect(DriverControllerMapper.toAssignVehicleDto(UUID, { vehicleId: UUID2 } as never).vehicleId).toBe(UUID2);
    expect(DriverControllerMapper.toReceiveCashDto(UUID, { amount: 100 } as never).amount).toBe(100);
    expect(DriverControllerMapper.toRemitCashDto(UUID, { amount: 100 } as never).amount).toBe(100);
  });
});

// ═══ ZONE ═══
describe('ZoneControllerMapper — branches', () => {
  it('create full', () => {
    const d = ZoneControllerMapper.toCreateDto({
      name: 'Z', code: 'Z1', type: 'district', pricingType: 'flat',
      parentId: UUID, postalCodes: ['1200'], districts: ['Dhaka'], divisions: ['Dhaka'],
      shippingCost: 60, currency: 'BDT', minDeliveryDays: 1, maxDeliveryDays: 3,
      codEnabled: true, codCharge: 20, codMaxAmount: 50000, isRemote: false,
    } as never);
    expect(d.name).toBe('Z');
    expect(d.postalCodes).toEqual(['1200']);
  });
  it('list all', () => {
    const o = ZoneControllerMapper.toListOptions({
      status: 'active', type: 'district', parentId: UUID,
      isRemote: false, search: 'x', page: 2, limit: 10,
    } as never);
    expect(o.filter?.status).toBe('active');
    expect(o.filter?.isRemote).toBe(false);
  });
  it('list empty', () => {
    const o = ZoneControllerMapper.toListOptions({} as never);
    expect(o.page).toBe(1);
  });
  it('tiny', () => {
    expect(ZoneControllerMapper.toUpdateDto(UUID, {} as never).zoneId).toBe(UUID);
    expect(ZoneControllerMapper.toActivateDto(UUID).zoneId).toBe(UUID);
    expect(ZoneControllerMapper.toInactivateDto(UUID, {} as never).zoneId).toBe(UUID);
    expect(ZoneControllerMapper.toSuspendDto(UUID, { reason: 'x' } as never).reason).toBe('x');
  });
});

// ═══ SHIPPING METHOD ═══
describe('ShippingMethodControllerMapper — branches', () => {
  it('create full', () => {
    const d = ShippingMethodControllerMapper.toCreateDto({
      name: 'S', code: 'standard', displayName: 'Std', rateType: 'flat',
      baseCost: 60, freeAbove: 1000, currency: 'BDT',
      minDeliveryDays: 1, maxDeliveryDays: 3, maxWeightKg: 500, maxDimensionsCm: 300,
      codEnabled: true, trackingEnabled: true,
      coverageZones: ['dhaka'], couriers: ['pathao'], isDefault: true,
    } as never);
    expect(d.name).toBe('S');
    expect(d.freeAbove).toBe(1000);
  });
  it('list', () => {
    const o = ShippingMethodControllerMapper.toListOptions({
      status: 'active', code: 'standard', zoneId: UUID,
      codEnabled: true, search: 'x', page: 2, limit: 10,
    } as never);
    expect(o.filter?.status).toBe('active');
    expect(o.filter?.zoneId).toBe(UUID);
  });
  it('list empty', () => {
    const o = ShippingMethodControllerMapper.toListOptions({} as never);
    expect(o.page).toBe(1);
  });
  it('tiny', () => {
    expect(ShippingMethodControllerMapper.toUpdateDto(UUID, {} as never).methodId).toBe(UUID);
    expect(ShippingMethodControllerMapper.toActivateDto(UUID).methodId).toBe(UUID);
    expect(ShippingMethodControllerMapper.toDeactivateDto(UUID, {} as never).methodId).toBe(UUID);
    expect(ShippingMethodControllerMapper.toSuspendDto(UUID, { reason: 'x' } as never).reason).toBe('x');
    expect(ShippingMethodControllerMapper.toCalculateDto(UUID, { orderValue: 100, weightKg: 1 } as never).methodId).toBe(UUID);
  });
});

// ═══ PACKAGING ═══
describe('PackagingControllerMapper — branches', () => {
  it('create full', () => {
    const d = PackagingControllerMapper.toCreateDto({
      name: 'B', code: 'B1', type: 'box', material: 'cardboard',
      lengthCm: 10, widthCm: 10, heightCm: 10, maxWeightKg: 5,
      cost: 20, currency: 'BDT', imageUrl: 'http://i.png',
      isFragile: true, isTemperatureControlled: false, isRecyclable: true,
      stock: 100, isDefault: true,
    } as never);
    expect(d.name).toBe('B');
    expect(d.cost).toBe(20);
  });
  it('list', () => {
    const o = PackagingControllerMapper.toListOptions({
      status: 'active', type: 'box', material: 'cardboard', search: 'x',
      page: 2, limit: 10,
    } as never);
    expect(o.filter?.status).toBe('active');
    expect(o.filter?.material).toBe('cardboard');
  });
  it('list empty', () => {
    const o = PackagingControllerMapper.toListOptions({} as never);
    expect(o.page).toBe(1);
  });
  it('tiny', () => {
    expect(PackagingControllerMapper.toUpdateDto(UUID, {} as never).packagingId).toBe(UUID);
    expect(PackagingControllerMapper.toAdjustDto(UUID, { delta: 5, reason: 'x' } as never).delta).toBe(5);
    expect(PackagingControllerMapper.toRestockDto(UUID, { quantity: 10 } as never).quantity).toBe(10);
    expect(PackagingControllerMapper.toConsumeDto(UUID, { quantity: 10 } as never).quantity).toBe(10);
    expect(PackagingControllerMapper.toSelectDto({ weightKg: 1 } as never).weightKg).toBe(1);
  });
});

// ═══ DELIVERY ═══
describe('DeliveryControllerMapper — branches', () => {
  it('schedule full', () => {
    const d = DeliveryControllerMapper.toScheduleDto({
      shipmentId: UUID, orderId: UUID2, userId: UUID,
      type: 'standard', deliveryAddress: ADDR,
      recipientName: 'R', recipientPhone: '+8801712345678', scheduledAt: NOW,
    } as never);
    expect(d.shipmentId).toBe(UUID);
    expect(d.recipientName).toBe('R');
  });
  it('schedule minimal', () => {
    const d = DeliveryControllerMapper.toScheduleDto({
      shipmentId: UUID, orderId: UUID2, type: 'standard', deliveryAddress: ADDR,
    } as never);
    expect(d.userId).toBeUndefined();
  });
  it('list', () => {
    const o = DeliveryControllerMapper.toListOptions({
      shipmentId: UUID, orderId: UUID2, driverId: UUID,
      status: 'scheduled', page: 2, limit: 10,
    } as never);
    expect(o.filter?.shipmentId).toBe(UUID);
  });
  it('list empty', () => {
    const o = DeliveryControllerMapper.toListOptions({} as never);
    expect(o.page).toBe(1);
  });
  it('tiny', () => {
    expect(DeliveryControllerMapper.toAssignDto(UUID, { driverId: UUID2 } as never).driverId).toBe(UUID2);
    expect(DeliveryControllerMapper.toAttemptDto(UUID, { status: 'success' } as never).deliveryId).toBe(UUID);
    expect(DeliveryControllerMapper.toCompleteDto(UUID, { proofType: 'contactless' } as never).proofType).toBe('contactless');
    expect(DeliveryControllerMapper.toFailDto(UUID, { reason: 'x' } as never).reason).toBe('x');
    expect(DeliveryControllerMapper.toRescheduleDto(UUID, { reason: 'x' } as never).reason).toBe('x');
    expect(DeliveryControllerMapper.toCancelDto(UUID, {} as never).deliveryId).toBe(UUID);
  });
});

// ═══ TRACKING ═══
describe('TrackingControllerMapper — branches', () => {
  it('start full', () => {
    const d = TrackingControllerMapper.toStartDto({
      trackingNumber: 'SHTEST12345678', shipmentId: UUID, orderId: UUID2, courierCode: 'pathao',
    } as never);
    expect(d.trackingNumber).toBe('SHTEST12345678');
    expect(d.courierCode).toBe('pathao');
  });
  it('list', () => {
    const o = TrackingControllerMapper.toListOptions({
      shipmentId: UUID, orderId: UUID2, status: 'active',
      courierCode: 'pathao', page: 2, limit: 10,
    } as never);
    expect(o.filter?.shipmentId).toBe(UUID);
  });
  it('list empty', () => {
    const o = TrackingControllerMapper.toListOptions({} as never);
    expect(o.page).toBe(1);
  });
  it('record event', () => {
    const d = TrackingControllerMapper.toRecordDto(UUID, {
      event: 'picked_up', source: 'internal', message: 'picked',
    } as never);
    expect(d.event).toBe('picked_up');
    expect(d.status).toBeUndefined();
  });
  it('record event with status + meta', () => {
    const d = TrackingControllerMapper.toRecordDto(UUID, {
      event: 'picked_up', source: 'internal', message: 'picked',
      status: 'active', metadata: { k: 'v' },
    } as never);
    expect(d.status).toBe('active');
    expect(d.metadata).toEqual({ k: 'v' });
  });
  it('updateEta', () => {
    expect(TrackingControllerMapper.toUpdateEtaDto(UUID, { newEta: NOW } as never).newEta).toBe(NOW);
  });
});

// ═══ ROUTE ═══
describe('RouteControllerMapper — branches', () => {
  it('create full', () => {
    const d = RouteControllerMapper.toCreateDto({
      name: 'R', code: 'RT-01', type: 'delivery', optimization: 'balanced',
      warehouseId: UUID, vehicleId: UUID2, driverId: UUID,
      scheduledDate: NOW, isRecurring: true, recurrenceRule: 'RRULE',
    } as never);
    expect(d.name).toBe('R');
    expect(d.isRecurring).toBe(true);
  });
  it('list', () => {
    const o = RouteControllerMapper.toListOptions({
      status: 'draft', type: 'delivery', driverId: UUID, vehicleId: UUID2,
      warehouseId: UUID, search: 'x', page: 2, limit: 10,
    } as never);
    expect(o.filter?.status).toBe('draft');
    expect(o.filter?.driverId).toBe(UUID);
  });
  it('list empty', () => {
    const o = RouteControllerMapper.toListOptions({} as never);
    expect(o.page).toBe(1);
  });
  it('all tiny', () => {
    expect(RouteControllerMapper.toAddStopDto(UUID, { stopId: 's1', order: 0, location: 'A', address: 'B', shipmentIds: ['x'] } as never).routeId).toBe(UUID);
    expect(RouteControllerMapper.toRemoveStopDto(UUID, 's1').stopId).toBe('s1');
    expect(RouteControllerMapper.toReorderDto(UUID, { orderedStopIds: ['a'] } as never).orderedStopIds).toEqual(['a']);
    expect(RouteControllerMapper.toCompleteStopDto(UUID, 's1').stopId).toBe('s1');
    expect(RouteControllerMapper.toOptimizeDto(UUID, {} as never).routeId).toBe(UUID);
    expect(RouteControllerMapper.toPlanDto(UUID).routeId).toBe(UUID);
    expect(RouteControllerMapper.toStartDto(UUID).routeId).toBe(UUID);
    expect(RouteControllerMapper.toCompleteDto(UUID).routeId).toBe(UUID);
    expect(RouteControllerMapper.toCancelDto(UUID, { reason: 'x' } as never).reason).toBe('x');
  });
});

// ═══ FULFILLMENT ═══
describe('FulfillmentControllerMapper — branches', () => {
  it('create full', () => {
    const d = FulfillmentControllerMapper.toCreateDto({
      orderId: UUID, vendorId: UUID2, warehouseId: UUID,
      type: 'standard', priority: 'high', itemIds: ['i1'], slaHours: 24, notes: 'urgent',
    } as never);
    expect(d.orderId).toBe(UUID);
    expect(d.priority).toBe('high');
    expect(d.slaHours).toBe(24);
  });
  it('create minimal', () => {
    const d = FulfillmentControllerMapper.toCreateDto({
      orderId: UUID, type: 'standard', itemIds: ['i1'],
    } as never);
    expect(d.priority).toBeUndefined();
    expect(d.slaHours).toBeUndefined();
  });
  it('list', () => {
    const o = FulfillmentControllerMapper.toListOptions({
      orderId: UUID, vendorId: UUID2, warehouseId: UUID,
      status: 'pending', type: 'standard', priority: 'high',
      page: 2, limit: 10,
    } as never);
    expect(o.filter?.status).toBe('pending');
  });
  it('list empty', () => {
    const o = FulfillmentControllerMapper.toListOptions({} as never);
    expect(o.page).toBe(1);
  });
  it('all tiny', () => {
    expect(FulfillmentControllerMapper.toAssignDto(UUID, { assignedTo: UUID2 } as never).assignedTo).toBe(UUID2);
    expect(FulfillmentControllerMapper.toUpdateDto(UUID, {} as never).fulfillmentId).toBe(UUID);
    expect(FulfillmentControllerMapper.toStartProcessingDto(UUID).fulfillmentId).toBe(UUID);
    expect(FulfillmentControllerMapper.toStartPickingDto(UUID).fulfillmentId).toBe(UUID);
    expect(FulfillmentControllerMapper.toStartPackingDto(UUID).fulfillmentId).toBe(UUID);
    expect(FulfillmentControllerMapper.toReadyToShipDto(UUID).fulfillmentId).toBe(UUID);
    expect(FulfillmentControllerMapper.toShipDto(UUID).fulfillmentId).toBe(UUID);
    expect(FulfillmentControllerMapper.toFulfillDto(UUID).fulfillmentId).toBe(UUID);
    expect(FulfillmentControllerMapper.toPartialDto(UUID).fulfillmentId).toBe(UUID);
    expect(FulfillmentControllerMapper.toHoldDto(UUID, { reason: 'x' } as never).reason).toBe('x');
    expect(FulfillmentControllerMapper.toReleaseDto(UUID).fulfillmentId).toBe(UUID);
    expect(FulfillmentControllerMapper.toFailDto(UUID, { reason: 'x' } as never).reason).toBe('x');
    expect(FulfillmentControllerMapper.toCancelDto(UUID, { reason: 'x' } as never).reason).toBe('x');
  });
});

// ═══ DISPATCH ═══
describe('DispatchControllerMapper — branches', () => {
  it('create full', () => {
    const d = DispatchControllerMapper.toCreateDto({
      type: 'single', shipmentIds: ['s1'], courierId: UUID, vehicleId: UUID2,
      driverId: UUID, warehouseId: UUID2, estimatedArrivalAt: NOW, notes: 'x',
    } as never);
    expect(d.type).toBe('single');
    expect(d.courierId).toBe(UUID);
  });
  it('list', () => {
    const o = DispatchControllerMapper.toListOptions({
      courierId: UUID, warehouseId: UUID2, driverId: UUID,
      status: 'pending', type: 'single', page: 2, limit: 10,
    } as never);
    expect(o.filter?.courierId).toBe(UUID);
  });
  it('list empty', () => {
    const o = DispatchControllerMapper.toListOptions({} as never);
    expect(o.page).toBe(1);
  });
  it('all tiny', () => {
    expect(DispatchControllerMapper.toAddShipmentDto(UUID, { shipmentId: 's1' } as never).shipmentId).toBe('s1');
    expect(DispatchControllerMapper.toRemoveShipmentDto(UUID, 's1').shipmentId).toBe('s1');
    expect(DispatchControllerMapper.toAssignDto(UUID, { courierId: UUID2 } as never).courierId).toBe(UUID2);
    expect(DispatchControllerMapper.toManifestDto(UUID, { manifestUrl: 'http://m' } as never).manifestUrl).toBe('http://m');
    expect(DispatchControllerMapper.toUpdateEtaDto(UUID, { newEta: NOW } as never).newEta).toBe(NOW);
    expect(DispatchControllerMapper.toStartDto(UUID).dispatchId).toBe(UUID);
    expect(DispatchControllerMapper.toInTransitDto(UUID).dispatchId).toBe(UUID);
    expect(DispatchControllerMapper.toCompleteDto(UUID).dispatchId).toBe(UUID);
    expect(DispatchControllerMapper.toFailDto(UUID, { reason: 'x' } as never).reason).toBe('x');
    expect(DispatchControllerMapper.toReturnDto(UUID, { reason: 'x' } as never).reason).toBe('x');
    expect(DispatchControllerMapper.toCancelDto(UUID, { reason: 'x' } as never).reason).toBe('x');
  });
});

// ═══ RETURN SHIPMENT ═══
describe('ReturnShipmentControllerMapper — branches', () => {
  it('request full', () => {
    const d = ReturnShipmentControllerMapper.toRequestDto({
      orderId: UUID, originalShipmentId: UUID2, userId: UUID,
      type: 'customer_return', reason: 'defective', itemIds: ['i1'],
      description: 'x', images: ['http://i.png'], pickupAddress: ADDR,
    } as never);
    expect(d.orderId).toBe(UUID);
    expect(d.description).toBe('x');
  });
  it('request minimal', () => {
    const d = ReturnShipmentControllerMapper.toRequestDto({
      orderId: UUID, userId: UUID, type: 'customer_return', reason: 'defective',
      itemIds: ['i1'], pickupAddress: ADDR,
    } as never);
    expect(d.originalShipmentId).toBeUndefined();
  });
  it('list', () => {
    const o = ReturnShipmentControllerMapper.toListOptions({
      orderId: UUID, userId: UUID2, originalShipmentId: UUID,
      status: 'requested', type: 'customer_return', reason: 'defective',
      page: 2, limit: 10,
    } as never);
    expect(o.filter?.status).toBe('requested');
    expect(o.filter?.reason).toBe('defective');
  });
  it('list empty', () => {
    const o = ReturnShipmentControllerMapper.toListOptions({} as never);
    expect(o.page).toBe(1);
  });
  it('all tiny', () => {
    expect(ReturnShipmentControllerMapper.toApproveDto(UUID).returnId).toBe(UUID);
    expect(ReturnShipmentControllerMapper.toRejectDto(UUID, { reason: 'x' } as never).reason).toBe('x');
    expect(ReturnShipmentControllerMapper.toSchedulePickupDto(UUID, { pickupAt: NOW } as never).pickupAt).toBe(NOW);
    expect(ReturnShipmentControllerMapper.toPickupDto(UUID, {} as never).returnId).toBe(UUID);
    expect(ReturnShipmentControllerMapper.toPickupDto(UUID, { trackingNumber: 'T' } as never).trackingNumber).toBe('T');
    expect(ReturnShipmentControllerMapper.toInTransitDto(UUID).returnId).toBe(UUID);
    expect(ReturnShipmentControllerMapper.toReceiveDto(UUID).returnId).toBe(UUID);
    expect(ReturnShipmentControllerMapper.toInspectDto(UUID, { inspectedBy: UUID2, restockable: true } as never).restockable).toBe(true);
    expect(ReturnShipmentControllerMapper.toCompleteDto(UUID).returnId).toBe(UUID);
    expect(ReturnShipmentControllerMapper.toIssueRefundDto(UUID, { amount: 100, currency: 'BDT' } as never).amount).toBe(100);
    expect(ReturnShipmentControllerMapper.toCancelDto(UUID, {} as never).returnId).toBe(UUID);
    expect(ReturnShipmentControllerMapper.toMarkLostDto(UUID, { reason: 'x' } as never).reason).toBe('x');
  });
});

// ═══ INSURANCE ═══
describe('InsuranceControllerMapper — branches', () => {
  it('purchase full', () => {
    const d = InsuranceControllerMapper.toPurchaseDto({
      shipmentId: UUID, orderId: UUID2, userId: UUID,
      type: 'standard', coverages: ['loss', 'damage'],
      declaredValue: 5000, currency: 'BDT', startsAt: NOW, expiresAt: NOW,
    } as never);
    expect(d.shipmentId).toBe(UUID);
    expect(d.coverages).toEqual(['loss', 'damage']);
  });
  it('purchase minimal', () => {
    const d = InsuranceControllerMapper.toPurchaseDto({
      type: 'standard', coverages: ['loss'],
      declaredValue: 5000, currency: 'BDT', startsAt: NOW, expiresAt: NOW,
    } as never);
    expect(d.shipmentId).toBeUndefined();
  });
  it('list', () => {
    const o = InsuranceControllerMapper.toListOptions({
      shipmentId: UUID, orderId: UUID2, userId: UUID,
      status: 'active', type: 'standard', page: 2, limit: 10,
    } as never);
    expect(o.filter?.status).toBe('active');
  });
  it('list empty', () => {
    const o = InsuranceControllerMapper.toListOptions({} as never);
    expect(o.page).toBe(1);
  });
  it('all tiny', () => {
    expect(InsuranceControllerMapper.toActivateDto(UUID).insuranceId).toBe(UUID);
    expect(InsuranceControllerMapper.toExpireDto(UUID).insuranceId).toBe(UUID);
    expect(InsuranceControllerMapper.toCancelDto(UUID, { reason: 'x' } as never).reason).toBe('x');
    expect(InsuranceControllerMapper.toFileClaimDto(UUID, { reason: 'x', amount: 100, currency: 'BDT' } as never).insuranceId).toBe(UUID);
    expect(InsuranceControllerMapper.toStartReviewDto(UUID).insuranceId).toBe(UUID);
    expect(InsuranceControllerMapper.toApproveClaimDto(UUID, { approvedAmount: 100 } as never).approvedAmount).toBe(100);
    expect(InsuranceControllerMapper.toRejectClaimDto(UUID, { reason: 'x' } as never).reason).toBe('x');
    expect(InsuranceControllerMapper.toPayClaimDto(UUID).insuranceId).toBe(UUID);
    expect(InsuranceControllerMapper.toAppealDto(UUID, { reason: 'x' } as never).reason).toBe('x');
  });
});
