import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { SessionController } from '../../interfaces/controllers/rest/session.controller';
import { SessionService } from '../../application/services/impl/session.service';
import { PageViewService } from '../../application/services/impl/page-view.service';
import { GetSessionHandler } from '../../application/queries/session/get-session.handler';
import { ListSessionsHandler } from '../../application/queries/session/list-sessions.handler';
import { SessionPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/session.prisma.repository';
import { PageViewPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/page-view.prisma.repository';
import { SessionBuilderService } from '../../infrastructure/services/internal/session-builder.service';

const HANDLERS = [GetSessionHandler, ListSessionsHandler];

@Module({
  imports: [CqrsModule],
  controllers: [SessionController],
  providers: [
    SessionPrismaRepository,
    PageViewPrismaRepository,
    SessionBuilderService,
    SessionService,
    PageViewService,
    ...HANDLERS,
  ],
  exports: [
    SessionService,
    PageViewService,
    SessionPrismaRepository,
    PageViewPrismaRepository,
    SessionBuilderService,
  ],
})
export class SessionModule {}
