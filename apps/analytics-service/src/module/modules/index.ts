// ═══════════════════════════════════════════════════════
// Analytics Service — Modules Barrel
// ═══════════════════════════════════════════════════════

// Core
export { EventModule } from './event';
export { MetricModule } from './metric';
export { KpiModule } from './kpi';
export { DashboardModule } from './dashboard';

// Analytics entities
export { ReportModule } from './report';
export { CohortModule } from './cohort';
export { FunnelModule } from './funnel';
export { SessionModule } from './session';
export { DimensionModule } from './dimension';

// Supporting
export { TrafficSourceModule } from './traffic-source';
export { AttributionModule } from './attribution';
export { WidgetModule } from './widget';
export { KpiResultModule } from './kpi-result';
export { CohortAnalysisModule } from './cohort-analysis';
export { FunnelAnalysisModule } from './funnel-analysis';
export { PageViewModule } from './page-view';
export { EventPayloadModule } from './event-payload';
export { MetricAggregationModule } from './metric-aggregation';

// Combined analytics
export { AnalyticsModule } from './analytics';
