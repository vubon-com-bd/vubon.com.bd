import { PrismaService } from '../../infrastructure/persistence/prisma/prisma.service';
import { PrismaModule, RedisModule } from '@vubon/shared-kernel/infrastructure';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserProfileController } from '../../interfaces/controllers/rest/user-profile.controller';
import { UserProfileService } from '../../application/services/impl/user-profile.service';
import { UpdateProfileHandler } from '../../application/commands/user/update-profile.handler';
import { GetUserProfileHandler } from '../../application/queries/user/get-user-profile.handler';
import { UserProfilePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user-profile.prisma.repository';

@Module({
  imports: [CqrsModule, PrismaModule, RedisModule],
  controllers: [UserProfileController],
  providers: [PrismaService, { provide: 'PrismaService', useClass: PrismaService },
    { provide: 'UserProfileRepository', useExisting: UserProfilePrismaRepository },
    { provide: 'UserProfileService', useExisting: UserProfileService },

    UserProfilePrismaRepository,
    UserProfileService,
    UpdateProfileHandler,
    GetUserProfileHandler,
  ],
  exports: [UserProfileService, UserProfilePrismaRepository],
})
export class UserProfileModule {}
