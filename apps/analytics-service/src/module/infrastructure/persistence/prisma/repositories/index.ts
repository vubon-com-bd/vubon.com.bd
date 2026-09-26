// ═══════════════════════════════════════════════════════════════
// Prisma Repositories — barrel (20 implemented)
// ═══════════════════════════════════════════════════════════════

// Event
export { EventPrismaRepository } from './event.prisma.repository';
export { EventPayloadPrismaRepository } from './event-payload.prisma.repository';

// Metric
export { MetricPrismaRepository } from './metric.prisma.repository';
export { MetricAggregationPrismaRepository } from './metric-aggregation.prisma.repository';

// Dimension
export { DimensionPrismaRepository } from './dimension.prisma.repository';
export { DimensionValuePrismaRepository } from './dimension-value.prisma.repository';

// KPI
export { KpiPrismaRepository } from './kpi.prisma.repository';
export { KpiResultPrismaRepository } from './kpi-result.prisma.repository';

// Dashboard
export { DashboardPrismaRepository } from './dashboard.prisma.repository';
export { WidgetPrismaRepository } from './widget.prisma.repository';

// Report
export { ReportPrismaRepository } from './report.prisma.repository';
export { ReportFilterPrismaRepository } from './report-filter.prisma.repository';

// Cohort
export { CohortPrismaRepository } from './cohort.prisma.repository';
export { CohortAnalysisPrismaRepository } from './cohort-analysis.prisma.repository';

// Funnel
export { FunnelPrismaRepository } from './funnel.prisma.repository';
export { FunnelAnalysisPrismaRepository } from './funnel-analysis.prisma.repository';

// Session
export { SessionPrismaRepository } from './session.prisma.repository';
export { PageViewPrismaRepository } from './page-view.prisma.repository';

// Traffic
export { TrafficSourcePrismaRepository } from './traffic-source.prisma.repository';

// Attribution
export { AttributionPrismaRepository } from './attribution.prisma.repository';
