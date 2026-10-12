// analytics-service/domain/value-objects/composites/index.ts
// Composite VOs barrel export

// ─── Event & Payload ──────────────────────────────
export * from './event.vo.js';
export * from './event-payload.vo.js';

// ─── Metric ───────────────────────────────────────
export * from './metric.vo.js';
export * from './metric-aggregation.vo.js';

// ─── Dimension ────────────────────────────────────
export * from './dimension.vo.js';
export * from './dimension-value.vo.js';

// ─── KPI ──────────────────────────────────────────
export * from './kpi.vo.js';
export * from './kpi-result.vo.js';

// ─── Time ─────────────────────────────────────────
export * from './time-range.vo.js';
export * from './granularity.vo.js';

// ─── Traffic & Session ────────────────────────────
export * from './traffic-source.vo.js';
export * from './session.vo.js';
export * from './page-view.vo.js';

// ─── Cohort & Funnel ──────────────────────────────
export * from './cohort.vo.js';
export * from './cohort-analysis.vo.js';
export * from './funnel.vo.js';
export * from './funnel-analysis.vo.js';

// ─── Comparison & Retention ───────────────────────
export * from './comparison.vo.js';
export * from './retention.vo.js';
export * from './attribution.vo.js';

// ─── Dashboard & Widget ───────────────────────────
export * from './dashboard.vo.js';
export * from './widget.vo.js';
export * from './chart-config.vo.js';

// ─── Report ───────────────────────────────────────
export * from './report.vo.js';
export * from './report-filter.vo.js';

// ─── Summary ──────────────────────────────────────
export * from './analytics-summary.vo.js';
