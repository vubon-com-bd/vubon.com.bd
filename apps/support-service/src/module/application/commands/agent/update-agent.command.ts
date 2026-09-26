/**
 * UpdateAgentCommand
 * @module support-service/application/commands/agent
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UpdateAgentRequestDTO } from '../../dtos/requests/agent/update-agent.dto';

export class UpdateAgentCommand extends BaseCommand {
  readonly type = 'support.agent.update';

  constructor(public readonly payload: UpdateAgentRequestDTO) {
    super();
  }
}
