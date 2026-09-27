import { jest } from '@jest/globals';

import { UserKycService } from '@application/services/impl/user-kyc.service';
import { GetKycStatusQuery } from '@application/queries/kyc/get-kyc-status.query';
import { ListKycDocumentsQuery } from '@application/queries/kyc/list-kyc-documents.query';
import { SubmitKycCommand } from '@application/commands/kyc/submit-kyc.command';
import { VerifyKycCommand } from '@application/commands/kyc/verify-kyc.command';
import { RejectKycCommand } from '@application/commands/kyc/reject-kyc.command';
import { ReverifyKycCommand } from '@application/commands/kyc/reverify-kyc.command';

describe('UserKycService — extended', () => {
  let service: UserKycService;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn().mockResolvedValue({ status: 'pending' }) };
    queryBus = { execute: jest.fn().mockResolvedValue({ items: [], total: 0 }) };
    service = new UserKycService(commandBus as never, queryBus as never);
  });

  it('listDocuments → ListKycDocumentsQuery', async () => {
    await service.listDocuments('u-1');
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(ListKycDocumentsQuery));
  });

  it('reject → RejectKycCommand', async () => {
    await service.reject('k-1', 'reason', 'admin-1');
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(RejectKycCommand));
  });

  it('reverify → ReverifyKycCommand', async () => {
    await service.reverify('k-1', 'u-1');
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(ReverifyKycCommand));
  });

  it('getStatus → GetKycStatusQuery', async () => {
    queryBus.execute.mockResolvedValue({ userId: 'u-1', status: 'pending' });
    await service.getStatus('u-1');
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(GetKycStatusQuery));
  });

  it('submit → SubmitKycCommand', async () => {
    await service.submit({ userId: 'u-1' } as never);
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(SubmitKycCommand));
  });

  it('verify → VerifyKycCommand', async () => {
    await service.verify('k-1', 'admin-1');
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(VerifyKycCommand));
  });
});
