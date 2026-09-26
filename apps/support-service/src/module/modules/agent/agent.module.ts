/**
 * AgentModule
 * @module support-service/modules/agent
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AgentService } from '../../application/services/impl/agent.service';
import { AgentMapper } from '../../application/mappers/agent.mapper';
import { RegisterAgentHandler } from '../../application/commands/agent/register-agent.handler';
import { UpdateAgentHandler } from '../../application/commands/agent/update-agent.handler';
import { SetAgentStatusHandler } from '../../application/commands/agent/set-agent-status.handler';
import { GetAgentHandler } from '../../application/queries/agent/get-agent.handler';
import { ListAgentsHandler } from '../../application/queries/agent/list-agents.handler';
import { AgentController } from '../../interfaces/controllers/rest/agent.controller';
import { AgentControllerMapper } from '../../interfaces/mappers/agent.controller.mapper';

@Module({
  imports: [CqrsModule],
  controllers: [AgentController],
  providers: [
    AgentService,
    AgentMapper,
    AgentControllerMapper,
    RegisterAgentHandler,
    UpdateAgentHandler,
    SetAgentStatusHandler,
    GetAgentHandler,
    ListAgentsHandler,
  ],
  exports: [AgentService],
})
export class AgentModule {}
