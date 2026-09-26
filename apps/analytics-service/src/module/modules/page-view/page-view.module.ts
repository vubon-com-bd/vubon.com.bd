import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PageViewService } from '../../application/services/impl/page-view.service';
import { PageViewPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/page-view.prisma.repository';

@Module({
  imports: [CqrsModule],
  providers: [
    PageViewPrismaRepository,
    PageViewService,
  ],
  exports: [
    PageViewService,
    PageViewPrismaRepository,
  ],
})
export class PageViewModule {}
