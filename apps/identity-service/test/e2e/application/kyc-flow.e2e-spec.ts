/**
 * E2E — KYC Flow
 * @module identity-service/test/e2e/application
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { SubmitKycHandler } from '@application/commands/user/submit-kyc.handler.js';
import { VerifyKycHandler } from '@application/commands/user/verify-kyc.handler.js';
import { RejectKycHandler } from '@application/commands/user/reject-kyc.handler.js';
import { SubmitKycCommand } from '@application/commands/user/submit-kyc.command.js';
import { VerifyKycCommand } from '@application/commands/user/verify-kyc.command.js';
import { RejectKycCommand } from '@application/commands/user/reject-kyc.command.js';
import { makeUserKycServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('E2E — KYC Flow', () => {
  let service: ReturnType<typeof makeUserKycServiceMock>;
  let submitHandler: SubmitKycHandler;
  let verifyHandler: VerifyKycHandler;
  let rejectHandler: RejectKycHandler;

  beforeEach(() => {
    service = makeUserKycServiceMock();
    service.submit.mockResolvedValue({ id: TEST_IDS.KYC_ID, status: 'pending' } as never);
    service.verify.mockResolvedValue({ id: TEST_IDS.KYC_ID, status: 'verified' } as never);
    service.reject.mockResolvedValue({ id: TEST_IDS.KYC_ID, status: 'rejected', rejectionReason: 'blurry' } as never);

    submitHandler = new SubmitKycHandler(service as never);
    verifyHandler = new VerifyKycHandler(service as never);
    rejectHandler = new RejectKycHandler(service as never);
  });

  it('submit → verify flow', async () => {
    const sub = await submitHandler.execute(
      new SubmitKycCommand(TEST_IDS.USER_ID, { documents: [] } as never),
    );
    expect(sub.status).toBe('pending');

    const ver = await verifyHandler.execute(
      new VerifyKycCommand({ kycId: TEST_IDS.KYC_ID } as never, 'admin-1'),
    );
    expect(ver.status).toBe('verified');
  });

  it('submit → reject flow', async () => {
    const sub = await submitHandler.execute(
      new SubmitKycCommand(TEST_IDS.USER_ID, { documents: [] } as never),
    );
    expect(sub.status).toBe('pending');

    const rej = await rejectHandler.execute(
      new RejectKycCommand({ kycId: TEST_IDS.KYC_ID, reason: 'blurry' } as never, 'admin-1'),
    );
    expect(rej.status).toBe('rejected');
    expect(rej.rejectionReason).toBe('blurry');
  });

  it('verify calls service with correct reviewer', async () => {
    await verifyHandler.execute(new VerifyKycCommand({ kycId: TEST_IDS.KYC_ID } as never, 'admin-x'));
    expect(service.verify).toHaveBeenCalledWith(TEST_IDS.KYC_ID, 'admin-x');
  });
});
