/**
 * Prisma repository delegation tests — mock PrismaService,
 * verify every method delegates to the right delegate.
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { ShipmentPrismaRepository } from '@infrastructure/persistence/prisma/repositories/shipment.prisma.repository.js';
import { CourierPrismaRepository } from '@infrastructure/persistence/prisma/repositories/courier.prisma.repository.js';
import { WarehousePrismaRepository } from '@infrastructure/persistence/prisma/repositories/warehouse.prisma.repository.js';
import { VehiclePrismaRepository } from '@infrastructure/persistence/prisma/repositories/vehicle.prisma.repository.js';
import { DriverPrismaRepository } from '@infrastructure/persistence/prisma/repositories/driver.prisma.repository.js';
import { ZonePrismaRepository } from '@infrastructure/persistence/prisma/repositories/zone.prisma.repository.js';
import { ShippingMethodPrismaRepository } from '@infrastructure/persistence/prisma/repositories/shipping-method.prisma.repository.js';
import { PackagingPrismaRepository } from '@infrastructure/persistence/prisma/repositories/packaging.prisma.repository.js';
import { DeliveryPrismaRepository } from '@infrastructure/persistence/prisma/repositories/delivery.prisma.repository.js';
import { TrackingPrismaRepository } from '@infrastructure/persistence/prisma/repositories/tracking.prisma.repository.js';
import { RoutePrismaRepository } from '@infrastructure/persistence/prisma/repositories/route.prisma.repository.js';
import { FulfillmentPrismaRepository } from '@infrastructure/persistence/prisma/repositories/fulfillment.prisma.repository.js';
import { DispatchPrismaRepository } from '@infrastructure/persistence/prisma/repositories/dispatch.prisma.repository.js';
import { ReturnShipmentPrismaRepository } from '@infrastructure/persistence/prisma/repositories/return-shipment.prisma.repository.js';
import { InsurancePrismaRepository } from '@infrastructure/persistence/prisma/repositories/insurance.prisma.repository.js';

import { ShipmentIdVO } from '@domain/value-objects/primitives/shipment-id.vo.js';
import { TrackingNumberVO } from '@domain/value-objects/primitives/tracking-number.vo.js';
import { OrderIdVO } from '@domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { VendorIdVO } from '@domain/value-objects/primitives/vendor-id.vo.js';
import { CourierIdVO } from '@domain/value-objects/primitives/courier-id.vo.js';
import { WarehouseIdVO } from '@domain/value-objects/primitives/warehouse-id.vo.js';
import { VehicleIdVO } from '@domain/value-objects/primitives/vehicle-id.vo.js';
import { DriverIdVO } from '@domain/value-objects/primitives/driver-id.vo.js';
import { ZoneIdVO } from '@domain/value-objects/primitives/zone-id.vo.js';
import { ShipmentStatusVO } from '@domain/value-objects/primitives/shipment-status.vo.js';
import { CourierStatusVO } from '@domain/value-objects/primitives/courier-status.vo.js';
import { CourierNameVO } from '@domain/value-objects/primitives/courier-name.vo.js';
import { WarehouseCodeVO } from '@domain/value-objects/primitives/warehouse-code.vo.js';
import { WarehouseStatusVO } from '@domain/value-objects/primitives/warehouse-status.vo.js';
import { WarehouseTypeVO } from '@domain/value-objects/primitives/warehouse-type.vo.js';
import { VehicleStatusVO } from '@domain/value-objects/primitives/vehicle-status.vo.js';
import { VehicleTypeVO } from '@domain/value-objects/primitives/vehicle-type.vo.js';
import { DriverStatusVO } from '@domain/value-objects/primitives/driver-status.vo.js';
import { DriverTypeVO } from '@domain/value-objects/primitives/driver-type.vo.js';
import { ZoneStatusVO } from '@domain/value-objects/primitives/zone-status.vo.js';
import { ZoneTypeVO } from '@domain/value-objects/primitives/zone-type.vo.js';
import { ShippingMethodIdVO } from '@domain/value-objects/primitives/shipping-method-id.vo.js';
import { ShippingMethodValueVO } from '@domain/value-objects/primitives/shipping-method-value.vo.js';
import { ShippingMethodStatusVO } from '@domain/value-objects/primitives/shipping-method-status.vo.js';
import { PackagingIdVO } from '@domain/value-objects/primitives/packaging-id.vo.js';
import { PackagingStatusVO } from '@domain/value-objects/primitives/packaging-status.vo.js';
import { PackagingTypeVO } from '@domain/value-objects/primitives/packaging-type.vo.js';
import { PackagingMaterialVO } from '@domain/value-objects/primitives/packaging-material.vo.js';
import { DeliveryIdVO } from '@domain/value-objects/primitives/delivery-id.vo.js';
import { DeliveryStatusVO } from '@domain/value-objects/primitives/delivery-status.vo.js';
import { TrackingIdVO } from '@domain/value-objects/primitives/tracking-id.vo.js';
import { TrackingStatusVO } from '@domain/value-objects/primitives/tracking-status.vo.js';
import { RouteIdVO } from '@domain/value-objects/primitives/route-id.vo.js';
import { RouteCodeVO } from '@domain/value-objects/primitives/route-code.vo.js';
import { RouteStatusVO } from '@domain/value-objects/primitives/route-status.vo.js';
import { RouteTypeVO } from '@domain/value-objects/primitives/route-type.vo.js';
import { FulfillmentIdVO } from '@domain/value-objects/primitives/fulfillment-id.vo.js';
import { FulfillmentStatusVO } from '@domain/value-objects/primitives/fulfillment-status.vo.js';
import { FulfillmentPriorityVO } from '@domain/value-objects/primitives/fulfillment-priority.vo.js';
import { DispatchIdVO } from '@domain/value-objects/primitives/dispatch-id.vo.js';
import { DispatchNumberVO } from '@domain/value-objects/primitives/dispatch-number.vo.js';
import { DispatchStatusVO } from '@domain/value-objects/primitives/dispatch-status.vo.js';
import { DispatchTypeVO } from '@domain/value-objects/primitives/dispatch-type.vo.js';
import { ReturnShipmentIdVO } from '@domain/value-objects/primitives/return-shipment-id.vo.js';
import { RmaNumberVO } from '@domain/value-objects/primitives/rma-number.vo.js';
import { ReturnShipmentStatusVO } from '@domain/value-objects/primitives/return-shipment-status.vo.js';
import { InsuranceIdVO } from '@domain/value-objects/primitives/insurance-id.vo.js';
import { PolicyNumberVO } from '@domain/value-objects/primitives/policy-number.vo.js';
import { InsuranceStatusVO } from '@domain/value-objects/primitives/insurance-status.vo.js';

const UUID = '550e8400-e29b-41d4-a716-446655440000';
const UUID2 = '550e8400-e29b-41d4-a716-446655440001';
const D = new Date('2026-01-01T00:00:00Z');

/**
 * Returns a Proxy where every delegate returns sensible null/empty defaults
 * for common Prisma query methods.
 */
function mkPrisma(): never {
  const delegate = {
    findFirst: jest.fn(async () => null),
    findUnique: jest.fn(async () => null),
    findUniqueOrThrow: jest.fn(async () => null),
    findMany: jest.fn(async () => []),
    count: jest.fn(async () => 0),
    create: jest.fn(async () => null),
    update: jest.fn(async () => null),
    updateMany: jest.fn(async () => ({ count: 0 })),
    delete: jest.fn(async () => null),
    deleteMany: jest.fn(async () => ({ count: 0 })),
  };
  const prisma = new Proxy({}, {
    get(_, prop) {
      if (prop === '$transaction') return jest.fn(async (ops) => ops);
      return delegate;
    },
  });
  return prisma as never;
}

// ═══════════ SHIPMENT ═══════════
describe('ShipmentPrismaRepository', () => {
  let repo: ShipmentPrismaRepository;
  beforeEach(() => { repo = new ShipmentPrismaRepository(mkPrisma()); });
  it('findById', async () => { await repo.findById(UUID); });
  it('findByIdVO', async () => { await repo.findByIdVO(ShipmentIdVO.reconstitute(UUID)); });
  it('findAll', async () => { await repo.findAll(); });
  it('findByTrackingNumber', async () => { await repo.findByTrackingNumber(TrackingNumberVO.reconstitute('SH1')); });
  it('findByOrderId', async () => { await repo.findByOrderId(OrderIdVO.reconstitute(UUID)); });
  it('findByUserId', async () => { await repo.findByUserId(UserIdVO.reconstitute(UUID)); });
  it('findByVendorId', async () => { await repo.findByVendorId(VendorIdVO.reconstitute(UUID)); });
  it('findByCourierId', async () => { await repo.findByCourierId(CourierIdVO.reconstitute(UUID)); });
  it('findByWarehouseId', async () => { await repo.findByWarehouseId(WarehouseIdVO.reconstitute(UUID)); });
  it('findByStatus', async () => { await repo.findByStatus(ShipmentStatusVO.pending()); });
  it('existsByTrackingNumber', async () => { await repo.existsByTrackingNumber(TrackingNumberVO.reconstitute('SH1')); });
  it('exists', async () => { await repo.exists(UUID); });
  it('countByOrder', async () => { await repo.countByOrder(OrderIdVO.reconstitute(UUID)); });
  it('findPaginated', async () => { await repo.findPaginated({ page: 1, limit: 20 }); });
  it('getStats', async () => { await repo.getStats(); });
  it('findStale', async () => { await repo.findStale(24); });
  it('findReadyForPickup', async () => { await repo.findReadyForPickup(); });
  it('findAwaitingCourier', async () => { await repo.findAwaitingCourier(); });
  it('softDelete', async () => { await repo.softDelete(UUID); });
  it('delete', async () => { await repo.delete(UUID); });
});

// ═══════════ COURIER ═══════════
describe('CourierPrismaRepository', () => {
  let repo: CourierPrismaRepository;
  beforeEach(() => { repo = new CourierPrismaRepository(mkPrisma()); });
  it('findById + findByIdVO + findAll', async () => {
    await repo.findById(UUID);
    await repo.findByIdVO(CourierIdVO.reconstitute(UUID));
    await repo.findAll();
  });
  it('findByCode + status + type + operational + default', async () => {
    await repo.findByCode(CourierNameVO.pathao());
    await repo.findByStatus(CourierStatusVO.active());
    await repo.findByType({ value: 'local' } as never);
    await repo.findOperational();
    await repo.findDefault();
  });
  it('findCoveringZone + paginate + exists + default + softDelete', async () => {
    await repo.findCoveringZone('dhaka');
    await repo.findPaginated({ page: 1, limit: 20 });
    await repo.existsByCode(CourierNameVO.pathao());
    await repo.exists(UUID);
    await repo.clearDefaultExcept(UUID2);
    await repo.softDelete(UUID);
  });
});

// ═══════════ WAREHOUSE ═══════════
describe('WarehousePrismaRepository', () => {
  let repo: WarehousePrismaRepository;
  beforeEach(() => { repo = new WarehousePrismaRepository(mkPrisma()); });
  it('find + query methods', async () => {
    await repo.findById(UUID);
    await repo.findByIdVO(WarehouseIdVO.reconstitute(UUID));
    await repo.findAll();
    await repo.findByCode(WarehouseCodeVO.reconstitute('WH-01'));
    await repo.findByStatus(WarehouseStatusVO.active());
    await repo.findByType(WarehouseTypeVO.main());
    await repo.findByZone('dhaka');
    await repo.findAcceptingInbound();
    await repo.findWithCapacity(1, 10);
    await repo.findDefault();
    await repo.findPaginated({ page: 1, limit: 20 });
    await repo.existsByCode(WarehouseCodeVO.reconstitute('WH-01'));
    await repo.exists(UUID);
    await repo.softDelete(UUID);
  });
});

// ═══════════ VEHICLE ═══════════
describe('VehiclePrismaRepository', () => {
  let repo: VehiclePrismaRepository;
  beforeEach(() => { repo = new VehiclePrismaRepository(mkPrisma()); });
  it('all methods', async () => {
    await repo.findById(UUID);
    await repo.findByIdVO(VehicleIdVO.reconstitute(UUID));
    await repo.findAll();
    await repo.findByRegistration('X');
    await repo.findByStatus(VehicleStatusVO.available());
    await repo.findByType(VehicleTypeVO.truckMedium());
    await repo.findByDriver(DriverIdVO.reconstitute(UUID2));
    await repo.findAvailable();
    await repo.findCapableOf(100, 1);
    await repo.findNeedingService(30);
    await repo.findPaginated({ page: 1, limit: 20 });
    await repo.existsByRegistration('X');
    await repo.exists(UUID);
    await repo.softDelete(UUID);
  });
});

// ═══════════ DRIVER ═══════════
describe('DriverPrismaRepository', () => {
  let repo: DriverPrismaRepository;
  beforeEach(() => { repo = new DriverPrismaRepository(mkPrisma()); });
  it('all methods', async () => {
    await repo.findById(UUID);
    await repo.findByIdVO(DriverIdVO.reconstitute(UUID));
    await repo.findAll();
    await repo.findByLicense('DL-1');
    await repo.findByStatus(DriverStatusVO.available());
    await repo.findByType(DriverTypeVO.fullTime());
    await repo.findByWarehouse(WarehouseIdVO.reconstitute(UUID2));
    await repo.findByVehicle(VehicleIdVO.reconstitute(UUID2));
    await repo.findAvailable();
    await repo.findAssignable();
    await repo.findWithExpiringLicense(30);
    await repo.findPaginated({ page: 1, limit: 20 });
    await repo.existsByLicense('DL-1');
    await repo.exists(UUID);
    await repo.softDelete(UUID);
  });
});

// ═══════════ ZONE ═══════════
describe('ZonePrismaRepository', () => {
  let repo: ZonePrismaRepository;
  beforeEach(() => { repo = new ZonePrismaRepository(mkPrisma()); });
  it('all methods', async () => {
    await repo.findById(UUID);
    await repo.findByIdVO(ZoneIdVO.reconstitute(UUID));
    await repo.findAll();
    await repo.findByCode('DHK');
    await repo.findByStatus(ZoneStatusVO.active());
    await repo.findByType(ZoneTypeVO.district());
    await repo.findActive();
    await repo.findByParent(ZoneIdVO.reconstitute(UUID2));
    await repo.findByPostalCode('1200');
    await repo.findByDistrict('Dhaka');
    await repo.findByDivision('Dhaka');
    await repo.findForAddress({ postalCode: '1200' });
    await repo.findForAddress({ district: 'Dhaka' });
    await repo.findForAddress({ division: 'Dhaka' });
    await repo.findForAddress({});
    await repo.findPaginated({ page: 1, limit: 20 });
    await repo.existsByCode('DHK');
    await repo.exists(UUID);
    await repo.softDelete(UUID);
  });
});

// ═══════════ SHIPPING METHOD ═══════════
describe('ShippingMethodPrismaRepository', () => {
  let repo: ShippingMethodPrismaRepository;
  beforeEach(() => { repo = new ShippingMethodPrismaRepository(mkPrisma()); });
  it('all methods', async () => {
    await repo.findById(UUID);
    await repo.findByIdVO(ShippingMethodIdVO.reconstitute(UUID));
    await repo.findAll();
    await repo.findByCode(ShippingMethodValueVO.standard());
    await repo.findByStatus(ShippingMethodStatusVO.active());
    await repo.findSelectable();
    await repo.findByZone(UUID);
    await repo.findDefault();
    await repo.findEligibleFor('z1', 5);
    await repo.findPaginated({ page: 1, limit: 20 });
    await repo.existsByCode(ShippingMethodValueVO.standard());
    await repo.exists(UUID);
    await repo.clearDefaultExcept(UUID2);
    await repo.softDelete(UUID);
  });
});

// ═══════════ PACKAGING ═══════════
describe('PackagingPrismaRepository', () => {
  let repo: PackagingPrismaRepository;
  beforeEach(() => { repo = new PackagingPrismaRepository(mkPrisma()); });
  it('all methods', async () => {
    await repo.findById(UUID);
    await repo.findByIdVO(PackagingIdVO.reconstitute(UUID));
    await repo.findAll();
    await repo.findByCode('BOX-S');
    await repo.findByStatus(PackagingStatusVO.active());
    await repo.findByType(PackagingTypeVO.box());
    await repo.findByMaterial(PackagingMaterialVO.cardboard());
    await repo.findInStock();
    await repo.findDefault();
    await repo.findCapableOf(3);
    await repo.findCapableOf(3, { lengthCm: 10, widthCm: 10, heightCm: 10 });
    await repo.findLowStock(10);
    await repo.findPaginated({ page: 1, limit: 20 });
    await repo.existsByCode('BOX-S');
    await repo.exists(UUID);
    await repo.softDelete(UUID);
  });
});

// ═══════════ DELIVERY ═══════════
describe('DeliveryPrismaRepository', () => {
  let repo: DeliveryPrismaRepository;
  beforeEach(() => { repo = new DeliveryPrismaRepository(mkPrisma()); });
  it('all methods', async () => {
    await repo.findById(UUID);
    await repo.findByIdVO(DeliveryIdVO.reconstitute(UUID));
    await repo.findAll();
    await repo.findByShipmentId(ShipmentIdVO.reconstitute(UUID));
    await repo.findByOrderId(OrderIdVO.reconstitute(UUID));
    await repo.findByDriverId(DriverIdVO.reconstitute(UUID2));
    await repo.findByStatus(DeliveryStatusVO.scheduled());
    await repo.findActiveByDriver(DriverIdVO.reconstitute(UUID2));
    await repo.findScheduledFor('2026-01-01');
    await repo.findPaginated({ page: 1, limit: 20 });
    await repo.getStats();
    await repo.findStaleAssigned(24);
    await repo.exists(UUID);
    await repo.softDelete(UUID);
  });
});

// ═══════════ TRACKING ═══════════
describe('TrackingPrismaRepository', () => {
  let repo: TrackingPrismaRepository;
  beforeEach(() => { repo = new TrackingPrismaRepository(mkPrisma()); });
  it('all methods', async () => {
    await repo.findById(UUID);
    await repo.findByIdVO(TrackingIdVO.reconstitute(UUID));
    await repo.findAll();
    await repo.findByTrackingNumber(TrackingNumberVO.reconstitute('SH1'));
    await repo.findByShipmentId(ShipmentIdVO.reconstitute(UUID));
    await repo.findByOrderId(OrderIdVO.reconstitute(UUID));
    await repo.findByStatus(TrackingStatusVO.pending());
    await repo.findPublicByTrackingNumber(TrackingNumberVO.reconstitute('SH1'));
    await repo.findActive();
    await repo.findStaleNoUpdate(30);
    await repo.findPaginated({ page: 1, limit: 20 });
    await repo.existsByTrackingNumber(TrackingNumberVO.reconstitute('SH1'));
    await repo.exists(UUID);
    await repo.softDelete(UUID);
  });
});

// ═══════════ ROUTE ═══════════
describe('RoutePrismaRepository', () => {
  let repo: RoutePrismaRepository;
  beforeEach(() => { repo = new RoutePrismaRepository(mkPrisma()); });
  it('all methods', async () => {
    await repo.findById(UUID);
    await repo.findByIdVO(RouteIdVO.reconstitute(UUID));
    await repo.findAll();
    await repo.findByCode(RouteCodeVO.reconstitute('RT-01'));
    await repo.findByStatus(RouteStatusVO.draft());
    await repo.findByType(RouteTypeVO.delivery());
    await repo.findByDriver(DriverIdVO.reconstitute(UUID2));
    await repo.findByVehicle(VehicleIdVO.reconstitute(UUID2));
    await repo.findByWarehouse(WarehouseIdVO.reconstitute(UUID2));
    await repo.findActive();
    await repo.findScheduledFor('2026-01-01');
    await repo.findPaginated({ page: 1, limit: 20 });
    await repo.existsByCode(RouteCodeVO.reconstitute('RT-01'));
    await repo.exists(UUID);
    await repo.softDelete(UUID);
  });
});

// ═══════════ FULFILLMENT ═══════════
describe('FulfillmentPrismaRepository', () => {
  let repo: FulfillmentPrismaRepository;
  beforeEach(() => { repo = new FulfillmentPrismaRepository(mkPrisma()); });
  it('all methods', async () => {
    await repo.findById(UUID);
    await repo.findByIdVO(FulfillmentIdVO.reconstitute(UUID));
    await repo.findAll();
    await repo.findByOrderId(OrderIdVO.reconstitute(UUID));
    await repo.findByVendorId(VendorIdVO.reconstitute(UUID2));
    await repo.findByWarehouseId(WarehouseIdVO.reconstitute(UUID2));
    await repo.findByStatus(FulfillmentStatusVO.pending());
    await repo.findByPriority(FulfillmentPriorityVO.normal());
    await repo.findReadyToShip();
    await repo.findPendingByWarehouse(WarehouseIdVO.reconstitute(UUID2));
    await repo.findSlaBreached();
    await repo.findPaginated({ page: 1, limit: 20 });
    await repo.exists(UUID);
    await repo.softDelete(UUID);
  });
});

// ═══════════ DISPATCH ═══════════
describe('DispatchPrismaRepository', () => {
  let repo: DispatchPrismaRepository;
  beforeEach(() => { repo = new DispatchPrismaRepository(mkPrisma()); });
  it('all methods', async () => {
    await repo.findById(UUID);
    await repo.findByIdVO(DispatchIdVO.reconstitute(UUID));
    await repo.findAll();
    await repo.findByNumber(DispatchNumberVO.reconstitute('DSP-20260101-0001'));
    await repo.findByStatus(DispatchStatusVO.pending());
    await repo.findByType(DispatchTypeVO.single());
    await repo.findByCourier(CourierIdVO.reconstitute(UUID2));
    await repo.findByWarehouse(WarehouseIdVO.reconstitute(UUID2));
    await repo.findByDriver(DriverIdVO.reconstitute(UUID2));
    await repo.findByShipmentId(UUID);
    await repo.findPending();
    await repo.findInFlight();
    await repo.findPaginated({ page: 1, limit: 20 });
    await repo.existsByNumber(DispatchNumberVO.reconstitute('DSP-20260101-0001'));
    await repo.exists(UUID);
    await repo.softDelete(UUID);
  });
});

// ═══════════ RETURN SHIPMENT ═══════════
describe('ReturnShipmentPrismaRepository', () => {
  let repo: ReturnShipmentPrismaRepository;
  beforeEach(() => { repo = new ReturnShipmentPrismaRepository(mkPrisma()); });
  it('all methods', async () => {
    await repo.findById(UUID);
    await repo.findByIdVO(ReturnShipmentIdVO.reconstitute(UUID));
    await repo.findAll();
    await repo.findByRma(RmaNumberVO.reconstitute('RMA-2026-000001'));
    await repo.findByOrderId(OrderIdVO.reconstitute(UUID));
    await repo.findByUserId(UserIdVO.reconstitute(UUID2));
    await repo.findByOriginalShipment(ShipmentIdVO.reconstitute(UUID));
    await repo.findByStatus(ReturnShipmentStatusVO.requested());
    await repo.findPendingApproval();
    await repo.findAwaitingPickup();
    await repo.findAwaitingInspection();
    await repo.findPaginated({ page: 1, limit: 20 });
    await repo.existsByRma(RmaNumberVO.reconstitute('RMA-2026-000001'));
    await repo.exists(UUID);
    await repo.softDelete(UUID);
  });
});

// ═══════════ INSURANCE ═══════════
describe('InsurancePrismaRepository', () => {
  let repo: InsurancePrismaRepository;
  beforeEach(() => { repo = new InsurancePrismaRepository(mkPrisma()); });
  it('all methods', async () => {
    await repo.findById(UUID);
    await repo.findByIdVO(InsuranceIdVO.reconstitute(UUID));
    await repo.findAll();
    await repo.findByPolicyNumber(PolicyNumberVO.reconstitute('POL-2026-000001'));
    await repo.findByShipmentId(ShipmentIdVO.reconstitute(UUID));
    await repo.findByOrderId(OrderIdVO.reconstitute(UUID));
    await repo.findByUserId(UserIdVO.reconstitute(UUID2));
    await repo.findByStatus(InsuranceStatusVO.active());
    await repo.findByClaimStatus({ value: 'submitted' } as never);
    await repo.findActive();
    await repo.findExpiring(30);
    await repo.findWithOpenClaims();
    await repo.findPaginated({ page: 1, limit: 20 });
    await repo.existsByPolicyNumber(PolicyNumberVO.reconstitute('POL-2026-000001'));
    await repo.exists(UUID);
    await repo.getStats();
    await repo.softDelete(UUID);
  });
});
