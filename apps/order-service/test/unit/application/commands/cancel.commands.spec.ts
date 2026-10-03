import { jest } from '@jest/globals';
import { RequestCancelHandler } from '../../../../src/module/application/commands/cancel/request-cancel.handler.js';
import { ApproveCancelHandler } from '../../../../src/module/application/commands/cancel/approve-cancel.handler.js';
import { RejectCancelHandler } from '../../../../src/module/application/commands/cancel/reject-cancel.handler.js';
import { RequestCancelCommand } from '../../../../src/module/application/commands/cancel/request-cancel.command.js';
import { CANCEL_COMMAND_HANDLERS } from '../../../../src/module/application/commands/cancel/index.js';

function mockService() {
  return {
    request: jest.fn().mockResolvedValue({}),
    approve: jest.fn().mockResolvedValue({}),
    reject: jest.fn().mockResolvedValue({}),
  };
}

describe('Cancel command handlers', () => {
  let service: ReturnType<typeof mockService>;
  beforeEach(() => { service = mockService(); });

  it('RequestCancelHandler', async () => {
    const h = new RequestCancelHandler(service as never);
    await h.execute(new RequestCancelCommand({} as never));
    expect(service.request).toHaveBeenCalled();
  });

  it('ApproveCancelHandler', async () => {
    const h = new ApproveCancelHandler(service as never);
    await h.execute({ dto: {}, actorId: 'a' } as never);
    expect(service.approve).toHaveBeenCalled();
  });

  it('RejectCancelHandler', async () => {
    const h = new RejectCancelHandler(service as never);
    await h.execute({ dto: {}, actorId: 'a' } as never);
    expect(service.reject).toHaveBeenCalled();
  });

  it('CANCEL_COMMAND_HANDLERS exports 3', () => {
    expect(CANCEL_COMMAND_HANDLERS).toHaveLength(3);
  });
});
