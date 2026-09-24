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
import { RegisterAgentCommand } from '../../../application/commands/agent/register-agent.command';
import { UpdateAgentCommand } from '../../../application/commands/agent/update-agent.command';
import { SetAgentStatusCommand } from '../../../application/commands/agent/set-agent-status.command';
import { GetAgentQuery } from '../../../application/queries/agent/get-agent.query';
import { ListAgentsQuery } from '../../../application/queries/agent/list-agents.query';
import { ListAvailableAgentsQuery } from '../../../application/queries/agent/list-available-agents.query';
import {
  RegisterAgentRequestDto,
  SetAgentStatusRequestDto,
} from '../../dtos/requests/agent.request.dto';
import { AgentSwagger } from '../../swagger/agent.swagger';

@ApiTags('Agents')
@Controller('agents')
@UseGuards(JwtAuthGuard)
export class AgentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @AgentSwagger.List()
  async list(): Promise<unknown> {
    return this.queryBus.execute(new ListAgentsQuery());
  }

  @Get('available')
  async listAvailable(): Promise<unknown> {
    return this.queryBus.execute(new ListAvailableAgentsQuery());
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetAgentQuery(id));
  }

  @Post()
  @Permissions(PERMISSION.ADMIN_MANAGE)
  @AgentSwagger.Register()
  async register(@Body() body: RegisterAgentRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new RegisterAgentCommand(
        body.userId,
        body.type,
        body.teamId,
        body.skills ?? [],
        body.maxLoad,
      ),
    );
  }

  @Patch(':id')
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async update(
    @Param('id') id: string,
    @Body() body: { teamId?: string | null; type?: string; skills?: string[]; maxLoad?: number },
  ): Promise<void> {
    return this.commandBus.execute(
      new UpdateAgentCommand(id, body.teamId, body.type, body.skills, body.maxLoad),
    );
  }

  @Post(':id/status')
  @HttpCode(HttpStatus.NO_CONTENT)
  async setStatus(
    @Param('id') id: string,
    @Body() body: SetAgentStatusRequestDto,
  ): Promise<void> {
    return this.commandBus.execute(new SetAgentStatusCommand(id, body.status));
  }
}
