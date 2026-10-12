/**
 * All vendor queues — bulk tests with mocked BullMQ
 */
import { jest } from '@jest/globals';
import { VendorPayoutQueue } from '../../../../src/module/infrastructure/queues/vendor-payout.queue.js';
import { VendorReportQueue } from '../../../../src/module/infrastructure/queues/vendor-report.queue.js';
import { VendorStatsQueue } from '../../../../src/module/infrastructure/queues/vendor-stats.queue.js';
import { VendorSuspensionQueue } from '../../../../src/module/infrastructure/queues/vendor-suspension.queue.js';
import { VendorVerificationQueue } from '../../../../src/module/infrastructure/queues/vendor-verification.queue.js';
import { VendorTierQueue } from '../../../../src/module/infrastructure/queues/vendor-tier.queue.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeQueue(): { add: jest.Mock; count: jest.Mock } {
  return {
    add: jest.fn().mockResolvedValue({ id: 'job-1' }),
    count: jest.fn().mockResolvedValue(5),
  };
}

describe('VendorPayoutQueue', () => {
  it('enqueueProcessPayout calls add', async () => {
    const q = makeQueue();
    const queue = new VendorPayoutQueue(q as never);
    await queue.enqueueProcessPayout({ payoutId: UUID, vendorId: UUID, processedBy: UUID });
    expect(q.add).toHaveBeenCalled();
  });

  it('getJobCount returns count', async () => {
    const q = makeQueue();
    const queue = new VendorPayoutQueue(q as never);
    expect(await queue.getJobCount()).toBe(5);
  });
});

describe('VendorReportQueue', () => {
  it('enqueueGenerate calls add', async () => {
    const q = makeQueue();
    const queue = new VendorReportQueue(q as never);
    await queue.enqueueGenerate({
      reportId: UUID, vendorId: UUID, type: 'sales', format: 'pdf',
      periodStart: '2026-01-01T00:00:00Z', periodEnd: '2026-01-31T00:00:00Z',
    });
    expect(q.add).toHaveBeenCalled();
  });

  it('getJobCount works', async () => {
    const q = makeQueue();
    expect(await new VendorReportQueue(q as never).getJobCount()).toBe(5);
  });
});

describe('VendorStatsQueue', () => {
  it('enqueueAggregate calls add', async () => {
    const q = makeQueue();
    const queue = new VendorStatsQueue(q as never);
    await queue.enqueueAggregate({ vendorId: UUID, periodStart: 'x', periodEnd: 'y' });
    expect(q.add).toHaveBeenCalled();
  });

  it('enqueueDaily calls add', async () => {
    const q = makeQueue();
    await new VendorStatsQueue(q as never).enqueueDaily();
    expect(q.add).toHaveBeenCalled();
  });

  it('getJobCount works', async () => {
    const q = makeQueue();
    expect(await new VendorStatsQueue(q as never).getJobCount()).toBe(5);
  });
});

describe('VendorSuspensionQueue', () => {
  it('enqueueAutoLift calls add', async () => {
    const q = makeQueue();
    await new VendorSuspensionQueue(q as never).enqueueAutoLift({
      suspensionId: UUID, vendorId: UUID,
    });
    expect(q.add).toHaveBeenCalled();
  });

  it('getJobCount works', async () => {
    const q = makeQueue();
    expect(await new VendorSuspensionQueue(q as never).getJobCount()).toBe(5);
  });
});

describe('VendorVerificationQueue', () => {
  it('enqueueExpiryCheck calls add', async () => {
    const q = makeQueue();
    await new VendorVerificationQueue(q as never).enqueueExpiryCheck({
      checkAt: new Date().toISOString(),
    });
    expect(q.add).toHaveBeenCalled();
  });

  it('getJobCount works', async () => {
    const q = makeQueue();
    expect(await new VendorVerificationQueue(q as never).getJobCount()).toBe(5);
  });
});

describe('VendorTierQueue', () => {
  it('enqueueEvaluation calls add', async () => {
    const q = makeQueue();
    await new VendorTierQueue(q as never).enqueueEvaluation({ vendorId: UUID });
    expect(q.add).toHaveBeenCalled();
  });

  it('getJobCount works', async () => {
    const q = makeQueue();
    expect(await new VendorTierQueue(q as never).getJobCount()).toBe(5);
  });
});
