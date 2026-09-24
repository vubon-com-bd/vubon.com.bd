import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { TeamController } from '../../interfaces/controllers/rest/team.controller';
import { CreateTeamHandler } from '../../application/commands/team/create-team.handler';
import { UpdateTeamHandler } from '../../application/commands/team/update-team.handler';
import { AddTeamMemberHandler } from '../../application/commands/team/add-team-member.handler';
import { GetTeamHandler } from '../../application/queries/team/get-team.handler';
import { ListTeamsHandler } from '../../application/queries/team/list-teams.handler';
import { TeamService } from '../../application/services/impl/team.service';

const HANDLERS = [
  CreateTeamHandler,
  UpdateTeamHandler,
  AddTeamMemberHandler,
  GetTeamHandler,
  ListTeamsHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [TeamController],
  providers: [...HANDLERS, TeamService],
  exports: [TeamService],
})
export class TeamModule {}
