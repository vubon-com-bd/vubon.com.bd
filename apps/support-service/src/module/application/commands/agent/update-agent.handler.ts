/**
 * UpdateAgentHandler
 * @module support-service/application/commands/agent
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateAgentCommand } from './update-agent.command';
import type { AgentResponseDTO } from '../../dtos/responses/agent-response.dto';
import type { AgentServiceInterface } from '../../services/interfaces/agent.service.interface';

export class UpdateAgentHandler extends BaseCommandHandler<
  UpdateAgentCommand,
  AgentResponseDTO
> {
  readonly commandType = 'support.agent.update';

  constructor(private readonly agentService: AgentServiceInterface) {
    super();
  }

  async execute(command: UpdateAgentCommand): Promise<AgentResponseDTO> {
    return this.agentService.update(command.payload);
  }
}
