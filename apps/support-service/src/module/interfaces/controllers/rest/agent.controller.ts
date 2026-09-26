/**
 * AgentController — HTTP adapter
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

import { RegisterAgentCommand } from '../../../application/commands/agent/register-agent.command';
import { UpdateAgentCommand } from '../../../application/commands/agent/update-agent.command';
import { SetAgentStatusCommand } from '../../../application/commands/agent/set-agent-status.command';
import { GetAgentQuery } from '../../../application/queries/agent/get-agent.query';
import { ListAgentsQuery } from '../../../application/queries/agent/list-agents.query';

import { RegisterAgentRequestDTO } from '../../dtos/requests/agent/register-agent.dto';
import { UpdateAgentRequestDTO } from '../../dtos/requests/agent/update-agent.dto';
import { SetAgentStatusRequestDTO } from '../../dtos/requests/agent/set-agent-status.dto';
import { AgentResponseDTO } from '../../dtos/responses/agent-response.dto';
import { AgentControllerMapper } from '../../mappers/agent.controller.mapper';

@ApiTags('Agents')
@ApiBearerAuth()
@Controller({ path: 'agents', version: '1' })
export class AgentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly mapper: AgentControllerMapper,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() body: RegisterAgentRequestDTO,
  ): Promise<AgentResponseDTO> {
    const result = await this.commandBus.execute(
      new RegisterAgentCommand({
        userId: body.userId,
        name: body.name,
        email: body.email,
        level: body.level as never,
        skills: body.skills as never,
        teamIds: body.teamIds,
        languages: body.languages,
        maxConcurrentTickets: body.maxConcurrentTickets,
      }),
    );
    return this.mapper.toResponse(result);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<AgentResponseDTO> {
    const result = await this.queryBus.execute(new GetAgentQuery(id));
    return this.mapper.toResponse(result);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async list(): Promise<readonly AgentResponseDTO[]> {
    const result = await this.queryBus.execute(new ListAgentsQuery(1, 20));
    return result.items.map((item: never) => this.mapper.toResponse(item));
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() body: UpdateAgentRequestDTO,
  ): Promise<AgentResponseDTO> {
    const result = await this.commandBus.execute(
      new UpdateAgentCommand({
        agentId: id,
        name: body.name,
        level: body.level as never,
        skills: body.skills as never,
        languages: body.languages,
        maxConcurrentTickets: body.maxConcurrentTickets,
      }),
    );
    return this.mapper.toResponse(result);
  }

  @Post(':id/status')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async setStatus(
    @Param('id') id: string,
    @Body() body: SetAgentStatusRequestDTO,
  ): Promise<AgentResponseDTO> {
    const result = await this.commandBus.execute(
      new SetAgentStatusCommand({
        agentId: id,
        status: body.status as never,
      }),
    );
    return this.mapper.toResponse(result);
  }
}
