import { PrismaService } from '../../infrastructure/persistence/prisma/prisma.service';
import { PrismaModule, RedisModule } from '@vubon/shared-kernel/infrastructure';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthPermissionController } from '../../interfaces/controllers/rest/auth-permission.controller';
import { AuthPermissionService } from '../../application/services/impl/auth-permission.service';
import { ListAuthPermissionsHandler } from '../../application/queries/auth/list-auth-permissions.handler';
import { AssignPermissionHandler } from '../../application/commands/user/assign-permission.handler';
import { RevokePermissionHandler } from '../../application/commands/user/revoke-permission.handler';
import { AuthPermissionPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-permission.prisma.repository';
import { PermissionValidatorService } from '../../infrastructure/services/internal/permission-validator.service';

@Module({
  imports: [CqrsModule, PrismaModule, RedisModule],
  controllers: [AuthPermissionController],
  providers: [PrismaService, { provide: 'PrismaService', useClass: PrismaService },
    { provide: 'AuthPermissionRepository', useExisting: AuthPermissionPrismaRepository },
    { provide: 'PermissionValidatorService', useExisting: PermissionValidatorService },
    { provide: 'AuthPermissionService', useExisting: AuthPermissionService },

    AuthPermissionPrismaRepository,
    PermissionValidatorService,
    AuthPermissionService,
    ListAuthPermissionsHandler,
    AssignPermissionHandler,
    RevokePermissionHandler,
  ],
  exports: [AuthPermissionService, AuthPermissionPrismaRepository, PermissionValidatorService],
})
export class AuthPermissionModule {}
