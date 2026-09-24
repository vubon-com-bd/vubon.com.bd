import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DashboardController } from '../../interfaces/controllers/rest/dashboard.controller';
import { DashboardService } from '../../application/services/impl/dashboard.service';
import { WidgetService } from '../../application/services/impl/widget.service';
import { CreateDashboardHandler } from '../../application/commands/dashboard/create-dashboard.handler';
import { UpdateDashboardHandler } from '../../application/commands/dashboard/update-dashboard.handler';
import { AddWidgetHandler } from '../../application/commands/dashboard/add-widget.handler';
import { RemoveWidgetHandler } from '../../application/commands/dashboard/remove-widget.handler';
import { GetDashboardHandler } from '../../application/queries/dashboard/get-dashboard.handler';
import { ListDashboardsHandler } from '../../application/queries/dashboard/list-dashboards.handler';
import { GetDashboardDataHandler } from '../../application/queries/dashboard/get-dashboard-data.handler';
import { DashboardPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/dashboard.prisma.repository';
import { WidgetPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/widget.prisma.repository';
import { DashboardCacheRepository } from '../../infrastructure/persistence/cache/repositories/dashboard.cache.repository';

const HANDLERS = [
  CreateDashboardHandler,
  UpdateDashboardHandler,
  AddWidgetHandler,
  RemoveWidgetHandler,
  GetDashboardHandler,
  ListDashboardsHandler,
  GetDashboardDataHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [DashboardController],
  providers: [
    DashboardPrismaRepository,
    WidgetPrismaRepository,
    DashboardCacheRepository,
    DashboardService,
    WidgetService,
    ...HANDLERS,
  ],
  exports: [
    DashboardService,
    WidgetService,
    DashboardPrismaRepository,
    WidgetPrismaRepository,
    DashboardCacheRepository,
  ],
})
export class DashboardModule {}
