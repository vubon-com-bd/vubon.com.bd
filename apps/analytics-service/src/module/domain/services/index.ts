// analytics-service/domain/services/index.ts
// Domain services barrel export

// ─── Event ────────────────────────────────────────
export * from './event-ingestion.service.js';
export * from './event-validation.service.js';
export * from './event-enrichment.service.js';

// ─── Metric ───────────────────────────────────────
export * from './metric-recorder.service.js';
export * from './metric-aggregator.service.js';
export * from './metric-calculator.service.js';

// ─── KPI ──────────────────────────────────────────
export * from './kpi-evaluator.service.js';
export * from './kpi-threshold.service.js';

// ─── Cohort ───────────────────────────────────────
export * from './cohort-builder.service.js';
export * from './cohort-analyzer.service.js';

// ─── Funnel ───────────────────────────────────────
export * from './funnel-builder.service.js';
export * from './funnel-analyzer.service.js';

// ─── Retention ────────────────────────────────────
export * from './retention-calculator.service.js';

// ─── Session ──────────────────────────────────────
export * from './session-analyzer.service.js';
export * from './session-builder.service.js';

// ─── Traffic & Attribution ────────────────────────
export * from './traffic-source.service.js';
export * from './attribution-computer.service.js';

// ─── Time Series ──────────────────────────────────
export * from './time-series.service.js';

// ─── Dimension ────────────────────────────────────
export * from './dimension-analyzer.service.js';

// ─── Detection ────────────────────────────────────
export * from './anomaly-detector.service.js';
export * from './trend-detector.service.js';

// ─── Report & Dashboard ───────────────────────────
export * from './report-generator.service.js';
export * from './dashboard-composer.service.js';
export * from './export.service.js';
