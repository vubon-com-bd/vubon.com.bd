import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorTeamController } from '../../interfaces/controllers/rest/vendor-team.controller';
import { AddTeamMemberHandler } from '../../application/commands/team';
import { UpdateTeamMemberHandler } from '../../application/commands/team';
import { RemoveTeamMemberHandler } from '../../application/commands/team';
import { AssignRoleHandler } from '../../application/commands/team';
import { ListTeamMembersHandler } from '../../application/queries/team';
import { GetTeamMemberHandler } from '../../application/queries/team';
import { VendorTeamPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/vendor-team.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [VendorTeamController],
  providers: [
    VendorTeamPrismaRepository,
    AddTeamMemberHandler,
    UpdateTeamMemberHandler,
    RemoveTeamMemberHandler,
    AssignRoleHandler,
    ListTeamMembersHandler,
    GetTeamMemberHandler,
  ],
  exports: [VendorTeamPrismaRepository],
})
export class VendorTeamModule {}
