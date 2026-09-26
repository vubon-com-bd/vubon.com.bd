/**
 * RegisterAgentCommand
 * @module support-service/application/commands/agent
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { RegisterAgentRequestDTO } from '../../dtos/requests/agent/register-agent.dto';

export class RegisterAgentCommand extends BaseCommand {
  readonly type = 'support.agent.register';

  constructor(public readonly payload: RegisterAgentRequestDTO) {
    super();
  }
}
