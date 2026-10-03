/**
 * UserPreferencesModule
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserPreferencesController } from '@interfaces/controllers/rest/user-preferences.controller';
import { UserPreferencesService } from '@application/services/impl/user-preferences.service';
import {
  UpdatePreferencesHandler,
  ResetPreferencesHandler,
} from '@application/commands/preferences';
import { GetPreferencesHandler } from '@application/queries/preferences';
import { UserPreferencesPrismaRepository } from '@infrastructure/persistence/prisma/repositories';
import { UserPreferencesCacheRepository } from '@infrastructure/persistence/cache/repositories';
import { USER_PREFERENCES_REPOSITORY } from '@domain/repositories/user-preferences.repository.interface';
import { PrismaModule } from '@infrastructure/persistence/prisma/prisma.module';
import { RedisModule } from '@infrastructure/persistence/cache/redis.module';
import { UserModule } from '../user/user.module.js';

@Module({
  imports: [CqrsModule, PrismaModule, RedisModule, UserModule],
  controllers: [UserPreferencesController],
  providers: [
    UserPreferencesService,
    { provide: USER_PREFERENCES_REPOSITORY, useClass: UserPreferencesPrismaRepository },
    UserPreferencesCacheRepository,
    UpdatePreferencesHandler,
    ResetPreferencesHandler,
    GetPreferencesHandler,
  ],
  exports: [UserPreferencesService, USER_PREFERENCES_REPOSITORY],
})
export class UserPreferencesModule {}
