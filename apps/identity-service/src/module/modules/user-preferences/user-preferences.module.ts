/**
 * User Preferences Feature Module
 * @module identity-service/modules/user-preferences
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserPreferencesController } from '../../interfaces/controllers/rest/user-preferences.controller.js';
import { USER_PREFERENCES_COMMAND_HANDLERS } from './commands/index.js';
import { USER_PREFERENCES_QUERY_HANDLERS } from './queries/index.js';

import { UserPreferencesService } from '../../application/services/impl/user-preferences.service.js';
import { USER_PREFERENCES_SERVICE } from '../../application/services/interfaces/user-preferences.service.interface.js';

const SERVICES = [
  UserPreferencesService,
  { provide: USER_PREFERENCES_SERVICE, useExisting: UserPreferencesService },
];

@Module({
  imports: [CqrsModule],
  controllers: [UserPreferencesController],
  providers: [
    ...SERVICES,
    ...(USER_PREFERENCES_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(USER_PREFERENCES_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: SERVICES,
})
export class UserPreferencesModule {}
