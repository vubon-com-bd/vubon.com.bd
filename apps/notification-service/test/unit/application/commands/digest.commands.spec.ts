import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CreateDigestHandler } from '../../../../src/module/application/commands/digest/create-digest.handler.js';
import { CreateDigestCommand } from '../../../../src/module/application/commands/digest/create-digest.command.js';
import { UpdateDigestHandler } from '../../../../src/module/application/commands/digest/update-digest.handler.js';
import { UpdateDigestCommand } from '../../../../src/module/application/commands/digest/update-digest.command.js';
import { GenerateDigestHandler } from '../../../../src/module/application/commands/digest/generate-digest.handler.js';
import { GenerateDigestCommand } from '../../../../src/module/application/commands/digest/generate-digest.command.js';
import { SendDigestHandler } from '../../../../src/module/application/commands/digest/send-digest.handler.js';
import { SendDigestCommand } from '../../../../src/module/application/commands/digest/send-digest.command.js';
import { CancelDigestHandler } from '../../../../src/module/application/commands/digest/cancel-digest.handler.js';
import { CancelDigestCommand } from '../../../../src/module/application/commands/digest/cancel-digest.command.js';

function mockSvc() {
  const r = jest.fn().mockResolvedValue({ id: 'd-1' });
  return { create: r, update: r, generate: r, send: r, cancel: r } as never;
}

describe('Digest command handlers', () => {
  let svc: ReturnType<typeof mockSvc>;
  beforeEach(() => { svc = mockSvc(); });
  it('CreateDigestHandler', async () => {
    await new CreateDigestHandler(svc).execute(new CreateDigestCommand({
      userId: 'u', frequency: 'daily', type: 'summary',
      periodStart: new Date().toISOString(), periodEnd: new Date().toISOString(),
    } as never, 'a'));
    expect(svc.create).toHaveBeenCalled();
  });
  it('UpdateDigestHandler', async () => {
    await new UpdateDigestHandler(svc).execute(new UpdateDigestCommand({ digestId: 'd-1' } as never, 'a'));
    expect(svc.update).toHaveBeenCalled();
  });
  it('GenerateDigestHandler', async () => {
    await new GenerateDigestHandler(svc).execute(new GenerateDigestCommand({
      userId: 'u', frequency: 'daily',
    } as never, 'a'));
    expect(svc.generate).toHaveBeenCalled();
  });
  it('SendDigestHandler', async () => {
    await new SendDigestHandler(svc).execute(new SendDigestCommand({ digestId: 'd-1', channel: 'email' } as never, 'a'));
    expect(svc.send).toHaveBeenCalled();
  });
  it('CancelDigestHandler', async () => {
    await new CancelDigestHandler(svc).execute(new CancelDigestCommand('d-1', 'a'));
    expect(svc.cancel).toHaveBeenCalled();
  });
});
