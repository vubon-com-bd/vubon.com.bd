import { describe, it, expect, beforeEach } from '@jest/globals';
import { RejectKycHandler } from '@application/commands/user/reject-kyc.handler.js';
import { RejectKycCommand } from '@application/commands/user/reject-kyc.command.js';
import { makeUserKycServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('RejectKycHandler', () => {
  let handler: RejectKycHandler;
  let service: ReturnType<typeof makeUserKycServiceMock>;

  beforeEach(() => {
    service = makeUserKycServiceMock();
    service.reject.mockResolvedValue({ status: 'rejected' } as never);
    handler = new RejectKycHandler(service as never);
  });

  it('commandType = user.reject-kyc', () => { expect(handler.commandType).toBe('user.reject-kyc'); });

  it('should call reject with reason', async () => {
    const cmd = new RejectKycCommand({ kycId: TEST_IDS.KYC_ID, reason: 'blurry' } as never, 'admin-1');
    await handler.execute(cmd);
    expect(service.reject).toHaveBeenCalledWith(TEST_IDS.KYC_ID, 'blurry', 'admin-1');
  });
});
