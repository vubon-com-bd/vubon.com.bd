/**
 * Dashboard Module
 */
import { Module } from '@nestjs/common';
import { DashboardController } from '../../interfaces/controllers/rest/dashboard.controller.js';
import { DASHBOARD_COMMAND_HANDLERS } from './commands/index.js';
import { DASHBOARD_QUERY_HANDLERS } from './queries/index.js';
import { DashboardPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/dashboard.prisma.repository.js';
import { WidgetPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/widget.prisma.repository.js';
import { DashboardService } from '../../application/services/impl/dashboard.service.js';
import { WidgetService } from '../../application/services/impl/widget.service.js';

@Module({
  controllers: [DashboardController],
  providers: [
    DashboardPrismaRepository,
    WidgetPrismaRepository,
    DashboardService,
    WidgetService,
    ...DASHBOARD_COMMAND_HANDLERS as readonly unknown[] as never[],
    ...DASHBOARD_QUERY_HANDLERS as readonly unknown[] as never[],
  ],
  exports: [
    DashboardService,
    WidgetService,
    DashboardPrismaRepository,
    WidgetPrismaRepository,
  ],
})
export class DashboardModule {}
