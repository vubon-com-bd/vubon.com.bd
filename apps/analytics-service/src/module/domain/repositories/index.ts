// analytics-service/domain/repositories/index.ts
// Repository interfaces barrel export

// ─── Event ────────────────────────────────────────
export * from './event.repository.interface.js';
export * from './event-payload.repository.interface.js';

// ─── Metric ───────────────────────────────────────
export * from './metric.repository.interface.js';
export * from './metric-aggregation.repository.interface.js';

// ─── Dimension ────────────────────────────────────
export * from './dimension.repository.interface.js';
export * from './dimension-value.repository.interface.js';

// ─── KPI ──────────────────────────────────────────
export * from './kpi.repository.interface.js';
export * from './kpi-result.repository.interface.js';

// ─── Dashboard & Widget ───────────────────────────
export * from './dashboard.repository.interface.js';
export * from './widget.repository.interface.js';

// ─── Report ───────────────────────────────────────
export * from './report.repository.interface.js';
export * from './report-filter.repository.interface.js';

// ─── Cohort ───────────────────────────────────────
export * from './cohort.repository.interface.js';
export * from './cohort-analysis.repository.interface.js';

// ─── Funnel ───────────────────────────────────────
export * from './funnel.repository.interface.js';
export * from './funnel-analysis.repository.interface.js';

// ─── Session & Page View ──────────────────────────
export * from './session.repository.interface.js';
export * from './page-view.repository.interface.js';

// ─── Traffic & Attribution ────────────────────────
export * from './traffic-source.repository.interface.js';
export * from './attribution.repository.interface.js';
