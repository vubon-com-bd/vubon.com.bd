import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  JwtAuthGuard,
  Permissions,
} from '@vubon/shared-kernel/interfaces';
import { PERMISSION } from '@vubon/shared-constants/common';
import { CreateTeamCommand } from '../../../application/commands/team/create-team.command';
import { UpdateTeamCommand } from '../../../application/commands/team/update-team.command';
import { AddTeamMemberCommand } from '../../../application/commands/team/add-team-member.command';
import { GetTeamQuery } from '../../../application/queries/team/get-team.query';
import { ListTeamsQuery } from '../../../application/queries/team/list-teams.query';

@ApiTags('Teams')
@Controller('teams')
@UseGuards(JwtAuthGuard)
export class TeamController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async list(): Promise<unknown> {
    return this.queryBus.execute(new ListTeamsQuery());
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetTeamQuery(id));
  }

  @Post()
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async create(
    @Body() body: { name: string; type: string; description?: string },
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CreateTeamCommand(body.name, body.type, body.description),
    );
  }

  @Patch(':id')
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async update(
    @Param('id') id: string,
    @Body() body: { name?: string; description?: string; isActive?: boolean },
  ): Promise<void> {
    return this.commandBus.execute(
      new UpdateTeamCommand(id, body.name, body.description, body.isActive),
    );
  }

  @Post(':id/members')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async addMember(
    @Param('id') id: string,
    @Body() body: { agentId: string },
  ): Promise<void> {
    return this.commandBus.execute(new AddTeamMemberCommand(id, body.agentId));
  }
}
