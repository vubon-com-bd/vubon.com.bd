/**
 * User Activity Feature Module
 * @module identity-service/modules/user-activity
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserActivityController } from '../../interfaces/controllers/rest/user-activity.controller.js';
import { USER_ACTIVITY_QUERY_HANDLERS } from './queries/index.js';

import { UserActivityService } from '../../application/services/impl/user-activity.service.js';
import { USER_ACTIVITY_SERVICE } from '../../application/services/interfaces/user-activity.service.interface.js';

const SERVICES = [
  UserActivityService,
  { provide: USER_ACTIVITY_SERVICE, useExisting: UserActivityService },
];

@Module({
  imports: [CqrsModule],
  controllers: [UserActivityController],
  providers: [
    ...SERVICES,
    ...(USER_ACTIVITY_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: SERVICES,
})
export class UserActivityModule {}
