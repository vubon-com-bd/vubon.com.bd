/**
 * User Settings Feature Module
 * @module identity-service/modules/user-settings
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserSettingsController } from '../../interfaces/controllers/rest/user-settings.controller.js';
import { USER_SETTINGS_COMMAND_HANDLERS } from './commands/index.js';
import { USER_SETTINGS_QUERY_HANDLERS } from './queries/index.js';

import { UserSettingsService } from '../../application/services/impl/user-settings.service.js';
import { USER_SETTINGS_SERVICE } from '../../application/services/interfaces/user-settings.service.interface.js';

const SERVICES = [
  UserSettingsService,
  { provide: USER_SETTINGS_SERVICE, useExisting: UserSettingsService },
];

@Module({
  imports: [CqrsModule],
  controllers: [UserSettingsController],
  providers: [
    ...SERVICES,
    ...(USER_SETTINGS_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(USER_SETTINGS_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: SERVICES,
})
export class UserSettingsModule {}
