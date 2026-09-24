import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateSlaCommand extends BaseCommand {
  readonly type = 'support.sla.create';

  constructor(
    public readonly name: string,
    public readonly type_: string,
    public readonly target: number,
    public readonly priority: string,
    public readonly businessHoursOnly: boolean = false,
  ) {
    super();
  }
}
