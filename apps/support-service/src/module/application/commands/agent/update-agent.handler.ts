import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateAgentCommand } from './update-agent.command';
import type { SupportAgentRepository } from '../../../domain/repositories/support-agent.repository.interface';
import { AgentIdVO } from '../../../domain/value-objects/primitives/agent-id.vo';

@CommandHandler(UpdateAgentCommand)
export class UpdateAgentHandler
  extends BaseCommandHandler<UpdateAgentCommand, void>
  implements ICommandHandler<UpdateAgentCommand>
{
  readonly commandType = 'support.agent.update';

  constructor(private readonly agentRepo: SupportAgentRepository) {
    super();
  }

  async execute(command: UpdateAgentCommand): Promise<void> {
    const existing = await this.agentRepo.findById(AgentIdVO.create(command.agentId));
    if (!existing) {
      throw new Error(`Agent not found: ${command.agentId}`);
    }
  }
}
