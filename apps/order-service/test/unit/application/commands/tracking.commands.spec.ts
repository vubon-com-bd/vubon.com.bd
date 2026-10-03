import { jest } from '@jest/globals';
import { AddTrackingHandler } from '../../../../src/module/application/commands/tracking/add-tracking.handler.js';
import { UpdateTrackingHandler } from '../../../../src/module/application/commands/tracking/update-tracking.handler.js';
import { AddTrackingCommand } from '../../../../src/module/application/commands/tracking/add-tracking.command.js';
import { TRACKING_COMMAND_HANDLERS } from '../../../../src/module/application/commands/tracking/index.js';

function mockService() {
  return {
    add: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({}),
  };
}

describe('Tracking command handlers', () => {
  let service: ReturnType<typeof mockService>;
  beforeEach(() => { service = mockService(); });

  it('AddTrackingHandler', async () => {
    const h = new AddTrackingHandler(service as never);
    await h.execute(new AddTrackingCommand({} as never));
    expect(service.add).toHaveBeenCalled();
  });

  it('UpdateTrackingHandler', async () => {
    const h = new UpdateTrackingHandler(service as never);
    await h.execute({ dto: {}, actorId: 'a' } as never);
    expect(service.update).toHaveBeenCalled();
  });

  it('TRACKING_COMMAND_HANDLERS exports 2', () => {
    expect(TRACKING_COMMAND_HANDLERS).toHaveLength(2);
  });
});
