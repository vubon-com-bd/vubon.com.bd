import { describe, it, expect, beforeEach } from '@jest/globals';
import { GetUserKycStatusHandler } from '@application/queries/user/get-user-kyc-status.handler.js';
import { GetUserKycStatusQuery } from '@application/queries/user/get-user-kyc-status.query.js';
import { makeUserKycServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('GetUserKycStatusHandler', () => {
  let handler: GetUserKycStatusHandler;
  let service: ReturnType<typeof makeUserKycServiceMock>;

  beforeEach(() => {
    service = makeUserKycServiceMock();
    handler = new GetUserKycStatusHandler(service as never);
  });

  it('queryType = user.get-kyc-status', () => {
    expect(handler.queryType).toBe('user.get-kyc-status');
  });

  it('should return null when no KYC', async () => {
    service.findForUser.mockResolvedValue(null);
    const result = await handler.execute(new GetUserKycStatusQuery(TEST_IDS.USER_ID));
    expect(result).toBeNull();
  });
});
