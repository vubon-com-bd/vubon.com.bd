/**
 * UserSettingsModule
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserSettingsController } from '@interfaces/controllers/rest/user-settings.controller';
import { UserSettingsService } from '@application/services/impl/user-settings.service';
import { UpdateSettingsHandler, ResetSettingsHandler } from '@application/commands/settings';
import { GetSettingsHandler } from '@application/queries/settings';
import { UserSettingsPrismaRepository } from '@infrastructure/persistence/prisma/repositories';
import { USER_SETTINGS_REPOSITORY } from '@domain/repositories/user-settings.repository.interface';
import { PrismaModule } from '@infrastructure/persistence/prisma/prisma.module';
import { UserModule } from '../user/user.module.js';

@Module({
  imports: [CqrsModule, PrismaModule, UserModule],
  controllers: [UserSettingsController],
  providers: [
    UserSettingsService,
    { provide: USER_SETTINGS_REPOSITORY, useClass: UserSettingsPrismaRepository },
    UpdateSettingsHandler,
    ResetSettingsHandler,
    GetSettingsHandler,
  ],
  exports: [UserSettingsService, USER_SETTINGS_REPOSITORY],
})
export class UserSettingsModule {}
