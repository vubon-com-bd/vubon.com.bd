import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserPreferencesController } from '../../interfaces/controllers/rest/user-preferences.controller';
import { UserPreferencesService } from '../../application/services/impl/user-preferences.service';
import { UserPreferencesPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user-preferences.prisma.repository';
import { UpdatePreferencesHandler } from '../../application/commands/user/update-preferences.handler';
import { GetUserPreferencesHandler } from '../../application/queries/user/get-user-preferences.handler';
import {
  USER_PREFERENCES_REPO,
  USER_PREFERENCES_SERVICE,
} from '../../application/services/tokens';

const TOKEN_BINDINGS = [
  { provide: USER_PREFERENCES_REPO, useExisting: UserPreferencesPrismaRepository },
  { provide: USER_PREFERENCES_SERVICE, useExisting: UserPreferencesService },
];

@Module({
  imports: [CqrsModule],
  controllers: [UserPreferencesController],
  providers: [
    UserPreferencesService,
    UserPreferencesPrismaRepository,
    UpdatePreferencesHandler,
    GetUserPreferencesHandler,
    ...TOKEN_BINDINGS,
  ],
  exports: [UserPreferencesService, UserPreferencesPrismaRepository, ...TOKEN_BINDINGS.map((b) => b.provide)],
})
export class UserPreferencesModule {}
