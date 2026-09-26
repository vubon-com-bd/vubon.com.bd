import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class OptimizeRouteCommand extends BaseCommand {
  readonly type = 'logistics.route.optimize';

  constructor(
    public readonly routeId: string,
    public readonly optimization: string,
  ) {
    super();
  }
}
