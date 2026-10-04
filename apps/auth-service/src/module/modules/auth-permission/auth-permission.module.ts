import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthPermissionController } from '../../interfaces/controllers/rest/auth-permission.controller.js';
import { AuthPermissionService } from '../../application/services/impl/auth-permission.service.js';
import { ListAuthPermissionsHandler } from '../../application/queries/auth/list-auth-permissions.handler.js';
import { AuthPermissionPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-permission.prisma.repository.js';
import { AuthRolePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-role.prisma.repository.js';
import {
  AUTH_PERMISSION_REPO,
  AUTH_ROLE_REPO,
} from '../../application/services/tokens.js';

const TOKEN_BINDINGS = [
  { provide: AUTH_PERMISSION_REPO, useExisting: AuthPermissionPrismaRepository },
  { provide: AUTH_ROLE_REPO, useExisting: AuthRolePrismaRepository },
];

@Module({
  imports: [CqrsModule],
  controllers: [AuthPermissionController],
  providers: [
    AuthPermissionService,
    AuthPermissionPrismaRepository,
    AuthRolePrismaRepository,
    ListAuthPermissionsHandler,
    ...TOKEN_BINDINGS,
  ],
  exports: [
    AuthPermissionService,
    AuthPermissionPrismaRepository,
    ...TOKEN_BINDINGS.map((b) => b.provide),
  ],
})
export class AuthPermissionModule {}
