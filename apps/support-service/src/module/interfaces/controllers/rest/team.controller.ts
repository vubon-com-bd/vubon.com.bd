/**
 * TeamController — HTTP adapter
 * @module support-service/interfaces/controllers/rest
 */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';

import { CreateTeamCommand } from '../../../application/commands/team/create-team.command';
import { UpdateTeamCommand } from '../../../application/commands/team/update-team.command';
import { AddTeamMemberCommand } from '../../../application/commands/team/add-team-member.command';
import { GetTeamQuery } from '../../../application/queries/team/get-team.query';
import { ListTeamsQuery } from '../../../application/queries/team/list-teams.query';

import { CreateTeamRequestDTO } from '../../dtos/requests/team/create-team.dto';
import { UpdateTeamRequestDTO } from '../../dtos/requests/team/update-team.dto';
import { AddTeamMemberRequestDTO } from '../../dtos/requests/team/add-team-member.dto';
import { TeamResponseDTO } from '../../dtos/responses/team-response.dto';
import { TeamControllerMapper } from '../../mappers/team.controller.mapper';

@ApiTags('Teams')
@ApiBearerAuth()
@Controller({ path: 'teams', version: '1' })
export class TeamController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly mapper: TeamControllerMapper,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateTeamRequestDTO): Promise<TeamResponseDTO> {
    const result = await this.commandBus.execute(
      new CreateTeamCommand({
        name: body.name,
        description: body.description,
        type: body.type as never,
        routing: body.routing as never,
        leaderId: body.leaderId,
        skills: body.skills,
        categories: body.categories,
      }),
    );
    return this.mapper.toResponse(result);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<TeamResponseDTO> {
    const result = await this.queryBus.execute(new GetTeamQuery(id));
    return this.mapper.toResponse(result);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async list(): Promise<readonly TeamResponseDTO[]> {
    const result = await this.queryBus.execute(new ListTeamsQuery(1, 20));
    return result.items.map((item: never) => this.mapper.toResponse(item));
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() body: UpdateTeamRequestDTO,
  ): Promise<TeamResponseDTO> {
    const result = await this.commandBus.execute(
      new UpdateTeamCommand({
        teamId: id,
        name: body.name,
        description: body.description,
      }),
    );
    return this.mapper.toResponse(result);
  }

  @Post(':id/members')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async addMember(
    @Param('id') id: string,
    @Body() body: AddTeamMemberRequestDTO,
  ): Promise<TeamResponseDTO> {
    const result = await this.commandBus.execute(
      new AddTeamMemberCommand({
        teamId: id,
        userId: body.userId,
        isLeader: body.isLeader,
      }),
    );
    return this.mapper.toResponse(result);
  }
}
