import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from '../../interfaces/controllers/rest/user.controller.js';
import { UserService } from '../../application/services/impl/user.service.js';
import { CreateUserHandler } from '../../application/commands/user/create-user.handler.js';
import { UpdateUserHandler } from '../../application/commands/user/update-user.handler.js';
import { DeleteUserHandler } from '../../application/commands/user/delete-user.handler.js';
import { ActivateUserHandler } from '../../application/commands/user/activate-user.handler.js';
import { DeactivateUserHandler } from '../../application/commands/user/deactivate-user.handler.js';
import { SuspendUserHandler } from '../../application/commands/user/suspend-user.handler.js';
import { UnsuspendUserHandler } from '../../application/commands/user/unsuspend-user.handler.js';
import { GetUserHandler } from '../../application/queries/user/get-user.handler.js';
import { ListUsersHandler } from '../../application/queries/user/list-users.handler.js';
import { UserPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user.prisma.repository.js';
import { UserCacheRepository } from '../../infrastructure/persistence/cache/repositories/user.cache.repository.js';
import { UserControllerMapper } from '../../interfaces/mappers/user.controller.mapper.js';
import { USER_REPO, USER_SERVICE } from '../../application/services/tokens.js';

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
