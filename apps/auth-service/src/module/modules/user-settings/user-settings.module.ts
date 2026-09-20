import { PrismaService } from '../../infrastructure/persistence/prisma/prisma.service';
import { PrismaModule, RedisModule } from '@vubon/shared-kernel/infrastructure';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserSettingsController } from '../../interfaces/controllers/rest/user-settings.controller';
import { UserSettingsService } from '../../application/services/impl/user-settings.service';
import { UpdateSettingsHandler } from '../../application/commands/user/update-settings.handler';
import { GetUserSettingsHandler } from '../../application/queries/user/get-user-settings.handler';
import { UserSettingsPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user-settings.prisma.repository';

@Module({
  imports: [CqrsModule, PrismaModule, RedisModule],
  controllers: [UserSettingsController],
  providers: [PrismaService, { provide: 'PrismaService', useClass: PrismaService },
    { provide: 'UserSettingsRepository', useExisting: UserSettingsPrismaRepository },
    { provide: 'UserSettingsService', useExisting: UserSettingsService },

    UserSettingsPrismaRepository,
    UserSettingsService,
    UpdateSettingsHandler,
    GetUserSettingsHandler,
  ],
  exports: [UserSettingsService, UserSettingsPrismaRepository],
})
export class UserSettingsModule {}
