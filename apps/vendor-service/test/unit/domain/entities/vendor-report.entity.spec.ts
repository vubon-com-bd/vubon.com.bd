/**
 * VendorReportEntity — branch coverage
 * @module vendor-service/test/unit/domain/entities
 */
import { describe, it, expect } from '@jest/globals';

import { VendorReportEntity } from '../../../../src/module/domain/entities/vendor-report.entity.js';
import { VendorReportTypeVO } from '../../../../src/module/domain/value-objects/primitives/vendor-report-type.vo.js';
import { VendorReportFormatVO } from '../../../../src/module/domain/value-objects/primitives/vendor-report-format.vo.js';
import { VendorReportPeriodVO } from '../../../../src/module/domain/value-objects/primitives/vendor-report-period.vo.js';
import { VendorReportStatusVO } from '../../../../src/module/domain/value-objects/primitives/vendor-report-status.vo.js';

const UUID = '11111111-1111-4111-8111-111111111111';
const VENDOR = '22222222-2222-4222-8222-222222222222';
const NOW = '2025-01-01T00:00:00.000Z';
const PERIOD_START = '2025-01-01T00:00:00.000Z';
const PERIOD_END = '2025-01-31T00:00:00.000Z';
const FUTURE = '2030-01-01T00:00:00.000Z';
const PAST = '2020-01-01T00:00:00.000Z';

function makeReport() {
  return VendorReportEntity.create({
    id: UUID,
    now: NOW,
    props: {
      vendorId: VENDOR,
      type: VendorReportTypeVO.create('sales'),
      format: VendorReportFormatVO.create('pdf'),
      period: VendorReportPeriodVO.create('last_30_days'),
      periodStart: PERIOD_START,
      periodEnd: PERIOD_END,
      generatedBy: VENDOR,
    },
  });
}

function reconstitute(overrides: Record<string, unknown> = {}) {
  const { version, deletedAt, ...propsOverrides } = overrides as {
    version?: number;
    deletedAt?: string | null;
    [k: string]: unknown;
  };
  return VendorReportEntity.reconstitute({
    id: UUID,
    createdAt: NOW,
    updatedAt: NOW,
    props: {
      vendorId: VENDOR,
      type: VendorReportTypeVO.create('sales'),
      format: VendorReportFormatVO.create('pdf'),
      period: VendorReportPeriodVO.create('last_30_days'),
      periodStart: PERIOD_START,
      periodEnd: PERIOD_END,
      status: VendorReportStatusVO.pending(),
      ...propsOverrides,
    } as never,
    ...(version !== undefined ? { version } : {}),
    ...(deletedAt !== undefined ? { deletedAt } : {}),
  });
}

describe('VendorReportEntity — creation', () => {
  it('creates pending report', () => {
    const r = makeReport();
    expect(r.vendorId).toBe(VENDOR);
    expect(r.status.isPending()).toBe(true);
    expect(r.type.value).toBe('sales');
    expect(r.format.value).toBe('pdf');
  });
});

describe('VendorReportEntity — invariants', () => {
  it('rejects periodEnd < periodStart', () => {
    expect(() =>
      reconstitute({
        periodStart: '2025-06-01T00:00:00.000Z',
        periodEnd: '2025-01-01T00:00:00.000Z',
      }),
    ).toThrow();
  });

  it('rejects date range > MAX_DATE_RANGE_DAYS', () => {
    expect(() =>
      reconstitute({
        periodStart: '2020-01-01T00:00:00.000Z',
        periodEnd: '2025-01-01T00:00:00.000Z', // ~5 years > 365 days
      }),
    ).toThrow();
  });

  it('rejects negative fileSize', () => {
    expect(() => reconstitute({ fileSize: -1 })).toThrow();
  });

  it('rejects non-integer fileSize', () => {
    expect(() => reconstitute({ fileSize: 1.5 })).toThrow();
  });

  it('rejects ready status without fileUrl', () => {
    expect(() =>
      reconstitute({
        status: VendorReportStatusVO.ready(),
        fileUrl: undefined,
      }),
    ).toThrow();
  });

  it('rejects failed status without failureReason', () => {
    expect(() =>
      reconstitute({
        status: VendorReportStatusVO.failed(),
        failureReason: undefined,
      }),
    ).toThrow();
  });
});

describe('VendorReportEntity — getters', () => {
  it('returns scalar getters', () => {
    const r = makeReport();
    expect(r.vendorId).toBe(VENDOR);
    expect(r.type.value).toBe('sales');
    expect(r.format.value).toBe('pdf');
    expect(r.period.value).toBe('last_30_days');
    expect(r.periodStart).toBe(PERIOD_START);
    expect(r.periodEnd).toBe(PERIOD_END);
    expect(r.status.isPending()).toBe(true);
    expect(r.fileUrl).toBeUndefined();
    expect(r.fileSize).toBeUndefined();
    expect(r.generatedAt).toBeUndefined();
    expect(r.expiresAt).toBeUndefined();
  });
});

describe('VendorReportEntity — predicates', () => {
  it('isReady true for ready status', () => {
    const r = reconstitute({
      status: VendorReportStatusVO.ready(),
      fileUrl: 'https://cdn.example.com/report.pdf',
      generatedAt: NOW,
    });
    expect(r.isReady()).toBe(true);
  });

  it('isReady false for pending', () => {
    expect(makeReport().isReady()).toBe(false);
  });

  it('isExpired false when no expiresAt', () => {
    expect(makeReport().isExpired()).toBe(false);
  });

  it('isExpired true when past expiresAt', () => {
    const r = reconstitute({ expiresAt: PAST });
    expect(r.isExpired(new Date(NOW))).toBe(true);
  });

  it('isExpired false when future expiresAt', () => {
    const r = reconstitute({ expiresAt: FUTURE });
    expect(r.isExpired(new Date(NOW))).toBe(false);
  });
});

describe('VendorReportEntity — lifecycle: startGenerating', () => {
  it('starts generating from pending', () => {
    const r = makeReport();
    r.startGenerating(NOW);
    expect(r.status.isGenerating()).toBe(true);
  });

  it('throws from ready status', () => {
    const r = reconstitute({
      status: VendorReportStatusVO.ready(),
      fileUrl: 'https://x.com/r.pdf',
    });
    expect(() => r.startGenerating(NOW)).toThrow();
  });
});

describe('VendorReportEntity — lifecycle: markReady', () => {
  it('marks ready from generating', () => {
    const r = reconstitute({ status: VendorReportStatusVO.generating() });
    r.markReady('https://cdn.example.com/report.pdf', 1024, NOW);
    expect(r.status.isReady()).toBe(true);
    expect(r.fileUrl).toBe('https://cdn.example.com/report.pdf');
    expect(r.fileSize).toBe(1024);
    expect(r.generatedAt).toBe(NOW);
    expect(r.expiresAt).toBeDefined();
  });

  it('throws from pending', () => {
    const r = makeReport();
    expect(() => r.markReady('https://x.com/r.pdf', 1024, NOW)).toThrow();
  });

  it('throws on empty fileUrl', () => {
    const r = reconstitute({ status: VendorReportStatusVO.generating() });
    expect(() => r.markReady('', 1024, NOW)).toThrow();
    expect(() => r.markReady('   ', 1024, NOW)).toThrow();
  });

  it('throws on non-integer fileSize', () => {
    const r = reconstitute({ status: VendorReportStatusVO.generating() });
    expect(() => r.markReady('https://x.com/r.pdf', 1.5, NOW)).toThrow();
  });

  it('throws on negative fileSize', () => {
    const r = reconstitute({ status: VendorReportStatusVO.generating() });
    expect(() => r.markReady('https://x.com/r.pdf', -1, NOW)).toThrow();
  });
});

describe('VendorReportEntity — lifecycle: markFailed', () => {
  it('marks failed from generating', () => {
    const r = reconstitute({ status: VendorReportStatusVO.generating() });
    r.markFailed('DB timeout', NOW);
    expect(r.status.isFailed()).toBe(true);
    expect(r.failureReason).toBe('DB timeout');
  });

  it('marks failed from pending', () => {
    const r = makeReport();
    r.markFailed('Queue unreachable', NOW);
    expect(r.status.isFailed()).toBe(true);
  });

  it('throws from ready status', () => {
    const r = reconstitute({
      status: VendorReportStatusVO.ready(),
      fileUrl: 'https://x.com/r.pdf',
    });
    expect(() => r.markFailed('reason', NOW)).toThrow();
  });
});

describe('VendorReportEntity — lifecycle: markExpired', () => {
  it('marks expired from ready', () => {
    const r = reconstitute({
      status: VendorReportStatusVO.ready(),
      fileUrl: 'https://x.com/r.pdf',
    });
    r.markExpired(NOW);
    expect(r.status.isExpired()).toBe(true);
    expect(r.fileUrl).toBeUndefined();
  });

  it('no-op when status cannot transition (pending)', () => {
    const r = makeReport();
    r.markExpired(NOW);
    expect(r.status.isPending()).toBe(true);
  });

  it('no-op when already failed', () => {
    const r = reconstitute({
      status: VendorReportStatusVO.failed(),
      failureReason: 'reason',
    });
    r.markExpired(NOW);
    expect(r.status.isFailed()).toBe(true);
  });
});

describe('VendorReportEntity — canDownload', () => {
  it('false for pending', () => {
    expect(makeReport().canDownload()).toBe(false);
  });

  it('true for ready + not expired + has fileUrl', () => {
    const r = reconstitute({
      status: VendorReportStatusVO.ready(),
      fileUrl: 'https://cdn.example.com/r.pdf',
      expiresAt: FUTURE,
    });
    expect(r.canDownload(new Date(NOW))).toBe(true);
  });

  it('false when ready but expired', () => {
    const r = reconstitute({
      status: VendorReportStatusVO.ready(),
      fileUrl: 'https://cdn.example.com/r.pdf',
      expiresAt: PAST,
    });
    expect(r.canDownload(new Date(NOW))).toBe(false);
  });
});

describe('VendorReportEntity — reconstitute version', () => {
  it('reconstitute with version', () => {
    const r = reconstitute({ version: 4 });
    expect(r.version).toBe(4);
  });
});
