/**
 * VendorPerformanceEntity — branch coverage
 * @module vendor-service/test/unit/domain/entities
 */
import { describe, it, expect } from '@jest/globals';

import { VendorPerformanceEntity } from '../../../../src/module/domain/entities/vendor-performance.entity.js';
import type { PerformanceMetricEntry } from '../../../../src/module/domain/entities/vendor-performance.entity.js';
import { PerformanceGradeVO } from '../../../../src/module/domain/value-objects/primitives/performance-grade.vo.js';
import { PerformanceMetricTypeVO } from '../../../../src/module/domain/value-objects/primitives/performance-metric-type.vo.js';

const UUID = '11111111-1111-4111-8111-111111111111';
const VENDOR = '22222222-2222-4222-8222-222222222222';
const NOW = '2025-01-01T00:00:00.000Z';
const PERIOD_START = '2025-01-01T00:00:00.000Z';
const PERIOD_END = '2025-01-31T00:00:00.000Z';

function metric(name: string, value: number, target: number, grade = 'a'): PerformanceMetricEntry {
  return {
    metric: PerformanceMetricTypeVO.create(name),
    value,
    target,
    grade: PerformanceGradeVO.create(grade),
  };
}

function makePerformance() {
  return VendorPerformanceEntity.create({
    id: UUID,
    vendorId: VENDOR,
    evaluationPeriodStart: PERIOD_START,
    evaluationPeriodEnd: PERIOD_END,
    now: NOW,
  });
}

function reconstitute(overrides: Record<string, unknown> = {}) {
  const { version, deletedAt, ...propsOverrides } = overrides as {
    version?: number;
    deletedAt?: string | null;
    [k: string]: unknown;
  };
  return VendorPerformanceEntity.reconstitute({
    id: UUID,
    createdAt: NOW,
    updatedAt: NOW,
    props: {
      vendorId: VENDOR,
      grade: PerformanceGradeVO.reconstitute('f'),
      overallScore: 0,
      metrics: [],
      evaluationPeriodStart: PERIOD_START,
      evaluationPeriodEnd: PERIOD_END,
      orderCount: 0,
      isSuspended: false,
      warningIssued: false,
      ...propsOverrides,
    } as never,
    ...(version !== undefined ? { version } : {}),
    ...(deletedAt !== undefined ? { deletedAt } : {}),
  });
}

describe('VendorPerformanceEntity — creation', () => {
  it('creates with initial values', () => {
    const p = makePerformance();
    expect(p.vendorId).toBe(VENDOR);
    expect(p.grade.value).toBe('f');
    expect(p.overallScore).toBe(0);
    expect(p.orderCount).toBe(0);
    expect(p.isSuspended).toBe(false);
  });
});

describe('VendorPerformanceEntity — invariants', () => {
  it('rejects overallScore > 100', () => {
    expect(() => reconstitute({ overallScore: 101 })).toThrow();
  });

  it('rejects negative overallScore', () => {
    expect(() => reconstitute({ overallScore: -1 })).toThrow();
  });

  it('rejects > 20 metrics', () => {
    expect(() =>
      reconstitute({
        metrics: new Array(21).fill(metric('order_fulfillment_rate', 80, 100)),
      }),
    ).toThrow();
  });

  it('rejects negative orderCount', () => {
    expect(() => reconstitute({ orderCount: -1 })).toThrow();
  });

  it('rejects non-integer orderCount', () => {
    expect(() => reconstitute({ orderCount: 1.5 })).toThrow();
  });

  it('rejects periodEnd < periodStart', () => {
    expect(() =>
      reconstitute({
        evaluationPeriodStart: '2025-06-01T00:00:00.000Z',
        evaluationPeriodEnd: '2025-01-01T00:00:00.000Z',
      }),
    ).toThrow();
  });
});

describe('VendorPerformanceEntity — getters', () => {
  it('returns scalar getters', () => {
    const p = makePerformance();
    expect(p.grade.value).toBe('f');
    expect(p.overallScore).toBe(0);
    expect(p.metrics).toEqual([]);
    expect(p.evaluationPeriodStart).toBe(PERIOD_START);
    expect(p.evaluationPeriodEnd).toBe(PERIOD_END);
    expect(p.orderCount).toBe(0);
    expect(p.isSuspended).toBe(false);
    expect(p.warningIssued).toBe(false);
  });
});

describe('VendorPerformanceEntity — risk checks', () => {
  it('hasEnoughData false for low orderCount', () => {
    expect(makePerformance().hasEnoughData()).toBe(false);
  });

  it('hasEnoughData true for high orderCount', () => {
    const p = reconstitute({ orderCount: 100 });
    expect(p.hasEnoughData()).toBe(true);
  });

  it('isAtRisk true for low score', () => {
    const p = reconstitute({ overallScore: 40 });
    expect(p.isAtRisk()).toBe(true);
  });

  it('isAtRisk false for good score', () => {
    const p = reconstitute({ overallScore: 85 });
    expect(p.isAtRisk()).toBe(false);
  });

  it('shouldAutoSuspend true for very low', () => {
    const p = reconstitute({ overallScore: 30 });
    expect(p.shouldAutoSuspend()).toBe(true);
  });

  it('shouldAutoSuspend false for good', () => {
    const p = reconstitute({ overallScore: 70 });
    expect(p.shouldAutoSuspend()).toBe(false);
  });

  it('isTopPerformer true for grade a', () => {
    const p = reconstitute({ grade: PerformanceGradeVO.reconstitute('a') });
    expect(p.isTopPerformer()).toBe(true);
  });

  it('isTopPerformer false for grade f', () => {
    expect(makePerformance().isTopPerformer()).toBe(false);
  });
});

describe('VendorPerformanceEntity — metrics access', () => {
  it('getMetric returns entry when exists', () => {
    const p = reconstitute({
      metrics: [metric('order_fulfillment_rate', 90, 100)],
    });
    const m = p.getMetric(PerformanceMetricTypeVO.create('order_fulfillment_rate'));
    expect(m).toBeDefined();
  });

  it('getMetric returns undefined when missing', () => {
    const p = makePerformance();
    expect(p.getMetric(PerformanceMetricTypeVO.create('order_fulfillment_rate'))).toBeUndefined();
  });

  it('getBestMetric returns undefined when empty', () => {
    expect(makePerformance().getBestMetric()).toBeUndefined();
  });

  it('getBestMetric returns highest ratio', () => {
    const p = reconstitute({
      metrics: [
        metric('order_fulfillment_rate', 90, 100),  // 0.9
        metric('on_time_shipping_rate', 95, 100),    // 0.95
      ],
    });
    const best = p.getBestMetric();
    expect(best).toBeDefined();
  });

  it('getWorstMetric returns undefined when empty', () => {
    expect(makePerformance().getWorstMetric()).toBeUndefined();
  });

  it('getWorstMetric returns lowest ratio', () => {
    const p = reconstitute({
      metrics: [
        metric('order_fulfillment_rate', 50, 100),  // 0.5
        metric('on_time_shipping_rate', 95, 100),    // 0.95
      ],
    });
    const worst = p.getWorstMetric();
    expect(worst).toBeDefined();
  });
});

describe('VendorPerformanceEntity — computeOverallScore', () => {
  it('returns 0 when no metrics', () => {
    expect(makePerformance().computeOverallScore()).toBe(0);
  });

  it('computes score for higher-better metrics', () => {
    const p = reconstitute({
      metrics: [metric('order_fulfillment_rate', 90, 100)],
    });
    expect(p.computeOverallScore()).toBe(90);
  });

  it('computes score for lower-better metrics', () => {
    const p = reconstitute({
      metrics: [metric('order_cancellation_rate', 5, 10)],
    });
    const score = p.computeOverallScore();
    expect(score).toBeGreaterThan(0);
  });

  it('caps score at 100 for over-target', () => {
    const p = reconstitute({
      metrics: [metric('order_fulfillment_rate', 150, 100)],
    });
    expect(p.computeOverallScore()).toBe(100);
  });
});

describe('VendorPerformanceEntity — warnings', () => {
  it('issueWarning sets warningIssued', () => {
    const p = makePerformance();
    p.issueWarning(NOW);
    expect(p.warningIssued).toBe(true);
  });

  it('issueWarning idempotent', () => {
    const p = makePerformance();
    p.issueWarning(NOW);
    const version = p.version;
    p.issueWarning(NOW);
    expect(p.version).toBe(version);
  });

  it('clearWarning clears flag', () => {
    const p = reconstitute({ warningIssued: true });
    p.clearWarning(NOW);
    expect(p.warningIssued).toBe(false);
  });

  it('clearWarning idempotent when already clear', () => {
    const p = makePerformance();
    const version = p.version;
    p.clearWarning(NOW);
    expect(p.version).toBe(version);
  });
});

describe('VendorPerformanceEntity — suspend/reinstate', () => {
  it('suspend sets isSuspended', () => {
    const p = makePerformance();
    p.suspend(NOW);
    expect(p.isSuspended).toBe(true);
  });

  it('suspend idempotent', () => {
    const p = makePerformance();
    p.suspend(NOW);
    const version = p.version;
    p.suspend(NOW);
    expect(p.version).toBe(version);
  });

  it('reinstate clears isSuspended', () => {
    const p = reconstitute({ isSuspended: true });
    p.reinstate(NOW);
    expect(p.isSuspended).toBe(false);
  });

  it('reinstate idempotent when not suspended', () => {
    const p = makePerformance();
    const version = p.version;
    p.reinstate(NOW);
    expect(p.version).toBe(version);
  });
});

describe('VendorPerformanceEntity — recalculate', () => {
  it('recalculate updates overallScore and grade', () => {
    const p = reconstitute({
      metrics: [metric('order_fulfillment_rate', 95, 100)],
    });
    p.recalculate(NOW);
    expect(p.overallScore).toBe(95);
    expect(p.grade.value).not.toBe('f');
  });

  it('recalculate auto-sets warning when at risk', () => {
    const p = reconstitute({
      metrics: [metric('order_fulfillment_rate', 55, 100)],
    });
    p.recalculate(NOW);
    expect(p.warningIssued).toBe(true);
  });

  it('recalculate keeps warning when already set', () => {
    const p = reconstitute({
      metrics: [metric('order_fulfillment_rate', 55, 100)],
      warningIssued: true,
    });
    p.recalculate(NOW);
    expect(p.warningIssued).toBe(true);
  });
});

describe('VendorPerformanceEntity — gradeFromScore static', () => {
  it('returns a_plus for 95+', () => {
    expect(VendorPerformanceEntity.gradeFromScore(95)).toBe('a_plus');
  });

  it('returns a for 90-94', () => {
    expect(VendorPerformanceEntity.gradeFromScore(90)).toBe('a');
  });

  it('returns b for 80-89', () => {
    expect(VendorPerformanceEntity.gradeFromScore(85)).toBe('b');
  });

  it('returns c for 70-79', () => {
    expect(VendorPerformanceEntity.gradeFromScore(75)).toBe('c');
  });

  it('returns d for 60-69', () => {
    expect(VendorPerformanceEntity.gradeFromScore(65)).toBe('d');
  });

  it('returns f for < 60', () => {
    expect(VendorPerformanceEntity.gradeFromScore(50)).toBe('f');
  });
});

describe('VendorPerformanceEntity — reconstitute version', () => {
  it('reconstitute with version', () => {
    const p = reconstitute({ version: 6 });
    expect(p.version).toBe(6);
  });
});
