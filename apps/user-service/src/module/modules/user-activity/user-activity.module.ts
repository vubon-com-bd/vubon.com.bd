/**
 * UserActivityModule
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserActivityController } from '@interfaces/controllers/rest/user-activity.controller';
import { UserActivityService } from '@application/services/impl/user-activity.service';
import {
  ListActivitiesHandler,
  GetUserStatsHandler,
} from '@application/queries/activity';
import { UserActivityPrismaRepository } from '@infrastructure/persistence/prisma/repositories';
import { USER_ACTIVITY_REPOSITORY } from '@domain/repositories/user-activity.repository.interface';
import { PrismaModule } from '@infrastructure/persistence/prisma/prisma.module';
import { UserModule } from '../user/user.module.js';

@Module({
  imports: [CqrsModule, PrismaModule, UserModule],
  controllers: [UserActivityController],
  providers: [
    UserActivityService,
    { provide: USER_ACTIVITY_REPOSITORY, useClass: UserActivityPrismaRepository },
    ListActivitiesHandler,
    GetUserStatsHandler,
  ],
  exports: [UserActivityService, USER_ACTIVITY_REPOSITORY],
})
export class UserActivityModule {}
