/**
 * Analytics Common Module
 * @module analytics-service/modules/common
 *
 * Kernel-level shared modules MINUS PrismaModule — কারণ analytics-service
 * নিজের `AnalyticsPrismaModule` ব্যবহার করে, kernel এর generic PrismaService
 * (যা Termux এ engine load fail করে) ব্যবহার করি না।
 */
import { Global, Module } from '@nestjs/common';

// Kernel shared (excluding KernelCommonModule — we compose manually)
import { KernelCqrsModule } from '@vubon/shared-kernel/modules/common';
import { KernelEventBusModule } from '@vubon/shared-kernel/modules/common';
import { KernelGuardsModule } from '@vubon/shared-kernel/modules/common';
import { KernelInterceptorsModule } from '@vubon/shared-kernel/modules/common';
import { KernelFiltersModule } from '@vubon/shared-kernel/modules/common';
import { KernelPipesModule } from '@vubon/shared-kernel/modules/common';
import { KernelConfigModule } from '@vubon/shared-kernel/modules/common';

// Analytics-owned infrastructure
import { AnalyticsPrismaModule } from '../../infrastructure/persistence/prisma/prisma.module.js';
import { OlapModule } from '../../infrastructure/persistence/olap/olap.module.js';
import { StorageModule } from '../../infrastructure/external/storage/storage.module.js';
import { AnalyticsEmailModule } from '../../infrastructure/external/email/email.module.js';
import { SlackModule } from '../../infrastructure/external/slack/slack.module.js';
import { ChartModule } from '../../infrastructure/external/chart/chart.module.js';

@Global()
@Module({
  imports: [
    // Kernel shared — NO PrismaModule (we own our own)
    KernelCqrsModule,
    KernelEventBusModule,
    KernelGuardsModule,
    KernelInterceptorsModule,
    KernelFiltersModule,
    KernelPipesModule,
    KernelConfigModule,

    // Analytics persistence + OLAP
    AnalyticsPrismaModule,
    OlapModule,

    // External integrations
    StorageModule,
    AnalyticsEmailModule,
    SlackModule,
    ChartModule,
  ],
  exports: [
    KernelCqrsModule,
    KernelEventBusModule,
    KernelGuardsModule,
    KernelInterceptorsModule,
    KernelFiltersModule,
    KernelPipesModule,
    KernelConfigModule,
    AnalyticsPrismaModule,
    OlapModule,
    StorageModule,
    AnalyticsEmailModule,
    SlackModule,
    ChartModule,
  ],
})
export class AnalyticsCommonModule {}
