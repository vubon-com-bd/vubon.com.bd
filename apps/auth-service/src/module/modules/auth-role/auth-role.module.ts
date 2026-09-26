import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthRoleController } from '../../interfaces/controllers/rest/auth-role.controller';
import { AuthRoleService } from '../../application/services/impl/auth-role.service';
import { ListAuthRolesHandler } from '../../application/queries/auth/list-auth-roles.handler';
import { AuthRolePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-role.prisma.repository';
import { AuthPermissionPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-permission.prisma.repository';
import { UserPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user.prisma.repository';
import {
  AUTH_ROLE_REPO,
  AUTH_PERMISSION_REPO,
  AUTH_ROLE_SERVICE,
  USER_REPO,
} from '../../application/services/tokens';

const TOKEN_BINDINGS = [
  { provide: AUTH_ROLE_REPO, useExisting: AuthRolePrismaRepository },
  { provide: AUTH_PERMISSION_REPO, useExisting: AuthPermissionPrismaRepository },
  { provide: AUTH_ROLE_SERVICE, useExisting: AuthRoleService },
  { provide: USER_REPO, useExisting: UserPrismaRepository },
];

@Module({
  imports: [CqrsModule],
  controllers: [AuthRoleController],
  providers: [
    AuthRoleService,
    AuthRolePrismaRepository,
    AuthPermissionPrismaRepository,
    UserPrismaRepository,
    ListAuthRolesHandler,
    ...TOKEN_BINDINGS,
  ],
  exports: [
    AuthRoleService,
    AuthRolePrismaRepository,
    AuthPermissionPrismaRepository,
    ...TOKEN_BINDINGS.map((b) => b.provide),
  ],
})
export class AuthRoleModule {}
