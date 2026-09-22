import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserActivityController } from '../../interfaces/controllers/rest/user-activity.controller';
import { UserActivityService } from '../../application/services/impl/user-activity.service';
import { ListActivitiesHandler } from '../../application/queries/activity/list-activities.handler';
import { GetUserStatsHandler } from '../../application/queries/activity/get-user-stats.handler';
import { UserActivityPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user-activity.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [UserActivityController],
  providers: [
    UserActivityPrismaRepository,
    UserActivityService,
    ListActivitiesHandler,
    GetUserStatsHandler,
  ],
  exports: [UserActivityService, UserActivityPrismaRepository],
})
export class UserActivityModule {}
