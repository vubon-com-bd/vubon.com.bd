import { jest } from '@jest/globals';

import { KycQueue } from '@infrastructure/queues/kyc.queue';

describe('KycQueue', () => {
  let queue: KycQueue;
  let queues: { enqueue: jest.Mock };

  beforeEach(() => {
    queues = { enqueue: jest.fn().mockResolvedValue(undefined) };
    queue = new KycQueue(queues as never);
  });

  it('enqueueExpiryCheck sends correct payload', async () => {
    await queue.enqueueExpiryCheck({ kycId: 'k-1', userId: 'u-1' });
    expect(queues.enqueue).toHaveBeenCalledWith(
      'kyc',
      'kyc.expiry.check',
      { kycId: 'k-1', userId: 'u-1' },
      expect.anything()
    );
  });

  it('name static is set', () => {
    expect(KycQueue.name).toBe('kyc');
  });
});
