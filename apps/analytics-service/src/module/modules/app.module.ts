/**
 * Analytics Service — Root Application Module
 * @module analytics-service/modules
 *
 * Wires all feature modules together with the common + infrastructure modules.
 * This is the single entry-point that `main.ts` bootstraps.
 */
import { Module } from '@nestjs/common';

// ─── Common & Infrastructure ──────────────────────
import { AnalyticsCommonModule } from './common/index.js';

// ─── Feature Modules ──────────────────────────────
import { EventModule } from './event/event.module.js';
import { MetricModule } from './metric/metric.module.js';
import { KpiModule } from './kpi/kpi.module.js';
import { DashboardModule } from './dashboard/dashboard.module.js';
import { WidgetModule } from './widget/widget.module.js';
import { ReportModule } from './report/report.module.js';
import { CohortModule } from './cohort/cohort.module.js';
import { FunnelModule } from './funnel/funnel.module.js';
import { SessionModule } from './session/session.module.js';
import { TrafficSourceModule } from './traffic-source/traffic-source.module.js';
import { AttributionModule } from './attribution/attribution.module.js';
import { UserAnalyticsModule } from './user-analytics/user-analytics.module.js';
import { ProductAnalyticsModule } from './product-analytics/product-analytics.module.js';
import { OrderAnalyticsModule } from './order-analytics/order-analytics.module.js';
import { VendorAnalyticsModule } from './vendor-analytics/vendor-analytics.module.js';
import { FinancialAnalyticsModule } from './financial-analytics/financial-analytics.module.js';
import { RealTimeAnalyticsModule } from './real-time-analytics/real-time-analytics.module.js';

@Module({
  imports: [
    AnalyticsCommonModule,
    // ─── Feature modules ─────────────────────────
    EventModule,
    MetricModule,
    KpiModule,
    DashboardModule,
    WidgetModule,
    ReportModule,
    CohortModule,
    FunnelModule,
    SessionModule,
    TrafficSourceModule,
    AttributionModule,
    UserAnalyticsModule,
    ProductAnalyticsModule,
    OrderAnalyticsModule,
    VendorAnalyticsModule,
    FinancialAnalyticsModule,
    RealTimeAnalyticsModule,
  ],
})
export class AnalyticsAppModule {}

// ─── Conventional alias (matches NestJS CLI default) ──────────
export { AnalyticsAppModule as AppModule };
