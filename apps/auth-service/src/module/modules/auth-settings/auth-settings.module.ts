import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthSettingsController } from '../../interfaces/controllers/rest/auth-settings.controller';
import { AuthSettingsService } from '../../application/services/impl/auth-settings.service';
import { GetAuthSettingsHandler } from '../../application/queries/auth/get-auth-settings.handler';
import { UpdateAuthSettingsHandler } from '../../application/commands/settings/update-auth-settings.handler';
import { AUTH_SETTINGS_SERVICE } from '../../application/services/tokens';

const TOKEN_BINDINGS = [
  { provide: AUTH_SETTINGS_SERVICE, useExisting: AuthSettingsService },
];

@Module({
  imports: [CqrsModule],
  controllers: [AuthSettingsController],
  providers: [
    AuthSettingsService,
    GetAuthSettingsHandler,
    UpdateAuthSettingsHandler,
    ...TOKEN_BINDINGS,
  ],
  exports: [AuthSettingsService, ...TOKEN_BINDINGS.map((b) => b.provide)],
})
export class AuthSettingsModule {}
