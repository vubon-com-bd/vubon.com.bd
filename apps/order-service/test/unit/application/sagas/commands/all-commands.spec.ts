/**
 * Saga Helper Commands — Unit Tests
 * @module order-service/test/unit/application/sagas/commands
 *
 * Covers all 9 saga helper command constructors.
 */
import { describe, it, expect } from '@jest/globals';
import { NotifyCustomerCommand } from '@application/sagas/commands/notify-customer.command.js';
import { NotifyVendorCommand } from '@application/sagas/commands/notify-vendor.command.js';
import { ReserveInventoryCommand } from '@application/sagas/commands/reserve-inventory.command.js';
import { ReleaseInventoryCommand } from '@application/sagas/commands/release-inventory.command.js';
import { CreateShipmentCommand } from '@application/sagas/commands/create-shipment.command.js';
import { ProcessRefundCommand } from '@application/sagas/commands/process-refund.command.js';
import { SendOrderEmailCommand } from '@application/sagas/commands/send-order-email.command.js';
import { UpdateAnalyticsCommand } from '@application/sagas/commands/update-analytics.command.js';
import { PublishDomainEventCommand } from '@application/sagas/commands/publish-domain-event.command.js';

const ID = '550e8400-e29b-41d4-a716-446655440000';

describe('Saga Helper Commands', () => {
  it('NotifyCustomerCommand constructor', () => {
    const c = new NotifyCustomerCommand(ID, ID, 'order_created', { foo: 'bar' });
    expect(c.type).toBe('order.saga.notify-customer');
    expect(c.userId).toBe(ID);
    expect(c.orderId).toBe(ID);
    expect(c.template).toBe('order_created');
    expect(c.data.foo).toBe('bar');
  });

  it('NotifyVendorCommand constructor', () => {
    const c = new NotifyVendorCommand(ID, ID, 'fulfillment_started', {});
    expect(c.type).toBe('order.saga.notify-vendor');
    expect(c.vendorId).toBe(ID);
  });

  it('ReserveInventoryCommand constructor', () => {
    const c = new ReserveInventoryCommand(ID, [{ itemId: ID, quantity: 2 }]);
    expect(c.type).toBe('order.saga.reserve-inventory');
    expect(c.orderId).toBe(ID);
    expect(c.items.length).toBe(1);
  });

  it('ReleaseInventoryCommand constructor', () => {
    const c = new ReleaseInventoryCommand(ID, [{ itemId: ID, quantity: 1 }]);
    expect(c.type).toBe('order.saga.release-inventory');
    expect(c.items.length).toBe(1);
  });

  it('CreateShipmentCommand constructor', () => {
    const c = new CreateShipmentCommand(ID, ID, ID);
    expect(c.type).toBe('order.saga.create-shipment');
    expect(c.orderId).toBe(ID);
    expect(c.courierId).toBe(ID);
    expect(c.warehouseId).toBe(ID);
  });

  it('ProcessRefundCommand constructor', () => {
    const c = new ProcessRefundCommand(ID, 100, 'BDT', 'defective');
    expect(c.type).toBe('order.saga.process-refund');
    expect(c.amount).toBe(100);
    expect(c.currency).toBe('BDT');
  });

  it('SendOrderEmailCommand constructor', () => {
    const c = new SendOrderEmailCommand(ID, 'a@b.com', 'order_created', { x: 1 });
    expect(c.type).toBe('order.saga.send-email');
    expect(c.email).toBe('a@b.com');
  });

  it('UpdateAnalyticsCommand constructor', () => {
    const c = new UpdateAnalyticsCommand(ID, 'order.created', { total: 100 });
    expect(c.type).toBe('order.saga.update-analytics');
    expect(c.event).toBe('order.created');
  });

  it('PublishDomainEventCommand constructor', () => {
    const c = new PublishDomainEventCommand(ID, 'order.created', { foo: 'bar' });
    expect(c.type).toBe('order.saga.publish-event');
    expect(c.aggregateId).toBe(ID);
    expect(c.eventType).toBe('order.created');
  });
});
