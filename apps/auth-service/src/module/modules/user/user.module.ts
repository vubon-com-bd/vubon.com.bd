import { PrismaService } from '../../infrastructure/persistence/prisma/prisma.service';
import { PrismaModule, RedisModule } from '@vubon/shared-kernel/infrastructure';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserController } from '../../interfaces/controllers/rest/user.controller';
import { UserPermissionController } from '../../interfaces/controllers/rest/user-permission.controller';
import { UserRoleController } from '../../interfaces/controllers/rest/user-role.controller';

import { UserService } from '../../application/services/impl/user.service';
import { UserPermissionService } from '../../application/services/impl/user-permission.service';
import { UserRoleService } from '../../application/services/impl/user-role.service';

import { UserControllerMapper } from '../../interfaces/mappers/user.controller.mapper';

import { CreateUserHandler } from '../../application/commands/user/create-user.handler';
import { UpdateUserHandler } from '../../application/commands/user/update-user.handler';
import { DeleteUserHandler } from '../../application/commands/user/delete-user.handler';
import { ActivateUserHandler } from '../../application/commands/user/activate-user.handler';
import { DeactivateUserHandler } from '../../application/commands/user/deactivate-user.handler';
import { SuspendUserHandler } from '../../application/commands/user/suspend-user.handler';
import { UnsuspendUserHandler } from '../../application/commands/user/unsuspend-user.handler';
import { AssignPermissionHandler } from '../../application/commands/user/assign-permission.handler';
import { RevokePermissionHandler } from '../../application/commands/user/revoke-permission.handler';
import { AssignRoleHandler } from '../../application/commands/user/assign-role.handler';
import { RevokeRoleHandler } from '../../application/commands/user/revoke-role.handler';

import { GetUserHandler } from '../../application/queries/user/get-user.handler';
import { ListUsersHandler } from '../../application/queries/user/list-users.handler';
import { ListUserPermissionsHandler } from '../../application/queries/user/list-user-permissions.handler';
import { ListUserRolesHandler } from '../../application/queries/user/list-user-roles.handler';

import { UserPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user.prisma.repository';
import { UserCacheRepository } from '../../infrastructure/persistence/cache/repositories/user.cache.repository';
import { UserPermissionPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user-permission.prisma.repository';
import { UserRolePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user-role.prisma.repository';

@Module({
  imports: [CqrsModule, PrismaModule, RedisModule],
  controllers: [
    UserController,
    UserPermissionController,
    UserRoleController,
  ],
  providers: [
    PrismaService,
    { provide: 'PrismaService', useClass: PrismaService },

    UserPrismaRepository,
    UserCacheRepository,
    UserPermissionPrismaRepository,
    UserRolePrismaRepository,

    { provide: 'UserRepository', useExisting: UserPrismaRepository },
    { provide: 'UserCacheRepository', useExisting: UserCacheRepository },
    { provide: 'UserPermissionRepository', useExisting: UserPermissionPrismaRepository },
    { provide: 'UserRoleRepository', useExisting: UserRolePrismaRepository },

    UserService,
    UserPermissionService,
    UserRoleService,

    { provide: 'UserService', useExisting: UserService },
    { provide: 'UserPermissionService', useExisting: UserPermissionService },
    { provide: 'UserRoleService', useExisting: UserRoleService },

    UserControllerMapper,

    CreateUserHandler,
    UpdateUserHandler,
    DeleteUserHandler,
    ActivateUserHandler,
    DeactivateUserHandler,
    SuspendUserHandler,
    UnsuspendUserHandler,
    AssignPermissionHandler,
    RevokePermissionHandler,
    AssignRoleHandler,
    RevokeRoleHandler,

    GetUserHandler,
    ListUsersHandler,
    ListUserPermissionsHandler,
    ListUserRolesHandler,
  ],
  exports: [
    UserService,
    UserPermissionService,
    UserRoleService,
    UserPrismaRepository,
    UserCacheRepository,
    UserPermissionPrismaRepository,
    UserRolePrismaRepository,
  ],
})
export class UserModule {}
