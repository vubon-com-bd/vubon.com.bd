import { jest } from '@jest/globals';

import { UserKycController } from '@interfaces/controllers/rest/user-kyc.controller';
import type { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetKycStatusQuery } from '@application/queries/kyc/get-kyc-status.query';
import { SubmitKycCommand } from '@application/commands/kyc/submit-kyc.command';

describe('UserKycController', () => {
  let controller: UserKycController;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  const buildKycDto = (status = 'pending') => ({
    userId: 'user-1',
    status,
    level: 0,
    documents: [],
    updatedAt: '2026-01-01T00:00:00.000Z',
  });

  beforeEach(() => {
    commandBus = { execute: jest.fn() };
    queryBus = { execute: jest.fn() };
    controller = new UserKycController(
      commandBus as unknown as CommandBus,
      queryBus as unknown as QueryBus
    );
  });

  it('should get KYC status', async () => {
    queryBus.execute.mockResolvedValue(buildKycDto('pending'));
    const result = await controller.getStatus('user-1');
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(GetKycStatusQuery));
    expect(result.userId).toBe('user-1');
    expect(result.status).toBe('pending');
  });

  it('should submit KYC', async () => {
    commandBus.execute.mockResolvedValue(buildKycDto('pending'));
    const result = await controller.submit('user-1', {
      documents: [{ type: 'nid', frontUrl: 'https://x.com/a.jpg' }],
      acceptTerms: true,
    });
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(SubmitKycCommand));
    expect(result.userId).toBe('user-1');
  });

  it('should list KYC documents', async () => {
    queryBus.execute.mockResolvedValue({ items: [], total: 0 });
    const result = await controller.listDocuments('user-1');
    expect(result.total).toBe(0);
  });

  it('should verify KYC', async () => {
    commandBus.execute.mockResolvedValue(buildKycDto('approved'));
    const result = await controller.verify('kyc-1');
    expect(result.status).toBe('approved');
  });

  it('should reject KYC', async () => {
    commandBus.execute.mockResolvedValue({
      ...buildKycDto('rejected'),
      rejectionReason: 'Blurry image',
    });
    const result = await controller.reject('kyc-1', { reason: 'Blurry image' });
    expect(result.status).toBe('rejected');
    expect(result.rejectionReason).toBe('Blurry image');
  });
});
