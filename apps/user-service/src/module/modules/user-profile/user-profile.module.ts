/**
 * UserProfileModule
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserProfileController } from '@interfaces/controllers/rest/user-profile.controller';
import { UserProfileService } from '@application/services/impl/user-profile.service';
import {
  UpdateProfileHandler,
  UpdateAvatarHandler,
  UpdateBioHandler,
  UpdateVisibilityHandler,
} from '@application/commands/profile';
import {
  GetProfileHandler,
  GetPublicProfileHandler,
} from '@application/queries/profile';
import { UserProfilePrismaRepository } from '@infrastructure/persistence/prisma/repositories';
import { UserProfileCacheRepository } from '@infrastructure/persistence/cache/repositories';
import { USER_PROFILE_REPOSITORY } from '@domain/repositories/user-profile.repository.interface';
import { PrismaModule } from '@infrastructure/persistence/prisma/prisma.module';
import { RedisModule } from '@infrastructure/persistence/cache/redis.module';
import { UserModule } from '../user/user.module.js';

@Module({
  imports: [CqrsModule, PrismaModule, RedisModule, UserModule],
  controllers: [UserProfileController],
  providers: [
    UserProfileService,
    { provide: USER_PROFILE_REPOSITORY, useClass: UserProfilePrismaRepository },
    UserProfileCacheRepository,
    UpdateProfileHandler,
    UpdateAvatarHandler,
    UpdateBioHandler,
    UpdateVisibilityHandler,
    GetProfileHandler,
    GetPublicProfileHandler,
  ],
  exports: [UserProfileService, USER_PROFILE_REPOSITORY],
})
export class UserProfileModule {}
