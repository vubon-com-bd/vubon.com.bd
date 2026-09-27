import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserProfileController } from '../../interfaces/controllers/rest/user-profile.controller.js';
import { UserProfileService } from '../../application/services/impl/user-profile.service.js';
import { UserProfilePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user-profile.prisma.repository.js';
import { UpdateProfileHandler } from '../../application/commands/user/update-profile.handler.js';
import { GetUserProfileHandler } from '../../application/queries/user/get-user-profile.handler.js';
import {
  USER_PROFILE_REPO,
  USER_PROFILE_SERVICE,
} from '../../application/services/tokens.js';

const TOKEN_BINDINGS = [
  { provide: USER_PROFILE_REPO, useExisting: UserProfilePrismaRepository },
  { provide: USER_PROFILE_SERVICE, useExisting: UserProfileService },
];

@Module({
  imports: [CqrsModule],
  controllers: [UserProfileController],
  providers: [
    UserProfileService,
    UserProfilePrismaRepository,
    UpdateProfileHandler,
    GetUserProfileHandler,
    ...TOKEN_BINDINGS,
  ],
  exports: [UserProfileService, UserProfilePrismaRepository, ...TOKEN_BINDINGS.map((b) => b.provide)],
})
export class UserProfileModule {}
