/**
 * Entity branches — remaining 10 entities extra coverage.
 */
import { describe, it, expect } from '@jest/globals';

import { CourierEntity } from '@domain/entities/courier.entity.js';
import { WarehouseEntity } from '@domain/entities/warehouse.entity.js';
import { VehicleEntity } from '@domain/entities/vehicle.entity.js';
import { DriverEntity } from '@domain/entities/driver.entity.js';
import { ZoneEntity } from '@domain/entities/zone.entity.js';
import { ShippingMethodEntity } from '@domain/entities/shipping-method.entity.js';
import { PackagingEntity } from '@domain/entities/packaging.entity.js';
import { ShipmentEntity } from '@domain/entities/shipment.entity.js';
import { DispatchEntity } from '@domain/entities/dispatch.entity.js';
import { ReturnShipmentEntity } from '@domain/entities/return-shipment.entity.js';

import { ShipmentIdVO } from '@domain/value-objects/primitives/shipment-id.vo.js';
import { OrderIdVO } from '@domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { TrackingNumberVO } from '@domain/value-objects/primitives/tracking-number.vo.js';

const NOW = new Date().toISOString();
const UUID = '550e8400-e29b-41d4-a716-446655440000';
const UUID2 = '550e8400-e29b-41d4-a716-446655440001';
const UUID3 = '550e8400-e29b-41d4-a716-446655440002';
const ADDR = { line1: '12 Main St', city: 'Dhaka', country: 'BD' };

// ═══ Courier Entity — extra branches ═══
describe('CourierEntity — branch coverage', () => {
  function mkC(overrides: Record<string, unknown> = {}) {
    return CourierEntity.create({
      id: UUID, now: NOW,
      props: {
        name: 'Test', code: { value: 'pathao' } as never, displayName: 'Test',
        type: { value: 'local' } as never,
        apiEnabled: false, coverageZones: ['dhaka'],
        supportsCOD: true, supportsInsurance: false, supportsInternational: false,
        averageDeliveryDays: 3, isDefault: false, priority: 50,
        ...overrides,
      } as never,
    });
  }
  it('canShipTo', () => {
    expect(mkC().canShipTo('dhaka')).toBe(true);
    expect(mkC().canShipTo('chittagong')).toBe(false);
    const any = mkC({ coverageZones: [] });
    expect(any.canShipTo('anything')).toBe(true);
  });
  it('supportsCurrency BDT', () => { expect(mkC().supportsCurrency('BDT')).toBe(true); });
  it('canHandle variations', () => {
    const active = mkC();
    active.activate();
    expect(active.canHandle({ isCOD: true, isInsured: false, isInternational: false })).toBe(true);
    expect(active.canHandle({ isCOD: false, isInsured: true, isInternational: false })).toBe(false);
    expect(active.canHandle({ isCOD: false, isInsured: false, isInternational: true })).toBe(false);
  });
  it('changePriority validation', () => {
    const c = mkC();
    c.changePriority(80);
    expect(c.priority).toBe(80);
    expect(() => c.changePriority(200)).toThrow();
  });
});

// ═══ Warehouse Entity — extra ═══
describe('WarehouseEntity — branch coverage', () => {
  function mkW(overrides: Record<string, unknown> = {}) {
    return WarehouseEntity.create({
      id: UUID, now: NOW,
      props: {
        code: { value: 'WH-01' } as never, name: 'WH',
        type: { value: 'main' } as never,
        address: { toAddress: () => ADDR } as never,
        capacity: { capacityM3: 1000, usedM3: 300, capacityKg: 10000, usedKg: 3000,
          availableM3: 700, availableKg: 7000, isFull: () => false,
          withAdded: () => ({ capacityM3: 1000, usedM3: 350, capacityKg: 10000, usedKg: 3500,
            availableM3: 650, availableKg: 6500, isFull: () => false }) } as never,
        maxSkus: 100, zone: 'dhaka', timezone: 'Asia/Dhaka', isDefault: false,
        operatingHoursStart: 8, operatingHoursEnd: 22,
        ...overrides,
      } as never,
    });
  }
  it('isOpenNow', () => {
    const w = mkW(); w.activate();
    const at = new Date(); at.setHours(10);
    expect(w.isOpenNow(at)).toBe(true);
    at.setHours(2);
    expect(w.isOpenNow(at)).toBe(false);
  });
  it('reserveCapacity updates used', () => {
    const w = mkW(); w.activate();
    w.reserveCapacity(50, 500);
    expect(w.capacity.usedM3).toBe(350);
  });
  it('releaseCapacity clamps at 0', () => {
    const w = mkW();
    w.releaseCapacity(5000, 5000);
    expect(w.capacity.usedM3).toBe(0);
  });
  it('assignManager + updateContact', () => {
    const w = mkW();
    w.assignManager(UUID as never);
    w.updateContact({ name: 'Mgr', phone: undefined, email: undefined });
    expect(w.managerId).toBe(UUID);
  });
  it('markAsDefault + unmarkAsDefault', () => {
    const w = mkW();
    w.markAsDefault();
    expect(w.isDefault).toBe(true);
    w.unmarkAsDefault();
    expect(w.isDefault).toBe(false);
    w.unmarkAsDefault(); // no-op
  });
});

// ═══ Vehicle Entity — extra ═══
describe('VehicleEntity — branch coverage', () => {
  function mkV(overrides: Record<string, unknown> = {}) {
    return VehicleEntity.create({
      id: UUID, now: NOW,
      props: {
        registrationNumber: 'DHK-1', type: { value: 'motorcycle' } as never,
        fuelType: { value: 'petrol' } as never,
        make: 'Honda', model: 'CB', year: 2024,
        maxWeightKg: 100, maxVolumeM3: 1, mileageKm: 1000, isActive: true,
        ...overrides,
      } as never,
    });
  }
  it('canCarry', () => {
    expect(mkV().canCarry(50)).toBe(true);
    expect(mkV().canCarry(200)).toBe(false);
    expect(mkV().canCarry(50, 0.5)).toBe(true);
    expect(mkV().canCarry(50, 2)).toBe(false);
  });
  it('updateMileage', () => {
    const v = mkV();
    v.updateMileage(2000);
    expect(v.mileageKm).toBe(2000);
    expect(() => v.updateMileage(500)).toThrow();
  });
  it('insurance/registration expiry', () => {
    const v = mkV({ insuranceExpiresAt: NOW });
    expect(v.isInsuranceExpired()).toBe(true);
  });
  it('needsServiceSoon', () => {
    const soon = new Date(Date.now() + 3 * 86400000).toISOString();
    expect(mkV({ nextServiceAt: soon }).needsServiceSoon()).toBe(true);
    expect(mkV().needsServiceSoon()).toBe(false);
  });
});

// ═══ Driver Entity — extra ═══
describe('DriverEntity — branch coverage', () => {
  function mkD(overrides: Record<string, unknown> = {}) {
    return DriverEntity.create({
      id: UUID, now: NOW,
      props: {
        name: 'Karim', phone: '+8801712345678' as never,
        type: { value: 'full_time' } as never,
        licenseNumber: 'L1', licenseType: { value: 'light' } as never,
        licenseExpiresAt: NOW,
        ...overrides,
      } as never,
    });
  }
  it('license expiry + soon', () => {
    expect(mkD().isLicenseExpired()).toBe(true);
    const future = new Date(Date.now() + 20 * 86400000).toISOString();
    const d = mkD({ licenseExpiresAt: future });
    expect(d.isLicenseExpiringSoon()).toBe(true);
  });
  it('receiveCash + remitCash', () => {
    const d = mkD({ cashLimit: 50000 });
    d.receiveCash(1000);
    expect(d.cashInHand).toBe(1000);
    d.remitCash(500);
    expect(d.cashInHand).toBe(500);
    expect(() => d.remitCash(9999)).toThrow();
  });
  it('recordDelivery increments stats', () => {
    const d = mkD();
    d.recordDelivery('s1', 10);
    expect(d.totalDeliveries).toBe(1);
    expect(d.totalDistanceKm).toBe(10);
  });
  it('updateRating in range', () => {
    const d = mkD();
    d.updateRating(5);
    expect(d.rating).toBe(5);
    expect(() => d.updateRating(6)).toThrow();
  });
  it('goOnDuty/onBreak/offDuty lifecycle', () => {
    const d = mkD();
    d.goOnDuty();
    expect(d.status.value).toBe('on_duty');
    d.startBreak();
    expect(d.status.value).toBe('on_break');
    d.endBreak();
    expect(d.status.value).toBe('on_duty');
    d.goOffDuty();
    expect(d.status.value).toBe('off_duty');
  });
});

// ═══ Zone Entity — extra ═══
describe('ZoneEntity — branch coverage', () => {
  function mkZ(overrides: Record<string, unknown> = {}) {
    return ZoneEntity.create({
      id: UUID, now: NOW,
      props: {
        name: 'Dhaka', code: 'DHK',
        type: { value: 'district' } as never,
        pricingType: { value: 'flat', isFixedPrice: () => true, requiresWeight: () => false } as never,
        postalCodes: ['1200'], districts: ['Dhaka'], divisions: ['Dhaka'],
        shippingCost: { amount: 60, currency: 'BDT' } as never,
        minDeliveryDays: 1, maxDeliveryDays: 3,
        codEnabled: true, isRemote: false,
        ...overrides,
      } as never,
    });
  }
  it('covers checks', () => {
    expect(mkZ().coversPostalCode('1200')).toBe(true);
    expect(mkZ().coversDistrict('Dhaka')).toBe(true);
    expect(mkZ().coversDivision('Dhaka')).toBe(true);
    expect(mkZ().coversPostalCode('9999')).toBe(false);
  });
  it('estimatedDeliveryDays', () => {
    expect(mkZ().estimatedDeliveryDays).toBe(2);
  });
  it('calculateShippingCost', () => {
    expect(mkZ().calculateShippingCost(5).amount).toBe(60);
  });
  it('updateShippingCost', () => {
    const z = mkZ();
    z.updateShippingCost({ amount: 100, currency: 'BDT' } as never);
    expect(z.shippingCost.amount).toBe(100);
  });
});

// ═══ ShippingMethod Entity — extra ═══
describe('ShippingMethodEntity — branch coverage', () => {
  function mkS(overrides: Record<string, unknown> = {}) {
    return ShippingMethodEntity.create({
      id: UUID, now: NOW,
      props: {
        name: 'Standard', code: { value: 'standard' } as never, displayName: 'Std',
        rateType: { value: 'flat', requiresWeight: () => false } as never,
        baseCost: { amount: 60, currency: 'BDT' } as never,
        minDeliveryDays: 1, maxDeliveryDays: 3,
        codEnabled: true, trackingEnabled: true,
        coverageZones: ['dhaka'], couriers: ['pathao'], isDefault: false,
        ...overrides,
      } as never,
    });
  }
  it('coversZone', () => {
    expect(mkS().coversZone('dhaka')).toBe(true);
    expect(mkS().coversZone('ctg')).toBe(false);
    expect(mkS({ coverageZones: [] }).coversZone('any')).toBe(true);
  });
  it('canHandleWeight', () => {
    expect(mkS().canHandleWeight(1000)).toBe(true);
  });
  it('calculateCost', () => {
    expect(mkS().calculateCost(500, 1).amount).toBe(60);
  });
  it('calculateCost with freeAbove', () => {
    const s = mkS({ freeAbove: { amount: 1000, currency: 'BDT' } as never });
    expect(s.calculateCost(1500, 1).amount).toBe(0);
  });
  it('lifecycle activate/deactivate/seasonal/suspend', () => {
    const s = mkS();
    s.deactivate('test');
    s.activate();
    s.makeSeasonal();
    expect(s.status.value).toBe('seasonal');
  });
});

// ═══ Packaging Entity — extra ═══
describe('PackagingEntity — branch coverage', () => {
  function mkP(overrides: Record<string, unknown> = {}) {
    return PackagingEntity.create({
      id: UUID, now: NOW,
      props: {
        name: 'Box', code: 'BOX1',
        type: { value: 'box' } as never,
        material: { value: 'cardboard' } as never,
        dimensions: { lengthCm: 10, widthCm: 10, heightCm: 10, volumetricWeightKg: 0.2, girthCm: 20, longestSideCm: 10, toString: () => '10x10x10' } as never,
        maxWeightKg: { value: 5 } as never,
        isFragile: false, isTemperatureControlled: false, isRecyclable: true,
        stock: 10, isDefault: false,
        ...overrides,
      } as never,
    });
  }
  it('canHold weight + dims', () => {
    expect(mkP().canHold(3)).toBe(true);
    expect(mkP().canHold(10)).toBe(false);
    expect(mkP().canHold(3, { lengthCm: 5, widthCm: 5, heightCm: 5 })).toBe(true);
    expect(mkP().canHold(3, { lengthCm: 20, widthCm: 5, heightCm: 5 })).toBe(false);
  });
  it('canBeUsed', () => {
    expect(mkP().canBeUsed()).toBe(true);
    expect(mkP({ stock: 0 }).canBeUsed()).toBe(false);
  });
  it('restock + consume', () => {
    const p = mkP();
    p.restock(5);
    expect(p.stock).toBe(15);
    p.consume(10);
    expect(p.stock).toBe(5);
    expect(() => p.consume(100)).toThrow();
  });
  it('adjustStock', () => {
    const p = mkP();
    p.adjustStock(-5, 'test');
    expect(p.stock).toBe(5);
    p.adjustStock(10, 'restock');
    expect(p.stock).toBe(15);
  });
  it('consume to 0 → outOfStock', () => {
    const p = mkP();
    p.consume(10);
    expect(p.status.value).toBe('out_of_stock');
  });
  it('requiresSpecialHandling', () => {
    expect(mkP({ isFragile: true }).requiresSpecialHandling()).toBe(true);
    expect(mkP({ isTemperatureControlled: true }).requiresSpecialHandling()).toBe(true);
    expect(mkP().requiresSpecialHandling()).toBe(false);
  });
});

// ═══ Shipment Entity — extra branches ═══
describe('ShipmentEntity — branch coverage', () => {
  function mkS(overrides: Record<string, unknown> = {}) {
    return ShipmentEntity.create({
      id: UUID, now: NOW,
      props: {
        trackingNumber: TrackingNumberVO.create('SHTEST12345678'),
        orderId: OrderIdVO.reconstitute(UUID2),
        type: { value: 'standard' } as never,
        priority: { value: 'normal' } as never,
        dimensions: { actualWeightKg: { value: 5 }, chargeableWeightKg: { value: 5 }, isVolumetricDominant: () => false, hasDimensions: () => false } as never,
        shippingAddress: { toAddress: () => ADDR } as never,
        packages: [{ orderItemId: 'i1', quantity: 2 }] as never,
        itemCount: 2, isCOD: false, isInsured: false,
        ...overrides,
      } as never,
    });
  }
  it('workflow to delivered', () => {
    const s = mkS();
    s.confirm(); s.startProcessing(); s.markPacked();
    s.assignCourier({ value: UUID } as never);
    s.assignWarehouse({ value: UUID2 } as never);
    s.generateLabel('http://label.pdf');
    s.pickup();
    s.markInTransit();
    s.markOutForDelivery();
    s.markDelivered('R');
    expect(s.isDelivered()).toBe(true);
  });
  it('cancel before flight', () => {
    const s = mkS();
    s.cancel('test');
    expect(s.isCancelled()).toBe(true);
  });
  it('assignCourier + assignWarehouse + changePriority', () => {
    const s = mkS();
    s.assignCourier({ value: UUID } as never);
    s.assignWarehouse({ value: UUID2 } as never);
    s.changePriority({ value: 'high' } as never);
    expect(s.hasCourier()).toBe(true);
    expect(s.hasWarehouse()).toBe(true);
  });
  it('isReadyForPickup false initially', () => {
    expect(mkS().isReadyForPickup()).toBe(false);
  });
  it('markFailed requires reason', () => {
    const s = mkS();
    expect(() => s.markFailed('')).toThrow();
  });
  it('canBeReturned only after delivery', () => {
    expect(mkS().canBeReturned()).toBe(false);
  });
});

// ═══ Dispatch Entity — extra ═══
describe('DispatchEntity — branch coverage', () => {
  function mkD(overrides: Record<string, unknown> = {}) {
    return DispatchEntity.create({
      id: UUID, now: NOW,
      props: {
        dispatchNumber: { value: 'DSP-20260115-0001' } as never,
        type: { value: 'single' } as never,
        shipmentIds: ['s1'],
        itemCount: 1,
        ...overrides,
      } as never,
    });
  }
  it('addShipment + removeShipment', () => {
    const d = mkD();
    d.addShipment('s2');
    expect(d.shipmentCount).toBe(2);
    d.removeShipment('s2');
    expect(d.shipmentCount).toBe(1);
    expect(() => d.removeShipment('unknown')).toThrow();
  });
  it('addShipment rejects duplicate', () => {
    const d = mkD();
    expect(() => d.addShipment('s1')).toThrow();
  });
  it('generateManifest', () => {
    const d = mkD();
    d.generateManifest('http://m.pdf');
    expect(d.hasManifest).toBe(true);
  });
  it('updateEta', () => {
    const d = mkD();
    d.updateEta(NOW);
    expect(d.estimatedArrivalAt).toBe(NOW);
  });
  it('full workflow', () => {
    const d = mkD({ courierId: { value: UUID } as never, manifestUrl: 'http://m.pdf' });
    d.start();
    d.markInTransit();
    d.markDelivered();
    expect(d.isDelivered()).toBe(true);
  });
  it('fail + return + cancel', () => {
    const d = mkD({ courierId: { value: UUID } as never });
    d.start();
    d.fail('oops');
    expect(d.isFailed()).toBe(true);
  });
});

// ═══ ReturnShipment Entity — extra ═══
describe('ReturnShipmentEntity — branch coverage', () => {
  function mkR(overrides: Record<string, unknown> = {}) {
    return ReturnShipmentEntity.request({
      id: UUID, now: NOW,
      props: {
        rmaNumber: { value: 'RMA-2026-000123' } as never,
        orderId: OrderIdVO.reconstitute(UUID2),
        userId: UserIdVO.reconstitute(UUID),
        type: { value: 'customer_return' } as never,
        reason: { value: 'defective', requiresPhotos: () => false, isSellerFault: () => false } as never,
        itemIds: ['i1'],
        images: [],
        pickupAddress: { toAddress: () => ADDR } as never,
        ...overrides,
      } as never,
    });
  }
  it('approve → reject', () => {
    const r = mkR();
    r.approve();
    expect(r.isApproved()).toBe(true);
  });
  it('reject from requested', () => {
    const r = mkR();
    r.reject('bad');
    expect(r.isRejected()).toBe(true);
  });
  it('schedulePickup + markPickedUp + in-transit + receive + inspect', () => {
    const r = mkR();
    r.approve();
    r.schedulePickup(NOW);
    r.markPickedUp();
    r.markInTransit();
    r.markReceived();
    r.inspect(UserIdVO.reconstitute(UUID), true);
    expect(r.isInspected()).toBe(true);
    expect(r.restockable).toBe(true);
  });
  it('complete → refund', () => {
    const r = mkR();
    r.approve(); r.schedulePickup(NOW); r.markPickedUp(); r.markInTransit();
    r.markReceived(); r.inspect(UserIdVO.reconstitute(UUID), true);
    r.complete();
    r.issueRefund({ amount: 100, currency: 'BDT' } as never, 0);
    expect(r.hasRefund).toBe(true);
  });
  it('issueRefund requires inspection', () => {
    const r = mkR();
    expect(() => r.issueRefund({ amount: 100, currency: 'BDT' } as never)).toThrow();
  });
  it('markLost', () => {
    const r = mkR();
    r.approve();
    r.schedulePickup(NOW);
    r.markLost('lost');
    expect(r.isLost()).toBe(true);
  });
  it('cancel from requested', () => {
    const r = mkR();
    r.cancel('user cancel');
    expect(r.isCancelled()).toBe(true);
  });
});
