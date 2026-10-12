/**
 * Controller mapper tests (HTTP DTO → App DTO).
 */
import { describe, it, expect } from '@jest/globals';

import { CourierControllerMapper } from '@interfaces/mappers/courier.controller.mapper.js';
import { WarehouseControllerMapper } from '@interfaces/mappers/warehouse.controller.mapper.js';
import { VehicleControllerMapper } from '@interfaces/mappers/vehicle.controller.mapper.js';
import { DriverControllerMapper } from '@interfaces/mappers/driver.controller.mapper.js';
import { ZoneControllerMapper } from '@interfaces/mappers/zone.controller.mapper.js';
import { DeliveryControllerMapper } from '@interfaces/mappers/delivery.controller.mapper.js';
import { TrackingControllerMapper } from '@interfaces/mappers/tracking.controller.mapper.js';
import { PackagingControllerMapper } from '@interfaces/mappers/packaging.controller.mapper.js';
import { ShipmentControllerMapper } from '@interfaces/mappers/shipment.controller.mapper.js';

const UUID = '550e8400-e29b-41d4-a716-446655440000';

describe('CourierControllerMapper', () => {
  it('toRegisterDto', () => {
    const dto = CourierControllerMapper.toRegisterDto({
      name: 'Pathao', code: 'pathao', displayName: 'P', type: 'local',
      supportsCOD: true, supportsInsurance: false, supportsInternational: false,
      averageDeliveryDays: 2,
    } as never);
    expect(dto.name).toBe('Pathao');
    expect(dto.type).toBe('local');
  });
  it('toUpdateDto', () => {
    const dto = CourierControllerMapper.toUpdateDto('c1', { priority: 90 } as never);
    expect(dto.courierId).toBe('c1');
    expect(dto.priority).toBe(90);
  });
  it('toSuspendDto', () => {
    const dto = CourierControllerMapper.toSuspendDto('c1', { reason: 'x' } as never);
    expect(dto.reason).toBe('x');
  });
  it('toActivateDto', () => {
    const dto = CourierControllerMapper.toActivateDto('c1');
    expect(dto.courierId).toBe('c1');
  });
  it('toListOptions', () => {
    const dto = CourierControllerMapper.toListOptions({
      page: 2, limit: 50, status: 'active', type: 'local',
    } as never);
    expect(dto.page).toBe(2);
    expect(dto.limit).toBe(50);
    expect(dto.filter?.status).toBe('active');
  });
});

describe('WarehouseControllerMapper', () => {
  it('toCreateDto', () => {
    const dto = WarehouseControllerMapper.toCreateDto({
      name: 'W', code: 'WH-01', type: 'main',
      address: { line1: '12 Main', city: 'Dhaka', country: 'BD' },
      capacityM3: 100, capacityKg: 1000, zone: 'dhaka',
    } as never);
    expect(dto.name).toBe('W');
    expect(dto.capacityM3).toBe(100);
  });
  it('toUpdateDto', () => {
    const dto = WarehouseControllerMapper.toUpdateDto('w1', { name: 'X' } as never);
    expect(dto.warehouseId).toBe('w1');
  });
  it('toListOptions', () => {
    const dto = WarehouseControllerMapper.toListOptions({ page: 1, limit: 20 } as never);
    expect(dto.page).toBe(1);
  });
});

describe('VehicleControllerMapper', () => {
  it('toRegisterDto', () => {
    const dto = VehicleControllerMapper.toRegisterDto({
      registrationNumber: 'DHA-GA-1', type: 'truck_medium', fuelType: 'diesel',
      make: 'T', model: 'X', year: 2023, maxWeightKg: 5000,
    } as never);
    expect(dto.registrationNumber).toBe('DHA-GA-1');
  });
  it('toUpdateDto', () => {
    const dto = VehicleControllerMapper.toUpdateDto('v1', { mileageKm: 500 } as never);
    expect(dto.mileageKm).toBe(500);
  });
  it('toSetStatusDto', () => {
    const dto = VehicleControllerMapper.toSetStatusDto('v1', { status: 'in_use' } as never);
    expect(dto.status).toBe('in_use');
  });
  it('toAssignDriverDto', () => {
    const dto = VehicleControllerMapper.toAssignDriverDto('v1', { driverId: UUID } as never);
    expect(dto.driverId).toBe(UUID);
  });
  it('toUpdateMileageDto', () => {
    const dto = VehicleControllerMapper.toUpdateMileageDto('v1', { mileageKm: 1000 } as never);
    expect(dto.mileageKm).toBe(1000);
  });
});

describe('DriverControllerMapper', () => {
  it('toRegisterDto', () => {
    const dto = DriverControllerMapper.toRegisterDto({
      name: 'Rahim', phone: '+8801712345678', type: 'full_time',
      licenseNumber: 'DL-1', licenseType: 'heavy', licenseExpiresAt: '2030-01-01T00:00:00Z',
    } as never);
    expect(dto.name).toBe('Rahim');
  });
  it('toUpdateDto', () => {
    const dto = DriverControllerMapper.toUpdateDto('d1', { name: 'X' } as never);
    expect(dto.driverId).toBe('d1');
  });
  it('toSetStatusDto', () => {
    const dto = DriverControllerMapper.toSetStatusDto('d1', { status: 'on_duty' } as never);
    expect(dto.status).toBe('on_duty');
  });
  it('toAssignVehicleDto', () => {
    const dto = DriverControllerMapper.toAssignVehicleDto('d1', { vehicleId: UUID } as never);
    expect(dto.vehicleId).toBe(UUID);
  });
  it('toReceiveCashDto + toRemitCashDto', () => {
    expect(DriverControllerMapper.toReceiveCashDto('d1', { amount: 500 } as never).amount).toBe(500);
    expect(DriverControllerMapper.toRemitCashDto('d1', { amount: 200 } as never).amount).toBe(200);
  });
});

describe('ZoneControllerMapper', () => {
  it('toCreateDto', () => {
    const dto = ZoneControllerMapper.toCreateDto({
      name: 'Dhaka', code: 'DHK', type: 'district', pricingType: 'flat',
      shippingCost: 60, currency: 'BDT', minDeliveryDays: 1, maxDeliveryDays: 3,
      codEnabled: true,
    } as never);
    expect(dto.code).toBe('DHK');
  });
  it('toUpdateDto', () => {
    const dto = ZoneControllerMapper.toUpdateDto('z1', { shippingCost: 80, currency: 'BDT' } as never);
    expect(dto.zoneId).toBe('z1');
  });
  it('toActivateDto + toInactivateDto + toSuspendDto', () => {
    expect(ZoneControllerMapper.toActivateDto('z1').zoneId).toBe('z1');
    expect(ZoneControllerMapper.toInactivateDto('z1', {} as never).zoneId).toBe('z1');
    expect(ZoneControllerMapper.toSuspendDto('z1', { reason: 'x' } as never).reason).toBe('x');
  });
});

describe('DeliveryControllerMapper', () => {
  it('toScheduleDto', () => {
    const dto = DeliveryControllerMapper.toScheduleDto({
      shipmentId: UUID, orderId: UUID, type: 'standard',
      deliveryAddress: { line1: '12', city: 'D', country: 'BD' },
    } as never);
    expect(dto.shipmentId).toBe(UUID);
  });
  it('toAssignDto', () => {
    const dto = DeliveryControllerMapper.toAssignDto('d1', { driverId: UUID } as never);
    expect(dto.driverId).toBe(UUID);
  });
  it('toAttemptDto', () => {
    const dto = DeliveryControllerMapper.toAttemptDto('d1', { status: 'failed' } as never);
    expect(dto.status).toBe('failed');
  });
  it('toCompleteDto', () => {
    const dto = DeliveryControllerMapper.toCompleteDto('d1', { proofType: 'otp', otp: '1234' } as never);
    expect(dto.proofType).toBe('otp');
  });
  it('toFailDto + toRescheduleDto + toCancelDto', () => {
    expect(DeliveryControllerMapper.toFailDto('d1', { reason: 'x' } as never).reason).toBe('x');
    expect(DeliveryControllerMapper.toRescheduleDto('d1', { reason: 'x' } as never).reason).toBe('x');
    expect(DeliveryControllerMapper.toCancelDto('d1', {} as never).deliveryId).toBe('d1');
  });
});

describe('TrackingControllerMapper', () => {
  it('toStartDto', () => {
    const dto = TrackingControllerMapper.toStartDto({ trackingNumber: 'SH1', shipmentId: UUID } as never);
    expect(dto.trackingNumber).toBe('SH1');
  });
  it('toRecordDto', () => {
    const dto = TrackingControllerMapper.toRecordDto('t1', {
      event: 'picked_up', source: 'internal', message: 'ok',
    } as never);
    expect(dto.event).toBe('picked_up');
  });
  it('toUpdateEtaDto', () => {
    const dto = TrackingControllerMapper.toUpdateEtaDto('t1', { newEta: '2026-02-01T00:00:00Z' } as never);
    expect(dto.newEta).toBe('2026-02-01T00:00:00Z');
  });
});

describe('PackagingControllerMapper', () => {
  it('toCreateDto', () => {
    const dto = PackagingControllerMapper.toCreateDto({
      name: 'Box', code: 'BOX-S', type: 'box', material: 'cardboard',
      lengthCm: 20, widthCm: 15, heightCm: 10, maxWeightKg: 5,
      isFragile: false, isTemperatureControlled: false, isRecyclable: true, stock: 100,
    } as never);
    expect(dto.code).toBe('BOX-S');
  });
  it('toAdjustDto + toRestockDto + toConsumeDto', () => {
    expect(PackagingControllerMapper.toAdjustDto('p1', { delta: -5, reason: 'x' } as never).delta).toBe(-5);
    expect(PackagingControllerMapper.toRestockDto('p1', { quantity: 20 } as never).quantity).toBe(20);
    expect(PackagingControllerMapper.toConsumeDto('p1', { quantity: 5 } as never).quantity).toBe(5);
  });
  it('toSelectDto', () => {
    const dto = PackagingControllerMapper.toSelectDto({ weightKg: 3 } as never);
    expect(dto.weightKg).toBe(3);
  });
});

describe('ShipmentControllerMapper', () => {
  it('toCreateDto', () => {
    const dto = ShipmentControllerMapper.toCreateDto({
      orderId: UUID, type: 'standard',
      shippingAddress: { line1: '12 Main', city: 'Dhaka', country: 'BD' },
      packages: [{ orderItemId: UUID, quantity: 2 }],
      weightKg: 5,
    } as never);
    expect(dto.orderId).toBe(UUID);
    expect(dto.packages.length).toBe(1);
  });
  it('toCancelDto + toUpdateDto', () => {
    expect(ShipmentControllerMapper.toCancelDto('s1', { reason: 'user' } as never).reason).toBe('user');
    expect(ShipmentControllerMapper.toUpdateDto('s1', { notes: 'n' } as never).notes).toBe('n');
  });
  it('toListOptions', () => {
    const dto = ShipmentControllerMapper.toListOptions({ page: 2, limit: 50, status: 'pending' } as never);
    expect(dto.page).toBe(2);
  });
});
