import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AgentController } from '../../interfaces/controllers/rest/agent.controller';
import { RegisterAgentHandler } from '../../application/commands/agent/register-agent.handler';
import { UpdateAgentHandler } from '../../application/commands/agent/update-agent.handler';
import { SetAgentStatusHandler } from '../../application/commands/agent/set-agent-status.handler';
import { GetAgentHandler } from '../../application/queries/agent/get-agent.handler';
import { ListAgentsHandler } from '../../application/queries/agent/list-agents.handler';
import { ListAvailableAgentsHandler } from '../../application/queries/agent/list-available-agents.handler';
import { AgentService } from '../../application/services/impl/agent.service';

const HANDLERS = [
  RegisterAgentHandler,
  UpdateAgentHandler,
  SetAgentStatusHandler,
  GetAgentHandler,
  ListAgentsHandler,
  ListAvailableAgentsHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [AgentController],
  providers: [...HANDLERS, AgentService],
  exports: [AgentService],
})
export class AgentModule {}
