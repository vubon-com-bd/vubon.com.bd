// analytics-service/infrastructure/persistence/prisma/repositories/index.ts
// Repositories barrel — 20 analytics repositories

// ─── Event ────────────────────────────────────────
export * from './event.prisma.repository.js';
export * from './event-payload.prisma.repository.js';

// ─── Metric ───────────────────────────────────────
export * from './metric.prisma.repository.js';
export * from './metric-aggregation.prisma.repository.js';

// ─── Dimension ────────────────────────────────────
export * from './dimension.prisma.repository.js';
export * from './dimension-value.prisma.repository.js';

// ─── KPI ──────────────────────────────────────────
export * from './kpi.prisma.repository.js';
export * from './kpi-result.prisma.repository.js';

// ─── Dashboard & Widget ───────────────────────────
export * from './dashboard.prisma.repository.js';
export * from './widget.prisma.repository.js';

// ─── Report ───────────────────────────────────────
export * from './report.prisma.repository.js';
export * from './report-filter.prisma.repository.js';

// ─── Cohort ───────────────────────────────────────
export * from './cohort.prisma.repository.js';
export * from './cohort-analysis.prisma.repository.js';

// ─── Funnel ───────────────────────────────────────
export * from './funnel.prisma.repository.js';
export * from './funnel-analysis.prisma.repository.js';

// ─── Session & Page View ──────────────────────────
export * from './session.prisma.repository.js';
export * from './page-view.prisma.repository.js';

// ─── Traffic Source ───────────────────────────────
export * from './traffic-source.prisma.repository.js';

// ─── Attribution ──────────────────────────────────
export * from './attribution.prisma.repository.js';
