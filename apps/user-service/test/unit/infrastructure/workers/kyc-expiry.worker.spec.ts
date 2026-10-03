import { jest } from '@jest/globals';

import { KycExpiryWorker } from '@infrastructure/workers/kyc-expiry.worker';

describe('KycExpiryWorker', () => {
  let worker: KycExpiryWorker;
  let kycRepo: { findById: jest.Mock };
  let logger: { log: jest.Mock; warn: jest.Mock };

  beforeEach(() => {
    kycRepo = { findById: jest.fn() };
    logger = { log: jest.fn(), warn: jest.fn() };
    worker = new KycExpiryWorker(kycRepo as never, logger as never);
  });

  it('should warn when KYC not found', async () => {
    kycRepo.findById.mockResolvedValue(null);
    await worker.process({ id: 'job-1', data: { kycId: 'k-1', userId: 'user-1' } });
    expect(logger.warn).toHaveBeenCalled();
  });

  it('should do nothing when KYC not verified', async () => {
    kycRepo.findById.mockResolvedValue({
      isVerified: () => false,
      verifiedAt: null,
    });
    await worker.process({ id: 'job-2', data: { kycId: 'k-1', userId: 'user-1' } });
    expect(logger.log).toHaveBeenCalled();
  });

  it('should warn when KYC expired', async () => {
    const oldDate = Date.now() - 400 * 24 * 60 * 60 * 1000; // 400 days ago
    kycRepo.findById.mockResolvedValue({
      isVerified: () => true,
      verifiedAt: { epochMs: oldDate },
    });
    await worker.process({ id: 'job-3', data: { kycId: 'k-1', userId: 'user-1' } });
    expect(logger.warn).toHaveBeenCalled();
  });
});
