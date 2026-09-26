import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserSettingsController } from '../../interfaces/controllers/rest/user-settings.controller';
import { UserSettingsService } from '../../application/services/impl/user-settings.service';
import { UpdateSettingsHandler } from '../../application/commands/settings/update-settings.handler';
import { ResetSettingsHandler } from '../../application/commands/settings/reset-settings.handler';
import { GetSettingsHandler } from '../../application/queries/settings/get-settings.handler';
import { UserSettingsPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user-settings.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [UserSettingsController],
  providers: [
    UserSettingsPrismaRepository,
    UserSettingsService,
    UpdateSettingsHandler,
    ResetSettingsHandler,
    GetSettingsHandler,
  ],
  exports: [UserSettingsService, UserSettingsPrismaRepository],
})
export class UserSettingsModule {}
