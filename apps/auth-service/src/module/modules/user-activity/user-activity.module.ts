import { PrismaService } from '../../infrastructure/persistence/prisma/prisma.service';
import { PrismaModule, RedisModule } from '@vubon/shared-kernel/infrastructure';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserActivityController } from '../../interfaces/controllers/rest/user-activity.controller';
import { UserActivityService } from '../../application/services/impl/user-activity.service';
import { ListUserActivitiesHandler } from '../../application/queries/user/list-user-activities.handler';
import { UserActivityPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user-activity.prisma.repository';

@Module({
  imports: [CqrsModule, PrismaModule, RedisModule],
  controllers: [UserActivityController],
  providers: [PrismaService, { provide: 'PrismaService', useClass: PrismaService },
    { provide: 'UserActivityRepository', useExisting: UserActivityPrismaRepository },
    { provide: 'UserActivityService', useExisting: UserActivityService },

    UserActivityPrismaRepository,
    UserActivityService,
    ListUserActivitiesHandler,
  ],
  exports: [UserActivityService, UserActivityPrismaRepository],
})
export class UserActivityModule {}
