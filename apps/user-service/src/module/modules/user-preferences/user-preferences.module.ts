import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserPreferencesController } from '../../interfaces/controllers/rest/user-preferences.controller';
import { UserPreferencesService } from '../../application/services/impl/user-preferences.service';
import { UpdatePreferencesHandler } from '../../application/commands/preferences/update-preferences.handler';
import { ResetPreferencesHandler } from '../../application/commands/preferences/reset-preferences.handler';
import { GetPreferencesHandler } from '../../application/queries/preferences/get-preferences.handler';
import { UserPreferencesPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user-preferences.prisma.repository';
import { UserPreferencesCacheRepository } from '../../infrastructure/persistence/cache/repositories/user-preferences.cache.repository';

@Module({
  imports: [CqrsModule],
  controllers: [UserPreferencesController],
  providers: [
    UserPreferencesPrismaRepository,
    UserPreferencesCacheRepository,
    UserPreferencesService,
    UpdatePreferencesHandler,
    ResetPreferencesHandler,
    GetPreferencesHandler,
  ],
  exports: [UserPreferencesService, UserPreferencesPrismaRepository],
})
export class UserPreferencesModule {}
