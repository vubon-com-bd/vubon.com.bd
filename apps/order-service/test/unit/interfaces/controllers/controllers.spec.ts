/**
 * Controllers smoke tests — verify bus.execute called with right command/query
 */
import { jest } from '@jest/globals';
import { OrderController } from '../../../../src/module/interfaces/controllers/rest/order.controller.js';
import { OrderItemController } from '../../../../src/module/interfaces/controllers/rest/order-item.controller.js';
import { CheckoutController } from '../../../../src/module/interfaces/controllers/rest/checkout.controller.js';
import { DeliveryController } from '../../../../src/module/interfaces/controllers/rest/delivery.controller.js';
import { CancelController } from '../../../../src/module/interfaces/controllers/rest/cancel.controller.js';
import { ReturnController } from '../../../../src/module/interfaces/controllers/rest/return.controller.js';
import { FulfillmentController } from '../../../../src/module/interfaces/controllers/rest/fulfillment.controller.js';
import { TrackingController } from '../../../../src/module/interfaces/controllers/rest/tracking.controller.js';

const USER = { userId: '22222222-2222-4222-8222-222222222222' };
const UUID_ORDER = '11111111-1111-4111-8111-111111111111';
const UUID_ITEM = '44444444-4444-4444-8444-444444444444';
const UUID_CHECKOUT = '77777777-7777-4777-8777-777777777777';

function buses() {
  return {
    cmd: { execute: jest.fn().mockResolvedValue({ id: 'x' }) },
    qry: { execute: jest.fn().mockResolvedValue({ id: 'x' }) },
  };
}

describe('OrderController', () => {
  it('create()', async () => {
    const { cmd, qry } = buses();
    const c = new OrderController(cmd as never, qry as never);
    await c.create({ customerId: USER.userId } as never, USER as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('list()', async () => {
    const { cmd, qry } = buses();
    const c = new OrderController(cmd as never, qry as never);
    await c.list('1', '20', 'pending', undefined, undefined);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('stats()', async () => {
    const { cmd, qry } = buses();
    const c = new OrderController(cmd as never, qry as never);
    await c.stats();
    expect(qry.execute).toHaveBeenCalled();
  });
  it('getByNumber()', async () => {
    const { cmd, qry } = buses();
    const c = new OrderController(cmd as never, qry as never);
    await c.getByNumber('ORD-2026-000001');
    expect(qry.execute).toHaveBeenCalled();
  });
  it('getById()', async () => {
    const { cmd, qry } = buses();
    const c = new OrderController(cmd as never, qry as never);
    await c.getById(UUID_ORDER);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('listByCustomer()', async () => {
    const { cmd, qry } = buses();
    const c = new OrderController(cmd as never, qry as never);
    await c.listByCustomer(USER.userId, '1', '20');
    expect(qry.execute).toHaveBeenCalled();
  });
  it('update()', async () => {
    const { cmd, qry } = buses();
    const c = new OrderController(cmd as never, qry as never);
    await c.update(UUID_ORDER, {} as never, USER as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('confirm()', async () => {
    const { cmd, qry } = buses();
    const c = new OrderController(cmd as never, qry as never);
    await c.confirm(UUID_ORDER, {} as never, USER as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('hold()', async () => {
    const { cmd, qry } = buses();
    const c = new OrderController(cmd as never, qry as never);
    await c.hold(UUID_ORDER, { reason: 'wait' } as never, USER as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('release()', async () => {
    const { cmd, qry } = buses();
    const c = new OrderController(cmd as never, qry as never);
    await c.release(UUID_ORDER, {}, USER as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('delete()', async () => {
    const { cmd, qry } = buses();
    const c = new OrderController(cmd as never, qry as never);
    await c.delete(UUID_ORDER, 'reason', USER as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
});

describe('OrderItemController', () => {
  it('add()', async () => {
    const { cmd, qry } = buses();
    const c = new OrderItemController(cmd as never, qry as never);
    await c.add(UUID_ORDER, {} as never, USER as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('list()', async () => {
    const { cmd, qry } = buses();
    const c = new OrderItemController(cmd as never, qry as never);
    await c.list(UUID_ORDER);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('getById()', async () => {
    const { cmd, qry } = buses();
    const c = new OrderItemController(cmd as never, qry as never);
    await c.getById(UUID_ITEM);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('update()', async () => {
    const { cmd, qry } = buses();
    const c = new OrderItemController(cmd as never, qry as never);
    await c.update(UUID_ORDER, UUID_ITEM, {} as never, USER as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('remove()', async () => {
    const { cmd, qry } = buses();
    const c = new OrderItemController(cmd as never, qry as never);
    await c.remove(UUID_ORDER, UUID_ITEM, USER as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
});

describe('CheckoutController', () => {
  it('start()', async () => {
    const { cmd, qry } = buses();
    const c = new CheckoutController(cmd as never, qry as never);
    await c.start({} as never, USER as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('getById()', async () => {
    const { cmd, qry } = buses();
    const c = new CheckoutController(cmd as never, qry as never);
    await c.getById(UUID_CHECKOUT);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('selectAddress()', async () => {
    const { cmd, qry } = buses();
    const c = new CheckoutController(cmd as never, qry as never);
    await c.selectAddress(UUID_CHECKOUT, {} as never, USER as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('selectShipping()', async () => {
    const { cmd, qry } = buses();
    const c = new CheckoutController(cmd as never, qry as never);
    await c.selectShipping(UUID_CHECKOUT, {} as never, USER as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('selectPayment()', async () => {
    const { cmd, qry } = buses();
    const c = new CheckoutController(cmd as never, qry as never);
    await c.selectPayment(UUID_CHECKOUT, {} as never, USER as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('confirm()', async () => {
    const { cmd, qry } = buses();
    const c = new CheckoutController(cmd as never, qry as never);
    await c.confirm(UUID_CHECKOUT, {}, USER as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('abandon()', async () => {
    const { cmd, qry } = buses();
    const c = new CheckoutController(cmd as never, qry as never);
    await c.abandon(UUID_CHECKOUT, {}, USER as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
});

describe('DeliveryController', () => {
  it('schedule()', async () => {
    const { cmd, qry } = buses();
    const c = new DeliveryController(cmd as never, qry as never);
    await c.schedule({} as never, USER as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('methods()', async () => {
    const { cmd, qry } = buses();
    const c = new DeliveryController(cmd as never, qry as never);
    await c.methods('true');
    expect(qry.execute).toHaveBeenCalled();
  });
  it('getById()', async () => {
    const { cmd, qry } = buses();
    const c = new DeliveryController(cmd as never, qry as never);
    await c.getById('dddddddd-dddd-4ddd-8ddd-dddddddddddd');
    expect(qry.execute).toHaveBeenCalled();
  });
  it('listByOrder()', async () => {
    const { cmd, qry } = buses();
    const c = new DeliveryController(cmd as never, qry as never);
    await c.listByOrder(UUID_ORDER);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('reschedule()', async () => {
    const { cmd, qry } = buses();
    const c = new DeliveryController(cmd as never, qry as never);
    await c.reschedule('dddddddd-dddd-4ddd-8ddd-dddddddddddd', {} as never, USER as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('confirm()', async () => {
    const { cmd, qry } = buses();
    const c = new DeliveryController(cmd as never, qry as never);
    await c.confirm('dddddddd-dddd-4ddd-8ddd-dddddddddddd', { orderId: UUID_ORDER }, USER as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
});

describe('CancelController', () => {
  it('request()', async () => {
    const { cmd, qry } = buses();
    const c = new CancelController(cmd as never, qry as never);
    await c.request({} as never, USER as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('getById()', async () => {
    const { cmd, qry } = buses();
    const c = new CancelController(cmd as never, qry as never);
    await c.getById('cccccccc-cccc-4ccc-8ccc-cccccccccccc');
    expect(qry.execute).toHaveBeenCalled();
  });
  it('listByOrder()', async () => {
    const { cmd, qry } = buses();
    const c = new CancelController(cmd as never, qry as never);
    await c.listByOrder(UUID_ORDER);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('approve()', async () => {
    const { cmd, qry } = buses();
    const c = new CancelController(cmd as never, qry as never);
    await c.approve('cccccccc-cccc-4ccc-8ccc-cccccccccccc', { orderId: UUID_ORDER }, USER as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('reject()', async () => {
    const { cmd, qry } = buses();
    const c = new CancelController(cmd as never, qry as never);
    await c.reject('cccccccc-cccc-4ccc-8ccc-cccccccccccc', { orderId: UUID_ORDER, reason: 'x' }, USER as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
});

describe('ReturnController', () => {
  it('request()', async () => {
    const { cmd, qry } = buses();
    const c = new ReturnController(cmd as never, qry as never);
    await c.request({} as never, USER as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('getById()', async () => {
    const { cmd, qry } = buses();
    const c = new ReturnController(cmd as never, qry as never);
    await c.getById('eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee');
    expect(qry.execute).toHaveBeenCalled();
  });
  it('listByOrder()', async () => {
    const { cmd, qry } = buses();
    const c = new ReturnController(cmd as never, qry as never);
    await c.listByOrder(UUID_ORDER);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('approve()', async () => {
    const { cmd, qry } = buses();
    const c = new ReturnController(cmd as never, qry as never);
    await c.approve('eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee', { orderId: UUID_ORDER }, USER as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('reject()', async () => {
    const { cmd, qry } = buses();
    const c = new ReturnController(cmd as never, qry as never);
    await c.reject('eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee', { orderId: UUID_ORDER, reason: 'x' }, USER as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('complete()', async () => {
    const { cmd, qry } = buses();
    const c = new ReturnController(cmd as never, qry as never);
    await c.complete('eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee', { orderId: UUID_ORDER, refundAmount: 100 }, USER as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
});

describe('FulfillmentController', () => {
  it('start()', async () => {
    const { cmd, qry } = buses();
    const c = new FulfillmentController(cmd as never, qry as never);
    await c.start({} as never, USER as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('getById()', async () => {
    const { cmd, qry } = buses();
    const c = new FulfillmentController(cmd as never, qry as never);
    await c.getById('ffffffff-ffff-4fff-8fff-ffffffffffff');
    expect(qry.execute).toHaveBeenCalled();
  });
  it('listByOrder()', async () => {
    const { cmd, qry } = buses();
    const c = new FulfillmentController(cmd as never, qry as never);
    await c.listByOrder(UUID_ORDER);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('pack()', async () => {
    const { cmd, qry } = buses();
    const c = new FulfillmentController(cmd as never, qry as never);
    await c.pack({} as never, USER as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('ship()', async () => {
    const { cmd, qry } = buses();
    const c = new FulfillmentController(cmd as never, qry as never);
    await c.ship({} as never, USER as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('complete()', async () => {
    const { cmd, qry } = buses();
    const c = new FulfillmentController(cmd as never, qry as never);
    await c.complete('ffffffff-ffff-4fff-8fff-ffffffffffff', { orderId: UUID_ORDER }, USER as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
});

describe('TrackingController', () => {
  it('add()', async () => {
    const { cmd, qry } = buses();
    const c = new TrackingController(cmd as never, qry as never);
    await c.add({} as never, USER as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
  it('getById()', async () => {
    const { cmd, qry } = buses();
    const c = new TrackingController(cmd as never, qry as never);
    await c.getById('tttttttt-tttt-4ttt-8ttt-tttttttttttt');
    expect(qry.execute).toHaveBeenCalled();
  });
  it('listEvents()', async () => {
    const { cmd, qry } = buses();
    const c = new TrackingController(cmd as never, qry as never);
    await c.listEvents(UUID_ORDER);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('summary()', async () => {
    const { cmd, qry } = buses();
    const c = new TrackingController(cmd as never, qry as never);
    await c.summary(UUID_ORDER);
    expect(qry.execute).toHaveBeenCalled();
  });
  it('update()', async () => {
    const { cmd, qry } = buses();
    const c = new TrackingController(cmd as never, qry as never);
    await c.update('tttttttt-tttt-4ttt-8ttt-tttttttttttt', {} as never, USER as never);
    expect(cmd.execute).toHaveBeenCalled();
  });
});
