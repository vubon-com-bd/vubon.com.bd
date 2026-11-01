/**
 * User Profile Feature Module
 * @module identity-service/modules/user-profile
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserProfileController } from '../../interfaces/controllers/rest/user-profile.controller.js';
import { USER_PROFILE_COMMAND_HANDLERS } from './commands/index.js';
import { USER_PROFILE_QUERY_HANDLERS } from './queries/index.js';

import { UserProfileService } from '../../application/services/impl/user-profile.service.js';
import { USER_PROFILE_SERVICE } from '../../application/services/interfaces/user-profile.service.interface.js';

const SERVICES = [
  UserProfileService,
  { provide: USER_PROFILE_SERVICE, useExisting: UserProfileService },
];

@Module({
  imports: [CqrsModule],
  controllers: [UserProfileController],
  providers: [
    ...SERVICES,
    ...(USER_PROFILE_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(USER_PROFILE_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: SERVICES,
})
export class UserProfileModule {}
