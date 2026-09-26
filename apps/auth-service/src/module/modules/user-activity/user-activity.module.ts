import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserActivityController } from '../../interfaces/controllers/rest/user-activity.controller';
import { UserActivityService } from '../../application/services/impl/user-activity.service';
import { UserActivityPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user-activity.prisma.repository';
import { ListUserActivitiesHandler } from '../../application/queries/user/list-user-activities.handler';
import {
  USER_ACTIVITY_REPO,
} from '../../application/services/tokens';

const TOKEN_BINDINGS = [
  { provide: USER_ACTIVITY_REPO, useExisting: UserActivityPrismaRepository },
];

@Module({
  imports: [CqrsModule],
  controllers: [UserActivityController],
  providers: [
    UserActivityService,
    UserActivityPrismaRepository,
    ListUserActivitiesHandler,
    ...TOKEN_BINDINGS,
  ],
  exports: [UserActivityService, UserActivityPrismaRepository, ...TOKEN_BINDINGS.map((b) => b.provide)],
})
export class UserActivityModule {}
