import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserProfileController } from '../../interfaces/controllers/rest/user-profile.controller';
import { ProfileControllerMapper } from '../../interfaces/mappers/profile.controller.mapper';
import { UserProfileService } from '../../application/services/impl/user-profile.service';
import { UpdateProfileHandler } from '../../application/commands/profile/update-profile.handler';
import { UpdateAvatarHandler } from '../../application/commands/profile/update-avatar.handler';
import { UpdateBioHandler } from '../../application/commands/profile/update-bio.handler';
import { UpdateVisibilityHandler } from '../../application/commands/profile/update-visibility.handler';
import { GetProfileHandler } from '../../application/queries/profile/get-profile.handler';
import { GetPublicProfileHandler } from '../../application/queries/profile/get-public-profile.handler';
import { UserProfilePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user-profile.prisma.repository';
import { UserProfileCacheRepository } from '../../infrastructure/persistence/cache/repositories/user-profile.cache.repository';

@Module({
  imports: [CqrsModule],
  controllers: [UserProfileController],
  providers: [
    UserProfilePrismaRepository,
    UserProfileCacheRepository,
    UserProfileService,
    ProfileControllerMapper,
    UpdateProfileHandler,
    UpdateAvatarHandler,
    UpdateBioHandler,
    UpdateVisibilityHandler,
    GetProfileHandler,
    GetPublicProfileHandler,
  ],
  exports: [UserProfileService, UserProfilePrismaRepository],
})
export class UserProfileModule {}
