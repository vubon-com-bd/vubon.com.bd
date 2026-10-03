import { jest } from '@jest/globals';
import { RequestReturnHandler } from '../../../../src/module/application/commands/return/request-return.handler.js';
import { ApproveReturnHandler } from '../../../../src/module/application/commands/return/approve-return.handler.js';
import { RejectReturnHandler } from '../../../../src/module/application/commands/return/reject-return.handler.js';
import { CompleteReturnHandler } from '../../../../src/module/application/commands/return/complete-return.handler.js';
import { RequestReturnCommand } from '../../../../src/module/application/commands/return/request-return.command.js';
import { RETURN_COMMAND_HANDLERS } from '../../../../src/module/application/commands/return/index.js';

function mockService() {
  return {
    request: jest.fn().mockResolvedValue({}),
    approve: jest.fn().mockResolvedValue({}),
    reject: jest.fn().mockResolvedValue({}),
    complete: jest.fn().mockResolvedValue({}),
  };
}

describe('Return command handlers', () => {
  let service: ReturnType<typeof mockService>;
  beforeEach(() => { service = mockService(); });

  it('RequestReturnHandler', async () => {
    const h = new RequestReturnHandler(service as never);
    await h.execute(new RequestReturnCommand({} as never));
    expect(service.request).toHaveBeenCalled();
  });

  it('ApproveReturnHandler', async () => {
    const h = new ApproveReturnHandler(service as never);
    await h.execute({ dto: {}, actorId: 'a' } as never);
    expect(service.approve).toHaveBeenCalled();
  });

  it('RejectReturnHandler', async () => {
    const h = new RejectReturnHandler(service as never);
    await h.execute({ dto: {}, actorId: 'a' } as never);
    expect(service.reject).toHaveBeenCalled();
  });

  it('CompleteReturnHandler', async () => {
    const h = new CompleteReturnHandler(service as never);
    await h.execute({ dto: {}, actorId: 'a' } as never);
    expect(service.complete).toHaveBeenCalled();
  });

  it('RETURN_COMMAND_HANDLERS exports 4', () => {
    expect(RETURN_COMMAND_HANDLERS).toHaveLength(4);
  });
});
