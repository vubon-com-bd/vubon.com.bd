import { PrismaService } from '../../infrastructure/persistence/prisma/prisma.service';
import { PrismaModule, RedisModule } from '@vubon/shared-kernel/infrastructure';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthRoleController } from '../../interfaces/controllers/rest/auth-role.controller';
import { AuthRoleService } from '../../application/services/impl/auth-role.service';
import { ListAuthRolesHandler } from '../../application/queries/auth/list-auth-roles.handler';
import { AssignRoleHandler } from '../../application/commands/user/assign-role.handler';
import { RevokeRoleHandler } from '../../application/commands/user/revoke-role.handler';
import { AuthRolePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-role.prisma.repository';

@Module({
  imports: [CqrsModule, PrismaModule, RedisModule],
  controllers: [AuthRoleController],
  providers: [PrismaService, { provide: 'PrismaService', useClass: PrismaService },
    { provide: 'AuthRoleRepository', useExisting: AuthRolePrismaRepository },
    { provide: 'AuthRoleService', useExisting: AuthRoleService },

    AuthRolePrismaRepository,
    AuthRoleService,
    ListAuthRolesHandler,
    AssignRoleHandler,
    RevokeRoleHandler,
  ],
  exports: [AuthRoleService, AuthRolePrismaRepository],
})
export class AuthRoleModule {}
