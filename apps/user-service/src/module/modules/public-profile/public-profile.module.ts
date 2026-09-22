import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PublicProfileController } from '../../interfaces/controllers/rest/public-profile.controller';
import { GetPublicProfileHandler } from '../../application/queries/profile/get-public-profile.handler';
import { UserProfilePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user-profile.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [PublicProfileController],
  providers: [
    UserProfilePrismaRepository,
    GetPublicProfileHandler,
  ],
  exports: [],
})
export class PublicProfileModule {}
