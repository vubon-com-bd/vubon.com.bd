import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateRouteCommand extends BaseCommand {
  readonly type = 'logistics.route.create';

  constructor(
    public readonly name: string,
    public readonly routeType: string,
    public readonly zoneIds?: readonly string[],
  ) {
    super();
  }
}
