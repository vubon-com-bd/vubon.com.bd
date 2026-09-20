import { PrismaService } from '../../infrastructure/persistence/prisma/prisma.service';
import { PrismaModule, RedisModule } from '@vubon/shared-kernel/infrastructure';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserLogController } from '../../interfaces/controllers/rest/user-log.controller';
import { ListUsersHandler } from '../../application/queries/user/list-users.handler';
import { UserPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user.prisma.repository';

@Module({
  imports: [CqrsModule, PrismaModule, RedisModule],
  controllers: [UserLogController],
  providers: [PrismaService, { provide: 'PrismaService', useClass: PrismaService },
    { provide: 'UserRepository', useExisting: UserPrismaRepository },

    UserPrismaRepository,
    ListUsersHandler,
  ],
  exports: [UserPrismaRepository],
})
export class UserLogModule {}
