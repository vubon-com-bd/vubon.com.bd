/**
 * UserModule — feature module for user CRUD + onboarding
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from '@interfaces/controllers/rest/user.controller';
import { UserService } from '@application/services/impl/user.service';
import {
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
  ActivateUserHandler,
  DeactivateUserHandler,
  SuspendUserHandler,
  UnsuspendUserHandler,
} from '@application/commands/user';
import {
  GetUserHandler,
  GetUserByEmailHandler,
  ListUsersHandler,
  SearchUsersHandler,
} from '@application/queries/user';
import { UserOnboardingSaga, UserVerificationSaga } from '@application/sagas';
import { UserPrismaRepository } from '@infrastructure/persistence/prisma/repositories';
import { UserCacheRepository } from '@infrastructure/persistence/cache/repositories';
import { USER_REPOSITORY } from '@domain/repositories/user.repository.interface';
import { PrismaModule } from '@infrastructure/persistence/prisma/prisma.module';
import { RedisModule } from '@infrastructure/persistence/cache/redis.module';

@Module({
  imports: [CqrsModule, PrismaModule, RedisModule],
  controllers: [UserController],
  providers: [
    UserService,
    { provide: USER_REPOSITORY, useClass: UserPrismaRepository },
    UserCacheRepository,
    CreateUserHandler,
    UpdateUserHandler,
    DeleteUserHandler,
    ActivateUserHandler,
    DeactivateUserHandler,
    SuspendUserHandler,
    UnsuspendUserHandler,
    GetUserHandler,
    GetUserByEmailHandler,
    ListUsersHandler,
    SearchUsersHandler,
    UserOnboardingSaga,
    UserVerificationSaga,
  ],
  exports: [UserService, USER_REPOSITORY],
})
export class UserModule {}
