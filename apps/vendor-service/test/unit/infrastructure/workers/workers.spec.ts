/**
 * Workers — branch coverage (mocked)
 */
import { jest } from '@jest/globals';
import { PayoutProcessingWorker } from '../../../../src/module/infrastructure/workers/payout-processing.worker.js';
import { ReportGenerationWorker } from '../../../../src/module/infrastructure/workers/report-generation.worker.js';
import { StatsAggregationWorker } from '../../../../src/module/infrastructure/workers/stats-aggregation.worker.js';
import { SuspensionAutoLiftWorker } from '../../../../src/module/infrastructure/workers/suspension-auto-lift.worker.js';
import { DocumentExpiryWorker } from '../../../../src/module/infrastructure/workers/document-expiry.worker.js';
import { TierEvaluationWorker } from '../../../../src/module/infrastructure/workers/tier-evaluation.worker.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

interface MockJob {
  name: string;
  id: string;
  data: Record<string, unknown>;
}

describe('Workers — branch coverage', () => {
  it('PayoutProcessingWorker — process valid', async () => {
    const w = new PayoutProcessingWorker();
    const r = await w.process({
      name: 'process-payout', id: '1',
      data: { payoutId: UUID, vendorId: UUID, processedBy: UUID },
    } as never);
    expect(r).toEqual({ ok: true });
  });

  it('PayoutProcessingWorker — unknown job name', async () => {
    const w = new PayoutProcessingWorker();
    const r = await w.process({
      name: 'unknown-job', id: '1', data: {},
    } as never);
    expect(r).toEqual({ ok: false });
  });

  it('ReportGenerationWorker — process valid', async () => {
    const w = new ReportGenerationWorker();
    const r = await w.process({
      name: 'generate-report', id: '1',
      data: { reportId: UUID, vendorId: UUID, type: 'sales', format: 'pdf', periodStart: '', periodEnd: '' },
    } as never);
    expect(r).toEqual({ ok: true });
  });

  it('ReportGenerationWorker — unknown job', async () => {
    const w = new ReportGenerationWorker();
    const r = await w.process({ name: 'other', id: '1', data: {} } as never);
    expect(r).toEqual({ ok: false });
  });

  it('StatsAggregationWorker — process valid', async () => {
    const w = new StatsAggregationWorker();
    const r = await w.process({
      name: 'aggregate-stats', id: '1',
      data: { vendorId: UUID, periodStart: '', periodEnd: '' },
    } as never);
    expect(r).toEqual({ ok: true });
  });

  it('StatsAggregationWorker — unknown job', async () => {
    const w = new StatsAggregationWorker();
    const r = await w.process({ name: 'other', id: '1', data: {} } as never);
    expect(r).toEqual({ ok: false });
  });

  it('SuspensionAutoLiftWorker — process valid', async () => {
    const w = new SuspensionAutoLiftWorker();
    const r = await w.process({
      name: 'auto-lift-suspension', id: '1',
      data: { suspensionId: UUID, vendorId: UUID },
    } as never);
    expect(r).toEqual({ ok: true });
  });

  it('SuspensionAutoLiftWorker — unknown job', async () => {
    const w = new SuspensionAutoLiftWorker();
    const r = await w.process({ name: 'other', id: '1', data: {} } as never);
    expect(r).toEqual({ ok: false });
  });

  it('DocumentExpiryWorker — process valid', async () => {
    const w = new DocumentExpiryWorker();
    const r = await w.process({
      name: 'expire-documents', id: '1',
      data: { checkAt: '' },
    } as never);
    expect(r).toEqual({ ok: true });
  });

  it('DocumentExpiryWorker — unknown job', async () => {
    const w = new DocumentExpiryWorker();
    const r = await w.process({ name: 'other', id: '1', data: {} } as never);
    expect(r).toEqual({ ok: false });
  });

  it('TierEvaluationWorker — process valid', async () => {
    const w = new TierEvaluationWorker();
    const r = await w.process({ name: 'evaluate-tiers', id: '1', data: {} } as never);
    expect(r).toEqual({ ok: true });
  });

  it('TierEvaluationWorker — unknown job', async () => {
    const w = new TierEvaluationWorker();
    const r = await w.process({ name: 'other', id: '1', data: {} } as never);
    expect(r).toEqual({ ok: false });
  });
});

// MockJob referenced to avoid unused warning
void (undefined as unknown as MockJob);
