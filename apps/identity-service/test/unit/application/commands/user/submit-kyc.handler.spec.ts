import { describe, it, expect, beforeEach } from '@jest/globals';
import { SubmitKycHandler } from '@application/commands/user/submit-kyc.handler.js';
import { SubmitKycCommand } from '@application/commands/user/submit-kyc.command.js';
import { makeUserKycServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('SubmitKycHandler', () => {
  let handler: SubmitKycHandler;
  let service: ReturnType<typeof makeUserKycServiceMock>;

  beforeEach(() => {
    service = makeUserKycServiceMock();
    service.submit.mockResolvedValue({ id: 'k1', status: 'pending' } as never);
    handler = new SubmitKycHandler(service as never);
  });

  it('commandType = user.submit-kyc', () => { expect(handler.commandType).toBe('user.submit-kyc'); });

  it('should call submit', async () => {
    const cmd = new SubmitKycCommand(TEST_IDS.USER_ID, { documents: [] } as never);
    const result = await handler.execute(cmd);
    expect(result.status).toBe('pending');
  });
});
