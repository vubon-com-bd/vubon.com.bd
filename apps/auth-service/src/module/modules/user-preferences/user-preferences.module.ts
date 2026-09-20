import { PrismaService } from '../../infrastructure/persistence/prisma/prisma.service';
import { PrismaModule, RedisModule } from '@vubon/shared-kernel/infrastructure';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserPreferencesController } from '../../interfaces/controllers/rest/user-preferences.controller';
import { UserPreferencesService } from '../../application/services/impl/user-preferences.service';
import { UpdatePreferencesHandler } from '../../application/commands/user/update-preferences.handler';
import { GetUserPreferencesHandler } from '../../application/queries/user/get-user-preferences.handler';
import { UserPreferencesPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user-preferences.prisma.repository';

@Module({
  imports: [CqrsModule, PrismaModule, RedisModule],
  controllers: [UserPreferencesController],
  providers: [PrismaService, { provide: 'PrismaService', useClass: PrismaService },
    { provide: 'UserPreferencesRepository', useExisting: UserPreferencesPrismaRepository },
    { provide: 'UserPreferencesService', useExisting: UserPreferencesService },

    UserPreferencesPrismaRepository,
    UserPreferencesService,
    UpdatePreferencesHandler,
    GetUserPreferencesHandler,
  ],
  exports: [UserPreferencesService, UserPreferencesPrismaRepository],
})
export class UserPreferencesModule {}
