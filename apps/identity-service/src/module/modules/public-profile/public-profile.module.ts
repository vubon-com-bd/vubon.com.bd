/**
 * Public Profile Feature Module
 * @module identity-service/modules/public-profile
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PublicProfileController } from '../../interfaces/controllers/rest/public-profile.controller.js';
import { PUBLIC_PROFILE_QUERY_HANDLERS } from './queries/index.js';

import { UserProfileService } from '../../application/services/impl/user-profile.service.js';
import { USER_PROFILE_SERVICE } from '../../application/services/interfaces/user-profile.service.interface.js';

@Module({
  imports: [CqrsModule],
  controllers: [PublicProfileController],
  providers: [
    UserProfileService,
    { provide: USER_PROFILE_SERVICE, useExisting: UserProfileService },
    ...(PUBLIC_PROFILE_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [{ provide: USER_PROFILE_SERVICE, useExisting: UserProfileService }],
})
export class PublicProfileModule {}
