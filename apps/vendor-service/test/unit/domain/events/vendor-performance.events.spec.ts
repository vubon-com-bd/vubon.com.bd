import {
  VENDOR_PERFORMANCE_EVENT_TYPE,
  VendorPerformanceEvaluatedEvent,
  VendorPerformanceGradeChangedEvent,
  VendorPerformanceWarningIssuedEvent,
  VendorPerformanceWarningClearedEvent,
  VendorPerformanceSuspendedEvent,
  VendorPerformanceReinstatedEvent,
} from '../../../../src/module/domain/events/vendor-performance.events.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

describe('Vendor performance events', () => {
  it('constants defined', () => {
    expect(VENDOR_PERFORMANCE_EVENT_TYPE.EVALUATED).toBe('vendor.performance.evaluated');
    expect(VENDOR_PERFORMANCE_EVENT_TYPE.SUSPENDED).toBe('vendor.performance.suspended');
  });

  it('VendorPerformanceEvaluatedEvent', () => {
    const e = new VendorPerformanceEvaluatedEvent({
      aggregateId: UUID,
      payload: {
        performanceId: UUID, vendorId: UUID,
        overallScore: 92, grade: 'a', orderCount: 100, evaluatedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.performance.evaluated');
    expect(e.aggregateType).toBe('VendorPerformance');
  });

  it('VendorPerformanceGradeChangedEvent', () => {
    const e = new VendorPerformanceGradeChangedEvent({
      aggregateId: UUID,
      payload: {
        performanceId: UUID, vendorId: UUID,
        fromGrade: 'b', toGrade: 'a', score: 92, changedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.performance.grade_changed');
    expect(e.payload.toGrade).toBe('a');
  });

  it('VendorPerformanceWarningIssuedEvent', () => {
    const e = new VendorPerformanceWarningIssuedEvent({
      aggregateId: UUID,
      payload: {
        performanceId: UUID, vendorId: UUID,
        score: 55, reason: 'low fulfillment', issuedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.performance.warning_issued');
  });

  it('VendorPerformanceWarningClearedEvent', () => {
    const e = new VendorPerformanceWarningClearedEvent({
      aggregateId: UUID,
      payload: { performanceId: UUID, vendorId: UUID, score: 85, changedAt: NOW },
    });
    expect(e.type).toBe('vendor.performance.warning_cleared');
  });

  it('VendorPerformanceSuspendedEvent', () => {
    const e = new VendorPerformanceSuspendedEvent({
      aggregateId: UUID,
      payload: { performanceId: UUID, vendorId: UUID, score: 30, changedAt: NOW },
    });
    expect(e.type).toBe('vendor.performance.suspended');
  });

  it('VendorPerformanceReinstatedEvent', () => {
    const e = new VendorPerformanceReinstatedEvent({
      aggregateId: UUID,
      payload: { performanceId: UUID, vendorId: UUID, score: 85, changedAt: NOW },
    });
    expect(e.type).toBe('vendor.performance.reinstated');
  });
});
