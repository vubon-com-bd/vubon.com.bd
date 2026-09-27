import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserPermissionController } from '../../interfaces/controllers/rest/user-permission.controller.js';
import { UserRoleController } from '../../interfaces/controllers/rest/user-role.controller.js';
import { UserPermissionService } from '../../application/services/impl/user-permission.service.js';
import { UserRoleService } from '../../application/services/impl/user-role.service.js';
import { AuthRoleService } from '../../application/services/impl/auth-role.service.js';
import { AuthPermissionPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-permission.prisma.repository.js';
import { AuthRolePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-role.prisma.repository.js';
import { UserPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user.prisma.repository.js';
import { ListUserPermissionsHandler } from '../../application/queries/user/list-user-permissions.handler.js';
import { ListUserRolesHandler } from '../../application/queries/user/list-user-roles.handler.js';
import { AssignRoleHandler } from '../../application/commands/user/assign-role.handler.js';
import { RevokeRoleHandler } from '../../application/commands/user/revoke-role.handler.js';
import { AssignPermissionHandler } from '../../application/commands/user/assign-permission.handler.js';
import { RevokePermissionHandler } from '../../application/commands/user/revoke-permission.handler.js';
import {
  USER_PERMISSION_SERVICE,
  USER_ROLE_SERVICE,
  AUTH_ROLE_SERVICE,
  AUTH_PERMISSION_REPO,
  AUTH_ROLE_REPO,
  USER_REPO,
} from '../../application/services/tokens.js';

const TOKEN_BINDINGS = [
  { provide: USER_PERMISSION_SERVICE, useExisting: UserPermissionService },
  { provide: USER_ROLE_SERVICE, useExisting: UserRoleService },
  { provide: AUTH_ROLE_SERVICE, useExisting: AuthRoleService },
  { provide: AUTH_PERMISSION_REPO, useExisting: AuthPermissionPrismaRepository },
  { provide: AUTH_ROLE_REPO, useExisting: AuthRolePrismaRepository },
  { provide: USER_REPO, useExisting: UserPrismaRepository },
];

@Module({
  imports: [CqrsModule],
  controllers: [UserPermissionController, UserRoleController],
  providers: [
    UserPermissionService,
    UserRoleService,
    AuthRoleService,
    AuthPermissionPrismaRepository,
    AuthRolePrismaRepository,
    UserPrismaRepository,
    ListUserPermissionsHandler,
    ListUserRolesHandler,
    AssignRoleHandler,
    RevokeRoleHandler,
    AssignPermissionHandler,
    RevokePermissionHandler,
    ...TOKEN_BINDINGS,
  ],
  exports: [
    UserPermissionService,
    UserRoleService,
    AuthRoleService,
    ...TOKEN_BINDINGS.map((b) => b.provide),
  ],
})
export class UserRolePermissionModule {}
