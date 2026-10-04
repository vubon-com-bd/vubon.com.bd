import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserActivityController } from '../../interfaces/controllers/rest/user-activity.controller.js';
import { UserActivityService } from '../../application/services/impl/user-activity.service.js';
import { UserActivityPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user-activity.prisma.repository.js';
import { ListUserActivitiesHandler } from '../../application/queries/user/list-user-activities.handler.js';
import {
  USER_ACTIVITY_REPO,
} from '../../application/services/tokens.js';

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
