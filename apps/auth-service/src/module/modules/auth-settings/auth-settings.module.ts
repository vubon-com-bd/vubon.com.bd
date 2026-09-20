import { PrismaService } from '../../infrastructure/persistence/prisma/prisma.service';
import { PrismaModule, RedisModule } from '@vubon/shared-kernel/infrastructure';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthSettingsController } from '../../interfaces/controllers/rest/auth-settings.controller';
import { AuthSettingsService } from '../../application/services/impl/auth-settings.service';
import { GetAuthSettingsHandler } from '../../application/queries/auth/get-auth-settings.handler';
import { UpdateAuthSettingsHandler } from '../../application/commands/settings/update-auth-settings.handler';

@Module({
  imports: [CqrsModule, PrismaModule, RedisModule],
  controllers: [AuthSettingsController],
  providers: [PrismaService, { provide: 'PrismaService', useClass: PrismaService },
    { provide: 'AuthSettingsService', useExisting: AuthSettingsService },

    AuthSettingsService,
    GetAuthSettingsHandler,
    UpdateAuthSettingsHandler,
  ],
  exports: [AuthSettingsService],
})
export class AuthSettingsModule {}
