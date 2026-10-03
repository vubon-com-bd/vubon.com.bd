import { jest } from '@jest/globals';
import { StartFulfillmentHandler } from '../../../../src/module/application/commands/fulfillment/start-fulfillment.handler.js';
import { PackOrderHandler } from '../../../../src/module/application/commands/fulfillment/pack-order.handler.js';
import { ShipOrderHandler } from '../../../../src/module/application/commands/fulfillment/ship-order.handler.js';
import { CompleteFulfillmentHandler } from '../../../../src/module/application/commands/fulfillment/complete-fulfillment.handler.js';
import { StartFulfillmentCommand } from '../../../../src/module/application/commands/fulfillment/start-fulfillment.command.js';
import { FULFILLMENT_COMMAND_HANDLERS } from '../../../../src/module/application/commands/fulfillment/index.js';

function mockService() {
  return {
    start: jest.fn().mockResolvedValue({}),
    pack: jest.fn().mockResolvedValue({}),
    ship: jest.fn().mockResolvedValue({}),
    complete: jest.fn().mockResolvedValue({}),
  };
}

describe('Fulfillment command handlers', () => {
  let service: ReturnType<typeof mockService>;
  beforeEach(() => { service = mockService(); });

  it('StartFulfillmentHandler', async () => {
    const h = new StartFulfillmentHandler(service as never);
    await h.execute(new StartFulfillmentCommand({} as never));
    expect(service.start).toHaveBeenCalled();
  });

  it('PackOrderHandler', async () => {
    const h = new PackOrderHandler(service as never);
    await h.execute({ dto: {}, actorId: 'a' } as never);
    expect(service.pack).toHaveBeenCalled();
  });

  it('ShipOrderHandler', async () => {
    const h = new ShipOrderHandler(service as never);
    await h.execute({ dto: {}, actorId: 'a' } as never);
    expect(service.ship).toHaveBeenCalled();
  });

  it('CompleteFulfillmentHandler', async () => {
    const h = new CompleteFulfillmentHandler(service as never);
    await h.execute({ dto: {}, actorId: 'a' } as never);
    expect(service.complete).toHaveBeenCalled();
  });

  it('FULFILLMENT_COMMAND_HANDLERS exports 4', () => {
    expect(FULFILLMENT_COMMAND_HANDLERS).toHaveLength(4);
  });
});
