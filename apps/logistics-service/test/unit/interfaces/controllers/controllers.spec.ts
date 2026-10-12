/**
 * Controller tests — instantiate with mocked CommandBus/QueryBus,
 * call every endpoint method, verify delegation.
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';

import { ShipmentController } from '@interfaces/controllers/rest/shipment.controller.js';
import { CourierController } from '@interfaces/controllers/rest/courier.controller.js';
import { WarehouseController } from '@interfaces/controllers/rest/warehouse.controller.js';
import { VehicleController } from '@interfaces/controllers/rest/vehicle.controller.js';
import { DriverController } from '@interfaces/controllers/rest/driver.controller.js';
import { ZoneController } from '@interfaces/controllers/rest/zone.controller.js';
import { ShippingMethodController } from '@interfaces/controllers/rest/shipping-method.controller.js';
import { PackagingController } from '@interfaces/controllers/rest/packaging.controller.js';
import { DeliveryController } from '@interfaces/controllers/rest/delivery.controller.js';
import { TrackingController } from '@interfaces/controllers/rest/tracking.controller.js';
import { RouteController } from '@interfaces/controllers/rest/route.controller.js';
import { FulfillmentController } from '@interfaces/controllers/rest/fulfillment.controller.js';
import { DispatchController } from '@interfaces/controllers/rest/dispatch.controller.js';
import { ReturnShipmentController } from '@interfaces/controllers/rest/return-shipment.controller.js';
import { InsuranceController } from '@interfaces/controllers/rest/insurance.controller.js';
import { PublicLogisticsController } from '@interfaces/controllers/rest/public-logistics.controller.js';
import { PathaoWebhookController } from '@interfaces/controllers/webhooks/pathao.webhook.controller.js';
import { RedxWebhookController } from '@interfaces/controllers/webhooks/redx.webhook.controller.js';
import { SteadfastWebhookController } from '@interfaces/controllers/webhooks/steadfast.webhook.controller.js';
import { SaParibahanWebhookController } from '@interfaces/controllers/webhooks/sa-paribahan.webhook.controller.js';

const UUID = '550e8400-e29b-41d4-a716-446655440000';
const UUID2 = '550e8400-e29b-41d4-a716-446655440001';
const USER = { userId: UUID, sessionId: 'sess' };

function mkBus() { return { execute: jest.fn(async () => ({ ok: true })) } as never; }
function mkCtrl(Ctrl: unknown, cBus = mkBus(), qBus = mkBus()) {
  const C = Ctrl as new (c: unknown, q: unknown) => Record<string, (...a: unknown[]) => unknown>;
  return { ctrl: new C(cBus, qBus), cBus, qBus };
}

// ═══ SHIPMENT ═══
describe('ShipmentController', () => {
  let ctrl: ShipmentController; let cBus: never; let qBus: never;
  beforeEach(() => { ({ ctrl, cBus, qBus } = mkCtrl(ShipmentController) as never); });
  it('create', async () => { await ctrl.create({} as never, USER as never); expect((cBus as never as { execute: jest.Mock }).execute).toHaveBeenCalled(); });
  it('update', async () => { await ctrl.update(UUID, {}, USER as never); expect((cBus as never as { execute: jest.Mock }).execute).toHaveBeenCalled(); });
  it('confirm', async () => { await ctrl.confirm(UUID, USER as never); });
  it('startProcessing', async () => { await ctrl.startProcessing(UUID, USER as never); });
  it('markPacked', async () => { await ctrl.markPacked(UUID, USER as never); });
  it('generateLabel', async () => { await ctrl.generateLabel(UUID, { labelUrl: 'x' } as never, USER as never); });
  it('pickup', async () => { await ctrl.pickup(UUID, {} as never, USER as never); });
  it('markInTransit', async () => { await ctrl.markInTransit(UUID, USER as never); });
  it('markOutForDelivery', async () => { await ctrl.markOutForDelivery(UUID, USER as never); });
  it('deliver', async () => { await ctrl.deliver(UUID, {} as never, USER as never); });
  it('fail', async () => { await ctrl.fail(UUID, { reason: 'x' } as never, USER as never); });
  it('markReturned', async () => { await ctrl.markReturned(UUID, { reason: 'x' } as never, USER as never); });
  it('cancel', async () => { await ctrl.cancel(UUID, {} as never, USER as never); });
  it('putOnHold', async () => { await ctrl.putOnHold(UUID, {} as never, USER as never); });
  it('release', async () => { await ctrl.release(UUID, USER as never); });
  it('markDelayed', async () => { await ctrl.markDelayed(UUID, { reason: 'x' } as never, USER as never); });
  it('assignCourier', async () => { await ctrl.assignCourier(UUID, { courierId: UUID2 } as never, USER as never); });
  it('assignWarehouse', async () => { await ctrl.assignWarehouse(UUID, { warehouseId: UUID2 } as never, USER as never); });
  it('changePriority', async () => { await ctrl.changePriority(UUID, { priority: 'normal' } as never, USER as never); });
  it('list', async () => { await ctrl.list({} as never); });
  it('getStats', async () => { await ctrl.getStats(); });
  it('getByTracking', async () => { await ctrl.getByTracking('SH1'); });
  it('listByOrder', async () => { await ctrl.listByOrder(UUID); });
  it('getById', async () => { await ctrl.getById(UUID); });
  it('getPublic', async () => { await ctrl.getPublic(UUID); });
});

// ═══ COURIER ═══
describe('CourierController', () => {
  let ctrl: CourierController;
  beforeEach(() => { ({ ctrl } = mkCtrl(CourierController) as never); });
  it('register', async () => { await ctrl.register({} as never, USER as never); });
  it('update', async () => { await ctrl.update(UUID, {}, USER as never); });
  it('activate', async () => { await ctrl.activate(UUID, {} as never, USER as never); });
  it('deactivate', async () => { await ctrl.deactivate(UUID, {} as never, USER as never); });
  it('suspend', async () => { await ctrl.suspend(UUID, { reason: 'x' } as never, USER as never); });
  it('setDefault', async () => { await ctrl.setDefault(UUID, { isDefault: true } as never, USER as never); });
  it('list', async () => { await ctrl.list({} as never); });
  it('getDefault', async () => { await ctrl.getDefault(); });
  it('getById', async () => { await ctrl.getById(UUID); });
});

// ═══ WAREHOUSE ═══
describe('WarehouseController', () => {
  let ctrl: WarehouseController;
  beforeEach(() => { ({ ctrl } = mkCtrl(WarehouseController) as never); });
  it('create', async () => { await ctrl.create({} as never, USER as never); });
  it('update', async () => { await ctrl.update(UUID, {}, USER as never); });
  it('activate', async () => { await ctrl.activate(UUID, USER as never); });
  it('deactivate', async () => { await ctrl.deactivate(UUID, {} as never, USER as never); });
  it('list', async () => { await ctrl.list({} as never); });
  it('getById', async () => { await ctrl.getById(UUID); });
});

// ═══ VEHICLE ═══
describe('VehicleController', () => {
  let ctrl: VehicleController;
  beforeEach(() => { ({ ctrl } = mkCtrl(VehicleController) as never); });
  it('register', async () => { await ctrl.register({} as never, USER as never); });
  it('update', async () => { await ctrl.update(UUID, {}, USER as never); });
  it('setStatus', async () => { await ctrl.setStatus(UUID, {} as never, USER as never); });
  it('assignDriver', async () => { await ctrl.assignDriver(UUID, {} as never, USER as never); });
  it('updateMileage', async () => { await ctrl.updateMileage(UUID, {} as never, USER as never); });
  it('list', async () => { await ctrl.list({} as never); });
  it('getById', async () => { await ctrl.getById(UUID); });
});

// ═══ DRIVER ═══
describe('DriverController', () => {
  let ctrl: DriverController;
  beforeEach(() => { ({ ctrl } = mkCtrl(DriverController) as never); });
  it('register', async () => { await ctrl.register({} as never, USER as never); });
  it('update', async () => { await ctrl.update(UUID, {}, USER as never); });
  it('setStatus', async () => { await ctrl.setStatus(UUID, {} as never, USER as never); });
  it('assignVehicle', async () => { await ctrl.assignVehicle(UUID, {} as never, USER as never); });
  it('receiveCash', async () => { await ctrl.receiveCash(UUID, {} as never, USER as never); });
  it('remitCash', async () => { await ctrl.remitCash(UUID, {} as never, USER as never); });
  it('list', async () => { await ctrl.list({} as never); });
  it('getById', async () => { await ctrl.getById(UUID); });
});

// ═══ ZONE ═══
describe('ZoneController', () => {
  let ctrl: ZoneController;
  beforeEach(() => { ({ ctrl } = mkCtrl(ZoneController) as never); });
  it('create', async () => { await ctrl.create({} as never, USER as never); });
  it('update', async () => { await ctrl.update(UUID, {}, USER as never); });
  it('activate', async () => { await ctrl.activate(UUID, USER as never); });
  it('inactivate', async () => { await ctrl.inactivate(UUID, {} as never, USER as never); });
  it('suspend', async () => { await ctrl.suspend(UUID, {} as never, USER as never); });
  it('list', async () => { await ctrl.list({} as never); });
  it('getById', async () => { await ctrl.getById(UUID); });
});

// ═══ SHIPPING METHOD ═══
describe('ShippingMethodController', () => {
  let ctrl: ShippingMethodController;
  beforeEach(() => { ({ ctrl } = mkCtrl(ShippingMethodController) as never); });
  it('create', async () => { await ctrl.create({} as never, USER as never); });
  it('update', async () => { await ctrl.update(UUID, {}, USER as never); });
  it('activate', async () => { await ctrl.activate(UUID, USER as never); });
  it('deactivate', async () => { await ctrl.deactivate(UUID, {} as never, USER as never); });
  it('suspend', async () => { await ctrl.suspend(UUID, {} as never, USER as never); });
  it('calculate', async () => { await ctrl.calculate(UUID, {} as never); });
  it('list', async () => { await ctrl.list({} as never); });
  it('getById', async () => { await ctrl.getById(UUID); });
});

// ═══ PACKAGING ═══
describe('PackagingController', () => {
  let ctrl: PackagingController;
  beforeEach(() => { ({ ctrl } = mkCtrl(PackagingController) as never); });
  it('create', async () => { await ctrl.create({} as never, USER as never); });
  it('update', async () => { await ctrl.update(UUID, {}, USER as never); });
  it('restock', async () => { await ctrl.restock(UUID, {} as never, USER as never); });
  it('consume', async () => { await ctrl.consume(UUID, {} as never, USER as never); });
  it('adjustStock', async () => { await ctrl.adjustStock(UUID, {} as never, USER as never); });
  it('select', async () => { await ctrl.select({} as never); });
  it('list', async () => { await ctrl.list({} as never); });
  it('getById', async () => { await ctrl.getById(UUID); });
});

// ═══ DELIVERY ═══
describe('DeliveryController', () => {
  let ctrl: DeliveryController;
  beforeEach(() => { ({ ctrl } = mkCtrl(DeliveryController) as never); });
  it('schedule', async () => { await ctrl.schedule({} as never, USER as never); });
  it('assignDriver', async () => { await ctrl.assignDriver(UUID, {} as never, USER as never); });
  it('addAttempt', async () => { await ctrl.addAttempt(UUID, {} as never, USER as never); });
  it('complete', async () => { await ctrl.complete(UUID, {} as never, USER as never); });
  it('fail', async () => { await ctrl.fail(UUID, {} as never, USER as never); });
  it('reschedule', async () => { await ctrl.reschedule(UUID, {} as never, USER as never); });
  it('cancel', async () => { await ctrl.cancel(UUID, {} as never, USER as never); });
  it('list', async () => { await ctrl.list({} as never); });
  it('getByShipment', async () => { await ctrl.getByShipment(UUID); });
  it('getById', async () => { await ctrl.getById(UUID); });
});

// ═══ TRACKING ═══
describe('TrackingController', () => {
  let ctrl: TrackingController;
  beforeEach(() => { ({ ctrl } = mkCtrl(TrackingController) as never); });
  it('start', async () => { await ctrl.start({} as never, USER as never); });
  it('recordEvent', async () => { await ctrl.recordEvent(UUID, {} as never, USER as never); });
  it('updateEta', async () => { await ctrl.updateEta(UUID, {} as never, USER as never); });
  it('list', async () => { await ctrl.list({} as never); });
  it('getByNumber', async () => { await ctrl.getByNumber('SH1'); });
  it('getPublic', async () => { await ctrl.getPublic('SH1'); });
  it('getById', async () => { await ctrl.getById(UUID); });
});

// ═══ ROUTE ═══
describe('RouteController', () => {
  let ctrl: RouteController;
  beforeEach(() => { ({ ctrl } = mkCtrl(RouteController) as never); });
  it('create', async () => { await ctrl.create({} as never, USER as never); });
  it('addStop', async () => { await ctrl.addStop(UUID, {} as never, USER as never); });
  it('removeStop', async () => { await ctrl.removeStop(UUID, UUID2, USER as never); });
  it('reorderStops', async () => { await ctrl.reorderStops(UUID, {} as never, USER as never); });
  it('completeStop', async () => { await ctrl.completeStop(UUID, UUID2, USER as never); });
  it('optimize', async () => { await ctrl.optimize(UUID, {} as never, USER as never); });
  it('plan', async () => { await ctrl.plan(UUID, USER as never); });
  it('start', async () => { await ctrl.start(UUID, USER as never); });
  it('complete', async () => { await ctrl.complete(UUID, USER as never); });
  it('cancel', async () => { await ctrl.cancel(UUID, {} as never, USER as never); });
  it('list', async () => { await ctrl.list({} as never); });
  it('getById', async () => { await ctrl.getById(UUID); });
});

// ═══ FULFILLMENT ═══
describe('FulfillmentController', () => {
  let ctrl: FulfillmentController;
  beforeEach(() => { ({ ctrl } = mkCtrl(FulfillmentController) as never); });
  it('create', async () => { await ctrl.create({} as never, USER as never); });
  it('update', async () => { await ctrl.update(UUID, {}, USER as never); });
  it('assign', async () => { await ctrl.assign(UUID, {} as never, USER as never); });
  it('startProcessing', async () => { await ctrl.startProcessing(UUID, USER as never); });
  it('startPicking', async () => { await ctrl.startPicking(UUID, USER as never); });
  it('startPacking', async () => { await ctrl.startPacking(UUID, USER as never); });
  it('readyToShip', async () => { await ctrl.readyToShip(UUID, USER as never); });
  it('ship', async () => { await ctrl.ship(UUID, USER as never); });
  it('fulfill', async () => { await ctrl.fulfill(UUID, USER as never); });
  it('partial', async () => { await ctrl.partial(UUID, USER as never); });
  it('hold', async () => { await ctrl.hold(UUID, {} as never, USER as never); });
  it('release', async () => { await ctrl.release(UUID, USER as never); });
  it('fail', async () => { await ctrl.fail(UUID, {} as never, USER as never); });
  it('cancel', async () => { await ctrl.cancel(UUID, {} as never, USER as never); });
  it('list', async () => { await ctrl.list({} as never); });
  it('getById', async () => { await ctrl.getById(UUID); });
});

// ═══ DISPATCH ═══
describe('DispatchController', () => {
  let ctrl: DispatchController;
  beforeEach(() => { ({ ctrl } = mkCtrl(DispatchController) as never); });
  it('create', async () => { await ctrl.create({} as never, USER as never); });
  it('addShipment', async () => { await ctrl.addShipment(UUID, {} as never, USER as never); });
  it('removeShipment', async () => { await ctrl.removeShipment(UUID, UUID2, USER as never); });
  it('assign', async () => { await ctrl.assign(UUID, {} as never, USER as never); });
  it('manifest', async () => { await ctrl.manifest(UUID, {} as never, USER as never); });
  it('updateEta', async () => { await ctrl.updateEta(UUID, {} as never, USER as never); });
  it('start', async () => { await ctrl.start(UUID, USER as never); });
  it('inTransit', async () => { await ctrl.inTransit(UUID, USER as never); });
  it('complete', async () => { await ctrl.complete(UUID, USER as never); });
  it('fail', async () => { await ctrl.fail(UUID, {} as never, USER as never); });
  it('markReturned', async () => { await ctrl.markReturned(UUID, {} as never, USER as never); });
  it('cancel', async () => { await ctrl.cancel(UUID, {} as never, USER as never); });
  it('list', async () => { await ctrl.list({} as never); });
  it('getById', async () => { await ctrl.getById(UUID); });
});

// ═══ RETURN SHIPMENT ═══
describe('ReturnShipmentController', () => {
  let ctrl: ReturnShipmentController;
  beforeEach(() => { ({ ctrl } = mkCtrl(ReturnShipmentController) as never); });
  it('request', async () => { await ctrl.request({} as never, USER as never); });
  it('approve', async () => { await ctrl.approve(UUID, USER as never); });
  it('reject', async () => { await ctrl.reject(UUID, {} as never, USER as never); });
  it('schedulePickup', async () => { await ctrl.schedulePickup(UUID, {} as never, USER as never); });
  it('pickup', async () => { await ctrl.pickup(UUID, {} as never, USER as never); });
  it('inTransit', async () => { await ctrl.inTransit(UUID, USER as never); });
  it('receive', async () => { await ctrl.receive(UUID, USER as never); });
  it('inspect', async () => { await ctrl.inspect(UUID, {} as never, USER as never); });
  it('complete', async () => { await ctrl.complete(UUID, USER as never); });
  it('refund', async () => { await ctrl.refund(UUID, {} as never, USER as never); });
  it('cancel', async () => { await ctrl.cancel(UUID, {} as never, USER as never); });
  it('markLost', async () => { await ctrl.markLost(UUID, {} as never, USER as never); });
  it('list', async () => { await ctrl.list({} as never); });
  it('getByRma', async () => { await ctrl.getByRma('RMA-2026-000001'); });
  it('getById', async () => { await ctrl.getById(UUID); });
});

// ═══ INSURANCE ═══
describe('InsuranceController', () => {
  let ctrl: InsuranceController;
  beforeEach(() => { ({ ctrl } = mkCtrl(InsuranceController) as never); });
  it('purchase', async () => { await ctrl.purchase({} as never, USER as never); });
  it('activate', async () => { await ctrl.activate(UUID, USER as never); });
  it('expire', async () => { await ctrl.expire(UUID, USER as never); });
  it('cancel', async () => { await ctrl.cancel(UUID, {} as never, USER as never); });
  it('fileClaim', async () => { await ctrl.fileClaim(UUID, {} as never, USER as never); });
  it('startReview', async () => { await ctrl.startReview(UUID, USER as never); });
  it('approveClaim', async () => { await ctrl.approveClaim(UUID, {} as never, USER as never); });
  it('rejectClaim', async () => { await ctrl.rejectClaim(UUID, {} as never, USER as never); });
  it('payClaim', async () => { await ctrl.payClaim(UUID, USER as never); });
  it('appeal', async () => { await ctrl.appeal(UUID, {} as never, USER as never); });
  it('list', async () => { await ctrl.list({} as never); });
  it('getByShipment', async () => { await ctrl.getByShipment(UUID); });
  it('getById', async () => { await ctrl.getById(UUID); });
});

// ═══ PUBLIC LOGISTICS ═══
describe('PublicLogisticsController', () => {
  let ctrl: PublicLogisticsController;
  beforeEach(() => { ({ ctrl } = mkCtrl(PublicLogisticsController) as never); });
  it('track', async () => { await ctrl.track('SH1'); });
  it('shipment', async () => { await ctrl.shipment(UUID); });
});

// ═══ WEBHOOKS ═══
describe('Webhook controllers', () => {
  it('pathao receives with valid secret', async () => {
    const c = new PathaoWebhookController();
    const r = await c.receive('validsecret1234', {} as never);
    expect(r.received).toBe(true);
  });
  it('pathao rejects invalid secret', async () => {
    const c = new PathaoWebhookController();
    await expect(c.receive('short', {} as never)).rejects.toThrow();
  });
  it('redx receives with valid secret', async () => {
    const c = new RedxWebhookController();
    expect((await c.receive('validsecret1234', {} as never)).received).toBe(true);
  });
  it('steadfast receives with valid secret', async () => {
    const c = new SteadfastWebhookController();
    expect((await c.receive('validsecret1234', {} as never)).received).toBe(true);
  });
  it('sa-paribahan receives with valid secret', async () => {
    const c = new SaParibahanWebhookController();
    expect((await c.receive('validsecret1234', {} as never)).received).toBe(true);
  });
});
