import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RegisterAgentCommand } from './register-agent.command';
import type { AgentServiceInterface } from '../../services/interfaces/agent.service.interface';
import type { AgentResponseDTO } from '../../dtos/responses/agent-response.dto';

@CommandHandler(RegisterAgentCommand)
export class RegisterAgentHandler
  extends BaseCommandHandler<RegisterAgentCommand, AgentResponseDTO>
  implements ICommandHandler<RegisterAgentCommand>
{
  readonly commandType = 'support.agent.register';

  constructor(private readonly agentService: AgentServiceInterface) {
    super();
  }

  async execute(command: RegisterAgentCommand): Promise<AgentResponseDTO> {
    return this.agentService.register({
      userId: command.userId,
      type: command.type_,
      teamId: command.teamId,
      skills: [...command.skills],
      maxLoad: command.maxLoad,
    });
  }
}
