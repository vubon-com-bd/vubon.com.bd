import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RegisterAgentCommand extends BaseCommand {
  readonly type = 'support.agent.register';

  constructor(
    public readonly userId: string,
    public readonly type_: string,
    public readonly teamId?: string,
    public readonly skills: readonly string[] = [],
    public readonly maxLoad?: number,
  ) {
    super();
  }
}
