import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SetAgentStatusCommand } from './set-agent-status.command';
import type { AgentServiceInterface } from '../../services/interfaces/agent.service.interface';
import { AgentIdVO } from '../../../domain/value-objects/primitives/agent-id.vo';

@CommandHandler(SetAgentStatusCommand)
export class SetAgentStatusHandler
  extends BaseCommandHandler<SetAgentStatusCommand, void>
  implements ICommandHandler<SetAgentStatusCommand>
{
  readonly commandType = 'support.agent.status';

  constructor(private readonly agentService: AgentServiceInterface) {
    super();
  }

  async execute(command: SetAgentStatusCommand): Promise<void> {
    await this.agentService.setStatus(AgentIdVO.create(command.agentId), command.status);
  }
}
