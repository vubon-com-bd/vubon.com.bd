/**
 * TeamModule
 * @module support-service/modules/team
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { TeamService } from '../../application/services/impl/team.service';
import { TeamMapper } from '../../application/mappers/team.mapper';
import { CreateTeamHandler } from '../../application/commands/team/create-team.handler';
import { UpdateTeamHandler } from '../../application/commands/team/update-team.handler';
import { AddTeamMemberHandler } from '../../application/commands/team/add-team-member.handler';
import { GetTeamHandler } from '../../application/queries/team/get-team.handler';
import { ListTeamsHandler } from '../../application/queries/team/list-teams.handler';
import { TeamController } from '../../interfaces/controllers/rest/team.controller';
import { TeamControllerMapper } from '../../interfaces/mappers/team.controller.mapper';

@Module({
  imports: [CqrsModule],
  controllers: [TeamController],
  providers: [
    TeamService,
    TeamMapper,
    TeamControllerMapper,
    CreateTeamHandler,
    UpdateTeamHandler,
    AddTeamMemberHandler,
    GetTeamHandler,
    ListTeamsHandler,
  ],
  exports: [TeamService],
})
export class TeamModule {}
