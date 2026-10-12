/**
 * Entity factory + lifecycle tests (ESM-safe, static imports only).
 */
import { describe, it, expect } from '@jest/globals';

import { ShipmentEntity } from '@domain/entities/shipment.entity.js';
import { CourierEntity } from '@domain/entities/courier.entity.js';
import { WarehouseEntity } from '@domain/entities/warehouse.entity.js';
import { VehicleEntity } from '@domain/entities/vehicle.entity.js';
import { DriverEntity } from '@domain/entities/driver.entity.js';
import { ZoneEntity } from '@domain/entities/zone.entity.js';
import { ShippingMethodEntity } from '@domain/entities/shipping-method.entity.js';
import { PackagingEntity } from '@domain/entities/packaging.entity.js';
import { DeliveryEntity } from '@domain/entities/delivery.entity.js';
import { TrackingEntity } from '@domain/entities/tracking.entity.js';
import { RouteEntity } from '@domain/entities/route.entity.js';
import { FulfillmentEntity } from '@domain/entities/fulfillment.entity.js';
import { DispatchEntity } from '@domain/entities/dispatch.entity.js';
import { ReturnShipmentEntity } from '@domain/entities/return-shipment.entity.js';
import { InsuranceEntity } from '@domain/entities/insurance.entity.js';

import { TrackingNumberVO } from '@domain/value-objects/primitives/tracking-number.vo.js';
import { OrderIdVO } from '@domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { ShipmentIdVO } from '@domain/value-objects/primitives/shipment-id.vo.js';
import { CourierIdVO } from '@domain/value-objects/primitives/courier-id.vo.js';
import { WarehouseIdVO } from '@domain/value-objects/primitives/warehouse-id.vo.js';
import { DriverIdVO } from '@domain/value-objects/primitives/driver-id.vo.js';
import { VehicleIdVO } from '@domain/value-objects/primitives/vehicle-id.vo.js';
import { ShipmentTypeVO } from '@domain/value-objects/primitives/shipment-type.vo.js';
import { ShipmentPriorityVO } from '@domain/value-objects/primitives/shipment-priority.vo.js';
import { AddressDetailsVO } from '@domain/value-objects/composites/address-details.vo.js';
import { ShipmentDimensionsVO } from '@domain/value-objects/composites/shipment-dimensions.vo.js';
import { PackageRefVO } from '@domain/value-objects/composites/package-ref.vo.js';
import { CourierNameVO } from '@domain/value-objects/primitives/courier-name.vo.js';
import { CourierTypeVO } from '@domain/value-objects/primitives/courier-type.vo.js';
import { WarehouseCodeVO } from '@domain/value-objects/primitives/warehouse-code.vo.js';
import { WarehouseTypeVO } from '@domain/value-objects/primitives/warehouse-type.vo.js';
import { CapacityVO } from '@domain/value-objects/composites/capacity.vo.js';
import { VehicleTypeVO } from '@domain/value-objects/primitives/vehicle-type.vo.js';
import { VehicleFuelTypeVO } from '@domain/value-objects/primitives/vehicle-fuel-type.vo.js';
import { DriverTypeVO } from '@domain/value-objects/primitives/driver-type.vo.js';
import { DriverLicenseTypeVO } from '@domain/value-objects/primitives/driver-license-type.vo.js';
import { ZoneTypeVO } from '@domain/value-objects/primitives/zone-type.vo.js';
import { ZonePricingTypeVO } from '@domain/value-objects/primitives/zone-pricing-type.vo.js';
import { ShippingCostVO } from '@domain/value-objects/primitives/shipping-cost.vo.js';
import { ShippingMethodValueVO } from '@domain/value-objects/primitives/shipping-method-value.vo.js';
import { ShippingRateTypeVO } from '@domain/value-objects/primitives/shipping-rate-type.vo.js';
import { PackagingTypeVO } from '@domain/value-objects/primitives/packaging-type.vo.js';
import { PackagingMaterialVO } from '@domain/value-objects/primitives/packaging-material.vo.js';
import { DimensionCmVO } from '@domain/value-objects/primitives/dimension-cm.vo.js';
import { WeightKgVO } from '@domain/value-objects/primitives/weight-kg.vo.js';
import { DeliveryTypeVO } from '@domain/value-objects/primitives/delivery-type.vo.js';
import { RouteCodeVO } from '@domain/value-objects/primitives/route-code.vo.js';
import { RouteTypeVO } from '@domain/value-objects/primitives/route-type.vo.js';
import { RouteOptimizationVO } from '@domain/value-objects/primitives/route-optimization.vo.js';
import { RouteStopVO } from '@domain/value-objects/composites/route-stop.vo.js';
import { FulfillmentTypeVO } from '@domain/value-objects/primitives/fulfillment-type.vo.js';
import { FulfillmentPriorityVO } from '@domain/value-objects/primitives/fulfillment-priority.vo.js';
import { DispatchNumberVO } from '@domain/value-objects/primitives/dispatch-number.vo.js';
import { DispatchTypeVO } from '@domain/value-objects/primitives/dispatch-type.vo.js';
import { RmaNumberVO } from '@domain/value-objects/primitives/rma-number.vo.js';
import { ReturnShipmentTypeVO } from '@domain/value-objects/primitives/return-shipment-type.vo.js';
import { ReturnReasonVO } from '@domain/value-objects/primitives/return-reason.vo.js';
import { RefundAmountVO } from '@domain/value-objects/primitives/refund-amount.vo.js';
import { InsuranceTypeVO } from '@domain/value-objects/primitives/insurance-type.vo.js';
import { InsuranceCoverageVO } from '@domain/value-objects/primitives/insurance-coverage.vo.js';
import { DeclaredValueVO } from '@domain/value-objects/primitives/declared-value.vo.js';
import { ReasonTextVO } from '@domain/value-objects/primitives/reason-text.vo.js';
import { ProofOfDeliveryVO } from '@domain/value-objects/composites/proof-of-delivery.vo.js';

const NOW = '2026-01-01T00:00:00.000Z';
const UUID = '550e8400-e29b-41d4-a716-446655440000';
const UUID2 = '550e8400-e29b-41d4-a716-446655440001';
const ADDR = AddressDetailsVO.create({ address: { line1: '12 Main St', city: 'Dhaka', country: 'BD' } });

// ═══ SHIPMENT ═══
describe('ShipmentEntity', () => {
  const baseProps = () => ({
    trackingNumber: TrackingNumberVO.create('SHTEST12345678'),
    orderId: OrderIdVO.create(UUID),
    type: ShipmentTypeVO.standard(),
    priority: ShipmentPriorityVO.normal(),
    dimensions: ShipmentDimensionsVO.create({ actualWeightKg: 5 }),
    shippingAddress: ADDR,
    packages: [PackageRefVO.create({ orderItemId: UUID2, quantity: 2 })],
    itemCount: 2,
    isCOD: false,
    isInsured: false,
  });

  it('create + reconstitute', () => {
    const s = ShipmentEntity.create({ id: UUID, now: NOW, props: baseProps() });
    expect(s.id).toBe(UUID);
    expect(s.isPending()).toBe(true);
    const r = ShipmentEntity.reconstitute({
      id: UUID, createdAt: NOW, updatedAt: NOW, version: 1,
      props: { ...baseProps(), status: s.status },
    });
    expect(r.id).toBe(UUID);
  });

  it('full happy path lifecycle', () => {
    const s = ShipmentEntity.create({ id: UUID, now: NOW, props: baseProps() });
    s.assignCourier(CourierIdVO.reconstitute(UUID2), NOW);
    s.confirm(NOW); expect(s.isConfirmed()).toBe(true);
    s.startProcessing(NOW); expect(s.isProcessing()).toBe(true);
    s.markPacked(NOW); expect(s.isPacked()).toBe(true);
    s.pickup(undefined, NOW); expect(s.isPickedUp()).toBe(true);
    s.markInTransit(NOW); expect(s.isInTransit()).toBe(true);
    s.markOutForDelivery(NOW); expect(s.isOutForDelivery()).toBe(true);
    s.markDelivered('Rahim', NOW); expect(s.isDelivered()).toBe(true);
  });

  it('cancel before in-flight', () => {
    const s = ShipmentEntity.create({ id: UUID, now: NOW, props: baseProps() });
    s.cancel('user request', undefined, NOW);
    expect(s.isCancelled()).toBe(true);
  });

  it('markFailed', () => {
    const s = ShipmentEntity.create({ id: UUID, now: NOW, props: baseProps() });
    s.assignCourier(CourierIdVO.reconstitute(UUID2), NOW);
    s.confirm(NOW); s.startProcessing(NOW); s.markPacked(NOW); s.pickup(undefined, NOW);
    s.markFailed('damaged', NOW);
    expect(s.isFailed()).toBe(true);
  });

  it('putOnHold + release', () => {
    const s = ShipmentEntity.create({ id: UUID, now: NOW, props: baseProps() });
    s.putOnHold('review', NOW);
    expect(s.isOnHold()).toBe(true);
    s.release(NOW);
    expect(s.isProcessing()).toBe(true);
  });

  it('markDelayed', () => {
    const s = ShipmentEntity.create({ id: UUID, now: NOW, props: baseProps() });
    s.assignCourier(CourierIdVO.reconstitute(UUID2), NOW);
    s.confirm(NOW); s.startProcessing(NOW); s.markPacked(NOW); s.pickup(undefined, NOW);
    s.markInTransit(NOW);
    s.markDelayed('2026-02-01T00:00:00Z', 'traffic', NOW);
    expect(s.isDelayed()).toBe(true);
  });

  it('assignCourier + assignWarehouse + changePriority', () => {
    const s = ShipmentEntity.create({ id: UUID, now: NOW, props: baseProps() });
    s.assignCourier(CourierIdVO.reconstitute(UUID2), NOW);
    s.assignWarehouse(WarehouseIdVO.reconstitute(UUID2), NOW);
    expect(s.hasCourier()).toBe(true);
    expect(s.hasWarehouse()).toBe(true);
    s.changePriority(ShipmentPriorityVO.urgent(), NOW);
    expect(s.priority.isUrgent()).toBe(true);
  });

  it('generateLabel requires courier + packed', () => {
    const s = ShipmentEntity.create({ id: UUID, now: NOW, props: baseProps() });
    s.assignCourier(CourierIdVO.reconstitute(UUID2), NOW);
    s.confirm(NOW); s.startProcessing(NOW); s.markPacked(NOW);
    s.generateLabel('https://label.url/x', NOW);
    expect(s.hasLabel()).toBe(true);
  });
});

// ═══ COURIER ═══
describe('CourierEntity', () => {
  const props = () => ({
    name: 'Pathao', code: CourierNameVO.pathao(), displayName: 'Pathao Courier',
    type: CourierTypeVO.local(),
    trackingUrlTemplate: 'https://pathao.com/track/{trackingNumber}',
    apiEnabled: false,
    coverageZones: ['dhaka'],
    supportsCOD: true, supportsInsurance: true, supportsInternational: false,
    averageDeliveryDays: 2, isDefault: false, priority: 50,
  });

  it('activate + suspend + reactivate', () => {
    const c = CourierEntity.create({ id: UUID, now: NOW, props: props() });
    c.activate(NOW); expect(c.isOperational()).toBe(true);
    c.suspend('fraud', NOW); expect(c.status.isSuspended()).toBe(true);
    c.activate(NOW); expect(c.isOperational()).toBe(true);
  });

  it('canShipTo + canHandle', () => {
    const c = CourierEntity.create({ id: UUID, now: NOW, props: props() });
    c.activate(NOW);
    expect(c.canShipTo('dhaka')).toBe(true);
    expect(c.canShipTo('chittagong')).toBe(false);
    expect(c.canHandle({ isCOD: true, isInsured: true, isInternational: false })).toBe(true);
  });

  it('changePriority + markAsDefault + unmarkAsDefault', () => {
    const c = CourierEntity.create({ id: UUID, now: NOW, props: props() });
    c.activate(NOW);
    c.changePriority(90, NOW); expect(c.priority).toBe(90);
    c.markAsDefault(NOW); expect(c.isDefault).toBe(true);
    c.unmarkAsDefault(NOW); expect(c.isDefault).toBe(false);
  });

  it('deactivate + terminate', () => {
    const c = CourierEntity.create({ id: UUID, now: NOW, props: props() });
    c.activate(NOW);
    c.deactivate('pause', NOW); expect(c.status.isInactive()).toBe(true);
    c.terminate('end', NOW); expect(c.status.isTerminated()).toBe(true);
  });
});

// ═══ WAREHOUSE ═══
describe('WarehouseEntity', () => {
  const props = () => ({
    code: WarehouseCodeVO.create('WH-01'), name: 'Main WH',
    type: WarehouseTypeVO.main(), address: ADDR,
    capacity: CapacityVO.create({ capacityM3: 100, usedM3: 10, capacityKg: 1000, usedKg: 100 }),
    maxSkus: 5000, zone: 'dhaka', timezone: 'Asia/Dhaka', isDefault: false,
  });

  it('create + activate + reserve + release', () => {
    const w = WarehouseEntity.create({ id: UUID, now: NOW, props: props() });
    w.activate(NOW); expect(w.isActive()).toBe(true);
    w.reserveCapacity(10, 100, NOW);
    expect(w.capacity.usedM3).toBe(20);
    w.releaseCapacity(10, 100, NOW);
    expect(w.capacity.usedM3).toBe(10);
  });

  it('maintenance cycle', () => {
    const w = WarehouseEntity.create({ id: UUID, now: NOW, props: props() });
    w.activate(NOW);
    w.startMaintenance('annual', NOW); expect(w.status.isMaintenance()).toBe(true);
    w.completeMaintenance(NOW); expect(w.isActive()).toBe(true);
  });

  it('isOpenNow + utilization', () => {
    const w = WarehouseEntity.create({
      id: UUID, now: NOW,
      props: { ...props(), operatingHoursStart: 8, operatingHoursEnd: 18 },
    });
    w.activate(NOW);
    expect(w.isOpenNow(new Date('2026-01-01T10:00:00'))).toBe(true);
    expect(w.isOpenNow(new Date('2026-01-01T20:00:00'))).toBe(false);
    expect(w.utilizationPercent.value).toBe(10);
  });
});

// ═══ VEHICLE ═══
describe('VehicleEntity', () => {
  const props = () => ({
    registrationNumber: 'DHA-GA-1234',
    type: VehicleTypeVO.truckMedium(),
    fuelType: VehicleFuelTypeVO.diesel(),
    make: 'Tata', model: 'LPT', year: 2023,
    maxWeightKg: 5000, isActive: true,
  });

  it('assign driver + markInUse', () => {
    const v = VehicleEntity.create({ id: UUID, now: NOW, props: props() });
    expect(v.isAvailable()).toBe(true);
    v.assignDriver(DriverIdVO.reconstitute(UUID2), NOW);
    expect(v.hasDriver()).toBe(true);
    v.markInUse(NOW); expect(v.isInUse()).toBe(true);
  });

  it('canCarry + updateMileage + maintenance', () => {
    const v = VehicleEntity.create({ id: UUID, now: NOW, props: props() });
    expect(v.canCarry(4000)).toBe(true);
    expect(v.canCarry(6000)).toBe(false);
    v.updateMileage(500, NOW); expect(v.mileageKm).toBe(500);
    v.startMaintenance('routine', NOW);
    v.completeMaintenance(NOW);
    expect(v.isAvailable()).toBe(true);
  });

  it('markOutOfService + retire + unassignDriver', () => {
    const v = VehicleEntity.create({ id: UUID, now: NOW, props: props() });
    v.assignDriver(DriverIdVO.reconstitute(UUID2), NOW);
    v.unassignDriver(NOW); expect(v.hasDriver()).toBe(false);
    v.markOutOfService('accident', NOW);
    v.retire('end', NOW); expect(v.isRetired()).toBe(true);
  });
});

// ═══ DRIVER ═══
describe('DriverEntity', () => {
  const props = () => ({
    name: 'Rahim', phone: '+8801712345678' as never,
    type: DriverTypeVO.fullTime(),
    licenseNumber: 'DL-1234', licenseType: DriverLicenseTypeVO.heavy(),
    licenseExpiresAt: '2030-01-01T00:00:00.000Z',
  });

  it('duty cycle', () => {
    const d = DriverEntity.create({ id: UUID, now: NOW, props: props() });
    d.goOnDuty(NOW); expect(d.status.isOnDuty()).toBe(true);
    d.startBreak(NOW); expect(d.status.isOnBreak()).toBe(true);
    d.endBreak(NOW); expect(d.status.isOnDuty()).toBe(true);
    d.goOffDuty('end', NOW); expect(d.status.isOffDuty()).toBe(true);
    d.suspend('accident', NOW); expect(d.status.isSuspended()).toBe(true);
    d.reactivate(NOW); expect(d.status.isAvailable()).toBe(true);
  });

  it('recordDelivery + updateRating', () => {
    const d = DriverEntity.create({ id: UUID, now: NOW, props: props() });
    d.recordDelivery('sh1', 15, NOW);
    expect(d.totalDeliveries).toBe(1);
    expect(d.totalDistanceKm).toBe(15);
    d.updateRating(4.5, NOW);
    expect(d.rating).toBe(4.5);
  });

  it('cash in/out + email', () => {
    const d = DriverEntity.create({ id: UUID, now: NOW, props: props() });
    d.receiveCash(500, NOW); expect(d.cashInHand).toBe(500);
    d.remitCash(300, NOW); expect(d.cashInHand).toBe(200);
    d.updateEmail('r@x.com' as never, NOW);
    expect(d.email).toBe('r@x.com');
  });

  it('assignVehicle + assignWarehouse + unassignVehicle', () => {
    const d = DriverEntity.create({ id: UUID, now: NOW, props: props() });
    d.assignVehicle(VehicleIdVO.reconstitute(UUID2), NOW);
    expect(d.vehicleId).toBeDefined();
    d.unassignVehicle(NOW);
    expect(d.vehicleId).toBeUndefined();
    d.assignWarehouse(WarehouseIdVO.reconstitute(UUID2), NOW);
    expect(d.warehouseId).toBeDefined();
  });
});
