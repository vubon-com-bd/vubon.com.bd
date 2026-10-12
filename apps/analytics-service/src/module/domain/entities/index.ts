// analytics-service/domain/entities/index.ts
// Entities barrel export

// ─── Event ────────────────────────────────────────
export * from './event.entity.js';
export * from './event-payload.entity.js';

// ─── Metric ───────────────────────────────────────
export * from './metric.entity.js';
export * from './metric-aggregation.entity.js';

// ─── Dimension ────────────────────────────────────
export * from './dimension.entity.js';
export * from './dimension-value.entity.js';

// ─── KPI ──────────────────────────────────────────
export * from './kpi.entity.js';
export * from './kpi-result.entity.js';

// ─── Dashboard & Widget ───────────────────────────
export * from './dashboard.entity.js';
export * from './widget.entity.js';

// ─── Report ───────────────────────────────────────
export * from './report.entity.js';
export * from './report-filter.entity.js';

// ─── Cohort ───────────────────────────────────────
export * from './cohort.entity.js';
export * from './cohort-analysis.entity.js';

// ─── Funnel ───────────────────────────────────────
export * from './funnel.entity.js';
export * from './funnel-analysis.entity.js';

// ─── Session & Page View ──────────────────────────
export * from './session.entity.js';
export * from './page-view.entity.js';

// ─── Traffic & Attribution ────────────────────────
export * from './traffic-source.entity.js';
export * from './attribution.entity.js';
