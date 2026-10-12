/**
 * Widget Module
 *
 * Widgets belong to dashboards. This module encapsulates widget-specific
 * service registrations while reusing dashboard-level command handlers.
 */
import { Module } from '@nestjs/common';
import { WidgetPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/widget.prisma.repository.js';
import { WidgetService } from '../../application/services/impl/widget.service.js';

@Module({
  providers: [
    WidgetPrismaRepository,
    WidgetService,
  ],
  exports: [
    WidgetService,
    WidgetPrismaRepository,
  ],
})
export class WidgetModule {}
