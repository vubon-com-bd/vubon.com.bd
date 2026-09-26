import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from '../../interfaces/controllers/rest/user.controller';
import { UserService } from '../../application/services/impl/user.service';
import { CreateUserHandler } from '../../application/commands/user/create-user.handler';
import { UpdateUserHandler } from '../../application/commands/user/update-user.handler';
import { DeleteUserHandler } from '../../application/commands/user/delete-user.handler';
import { ActivateUserHandler } from '../../application/commands/user/activate-user.handler';
import { DeactivateUserHandler } from '../../application/commands/user/deactivate-user.handler';
import { SuspendUserHandler } from '../../application/commands/user/suspend-user.handler';
import { UnsuspendUserHandler } from '../../application/commands/user/unsuspend-user.handler';
import { GetUserHandler } from '../../application/queries/user/get-user.handler';
import { ListUsersHandler } from '../../application/queries/user/list-users.handler';
import { UserPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user.prisma.repository';
import { UserCacheRepository } from '../../infrastructure/persistence/cache/repositories/user.cache.repository';
import { UserControllerMapper } from '../../interfaces/mappers/user.controller.mapper';
import { USER_REPO, USER_SERVICE } from '../../application/services/tokens';

const HANDLERS = [
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
  ActivateUserHandler,
  DeactivateUserHandler,
  SuspendUserHandler,
  UnsuspendUserHandler,
  GetUserHandler,
  ListUsersHandler,
];

const TOKEN_BINDINGS = [
  { provide: USER_REPO, useExisting: UserPrismaRepository },
  { provide: USER_SERVICE, useExisting: UserService },
];

@Module({
  imports: [CqrsModule],
  controllers: [UserController],
  providers: [
    UserPrismaRepository,
    UserCacheRepository,
    UserService,
    UserControllerMapper,
    ...HANDLERS,
    ...TOKEN_BINDINGS,
  ],
  exports: [
    UserService,
    UserPrismaRepository,
    UserCacheRepository,
    ...TOKEN_BINDINGS.map((b) => b.provide),
  ],
})
export class UserModule {}
