import { PrismaService } from '../../infrastructure/persistence/prisma/prisma.service';
import { PrismaModule, RedisModule } from '@vubon/shared-kernel/infrastructure';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthPreferencesController } from '../../interfaces/controllers/rest/auth-preferences.controller';
import { UserPreferencesService } from '../../application/services/impl/user-preferences.service';
import { GetUserPreferencesHandler } from '../../application/queries/user/get-user-preferences.handler';
import { UpdatePreferencesHandler } from '../../application/commands/user/update-preferences.handler';
import { UserPreferencesPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user-preferences.prisma.repository';

@Module({
  imports: [CqrsModule, PrismaModule, RedisModule],
  controllers: [AuthPreferencesController],
  providers: [PrismaService, { provide: 'PrismaService', useClass: PrismaService },
    { provide: 'UserPreferencesRepository', useExisting: UserPreferencesPrismaRepository },
    { provide: 'UserPreferencesService', useExisting: UserPreferencesService },

    UserPreferencesPrismaRepository,
    UserPreferencesService,
    GetUserPreferencesHandler,
    UpdatePreferencesHandler,
  ],
  exports: [UserPreferencesService],
})
export class AuthPreferencesModule {}
