import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateZoneCommand extends BaseCommand {
  readonly type = 'logistics.zone.update';

  constructor(
    public readonly zoneId: string,
    public readonly name?: string,
    public readonly divisions?: readonly string[],
    public readonly districts?: readonly string[],
  ) {
    super();
  }
}
