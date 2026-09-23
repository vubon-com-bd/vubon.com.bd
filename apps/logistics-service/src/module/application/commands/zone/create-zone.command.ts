import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateZoneCommand extends BaseCommand {
  readonly type = 'logistics.zone.create';

  constructor(
    public readonly code: string,
    public readonly name: string,
    public readonly zoneType: string,
    public readonly divisions: readonly string[] = [],
    public readonly districts: readonly string[] = [],
  ) {
    super();
  }
}
