import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateSlaCommand extends BaseCommand {
  readonly type = 'support.sla.update';

  constructor(
    public readonly slaId: string,
    public readonly name?: string,
    public readonly target?: number,
    public readonly status?: string,
  ) {
    super();
  }
}
