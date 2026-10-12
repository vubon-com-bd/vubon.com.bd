// analytics-service/domain/value-objects/primitives/index.ts
// Primitives VOs barrel export

// ─── Event ────────────────────────────────────────
export * from './event-id.vo.js';
export * from './event-name.vo.js';
export * from './event-source.vo.js';
export * from './event-timestamp.vo.js';
export * from './event-payload.vo.js';

// ─── Metric ───────────────────────────────────────
export * from './metric-id.vo.js';
export * from './metric-name.vo.js';
export * from './metric-value.vo.js';
export * from './metric-unit.vo.js';
export * from './metric-type.vo.js';

// ─── Dimension ────────────────────────────────────
export * from './dimension-id.vo.js';
export * from './dimension-name.vo.js';
export * from './dimension-value.vo.js';

// ─── KPI ──────────────────────────────────────────
export * from './kpi-id.vo.js';
export * from './kpi-name.vo.js';
export * from './kpi-target.vo.js';
export * from './kpi-threshold.vo.js';

// ─── Dashboard ────────────────────────────────────
export * from './dashboard-id.vo.js';
export * from './dashboard-name.vo.js';
export * from './dashboard-layout.vo.js';

// ─── Widget ───────────────────────────────────────
export * from './widget-id.vo.js';
export * from './widget-type.vo.js';
export * from './widget-config.vo.js';

// ─── Report ───────────────────────────────────────
export * from './report-id.vo.js';
export * from './report-type.vo.js';
export * from './report-format.vo.js';
export * from './report-status.vo.js';
export * from './report-frequency.vo.js';

// ─── Cohort ───────────────────────────────────────
export * from './cohort-id.vo.js';
export * from './cohort-name.vo.js';
export * from './cohort-period.vo.js';

// ─── Funnel ───────────────────────────────────────
export * from './funnel-id.vo.js';
export * from './funnel-step.vo.js';
export * from './funnel-stage.vo.js';

// ─── Session ──────────────────────────────────────
export * from './session-id.vo.js';
export * from './session-duration.vo.js';

// ─── Page View ────────────────────────────────────
export * from './page-view-id.vo.js';
export * from './page-path.vo.js';
export * from './referrer.vo.js';
export * from './user-agent.vo.js';

// ─── UTM ──────────────────────────────────────────
export * from './utm-source.vo.js';
export * from './utm-medium.vo.js';
export * from './utm-campaign.vo.js';

// ─── Geo / Device ─────────────────────────────────
export * from './device-type.vo.js';
export * from './country-code.vo.js';

// ─── Cross-service References ─────────────────────
export * from './user-id.vo.js';
export * from './order-id.vo.js';
export * from './product-id.vo.js';
export * from './vendor-id.vo.js';
export * from './payment-id.vo.js';
