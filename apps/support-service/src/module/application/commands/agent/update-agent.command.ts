import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateAgentCommand extends BaseCommand {
  readonly type = 'support.agent.update';

  constructor(
    public readonly agentId: string,
    public readonly teamId?: string | null,
    public readonly type_?: string,
    public readonly skills?: readonly string[],
    public readonly maxLoad?: number,
  ) {
    super();
  }
}
