/**
 * PublicProfileModule
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PublicProfileController } from '@interfaces/controllers/rest/public-profile.controller';
import { PrismaModule } from '@infrastructure/persistence/prisma/prisma.module';
import { UserModule } from '../user/user.module.js';
import { UserProfileModule } from '../user-profile/user-profile.module.js';

@Module({
  imports: [CqrsModule, PrismaModule, UserModule, UserProfileModule],
  controllers: [PublicProfileController],
  providers: [],
  exports: [],
})
export class PublicProfileModule {}
