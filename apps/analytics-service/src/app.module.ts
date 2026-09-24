import { Module } from '@nestjs/common';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

// Feature modules
import {
  EventModule,
  MetricModule,
  KpiModule,
  DashboardModule,
  ReportModule,
  CohortModule,
  FunnelModule,
  SessionModule,
  DimensionModule,
  TrafficSourceModule,
  AttributionModule,
  WidgetModule,
  KpiResultModule,
  CohortAnalysisModule,
  FunnelAnalysisModule,
  PageViewModule,
  EventPayloadModule,
  MetricAggregationModule,
  AnalyticsModule,
} from './module/modules';

@Module({
  imports: [
    // Framework + Kernel (global) — Prisma, Redis, Queue, CQRS, Guards, etc.
    KernelCommonModule,

    // Core
    EventModule,
    MetricModule,
    KpiModule,
    DashboardModule,

    // Analytics entities
    ReportModule,
    CohortModule,
    FunnelModule,
    SessionModule,
    DimensionModule,

    // Supporting
    TrafficSourceModule,
    AttributionModule,
    WidgetModule,
    KpiResultModule,
    CohortAnalysisModule,
    FunnelAnalysisModule,
    PageViewModule,
    EventPayloadModule,
    MetricAggregationModule,

    // Combined analytics
    AnalyticsModule,
  ],
})
export class AppModule {}
