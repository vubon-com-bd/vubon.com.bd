import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SetAgentStatusCommand extends BaseCommand {
  readonly type = 'support.agent.status';

  constructor(
    public readonly agentId: string,
    public readonly status: string,
  ) {
    super();
  }
}
