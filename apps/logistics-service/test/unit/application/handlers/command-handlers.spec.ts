/**
 * Command handler tests — verify each handler injects the service
 * and delegates execute() to the right service method.
 */
import { describe, it, expect, jest } from '@jest/globals';

import { CreateShipmentHandler } from '@application/commands/shipment/create-shipment.handler.js';
import { ConfirmShipmentHandler } from '@application/commands/shipment/confirm-shipment.handler.js';
import { StartProcessingHandler } from '@application/commands/shipment/start-processing.handler.js';
import { MarkPackedHandler } from '@application/commands/shipment/mark-packed.handler.js';
import { DeliverShipmentHandler } from '@application/commands/shipment/deliver-shipment.handler.js';
import { CancelShipmentHandler } from '@application/commands/shipment/cancel-shipment.handler.js';
import { PickupShipmentHandler } from '@application/commands/shipment/pickup-shipment.handler.js';
import { MarkInTransitHandler } from '@application/commands/shipment/mark-in-transit.handler.js';
import { MarkOutForDeliveryHandler } from '@application/commands/shipment/mark-out-for-delivery.handler.js';
import { FailShipmentHandler } from '@application/commands/shipment/fail-shipment.handler.js';
import { GenerateLabelHandler } from '@application/commands/shipment/generate-label.handler.js';
import { AssignCourierHandler } from '@application/commands/shipment/assign-courier.handler.js';
import { AssignWarehouseHandler } from '@application/commands/shipment/assign-warehouse.handler.js';
import { ChangePriorityHandler } from '@application/commands/shipment/change-priority.handler.js';
import { UpdateShipmentHandler } from '@application/commands/shipment/update-shipment.handler.js';
import { PutOnHoldHandler } from '@application/commands/shipment/put-on-hold.handler.js';
import { ReleaseShipmentHandler } from '@application/commands/shipment/release-shipment.handler.js';
import { MarkDelayedHandler } from '@application/commands/shipment/mark-delayed.handler.js';
import { MarkReturnedHandler } from '@application/commands/shipment/mark-returned.handler.js';

import { CreateShipmentCommand } from '@application/commands/shipment/create-shipment.command.js';
import { ConfirmShipmentCommand } from '@application/commands/shipment/confirm-shipment.command.js';
import { StartProcessingCommand } from '@application/commands/shipment/start-processing.command.js';
import { MarkPackedCommand } from '@application/commands/shipment/mark-packed.command.js';
import { DeliverShipmentCommand } from '@application/commands/shipment/deliver-shipment.command.js';
import { CancelShipmentCommand } from '@application/commands/shipment/cancel-shipment.command.js';
import { PickupShipmentCommand } from '@application/commands/shipment/pickup-shipment.command.js';
import { MarkInTransitCommand } from '@application/commands/shipment/mark-in-transit.command.js';
import { MarkOutForDeliveryCommand } from '@application/commands/shipment/mark-out-for-delivery.command.js';
import { FailShipmentCommand } from '@application/commands/shipment/fail-shipment.command.js';
import { GenerateLabelCommand } from '@application/commands/shipment/generate-label.command.js';
import { AssignCourierCommand } from '@application/commands/shipment/assign-courier.command.js';
import { AssignWarehouseCommand } from '@application/commands/shipment/assign-warehouse.command.js';
import { ChangePriorityCommand } from '@application/commands/shipment/change-priority.command.js';
import { UpdateShipmentCommand } from '@application/commands/shipment/update-shipment.command.js';
import { PutOnHoldCommand } from '@application/commands/shipment/put-on-hold.command.js';
import { ReleaseShipmentCommand } from '@application/commands/shipment/release-shipment.command.js';
import { MarkDelayedCommand } from '@application/commands/shipment/mark-delayed.command.js';
import { MarkReturnedCommand } from '@application/commands/shipment/mark-returned.command.js';

const UUID = '550e8400-e29b-41d4-a716-446655440000';
const UUID2 = '550e8400-e29b-41d4-a716-446655440001';
const USER = 'u1';

const mkSvc = () => ({
  create: jest.fn(async () => ({ id: UUID })),
  confirm: jest.fn(async () => ({ id: UUID })),
  startProcessing: jest.fn(async () => ({ id: UUID })),
  markPacked: jest.fn(async () => ({ id: UUID })),
  deliver: jest.fn(async () => ({ id: UUID })),
  cancel: jest.fn(async () => ({ id: UUID })),
  pickup: jest.fn(async () => ({ id: UUID })),
  markInTransit: jest.fn(async () => ({ id: UUID })),
  markOutForDelivery: jest.fn(async () => ({ id: UUID })),
  fail: jest.fn(async () => ({ id: UUID })),
  generateLabel: jest.fn(async () => ({ id: UUID })),
  assignCourier: jest.fn(async () => ({ id: UUID })),
  assignWarehouse: jest.fn(async () => ({ id: UUID })),
  changePriority: jest.fn(async () => ({ id: UUID })),
  update: jest.fn(async () => ({ id: UUID })),
  putOnHold: jest.fn(async () => ({ id: UUID })),
  release: jest.fn(async () => ({ id: UUID })),
  markDelayed: jest.fn(async () => ({ id: UUID })),
  markReturned: jest.fn(async () => ({ id: UUID })),
}) as never;

type HandlerCtor<T> = new (svc: unknown) => { execute(c: T): Promise<unknown> };

const cases: Array<[string, HandlerCtor<unknown>, unknown, string]> = [
  ['CreateShipmentHandler', CreateShipmentHandler as never, new CreateShipmentCommand({ orderId: UUID } as never, USER), 'create'],
  ['ConfirmShipmentHandler', ConfirmShipmentHandler as never, new ConfirmShipmentCommand(UUID, USER), 'confirm'],
  ['StartProcessingHandler', StartProcessingHandler as never, new StartProcessingCommand(UUID, USER), 'startProcessing'],
  ['MarkPackedHandler', MarkPackedHandler as never, new MarkPackedCommand(UUID, USER), 'markPacked'],
  ['DeliverShipmentHandler', DeliverShipmentHandler as never, new DeliverShipmentCommand({ shipmentId: UUID } as never, USER), 'deliver'],
  ['CancelShipmentHandler', CancelShipmentHandler as never, new CancelShipmentCommand({ shipmentId: UUID } as never, USER), 'cancel'],
  ['PickupShipmentHandler', PickupShipmentHandler as never, new PickupShipmentCommand({ shipmentId: UUID } as never, USER), 'pickup'],
  ['MarkInTransitHandler', MarkInTransitHandler as never, new MarkInTransitCommand(UUID, USER), 'markInTransit'],
  ['MarkOutForDeliveryHandler', MarkOutForDeliveryHandler as never, new MarkOutForDeliveryCommand(UUID, USER), 'markOutForDelivery'],
  ['FailShipmentHandler', FailShipmentHandler as never, new FailShipmentCommand({ shipmentId: UUID, reason: 'x' } as never, USER), 'fail'],
  ['GenerateLabelHandler', GenerateLabelHandler as never, new GenerateLabelCommand({ shipmentId: UUID, labelUrl: 'x' } as never, USER), 'generateLabel'],
  ['AssignCourierHandler', AssignCourierHandler as never, new AssignCourierCommand({ shipmentId: UUID, courierId: UUID2 } as never, USER), 'assignCourier'],
  ['AssignWarehouseHandler', AssignWarehouseHandler as never, new AssignWarehouseCommand({ shipmentId: UUID, warehouseId: UUID2 } as never, USER), 'assignWarehouse'],
  ['ChangePriorityHandler', ChangePriorityHandler as never, new ChangePriorityCommand({ shipmentId: UUID, priority: 'urgent' } as never, USER), 'changePriority'],
  ['UpdateShipmentHandler', UpdateShipmentHandler as never, new UpdateShipmentCommand({ shipmentId: UUID } as never, USER), 'update'],
  ['PutOnHoldHandler', PutOnHoldHandler as never, new PutOnHoldCommand({ shipmentId: UUID } as never, USER), 'putOnHold'],
  ['ReleaseShipmentHandler', ReleaseShipmentHandler as never, new ReleaseShipmentCommand({ shipmentId: UUID } as never, USER), 'release'],
  ['MarkDelayedHandler', MarkDelayedHandler as never, new MarkDelayedCommand({ shipmentId: UUID, reason: 'x' } as never, USER), 'markDelayed'],
  ['MarkReturnedHandler', MarkReturnedHandler as never, new MarkReturnedCommand({ shipmentId: UUID, reason: 'x' } as never, USER), 'markReturned'],
];

describe.each(cases)('%s', (name, H, cmd, method) => {
  it('execute() delegates to service', async () => {
    const svc = mkSvc();
    const h = new H(svc);
    await h.execute(cmd);
    expect((svc as never as Record<string, jest.Mock>)[method]).toHaveBeenCalled();
  });
});
