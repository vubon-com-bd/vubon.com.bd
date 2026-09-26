/**
 * SetAgentStatusHandler
 * @module support-service/application/commands/agent
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SetAgentStatusCommand } from './set-agent-status.command';
import type { AgentResponseDTO } from '../../dtos/responses/agent-response.dto';
import type { AgentServiceInterface } from '../../services/interfaces/agent.service.interface';

export class SetAgentStatusHandler extends BaseCommandHandler<
  SetAgentStatusCommand,
  AgentResponseDTO
> {
  readonly commandType = 'support.agent.set_status';

  constructor(private readonly agentService: AgentServiceInterface) {
    super();
  }

  async execute(command: SetAgentStatusCommand): Promise<AgentResponseDTO> {
    return this.agentService.setStatus(command.payload);
  }
}
