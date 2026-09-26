/**
 * SetAgentStatusCommand
 * @module support-service/application/commands/agent
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { SetAgentStatusRequestDTO } from '../../dtos/requests/agent/set-agent-status.dto';

export class SetAgentStatusCommand extends BaseCommand {
  readonly type = 'support.agent.set_status';

  constructor(public readonly payload: SetAgentStatusRequestDTO) {
    super();
  }
}
