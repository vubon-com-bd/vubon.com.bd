import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserSettingsController } from '../../interfaces/controllers/rest/user-settings.controller.js';
import { UserSettingsService } from '../../application/services/impl/user-settings.service.js';
import { UserSettingsPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user-settings.prisma.repository.js';
import { UpdateSettingsHandler } from '../../application/commands/user/update-settings.handler.js';
import { GetUserSettingsHandler } from '../../application/queries/user/get-user-settings.handler.js';
import {
  USER_SETTINGS_REPO,
  USER_SETTINGS_SERVICE,
} from '../../application/services/tokens.js';

const TOKEN_BINDINGS = [
  { provide: USER_SETTINGS_REPO, useExisting: UserSettingsPrismaRepository },
  { provide: USER_SETTINGS_SERVICE, useExisting: UserSettingsService },
];

@Module({
  imports: [CqrsModule],
  controllers: [UserSettingsController],
  providers: [
    UserSettingsService,
    UserSettingsPrismaRepository,
    UpdateSettingsHandler,
    GetUserSettingsHandler,
    ...TOKEN_BINDINGS,
  ],
  exports: [UserSettingsService, UserSettingsPrismaRepository, ...TOKEN_BINDINGS.map((b) => b.provide)],
})
export class UserSettingsModule {}
