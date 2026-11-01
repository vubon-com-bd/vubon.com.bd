import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GetKycStatusQueryHandler } from '@application/queries/kyc/get-kyc-status.handler.js';
import { GetKycStatusQuery } from '@application/queries/kyc/get-kyc-status.query.js';
import type { UserKycServiceInterface } from '@application/services/interfaces/user-kyc.service.interface.js';

describe('GetKycStatusQueryHandler', () => {
  let handler: GetKycStatusQueryHandler;
  let mockService: jest.Mocked<UserKycServiceInterface>;

  beforeEach(() => {
    mockService = {
      name: 'UserKycService',
      findForUser: jest.fn(),
      submit: jest.fn(),
      verify: jest.fn(),
      reject: jest.fn(),
    } as unknown as jest.Mocked<UserKycServiceInterface>;
    handler = new GetKycStatusQueryHandler(mockService);
  });

  it('should have correct queryType', () => {
    expect(handler.queryType).toBe('user.get-kyc-status');
  });

  it('should return null if not found', async () => {
    mockService.findForUser.mockResolvedValue(null);
    const result = await handler.execute(new GetKycStatusQuery('u-1'));
    expect(result).toBeNull();
  });

  it('should return KYC if found', async () => {
    const kyc = {
      id: 'kyc-1', userId: 'u-1', status: 'verified', documents: [],
      updatedAt: new Date().toISOString(),
    };
    mockService.findForUser.mockResolvedValue(kyc);
    const result = await handler.execute(new GetKycStatusQuery('u-1'));
    expect(result).toEqual(kyc);
  });
});
