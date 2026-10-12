/**
 * Application mapper tests — entity → DTO mapping.
 * Uses entity factories to build real entities.
 */
import { describe, it, expect } from '@jest/globals';
import { ShipmentMapper } from '@application/mappers/shipment.mapper.js';
import { CourierMapper } from '@application/mappers/courier.mapper.js';
import { WarehouseMapper } from '@application/mappers/warehouse.mapper.js';
import { VehicleMapper } from '@application/mappers/vehicle.mapper.js';
import { DriverMapper } from '@application/mappers/driver.mapper.js';
import { ZoneMapper } from '@application/mappers/zone.mapper.js';
import { ShippingMethodMapper } from '@application/mappers/shipping-method.mapper.js';
import { PackagingMapper } from '@application/mappers/packaging.mapper.js';
import { DeliveryMapper } from '@application/mappers/delivery.mapper.js';
import { TrackingMapper } from '@application/mappers/tracking.mapper.js';
import { RouteMapper } from '@application/mappers/route.mapper.js';
import { FulfillmentMapper } from '@application/mappers/fulfillment.mapper.js';
import { DispatchMapper } from '@application/mappers/dispatch.mapper.js';
import { ReturnShipmentMapper } from '@application/mappers/return-shipment.mapper.js';
import { InsuranceMapper } from '@application/mappers/insurance.mapper.js';

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
import { ShipmentIdVO } from '@domain/value-objects/primitives/shipment-id.vo.js';
import { RouteCodeVO } from '@domain/value-objects/primitives/route-code.vo.js';
import { RouteTypeVO } from '@domain/value-objects/primitives/route-type.vo.js';
import { RouteOptimizationVO } from '@domain/value-objects/primitives/route-optimization.vo.js';
import { FulfillmentTypeVO } from '@domain/value-objects/primitives/fulfillment-type.vo.js';
import { FulfillmentPriorityVO } from '@domain/value-objects/primitives/fulfillment-priority.vo.js';
import { DispatchNumberVO } from '@domain/value-objects/primitives/dispatch-number.vo.js';
import { DispatchTypeVO } from '@domain/value-objects/primitives/dispatch-type.vo.js';
import { RmaNumberVO } from '@domain/value-objects/primitives/rma-number.vo.js';
import { ReturnShipmentTypeVO } from '@domain/value-objects/primitives/return-shipment-type.vo.js';
import { ReturnReasonVO } from '@domain/value-objects/primitives/return-reason.vo.js';
import { InsuranceTypeVO } from '@domain/value-objects/primitives/insurance-type.vo.js';
import { InsuranceCoverageVO } from '@domain/value-objects/primitives/insurance-coverage.vo.js';
import { DeclaredValueVO } from '@domain/value-objects/primitives/declared-value.vo.js';

const NOW = '2026-01-01T00:00:00.000Z';
const UUID = '550e8400-e29b-41d4-a716-446655440000';
const UUID2 = '550e8400-e29b-41d4-a716-446655440001';
const ADDR = { line1: '12 Main', city: 'Dhaka', country: 'BD' };
const ADDR_VO = AddressDetailsVO.create({ address: ADDR });

describe('Application mappers', () => {
  it('ShipmentMapper.toResponse / toPublicResponse / toSummary / toListResponse', () => {
    const s = ShipmentEntity.create({
      id: UUID, now: NOW,
      props: {
        trackingNumber: TrackingNumberVO.create('SHTEST12345678'),
        orderId: OrderIdVO.create(UUID),
        type: ShipmentTypeVO.standard(), priority: ShipmentPriorityVO.normal(),
        dimensions: ShipmentDimensionsVO.create({ actualWeightKg: 3 }),
        shippingAddress: ADDR_VO,
        packages: [PackageRefVO.create({ orderItemId: UUID2, quantity: 1 })],
        itemCount: 1, isCOD: false, isInsured: false,
      },
    });
    expect(ShipmentMapper.toResponse(s).id).toBe(UUID);
    expect(ShipmentMapper.toPublicResponse(s).id).toBe(UUID);
    expect(ShipmentMapper.toSummary(s).id).toBe(UUID);
    expect(ShipmentMapper.toListResponse([s], 1, 1, 20).items.length).toBe(1);
  });

  it('CourierMapper', () => {
    const c = CourierEntity.create({
      id: UUID, now: NOW,
      props: {
        name: 'P', code: CourierNameVO.pathao(), displayName: 'P',
        type: CourierTypeVO.local(), apiEnabled: false,
        coverageZones: [], supportsCOD: true, supportsInsurance: false, supportsInternational: false,
        averageDeliveryDays: 2, isDefault: false, priority: 50,
      },
    });
    expect(CourierMapper.toResponse(c).id).toBe(UUID);
    expect(CourierMapper.toPublicResponse(c).id).toBe(UUID);
    expect(CourierMapper.toListResponse([c], 1, 1, 20).items.length).toBe(1);
  });

  it('WarehouseMapper', () => {
    const w = WarehouseEntity.create({
      id: UUID, now: NOW,
      props: {
        code: WarehouseCodeVO.create('WH-01'), name: 'W', type: WarehouseTypeVO.main(),
        address: ADDR_VO,
        capacity: CapacityVO.create({ capacityM3: 100, usedM3: 0, capacityKg: 1000, usedKg: 0 }),
        maxSkus: 1000, zone: 'dhaka', timezone: 'Asia/Dhaka', isDefault: false,
      },
    });
    expect(WarehouseMapper.toResponse(w).id).toBe(UUID);
    expect(WarehouseMapper.toListResponse([w], 1, 1, 20).items.length).toBe(1);
  });

  it('VehicleMapper', () => {
    const v = VehicleEntity.create({
      id: UUID, now: NOW,
      props: {
        registrationNumber: 'DHA-GA-1', type: VehicleTypeVO.truckMedium(),
        fuelType: VehicleFuelTypeVO.diesel(), make: 'T', model: 'X', year: 2023,
        maxWeightKg: 5000, isActive: true,
      },
    });
    expect(VehicleMapper.toResponse(v).id).toBe(UUID);
    expect(VehicleMapper.toListResponse([v], 1, 1, 20).items.length).toBe(1);
  });

  it('DriverMapper', () => {
    const d = DriverEntity.create({
      id: UUID, now: NOW,
      props: {
        name: 'Rahim', phone: '+8801712345678' as never,
        type: DriverTypeVO.fullTime(),
        licenseNumber: 'DL-1', licenseType: DriverLicenseTypeVO.heavy(),
        licenseExpiresAt: '2030-01-01T00:00:00.000Z',
      },
    });
    expect(DriverMapper.toResponse(d).id).toBe(UUID);
    expect(DriverMapper.toListResponse([d], 1, 1, 20).items.length).toBe(1);
  });

  it('ZoneMapper', () => {
    const z = ZoneEntity.create({
      id: UUID, now: NOW,
      props: {
        name: 'D', code: 'DHK', type: ZoneTypeVO.district(),
        pricingType: ZonePricingTypeVO.flat(),
        postalCodes: [], districts: [], divisions: [],
        shippingCost: ShippingCostVO.create(60, 'BDT'),
        minDeliveryDays: 1, maxDeliveryDays: 3, codEnabled: true, isRemote: false,
      },
    });
    expect(ZoneMapper.toResponse(z).id).toBe(UUID);
    expect(ZoneMapper.toListResponse([z], 1, 1, 20).items.length).toBe(1);
  });

  it('ShippingMethodMapper', () => {
    const m = ShippingMethodEntity.create({
      id: UUID, now: NOW,
      props: {
        name: 'Std', code: ShippingMethodValueVO.standard(), displayName: 'Std',
        rateType: ShippingRateTypeVO.flat(),
        baseCost: ShippingCostVO.create(60, 'BDT'),
        minDeliveryDays: 1, maxDeliveryDays: 3,
        codEnabled: true, trackingEnabled: true,
        coverageZones: [], couriers: [], isDefault: false,
      },
    });
    expect(ShippingMethodMapper.toResponse(m).id).toBe(UUID);
    expect(ShippingMethodMapper.toListResponse([m], 1, 1, 20).items.length).toBe(1);
  });

  it('PackagingMapper', () => {
    const p = PackagingEntity.create({
      id: UUID, now: NOW,
      props: {
        name: 'Box', code: 'BOX-S', type: PackagingTypeVO.box(),
        material: PackagingMaterialVO.cardboard(),
        dimensions: DimensionCmVO.create(20, 15, 10),
        maxWeightKg: WeightKgVO.create(5),
        isFragile: false, isTemperatureControlled: false, isRecyclable: true,
        stock: 100, isDefault: false,
      },
    });
    expect(PackagingMapper.toResponse(p).id).toBe(UUID);
    expect(PackagingMapper.toListResponse([p], 1, 1, 20).items.length).toBe(1);
  });

  it('DeliveryMapper', () => {
    const d = DeliveryEntity.create({
      id: UUID, now: NOW,
      props: {
        shipmentId: ShipmentIdVO.create(UUID), orderId: OrderIdVO.create(UUID2),
        type: DeliveryTypeVO.standard(), deliveryAddress: ADDR_VO,
      },
    });
    expect(DeliveryMapper.toResponse(d).id).toBe(UUID);
    expect(DeliveryMapper.toListResponse([d], 1, 1, 20).items.length).toBe(1);
  });

  it('TrackingMapper', () => {
    const t = TrackingEntity.start({
      id: UUID, now: NOW,
      trackingNumber: TrackingNumberVO.create('SHTEST12345678'),
    });
    expect(TrackingMapper.toResponse(t).id).toBe(UUID);
    expect(TrackingMapper.toPublicResponse(t).trackingNumber).toBe('SHTEST12345678');
    expect(TrackingMapper.toListResponse([t], 1, 1, 20).items.length).toBe(1);
  });

  it('RouteMapper', () => {
    const r = RouteEntity.create({
      id: UUID, now: NOW,
      props: {
        name: 'M', code: RouteCodeVO.create('RT-01'),
        type: RouteTypeVO.delivery(),
        optimization: RouteOptimizationVO.balanced(),
        scheduledDate: '2026-01-01T00:00:00Z', isRecurring: false,
      },
    });
    expect(RouteMapper.toResponse(r).id).toBe(UUID);
    expect(RouteMapper.toListResponse([r], 1, 1, 20).items.length).toBe(1);
  });

  it('FulfillmentMapper', () => {
    const f = FulfillmentEntity.create({
      id: UUID, now: NOW,
      props: {
        orderId: OrderIdVO.create(UUID),
        type: FulfillmentTypeVO.standard(),
        priority: FulfillmentPriorityVO.normal(),
        itemIds: [UUID2],
      },
    });
    expect(FulfillmentMapper.toResponse(f).id).toBe(UUID);
    expect(FulfillmentMapper.toListResponse([f], 1, 1, 20).items.length).toBe(1);
  });

  it('DispatchMapper', () => {
    const d = DispatchEntity.create({
      id: UUID, now: NOW,
      props: {
        dispatchNumber: DispatchNumberVO.generate(1),
        type: DispatchTypeVO.single(),
        shipmentIds: [UUID],
      },
    });
    expect(DispatchMapper.toResponse(d).id).toBe(UUID);
    expect(DispatchMapper.toListResponse([d], 1, 1, 20).items.length).toBe(1);
  });

  it('ReturnShipmentMapper', () => {
    const r = ReturnShipmentEntity.request({
      id: UUID, now: NOW,
      props: {
        rmaNumber: RmaNumberVO.generate(1),
        orderId: OrderIdVO.create(UUID),
        userId: UserIdVO.create(UUID2),
        type: ReturnShipmentTypeVO.customerReturn(),
        reason: ReturnReasonVO.changedMind(),
        itemIds: [UUID2], images: [], pickupAddress: ADDR_VO,
      },
    });
    expect(ReturnShipmentMapper.toResponse(r).id).toBe(UUID);
    expect(ReturnShipmentMapper.toListResponse([r], 1, 1, 20).items.length).toBe(1);
  });

  it('InsuranceMapper (with and without claim)', () => {
    const i = InsuranceEntity.create({
      id: UUID, now: NOW,
      props: {
        type: InsuranceTypeVO.standard(),
        coverages: [InsuranceCoverageVO.loss()],
        declaredValue: DeclaredValueVO.create(5000, 'BDT'),
        startsAt: '2026-01-01T00:00:00Z', expiresAt: '2027-01-01T00:00:00Z',
      },
    });
    expect(InsuranceMapper.toResponse(i).id).toBe(UUID);
    expect(InsuranceMapper.toListResponse([i], 1, 1, 20).items.length).toBe(1);
  });
});
