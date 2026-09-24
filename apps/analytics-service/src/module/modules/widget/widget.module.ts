import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { WidgetService } from '../../application/services/impl/widget.service';
import { WidgetPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/widget.prisma.repository';

@Module({
  imports: [CqrsModule],
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
