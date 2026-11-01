import { describe, it, expect, beforeEach } from '@jest/globals';
import { VerifyKycHandler } from '@application/commands/user/verify-kyc.handler.js';
import { VerifyKycCommand } from '@application/commands/user/verify-kyc.command.js';
import { makeUserKycServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('VerifyKycHandler', () => {
  let handler: VerifyKycHandler;
  let service: ReturnType<typeof makeUserKycServiceMock>;

  beforeEach(() => {
    service = makeUserKycServiceMock();
    service.verify.mockResolvedValue({ status: 'verified' } as never);
    handler = new VerifyKycHandler(service as never);
  });

  it('commandType = user.verify-kyc', () => { expect(handler.commandType).toBe('user.verify-kyc'); });

  it('should call verify with reviewer', async () => {
    const cmd = new VerifyKycCommand({ kycId: TEST_IDS.KYC_ID } as never, 'admin-1');
    await handler.execute(cmd);
    expect(service.verify).toHaveBeenCalledWith(TEST_IDS.KYC_ID, 'admin-1');
  });
});
