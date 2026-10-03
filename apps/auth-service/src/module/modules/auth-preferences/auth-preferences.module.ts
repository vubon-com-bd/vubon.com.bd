import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthPreferencesController } from '../../interfaces/controllers/rest/auth-preferences.controller.js';
import { UserPreferencesService } from '../../application/services/impl/user-preferences.service.js';
import { AuthSettingsService } from '../../application/services/impl/auth-settings.service.js';
import { UserPreferencesPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user-preferences.prisma.repository.js';
import { GetUserPreferencesHandler } from '../../application/queries/user/get-user-preferences.handler.js';
import { UpdatePreferencesHandler } from '../../application/commands/user/update-preferences.handler.js';
import { UpdateAuthPreferencesHandler } from '../../application/commands/settings/update-auth-preferences.handler.js';
import {
  USER_PREFERENCES_REPO,
  USER_PREFERENCES_SERVICE,
  AUTH_SETTINGS_SERVICE,
} from '../../application/services/tokens.js';

const TOKEN_BINDINGS = [
  { provide: USER_PREFERENCES_REPO, useExisting: UserPreferencesPrismaRepository },
  { provide: USER_PREFERENCES_SERVICE, useExisting: UserPreferencesService },
  { provide: AUTH_SETTINGS_SERVICE, useExisting: AuthSettingsService },
];

@Module({
  imports: [CqrsModule],
  controllers: [AuthPreferencesController],
  providers: [
    UserPreferencesService,
    AuthSettingsService,
    UserPreferencesPrismaRepository,
    GetUserPreferencesHandler,
    UpdatePreferencesHandler,
    UpdateAuthPreferencesHandler,
    ...TOKEN_BINDINGS,
  ],
  exports: [
    UserPreferencesService,
    AuthSettingsService,
    UserPreferencesPrismaRepository,
    ...TOKEN_BINDINGS.map((b) => b.provide),
  ],
})
export class AuthPreferencesModule {}
