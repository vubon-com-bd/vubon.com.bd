import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserPermissionController } from '../../interfaces/controllers/rest/user-permission.controller';
import { UserRoleController } from '../../interfaces/controllers/rest/user-role.controller';
import { UserPermissionService } from '../../application/services/impl/user-permission.service';
import { UserRoleService } from '../../application/services/impl/user-role.service';
import { AuthRoleService } from '../../application/services/impl/auth-role.service';
import { AuthPermissionPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-permission.prisma.repository';
import { AuthRolePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-role.prisma.repository';
import { UserPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user.prisma.repository';
import { ListUserPermissionsHandler } from '../../application/queries/user/list-user-permissions.handler';
import { ListUserRolesHandler } from '../../application/queries/user/list-user-roles.handler';
import { AssignRoleHandler } from '../../application/commands/user/assign-role.handler';
import { RevokeRoleHandler } from '../../application/commands/user/revoke-role.handler';
import { AssignPermissionHandler } from '../../application/commands/user/assign-permission.handler';
import { RevokePermissionHandler } from '../../application/commands/user/revoke-permission.handler';
import {
  USER_PERMISSION_SERVICE,
  USER_ROLE_SERVICE,
  AUTH_ROLE_SERVICE,
  AUTH_PERMISSION_REPO,
  AUTH_ROLE_REPO,
  USER_REPO,
} from '../../application/services/tokens';

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
