import { jest } from '@jest/globals';

import { UserKycService } from '@application/services/impl/user-kyc.service';
import { GetKycStatusQuery } from '@application/queries/kyc/get-kyc-status.query';
import { SubmitKycCommand } from '@application/commands/kyc/submit-kyc.command';
import { VerifyKycCommand } from '@application/commands/kyc/verify-kyc.command';

describe('Application UserKycService', () => {
  let service: UserKycService;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn() };
    queryBus = { execute: jest.fn() };
    service = new UserKycService(commandBus as never, queryBus as never);
  });

  it('getStatus → GetKycStatusQuery', async () => {
    queryBus.execute.mockResolvedValue({ userId: 'user-1', status: 'pending' });
    await service.getStatus('user-1');
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(GetKycStatusQuery));
  });

  it('submit → SubmitKycCommand', async () => {
    commandBus.execute.mockResolvedValue({ userId: 'user-1' });
    await service.submit({ userId: 'user-1' } as never);
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(SubmitKycCommand));
  });

  it('verify → VerifyKycCommand', async () => {
    commandBus.execute.mockResolvedValue({ status: 'approved' });
    await service.verify('kyc-1', 'admin-1');
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(VerifyKycCommand));
  });
});
