/**
 * Session Module
 */
import { Module } from '@nestjs/common';
import { SessionController } from '../../interfaces/controllers/rest/session.controller.js';
import { SESSION_QUERY_HANDLERS } from './queries/index.js';
import { SessionPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/session.prisma.repository.js';
import { PageViewPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/page-view.prisma.repository.js';
import { SessionService } from '../../application/services/impl/session.service.js';
import { PageViewService } from '../../application/services/impl/page-view.service.js';

@Module({
  controllers: [SessionController],
  providers: [
    SessionPrismaRepository,
    PageViewPrismaRepository,
    SessionService,
    PageViewService,
    ...SESSION_QUERY_HANDLERS as readonly unknown[] as never[],
  ],
  exports: [
    SessionService,
    PageViewService,
    SessionPrismaRepository,
    PageViewPrismaRepository,
  ],
})
export class SessionModule {}
