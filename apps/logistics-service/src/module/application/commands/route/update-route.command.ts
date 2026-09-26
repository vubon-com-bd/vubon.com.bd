import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateRouteCommand extends BaseCommand {
  readonly type = 'logistics.route.update';

  constructor(
    public readonly routeId: string,
    public readonly name?: string,
    public readonly distanceKm?: number,
  ) {
    super();
  }
}
