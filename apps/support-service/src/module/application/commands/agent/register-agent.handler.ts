/**
 * RegisterAgentHandler
 * @module support-service/application/commands/agent
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RegisterAgentCommand } from './register-agent.command';
import type { AgentResponseDTO } from '../../dtos/responses/agent-response.dto';
import type { AgentServiceInterface } from '../../services/interfaces/agent.service.interface';

export class RegisterAgentHandler extends BaseCommandHandler<
  RegisterAgentCommand,
  AgentResponseDTO
> {
  readonly commandType = 'support.agent.register';

  constructor(private readonly agentService: AgentServiceInterface) {
    super();
  }

  async execute(command: RegisterAgentCommand): Promise<AgentResponseDTO> {
    return this.agentService.register(command.payload);
  }
}
